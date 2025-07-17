import { Box } from "@mui/material";
import { CONFIG } from 'src/global-config';
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACADEMIC } from "@common/constant";
import { useOne } from "@refinedev/core";
import { IAcademicDashboardStatus } from "@academic/interface";
import { ACADEMIC_DASHBOARD_URL } from "@academic/constant/server.url";
import { ACADEMIC_DASHBOARD_STATUS_ID } from "@academic/constant/constants";
import { WidgetSummary } from "./widget-summary";

export const WidgetList = () => {
  const t = useTranslate(LANG_ACADEMIC, "dashboard")
  const { data: statusData } = useOne<IAcademicDashboardStatus>({
    resource: ACADEMIC_DASHBOARD_URL,
    id: ACADEMIC_DASHBOARD_STATUS_ID
  })
  return <Box
    sx={{
      gap: 3,
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
    }}
  >
    <WidgetSummary
      title={t("labels.totalSubject")}
      total={statusData?.data.subjects ?? 0}
      icon={`${CONFIG.assetsDir}/assets/icons/apps/stack-of-books.png`}
    />

    <WidgetSummary
      title={t("labels.totalTeachers")}
      total={statusData?.data.teachers ?? 0}
      color="success"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-manager.png`}
    />

    <WidgetSummary
      title={t("labels.assignedTeachers")}
      total={statusData?.data.assignedTeachers ?? 0}
      color="info"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/teacher-assigned.png`}
    />
    <WidgetSummary
      title={t("labels.activeBatch")}
      total={statusData?.data.activeBatch ?? 0}
      color="secondary"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/activeBatch.png`}
    />
  </Box>
};