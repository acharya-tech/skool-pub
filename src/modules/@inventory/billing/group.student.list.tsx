import { TableGrid } from "@components/table/table.body"
import { GridColDef } from "@mui/x-data-grid"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_INVENTORY } from "@common/constant"
import { useEffect, useMemo } from "react"
import { Box } from "@mui/material"
import { GridToolbarQuickFilter } from "@mui/x-data-grid"
import { Divider } from "@mui/material"
import { useList } from "@refinedev/core"
import { IClass, ISection } from "@academic/interface"
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant"
import { IStudentInfo } from "@student/interface"

type GroupListProps = {
    class?: IClass
    sections?: ISection[]
    selectedRows: any[],
    setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>
}
export const GroupStudentList = ({ class: sclass, sections, selectedRows, setSelectedRows }: GroupListProps) => {
    const t = useTranslate(LANG_INVENTORY, "groups");
    const { data, isLoading } = useList<IStudentInfo>({
        resource: STUDENT_INFO_URL,
        meta: {
            customQuery: {
                class: true,
                section: true,
                state: StudentStateEnum.Current
            }
        },
        filters: [
            {
                field: 'class_id',
                operator: 'eq',
                value: sclass?.id
            },
            {
                field: 'section_id',
                operator: 'eq',
                value: sections?.map(sec => sec.id).join(",")
            }
        ],
        queryOptions: {
            enabled: Boolean(sclass)
        }
    })

    const columns = useMemo<GridColDef<IStudentInfo>[]>(
        () => [
            {
                field: 'regid',
                headerName: t("fields.regid"),
                flex: 1,
            },
            {
                field: 'full_name',
                headerName: 'Name',
                flex: 1,
            },
            {
                field: 'class.name',
                headerName: 'Class',
                flex: 1,
                renderCell: ({ row }) => {
                    return row?.class?.name
                }
            },
            {
                field: 'section.name',
                headerName: 'Section',
                flex: 1,
                renderCell: ({ row }) => {
                    return row?.section?.name
                }
            },
            {
                field: 'type',
                headerName: 'Type',
                flex: 1,
                renderCell: ({ row }) => {
                    return "Student"
                }
            }
        ],
        [t]
    );

    const studentList: IStudentInfo[] = data?.data ?? []

    useEffect(() => {
        if (data?.data) {
            const allRowIds = data?.data.map(row => (row.id));
            setSelectedRows(allRowIds);
        }
    }, [data?.data]);

    return <TableGrid
        rows={studentList}
        loading={isLoading}
        rowCount={studentList?.length}
        paginationMode="client"
        sortingMode="client"
        filterMode="client"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(rows) => {
            setSelectedRows(rows.map(row => (row).toString()));
        }}
        columns={columns}
        slots={{ toolbar: QuickSearchToolbar }}
    />
}

function QuickSearchToolbar() {
    return (
        <>
            <Box py={2} justifyItems={"end"}>
                <GridToolbarQuickFilter size="medium" />
            </Box>
            <Divider />
        </>
    );
}