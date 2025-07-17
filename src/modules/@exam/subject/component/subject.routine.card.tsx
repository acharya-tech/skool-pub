import { Box, Table, TableBody, TableCell, Grid2 as Grid, TableRow } from "@mui/material"
import { IExmSubject } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_EXAM } from "@common/constant"
import { DateLabel, DateTimeLabel, TimeLabel } from "@components/label/date.label"
import { TextLabel } from "@components/other/text.label"
import { CsLabel } from "@components/label"
import { SubjectMarkStatus } from "../../component/common"
import { ActiveStatusChip } from "@components/label/status.label"
import { LabelData } from "@components/other/label.data"

type SubjectRoutineCardProps = {
    subject?: IExmSubject
    isLoading: boolean
}

export const SubjectRoutineCard = ({ subject, isLoading }: SubjectRoutineCardProps) => {
    const t = useTranslate(LANG_EXAM, "esubjects");

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.routine")} value={subject?.routine?.code} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.batch")} value={subject?.routine?.batch?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.class")} value={subject?.routine?.class?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.term")} value={subject?.routine?.type?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.subject_name")} value={subject?.subject_name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.subject_th_credit")} value={subject?.th_credit} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.subject_pr_credit")} value={subject?.in_credit} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.type")} value={subject?.type} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.start_date")} value={<DateTimeLabel date={subject?.start_date} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.duration")} value={<TimeLabel format="HH:mm" date={subject?.duration} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.fm")} value={((subject?.th_fm || 0) + (subject?.in_fm || 0))} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.pm")} value={((subject?.th_pm || 0) + (subject?.in_pm || 0))} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.course_type")} value={subject?.course_type} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.post_status")} value={<SubjectMarkStatus status={subject?.post_status} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.post_date")} value={<DateTimeLabel date={subject?.post_date} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.status")} value={<ActiveStatusChip status={subject?.status} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.total_student")} value={subject?.total_student} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.mark_student")} value={subject?.mark_student} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.progress")} value={`${subject?.progress}%`} isLoading={isLoading} /></Grid>
            </Grid>
        </Box>
    )
}