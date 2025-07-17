import { Box, Paper, Tab, Tabs, Typography } from "@mui/material"
import { useList } from "@refinedev/core"
import { ACCOUNT_YEAR_URL } from "@account/constant/server.urls"
import { IAccountYear } from "@account/interface"
import { useEffect, useState } from "react"
import { FeeLedgerTable } from "./fee.ledger.table"
import { FeeReportTable } from "./fee.report.table"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_BILLING } from "@common/constant"

type FeeLedgerProps = {
    student_id?: string
}
export const FeeLedger = ({  student_id }: FeeLedgerProps) => {
      const t = useTranslate(LANG_BILLING, "feeReceive");
    const { data } = useList<IAccountYear>({
        resource: ACCOUNT_YEAR_URL,
    })
    const [yearTabIndex, setYearTabIndex] = useState<string | undefined>();
    const [ledgerTabIndex, setLedgerTabIndex] = useState<number>(0);
    useEffect(() => {
        if (data?.data) {
            setYearTabIndex(data?.data[0]?.id)
        }
    }, [data])
    const years = data?.data
    return (
        <Box component={Paper} elevation={2} mt={2} p={2} bgcolor={"#ddd"}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Tabs
                    variant="scrollable"
                    value={ledgerTabIndex}
                    onChange={(e, newVal) => setLedgerTabIndex(newVal)}
                    sx={{
                        minWidth: "50px",
                        "& .MuiTab-root": {
                            minWidth: "50px",
                            padding: "10px",
                            justifyContent: "center",
                        },
                        "& .MuiTabs-indicator": {
                            width: "3px",
                        },
                    }}
                >
                    <Tab value={0} title={t("titles.feeLedger")} label={t("titles.feeLedger")} />
                    <Tab value={1} title={t("titles.feeReport")} label={t("titles.feeReport")} />
                </Tabs>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1, p: 2 }} bgcolor={"#fff"}>
                        {ledgerTabIndex === 0 && (
                            <FeeLedgerTable student_id={student_id} year_id={yearTabIndex} />
                        )}
                        {ledgerTabIndex === 1 && (
                            <FeeReportTable student_id={student_id} year_id={yearTabIndex} />
                        )}
                    </Box>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={yearTabIndex}
                        onChange={(e, newVal) => setYearTabIndex(newVal)}
                        sx={{
                            minWidth: "50px",
                            "& .MuiTab-root": {
                                minWidth: "50px",
                                padding: "10px",
                                justifyContent: "center",
                            },
                            "& .MuiTabs-indicator": {
                                width: "3px",
                            },
                        }}
                    >
                        {years?.map((item: IAccountYear) => (
                            <Tab value={item?.id} title={item?.name} key={item?.id} label={item?.name} />
                        ))}
                    </Tabs>
                </Box>
            </Box>
        </Box>
    )


}