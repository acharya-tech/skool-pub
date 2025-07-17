import { useDataGrid } from "@refinedev/mui";
import { LANG_ACCOUNT } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { IAccountPayrollPost } from "../../interface";
import { HttpError } from "@refinedev/core";
import { ACCOUNT_PAYROLL_POST_URL } from "../../constant/server.urls";
import { useState } from "react";
import { Box, IconButton, Stack, Table, TableCell, TableContainer, TableHead, TextField, Typography } from "@mui/material";
import { BasicModal } from "@components/modal/basic.modal";
import { BsPlusCircle } from "react-icons/bs";
import { AccounPayrollTypeEnum, AccountVoucherStatusEnum } from "../../constant/enum";
import { TableRow } from "@mui/material";
import { TableFooter } from "@mui/material";
import { TableBody } from "@mui/material";
import { fNumber } from "@utils/format-number";
import { EmployeePayrollRelease } from "./payroll.release";

type EmployeePayrollPostProps = {
    employee_id: string
}
export const EmployeePayrollPost = ({ employee_id }: EmployeePayrollPostProps) => {
    const t = useTranslate(LANG_ACCOUNT, "payrollPost");
    const [openRelease, setOpenRelease] = useState(false);
    const { dataGridProps: payrollPostData, setFilters } = useDataGrid<IAccountPayrollPost, HttpError>({
        resource: ACCOUNT_PAYROLL_POST_URL,
        pagination: {
            mode: "client"
        },
        meta: { customQuery: { employee_id: employee_id, voucher: true, voucher_state: AccountVoucherStatusEnum.Approved } },
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc"
                }]
        },
        queryOptions: {
            enabled: Boolean(employee_id)
        }
    });

    const payrollPost = payrollPostData?.rows ?? []
    let balance = 0
    let dr_balance = 0
    let cr_balance = 0
    return (
        <Box>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} mb={1}>
                <Stack direction={"row"} gap={1}>
                    <TextField
                        size="small"
                        label={t("@buttons.search")}
                        onChange={(e) => {
                            setFilters([
                                {
                                    field: "particular",
                                    operator: "eq",
                                    value: e.target.value
                                },
                                {
                                    field: "month",
                                    operator: "eq",
                                    value: e.target.value
                                },
                            ])
                        }}
                    />
                    <IconButton
                        onClick={() => setOpenRelease(true)}
                        color="primary"
                    >
                        <BsPlusCircle />
                    </IconButton>
                </Stack>
            </Stack>
            <TableContainer>
                <Table size="small" className="borderedTable miniTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><Typography>{t("fields.month")}</Typography></TableCell>
                            <TableCell><Typography>{t("fields.particular")}</Typography></TableCell>
                            <TableCell align="right"><Typography>{t("fields.dr_amount")}</Typography></TableCell>
                            <TableCell align="right"><Typography>{t("fields.cr_amount")}</Typography></TableCell>
                            <TableCell align="right"><Typography>{t("fields.balance")}</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payrollPost?.map((item: IAccountPayrollPost, index: number) => {
                            const amount = Number(item.amount)
                            dr_balance += item.type === AccounPayrollTypeEnum.Plus ? amount : 0
                            cr_balance += item.type === AccounPayrollTypeEnum.Minus ? amount : 0
                            cr_balance += item.type === AccounPayrollTypeEnum.Payment ? amount : 0
                            balance = dr_balance - cr_balance
                            let dr_amount = 0
                            let cr_amount = 0
                            let bgColor = "white"
                            if (item.type === AccounPayrollTypeEnum.Plus) {
                                bgColor = "success.main"
                                dr_amount = amount
                            }
                            if (item.type === AccounPayrollTypeEnum.Minus) {
                                bgColor = "info.main"
                                cr_amount = amount
                            }
                            if (item.type === AccounPayrollTypeEnum.Payment) {
                                bgColor = "primary.main"
                                cr_amount = amount
                            }
                            return (
                                <TableRow key={index}>
                                    <TableCell align="left"><Typography>{item?.month}</Typography></TableCell>
                                    <TableCell sx={{ py: 0, color: bgColor }}><Typography>{item.particular}</Typography></TableCell>
                                    <TableCell align="right"><Typography>{dr_amount > 0 && fNumber(dr_amount)}</Typography></TableCell>
                                    <TableCell align="right"><Typography>{cr_amount > 0 && fNumber(cr_amount)}</Typography></TableCell>
                                    <TableCell align="right"><Typography>{balance >= 0 ? fNumber(balance) : (`(${fNumber(balance * -1)})`)}</Typography></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        {payrollPost?.length !== 0 && (
                            <TableRow sx={{ backgroundColor: "lightgray" }}>
                                <TableCell align="center" colSpan={2}><Typography>{t("fields.total")}</Typography></TableCell>
                                <TableCell align="right"><Typography>{fNumber(dr_balance)}</Typography></TableCell>
                                <TableCell align="right"><Typography>{fNumber(cr_balance)}</Typography></TableCell>
                                <TableCell align="right"><Typography>{balance >= 0 ? fNumber(balance) : (`(${fNumber(balance * -1)})`)}</Typography></TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
            {openRelease && (
                <BasicModal
                    open={true}
                    onClose={() => setOpenRelease(false)}
                    title={t("payroll_setup")}
                >
                    <EmployeePayrollRelease
                        onClose={() => setOpenRelease(false)}
                        employee_id={employee_id}
                    />
                </BasicModal>
            )}
        </Box>);
};