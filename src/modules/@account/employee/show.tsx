import { Grid2 as Grid, Box } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { useParams } from "react-router-dom";
import { EMPLOYEE_STAFF_URL } from "@employee/constant";
import { IStaff } from "@employee/interface";
import { EmployeeDetails } from "./components/employee.detail";
import { TabList } from "./components/tab.list";
import NoDataLabel from "@components/other/no.data";
import { useRefineOne } from "@hooks/useOne";


export const PayrollEmployeeView = () => {
    const t = useTranslate(LANG_ACCOUNT, "employee");
    const { id: employee_id } = useParams()
    const { data, isLoading } = useRefineOne<IStaff>({
        id: employee_id,
        resource: EMPLOYEE_STAFF_URL,
        meta: {
            customQuery: {
                image: true,
                post: true,
                department: true,
                ledger: true,
            }
        },
    })
    const employee = data?.data
    return <Box>
        <Grid container spacing={2}>
            <Grid size={9}>
                {!Boolean(employee?.ledger_id) ? <NoDataLabel height={200} message={t('info.ledgerNotSet')} /> : <TabList employee_id={employee_id} t={t} />}
            </Grid>
            <Grid size={3}>
                <EmployeeDetails employee={employee} />
            </Grid>
        </Grid>
    </Box>
}