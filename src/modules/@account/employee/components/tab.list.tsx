import { Box, Paper, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import LoadingWrapper from "@components/other/loading"
import { EmployeePayrollPost } from "./payroll.post"
import { EmployeePayrollSetupList } from "./payroll.setup.list"
import { PayrolAnnualDeductionList } from "./payroll.deduction.list"

type TabListProps = {
    employee_id?: string
    t: any
}
export const TabList = ({ t, employee_id }: TabListProps) => {
    const [ledgerTabIndex, setLedgerTabIndex] = useState<number>(0);
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
                    <Tab value={0} title={t("titles.salaryPost")} label={t("titles.salaryPost")} />
                    <Tab value={1} title={t("titles.salarySetup")} label={t("titles.salarySetup")} />
                    <Tab value={2} title={t("titles.annualDeduction")} label={t("titles.annualDeduction")} />
                    <Tab value={3} title={t("titles.taxInfo")} label={t("titles.taxInfo")} />
                </Tabs>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1, p: 2 }} bgcolor={"#fff"}>
                        <LoadingWrapper value={employee_id}>
                            {ledgerTabIndex === 0 && (
                                <EmployeePayrollPost employee_id={employee_id!} />
                            )}
                            {ledgerTabIndex === 1 && (
                                <EmployeePayrollSetupList employee_id={employee_id!} />
                            )}
                            {ledgerTabIndex === 2 && (
                                <PayrolAnnualDeductionList employee_id={employee_id!} />
                            )}
                        </LoadingWrapper>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}