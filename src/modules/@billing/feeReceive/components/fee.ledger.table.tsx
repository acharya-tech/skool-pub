import { useList } from "@refinedev/core";
import { BillFeeReleaseTypeEnum, BILLING_FEE_RELEASE_META_URL } from "../../constant";
import { Tab, TableBody, TableCell, TableContainer, TableFooter, TableRow, Typography } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { IBillFeeReleaseMeta } from "../../interface";
import { DrCrEnum, StatusEnum } from "@common/all.enum";

type FeeLedgerTableProps = {
    student_id?: string
    year_id?: string
}
export const FeeLedgerTable = ({ student_id, year_id }: FeeLedgerTableProps) => {
    const t = useTranslate(LANG_BILLING, "feeReceive");
    const { data } = useList<IBillFeeReleaseMeta>({
        resource: BILLING_FEE_RELEASE_META_URL,
        pagination: {
            mode: "client"
        },
        meta: {
            customQuery: {
                student_id: student_id,
                year_id: year_id,
                release: true,
                status: StatusEnum.Active,
                release_status: StatusEnum.Active
            }
        },
        queryOptions: {
            enabled: Boolean(student_id && year_id)
        }
    })
    const releaseData = data?.data
    let balance = 0
    let dr_balance = 0
    let cr_balance = 0
    return (<TableContainer>
        <Table size="small" className="borderedTable miniTable">
            <TableHead>
                <TableRow>
                    <TableCell align="left"><Typography>{t("labels.month")}</Typography></TableCell>
                    <TableCell><Typography>{t("labels.particular")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.dr_amount")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.cr_amount")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.balance")}</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {releaseData?.map((item: IBillFeeReleaseMeta, index: number) => {
                    const amount = Number(item.amount)
                    dr_balance += item.dr_cr === DrCrEnum.Dr ? amount : 0
                    cr_balance += item.dr_cr === DrCrEnum.Cr ? amount : 0
                    balance = dr_balance - cr_balance
                    let bgColor = "white"
                    if (item.release.type === BillFeeReleaseTypeEnum.Fee) {
                        bgColor = "success.main"
                    }
                    if (item.release.type === BillFeeReleaseTypeEnum.Invoice) {
                        bgColor = "primary.main"
                    }
                    if (item.release.type === BillFeeReleaseTypeEnum.Scholar) {
                        bgColor = "info.main"
                    }
                    return (
                        <TableRow key={index}>
                            <TableCell align="left"><Typography>{item.release?.month}</Typography></TableCell>
                            <TableCell sx={{ py: 0, color: bgColor }}><Typography>{item.remark}</Typography></TableCell>
                            <TableCell align="right"><Typography>{item.dr_cr === DrCrEnum.Dr && amount}</Typography></TableCell>
                            <TableCell align="right"><Typography>{item.dr_cr === DrCrEnum.Cr && amount}</Typography></TableCell>
                            <TableCell align="right"><Typography>{balance >= 0 ? balance : (`(${balance * -1})`)}</Typography></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                {releaseData?.length !== 0 && (
                    <TableRow sx={{ backgroundColor: "lightgray" }}>
                        <TableCell align="center" colSpan={2}><Typography>{t("labels.total")}</Typography></TableCell>
                        <TableCell align="right"><Typography>{dr_balance}</Typography></TableCell>
                        <TableCell align="right"><Typography>{cr_balance}</Typography></TableCell>
                        <TableCell align="right"><Typography>{balance >= 0 ? balance : (`(${balance * -1})`)}</Typography></TableCell>
                    </TableRow>
                )}
            </TableFooter>
        </Table>
    </TableContainer>);
};