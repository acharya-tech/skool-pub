import { Box } from "@mui/material";
import { StudentWidgetSummary } from "./student-widget-summary";
import { CONFIG } from 'src/global-config';
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { IStudentDashboardStatus } from "@student/interface";
import { useOne } from "@refinedev/core";
import { STUDENT_DASHBOARD_URL } from "@student/constant";
import { STUDENT_DASHBOARD_STATUS_ID } from "@student/constant/constant";

export const WidgetList = () => {
  const t = useTranslate(LANG_STUDENT, "dashboard")
  const { data: statusData } = useOne<IStudentDashboardStatus>({
    resource: STUDENT_DASHBOARD_URL,
    id: STUDENT_DASHBOARD_STATUS_ID
  })
  return <Box
    sx={{
      gap: 3,
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
    }}
  >
    <StudentWidgetSummary
      title={t("labels.currentStudent")}
      total={statusData?.data.students ?? 0}
      icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-vehicle-student.png`}
    />

    <StudentWidgetSummary
      title={t("labels.pendingAdmission")}
      total={statusData?.data.pendingAdmission ?? 0}
      color="success"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/hourglass.png`}
    />

    <StudentWidgetSummary
      title={t("labels.totalParents")}
      total={statusData?.data.parents ?? 0}
      color="info"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-parents2.png`}
    />
    <StudentWidgetSummary
      title={t("labels.totalCertificates")}
      total={statusData?.data.certificates ?? 0}
      color="secondary"
      icon={`${CONFIG.assetsDir}/assets/icons/apps/certificate.png`}
    />
  </Box>
};