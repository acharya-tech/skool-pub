import { useTranslate } from "@hooks/useTranslate";

import { LANG_ACCOUNT } from "@common/constant";
import { Box, Button, Divider, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { YesNoEnum } from "@common/all.enum";
import { IAccountPayrollReleaseForm, IAfterPayrollReleaseResponse } from "../../interface";
import { PayrollReleaseForm } from "../../components/common";
import { useCreate, useDataProvider } from "@refinedev/core";
import { ACCOUNT_PAYROLL_RELEASE_URL, ACCOUNT_REPORT_URL } from "../../constant/server.urls";
import { useConfirm } from "@hooks/confirm.hook";
import { ACCOUNT_PAYROLL_AFTER_RELEASE_ID } from "../../constant/constant";
import { DateLabel } from "@components/label/date.label";
import { ACCOUNT_VOUCHER_SHOW } from "../../constant/urls";
import { getQueryParam } from "@utils/other";

type EmployeePayrollReleaseProps = {
    onClose: () => void
    employee_id: string
}
export const EmployeePayrollRelease = ({ employee_id, onClose }: EmployeePayrollReleaseProps) => {
    const t = useTranslate(LANG_ACCOUNT, "payrollRelease");
    const dataProvider = useDataProvider()
    const [previousReleaseHistory, setPreviousReleaseHistory] = useState<IAfterPayrollReleaseResponse[]>([]);
    const [payrollRelease, setPayrollRelease] = useState<Partial<IAccountPayrollReleaseForm>>({
        date: (new Date()).toISOString(),
        auto_amount: YesNoEnum.No
    });
    const { mutate } = useCreate({
        resource: ACCOUNT_PAYROLL_RELEASE_URL
    })
    const [confirmRelease, confirmEle] = useConfirm({
        confirmTitle: t("info.release"),
        onConfirm: () => {
            mutate({
                resource: ACCOUNT_PAYROLL_RELEASE_URL,
                values: {
                    employees: {
                        [employee_id]: payrollRelease.amount
                    },
                    ...payrollRelease
                }
            }, {
                // onSuccess: onClose
            })
        }
    })
    const handleLoadHistory = async () => {
        const list = await dataProvider().getOne<IAfterPayrollReleaseResponse[]>({
            resource: ACCOUNT_REPORT_URL,
            id: ACCOUNT_PAYROLL_AFTER_RELEASE_ID,
            meta: {
                customQuery: {
                    type: payrollRelease.type,
                    ledger_id: payrollRelease.ledger?.id,
                    month: payrollRelease.month,
                    employee_id
                }
            }
        })
        setPreviousReleaseHistory(list.data)
    }
    useEffect(() => {
        if ((payrollRelease.ledger && (payrollRelease.amount || payrollRelease.auto_amount === YesNoEnum.Yes) && payrollRelease.type && payrollRelease.month && payrollRelease.date)) {
            handleLoadHistory()
        }
    }, [payrollRelease])
    return (
        <Box>
            <PayrollReleaseForm enableAuto={false} payrollRelease={payrollRelease} setPayrollRelease={setPayrollRelease} t={t} />
            {previousReleaseHistory.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <List>
                        {previousReleaseHistory.map((d, i) => (
                            <ListItem>
                                <a href={getQueryParam(ACCOUNT_VOUCHER_SHOW, { id: d.voucher_no }, true)} target="_blank">
                                    <Box gap={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box><DateLabel date={d.transaction_date} /></Box>
                                        <Box>{d.narration}</Box>
                                        <Box>{d.amount} ({d.dr_cr})</Box>
                                    </Box>
                                </a>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            <Divider sx={{ my: 2 }} />
            <Button onClick={confirmRelease} disabled={!(payrollRelease.ledger && (payrollRelease.amount || payrollRelease.auto_amount === YesNoEnum.Yes) && payrollRelease.type && payrollRelease.month && payrollRelease.date)} variant="contained">
                {t("actions.release")}
            </Button>
            {confirmEle}
        </Box>
    )
};
