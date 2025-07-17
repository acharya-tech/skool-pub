import { useEffect, useState } from "react";
import { CertificateQuickView } from "./quickshow";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";
import { Box, Card, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_CERTIFICATE_LIST, STUDENT_CERTIFICATE_URL } from "@student/constant";
import { IStudentCertificate } from "@student/interface";
import { LabelData } from "@components/other/label.data";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { ActiveStatusChip } from "@components/label/status.label";
import { DateLabel } from "@components/label/date.label";
import { useRefineShow } from "@hooks/useShow";

export const CertificateView = () => {
  const t = useTranslate(LANG_STUDENT, "certificate");
  const { close } = useNav(STUDENT_CERTIFICATE_LIST);
  const [template, setTemplate] = useState<ITemplateData>()
  const {
    query: { data },
  } = useRefineShow<IStudentCertificate>({
    resource: STUDENT_CERTIFICATE_URL,
    meta: { customQuery: { student: true, type: true, createdBy: true } }
  });

  useEffect(() => {
    if (data?.data) {
      const temp = JSON.parse(data?.data?.template as string ?? "{}")
      setTemplate(temp)
    }
  }, [data])

  const certificateData = data?.data

  return <Box sx={{ display: "flex", justifyContent: "center" }}>

    <LoadingWrapper value={(certificateData && template)} >
      <Grid container spacing={2} >
        <Grid size={12}>
          <Card>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}><LabelData label={t("fields.student")} value={`${certificateData?.student?.regid} | ${certificateData?.student?.full_name}`} /></TableCell>
                    <TableCell><LabelData label={t("fields.certificate_no")} value={certificateData?.certificate_no} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><LabelData label={t("fields.type")} value={certificateData?.type?.name} /></TableCell>
                    <TableCell><LabelData label={t("fields.issue_date")} value={<DateLabel date={certificateData?.issue_date} />} /></TableCell>
                    <TableCell colSpan={2}><LabelData label={t("fields.issued_by")} value={certificateData?.createdBy?.name} /></TableCell>
                    <TableCell><LabelData label={t("fields.status")} value={<ActiveStatusChip status={certificateData?.status} />} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}><LabelData label={t("fields.remark")} value={certificateData?.remark} /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid size={12}>
          <Paper sx={{ width: template?.paperWidth, backgroundColor: "#ffffff" }} elevation={5}>
            <CertificateQuickView certificate={certificateData!} template={template} close={close} />
          </Paper>
        </Grid>
      </Grid>
    </LoadingWrapper>
  </Box>
};
