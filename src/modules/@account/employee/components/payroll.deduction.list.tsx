import { useDataGrid } from "@refinedev/mui";
import { LANG_ACCOUNT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { IAccountPayrollAnnualDeduction } from "../../interface";
import { HttpError } from "@refinedev/core";
import { TableGrid } from "@components/table/table.body";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { BasicModal } from "@components/modal/basic.modal";
import { BsPlusCircle } from "react-icons/bs";
import { ACCOUNT_PAYROLL_ANNUAL_DEDUCTION_URL } from "../../constant/server.urls";
import { PayrollAnnualDeductionForm } from "./payroll.deduction.form";

type PayrolDeductionListProps = {
    employee_id: string
}
export const PayrolAnnualDeductionList = ({ employee_id }: PayrolDeductionListProps) => {
    const t = useTranslate(LANG_ACCOUNT, "deduction");
    const [payroll, setPayroll] = useState<IAccountPayrollAnnualDeduction | null>(null)
    const [createPayroll, setCreatePayroll] = useState<boolean>(false)
    const columns = useMemo<GridColDef<IAccountPayrollAnnualDeduction>[]>(
        () => [
            {
                field: "ledger.name",
                headerName: t("fields.ledger"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.ledger?.name}-{row.ledger?.code}</Typography>;
                },
            },
            {
                field: "amount",
                headerName: t("fields.amount"),
                sortable: true,
                width: 150,
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <Stack direction={"row"}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => setPayroll(row)}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Stack>
                    );
                },
            },
        ],
        [t]
    );
    const { dataGridProps, setFilters } = useDataGrid<IAccountPayrollAnnualDeduction, HttpError>({
        resource: ACCOUNT_PAYROLL_ANNUAL_DEDUCTION_URL,
        pagination: {
            mode: "client"
        },
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc"
                }]
        },
        meta: { customQuery: { ledger: true } },
    });
    return <Box>
        <Box>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} mb={1}>
                <Stack direction={"row"} gap={1}>
                    <TextField
                        size="small"
                        label={t("@buttons.search")}
                        onChange={(e) => {
                            setFilters([
                                {
                                    field: "ledger.name",
                                    operator: "eq",
                                    value: e.target.value
                                },
                                {
                                    field: "ledger.code",
                                    operator: "eq",
                                    value: e.target.value
                                }
                            ])
                        }}
                    />
                    <IconButton
                        onClick={() => setCreatePayroll(true)}
                        color="primary"
                    >
                        <BsPlusCircle />
                    </IconButton>
                </Stack>
            </Stack>
            <TableGrid {...dataGridProps} columns={columns} filterMode="client" hideFooterPagination={true} />
        </Box>
        {payroll && employee_id && (
            <BasicModal
                title={`${t("titles.edit")} : ${payroll.ledger?.name}-${payroll.ledger?.code}`}
                open={Boolean(payroll)}
                onClose={() => setPayroll(null)}
            >
                <PayrollAnnualDeductionForm employee_id={employee_id} id={payroll.id} action="edit" onClose={() => setPayroll(null)} />
            </BasicModal>
        )}

        {createPayroll && employee_id && (
            <BasicModal
                title={t("titles.create")}
                open={Boolean(createPayroll)}
                onClose={() => setCreatePayroll(false)}
            >
                <PayrollAnnualDeductionForm employee_id={employee_id} action="create" onClose={() => setCreatePayroll(false)} />
            </BasicModal>
        )}
    </Box>;
};