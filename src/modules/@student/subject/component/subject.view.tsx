import { Box, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_EXAM, LANG_STUDENT } from "@common/constant"
import { DateLabel, DateTimeLabel } from "@components/label/date.label"
import { TextLabel } from "@components/other/text.label"
import { CsLabel } from "@components/label"
import { IClassSubject } from "@academic/interface"
import { LabelData } from "@components/other/label.data"

type ClassSubjectViewProps = {
    classSubject?: IClassSubject
    isLoading: boolean
}

export const ClassSubjectView = ({ classSubject, isLoading }: ClassSubjectViewProps) => {
    const t = useTranslate(LANG_STUDENT, "subject");
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.class")} value={classSubject?.class?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.subject")} value={classSubject?.subject?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.subject_code")} value={classSubject?.subject.code} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.sno")} value={classSubject?.sno} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.courseType")} value={classSubject?.course_type} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 2, md: 2, sm: 4, xs: 6 }}>
                    <LabelData label={t("fields.totalStudent")} value={classSubject?.total_student} isLoading={isLoading} />
                </Grid>
            </Grid>
        </Box>
    )
}