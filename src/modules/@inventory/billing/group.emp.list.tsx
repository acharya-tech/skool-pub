import { TableGrid } from "@components/table/table.body"
import { IStoreGroup } from "../interface"
import { GridColDef } from "@mui/x-data-grid"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_INVENTORY } from "@common/constant"
import { useMemo } from "react"
import { Box } from "@mui/material"
import { GridToolbarQuickFilter } from "@mui/x-data-grid"
import { Divider } from "@mui/material"
import { useOne } from "@refinedev/core"
import { EMPLOYEE_STAFF_LIST } from "@employee/constant"
import { IStaff } from "@employee/interface"
import { StatusEnum } from "@common/all.enum"

type GroupListProps = {
    department?: any
    selectedRows?: any[],
    setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>
}
export const GroupEmpList = ({ department, selectedRows, setSelectedRows }: GroupListProps) => {
    const t = useTranslate(LANG_INVENTORY, "groups");
    const { data, isLoading } = useOne<IStoreGroup>({
        resource: EMPLOYEE_STAFF_LIST,
        meta: {
            customQuery: {
                department: true,
                department_id: department?.id,
                status: StatusEnum.Active
            }
        }
    })
    const columns = useMemo<GridColDef<IStaff>[]>(
        () => [
            {
                field: 'id',
                headerName: t("fields.empid"),
                flex: 1,
                renderCell: ({ row }) => {
                    return `${row.id}`
                }
            },
            {
                field: 'name',
                headerName: 'Name',
                flex: 1,
            },
            {
                field: 'type',
                headerName: 'Type',
                flex: 1,
                renderCell: ({ row }) => {
                    return "Employee"
                }
            }
        ],
        [t]
    );
    const employeeList = data?.data?.employees ?? []

    return <TableGrid
        rows={employeeList}
        loading={isLoading}
        rowCount={employeeList.length}
        paginationMode="client"
        sortingMode="client"
        filterMode="client"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
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