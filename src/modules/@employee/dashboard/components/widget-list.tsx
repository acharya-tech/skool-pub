import { Box } from "@mui/material";
import { EmployeeWidgetSummary } from "./employee-widget-summary";
import { CONFIG } from 'src/global-config';
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EMPLOYEE } from "@common/constant";
import { useOne } from "@refinedev/core";
import { IEmployeeDashboardStatus } from "@employee/interface";
import { EMPLOYEE_DASHBOARD_URL } from "@employee/constant";
import { EMPLOYEE_DASHBOARD_STATUS_ID } from "@employee/constant/constant";

export const WidgetList = () => {
  const t = useTranslate(LANG_EMPLOYEE, "dashboard")
  const { data: statusData } = useOne<IEmployeeDashboardStatus>({
    resource: EMPLOYEE_DASHBOARD_URL,
    id: EMPLOYEE_DASHBOARD_STATUS_ID
  })
  return <Box
    sx={{
      gap: 3,
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
    }}
  >
    <EmployeeWidgetSummary
      title={t("labels.totalStaff")}
      total={statusData?.data.staffs ?? 0}
      icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-manager.png`}
    />

    <EmployeeWidgetSummary
      title={t("labels.totalGroup")}
      total={statusData?.data.groups ?? 0}
      color="success"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/networking.png`}
    />

    <EmployeeWidgetSummary
      title={t("labels.totalPost")}
      total={statusData?.data.posts ?? 0}
      color="info"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-rank.png`}
    />
    <EmployeeWidgetSummary
      title={t("labels.totalDepartment")}
      total={statusData?.data.departments ?? 0}
      color="secondary"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/hierarchy.png`}
    />
  </Box>
};