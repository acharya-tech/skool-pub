import { useTranslate } from "@hooks/useTranslate";
import { useAutocomplete } from "@refinedev/mui";
import { useEffect, useState } from "react";

import { LANG_ACCOUNT } from "@common/constant";
import { Box, Grid2 as Grid, Paper } from "@mui/material";
import { IStaff } from "@employee/interface";
import { EMPLOYEE_STAFF_URL } from "@employee/constant";
import { UCSAutoComplete } from "@components/input/uc.input";
import { EmployeeDetails } from "./components/employee.detail";
import NoDataLabel from "@components/other/no.data";
import { TabList } from "./components/tab.list";
import { useParams } from "react-router";
import { useDataProvider } from "@refinedev/core";
import { getQueryParam } from "@utils/other";
import { ACCOUNT_PAYROLL_EMPLOYEE_SHOW } from "@account/constant/urls";
import { StatusEnum } from "@common/all.enum";

export const PayrollEmployeeListTable = () => {
  const t = useTranslate(LANG_ACCOUNT, "employee");
  const { id } = useParams()
  const dataProvider = useDataProvider()
  const [staffData, setStaffData] = useState<IStaff | null>(null);
  const handleFetchStaff = async (id: string) => {
    const { data: employee } = await dataProvider().getOne<IStaff>({
      resource: EMPLOYEE_STAFF_URL,
      id,
      meta: {
        customQuery: {
          image: true,
          post: true,
          department: true,
          ledger: true
        }
      },
    })
    setStaffData(employee)
  }

  useEffect(() => {
    if (id) {
      handleFetchStaff(id)
    }
  }, [])

  useEffect(() => {
    if (staffData) {
      window.history.pushState({}, "", getQueryParam(ACCOUNT_PAYROLL_EMPLOYEE_SHOW, { id: staffData.id }, true));
    }
  }, [staffData])

  const { autocompleteProps: empAutoProps } = useAutocomplete<IStaff>({
    resource: EMPLOYEE_STAFF_URL,
    meta: {
      customQuery: {
        image: true,
        post: true,
        department: true,
        ledger: true,
        status: StatusEnum.Active
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
        {
          field: "emp_code",
          operator: "eq",
          value,
        },
      ];
    },
  });
  return (
    <Box>
      <Paper>
        <Box px={5} py={3}>
          <UCSAutoComplete
            onChange={(e: any) => {
              setStaffData(e)
            }}
            getOptionLabel={(r: IStaff) => `${r.emp_code} | ${r.name} | ${r.post?.name}`}
            renderLabel={(r: IStaff) => `${r.emp_code} | ${r.name} | ${r.post?.name}`}
            value={staffData}
            fullWidth
            autocompleteProps={empAutoProps}
            label={t("employee")}
          />
        </Box>
      </Paper>
      <Box mt={3}>
        {staffData && (
          <Grid container spacing={2}>
            <Grid size={9}>
              {!Boolean(staffData?.ledger_id) ? <NoDataLabel height={200} message={t('info.ledgerNotSet')} /> : <TabList employee_id={staffData.id} t={t} />}
            </Grid>
            <Grid size={3}>
              <EmployeeDetails employee={staffData} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  )
};
