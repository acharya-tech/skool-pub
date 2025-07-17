import { BILL_FEE_DUE_BY_FEE_HEAD_ID, BillFeeReleaseTypeEnum, BILLING_FEE_REPORT_URL } from "../../constant";
import { TableBody, TableCell, TableContainer, TableFooter, TableRow, Typography } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { IBillFee, IStudentDueByFeeHead } from "../../interface";
import { TableListProp } from "src/interfaces";
import { useMemo } from "react";
import { useRefineOne } from "@hooks/useOne";
type FeeReportTableProps = {
    student_id?: string
    year_id?: string
} & TableListProp
export const FeeReportTable = ({ student_id, year_id, search = "" }: FeeReportTableProps) => {
    const t = useTranslate(LANG_BILLING, "feeReceive");
    const { data: dueByFeeHeadData } = useRefineOne<IStudentDueByFeeHead>({
        resource: BILLING_FEE_REPORT_URL,
        id: BILL_FEE_DUE_BY_FEE_HEAD_ID,
        meta: {
            customQuery: {
                studentIds: student_id,
                year_id: year_id
            }
        },
        // queryOptions: {
        //     enabled: Boolean(student_id && year_id)
        // }
    })
    const { feeHeads, dues } = dueByFeeHeadData?.data || {}

    const [dueMap, totalTotal] = useMemo(() => {
        const totalTotal = new Map<string, number>()
        const map = new Map<string, Map<string, number>>();
        dues?.forEach(d => {
            const amount = Number(d.amount)
            const type = map.get(d.fee_id) ?? new Map<string, number>()
            type.set(d.type, type.get(d.type) ?? 0 + amount)
            map.set(d.fee_id, type)
            totalTotal.set(d.type, (totalTotal.get(d.type) ?? 0) + amount)
        });
        return [map, totalTotal];
    }, [dues]);

    const totalRelease = totalTotal.get(BillFeeReleaseTypeEnum.Fee) ?? 0
    const totalPaid = totalTotal.get(BillFeeReleaseTypeEnum.Invoice) ?? 0
    const totalScholar = totalTotal.get(BillFeeReleaseTypeEnum.Scholar) ?? 0
    let totalDueAmount = 0
    let totalAdvance = 0
    let totalBalance = 0

    return (<TableContainer>
        <Table size="small" className="borderedTable miniTable">
            <TableHead>
                <TableRow>
                    <TableCell align="left"><Typography>{t("labels.sno")}</Typography></TableCell>
                    <TableCell><Typography>{t("labels.fee")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.released")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.paid")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.scholar")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.due")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.advance")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{t("labels.balance")}</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {feeHeads?.map((item: IBillFee, index: number) => {
                    const fee = dueMap.get(item.id)?.get(BillFeeReleaseTypeEnum.Fee) ?? 0 // releaseDues.due?.[item.id]?.[BillFeeReleaseTypeEnum.Fee] ?? 0
                    const paid = dueMap.get(item.id)?.get(BillFeeReleaseTypeEnum.Invoice) ?? 0 // releaseDues.due?.[item.id]?.[BillFeeReleaseTypeEnum.Invoice] ?? 0
                    const scholar = dueMap.get(item.id)?.get(BillFeeReleaseTypeEnum.Scholar) ?? 0 // releaseDues.due?.[item.id]?.[BillFeeReleaseTypeEnum.Scholar] ?? 0
                    const balance = fee - paid - scholar
                    if (balance > 0) {
                        totalDueAmount += balance
                    } else {
                        totalAdvance += Math.abs(balance)
                    }
                    totalBalance += balance
                    return (
                        <TableRow key={index}>
                            <TableCell><Typography>{index + 1}</Typography></TableCell>
                            <TableCell align="left"><Typography>{item.name}</Typography></TableCell>
                            <TableCell align="right"><Typography>{fee}</Typography></TableCell>
                            <TableCell align="right"><Typography>{paid}</Typography></TableCell>
                            <TableCell align="right"><Typography>{scholar}</Typography></TableCell>
                            <TableCell align="right"><Typography>{balance >= 0 ? balance : 0}</Typography></TableCell>
                            <TableCell align="right"><Typography>{balance >= 0 ? 0 : (Math.abs(balance))}</Typography></TableCell>
                            <TableCell align="right"><Typography>{balance < 0 ? `(${Math.abs(balance)})` : balance}</Typography></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                <TableRow sx={{ backgroundColor: "lightgray" }}>
                    <TableCell align="center" colSpan={2}><Typography>{t("labels.total")}</Typography></TableCell>
                    <TableCell align="right"><Typography>{totalRelease}</Typography></TableCell>
                    <TableCell align="right"><Typography>{totalPaid}</Typography></TableCell>
                    <TableCell align="right"><Typography>{totalScholar}</Typography></TableCell>
                    <TableCell align="right"><Typography>{totalDueAmount}</Typography></TableCell>
                    <TableCell align="right"><Typography>{totalAdvance}</Typography></TableCell>
                    <TableCell align="right"><Typography>{(totalBalance) < 0 ? `(${Math.abs(totalBalance)})` : totalBalance}</Typography></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>);
};