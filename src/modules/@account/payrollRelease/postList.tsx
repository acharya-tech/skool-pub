import { useTranslate } from "@hooks/useTranslate";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_ACCOUNT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Button, Typography } from "@mui/material";
import { useCreate, useDataProvider } from "@refinedev/core";
import { IAccountPayrollPreRelease, IAccountPayrollRelease, IAccountPayrollReleaseForm } from "../interface";
import { fNumber } from "@utils/format-number";
import { CSSearch } from "@components/input";
import { ACCOUNT_PAYROLL_POST_URL, ACCOUNT_PAYROLL_RELEASE_URL } from "../constant/server.urls";
import { ACCOUNT_PAYROLL_POST_PRE_POST_ID } from "../constant/constant";
import { useConfirm } from "@hooks/confirm.hook";

type PayrollPrePostListTableProps = {
    releaseForm: Partial<IAccountPayrollReleaseForm>
}

export const PayrollPrePostListTable = ({ releaseForm }: PayrollPrePostListTableProps) => {
    const t = useTranslate(LANG_ACCOUNT, "payrollRelease");
    const [search, setSearch] = useState<string>("")
    const [prePostRelease, setPrePostRelease] = useState<IAccountPayrollPreRelease[]>([])
    const [selectionList, setSelectedList] = useState<any[]>([])
    const dataProvider = useDataProvider()
    const handleLoadData = async () => {
        const { data } = await dataProvider().getOne<IAccountPayrollPreRelease[]>({
            resource: ACCOUNT_PAYROLL_POST_URL,
            id: ACCOUNT_PAYROLL_POST_PRE_POST_ID,
            meta: { customQuery: releaseForm },
        })
        console.log(data, 'data')
        setPrePostRelease(data)
    }
    useEffect(() => {
        handleLoadData()
    }, [releaseForm])
    const { mutate } = useCreate({
        resource: ACCOUNT_PAYROLL_RELEASE_URL
    })
    const [confirmRelease, confirmEle] = useConfirm({
        onConfirm: () => {
            handleSubmit()
        },
        confirmTitle: t("info.release")
    })
    const handleSubmit = () => {
        const empList: Record<string, number> = {}
        selectionList.forEach((e: IAccountPayrollPreRelease) => {
            empList[e.id] = e.amount
        })
        const submitData: IAccountPayrollRelease = {
            date: releaseForm.date!,
            month: releaseForm.month!,
            employees: empList,
            ledger: releaseForm.ledger!,
            type: releaseForm.type!
        }
        mutate({
            resource: ACCOUNT_PAYROLL_RELEASE_URL,
            values: submitData
        }, {
            onSuccess: () => {
                handleLoadData()
            }
        })
    }
    const columns = useMemo<GridColDef<IAccountPayrollPreRelease>[]>(
        () => [
            {
                field: "employee.code",
                headerName: t("fields.code"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.employee.emp_code}</Typography>;
                },
            },
            {
                field: "employee.name",
                headerName: t("fields.name"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.employee.name}</Typography>;
                },
            },
            {
                field: "post_name",
                headerName: t("fields.post"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.employee.post?.name}-{row.employee.post?.level}</Typography>;
                },
            },
            {
                field: "amount",
                headerName: t("fields.amount"),
                disableColumnMenu: true,
                type: "number",
                sortable: false,
                renderCell: function render({ row }) {
                    return <Typography>{fNumber(row.amount ?? 0)}</Typography>
                }
            },
            {
                field: "previous_amount",
                headerName: t("fields.previous_amount"),
                sortable: false,
                type: "number",
                disableColumnMenu: true,
                renderCell: function render({ row }) {
                    return <Typography>{fNumber(row.previous_amount ?? 0)}</Typography>
                }
            },
        ],
        [t]
    );
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedList(selectionModel.map((id) => prePostRelease.find((row) => row.id === id) as IAccountPayrollPreRelease));
    };
    const filteredRows = prePostRelease.filter((row) => {
        return row.employee.name.toLowerCase().includes(search.toLowerCase()) || row.employee.emp_code.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{t("titles.post_list")}</Typography>
                <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />
            </Box>
            <TableGrid
                rows={filteredRows}
                rowCount={filteredRows.length}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                filterMode="client"
                hideFooterPagination={true}
            />
            <Box mt={2}>
                <Button onClick={confirmRelease} disabled={selectionList.length === 0} variant="contained">{t("actions.release")}</Button>
            </Box>
            {confirmEle}
        </Box>
    )
};
