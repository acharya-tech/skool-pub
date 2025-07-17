import { Box, Grid2 as Grid } from "@mui/material"
import { IExmRoutine } from "../../interface"
import { useTranslate } from "@hooks/useTranslate"
import { LANG_EXAM } from "@common/constant"
import { DateTimeLabel } from "@components/label/date.label"
import { RoutineStatus } from "../../component/common"
import { LabelData } from "@components/other/label.data"
import { ActiveStatusChip } from "@components/label/status.label"

type RouteViewProps = {
    routine?: IExmRoutine
    isLoading: boolean
}

export const RoutineView = ({ routine, isLoading }: RouteViewProps) => {
    const t = useTranslate(LANG_EXAM, "routine");
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.code")} value={routine?.code} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.batch")} value={routine?.batch?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.class")} value={routine?.class?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.type")} value={routine?.type?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.rule")} value={routine?.rule?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.start_date")} value={<DateTimeLabel date={routine?.start_date} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.result_date")} value={<DateTimeLabel date={routine?.result_date} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.created_at")} value={<DateTimeLabel date={routine?.created_at} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.template")} value={routine?.template?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.grade_template")} value={routine?.gradeLedgerTemplate?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.mark_template")} value={routine?.markLedgerTemplate?.name} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.last_processed")} value={<DateTimeLabel date={routine?.last_processed} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.state")} value={<RoutineStatus status={routine?.state} />} isLoading={isLoading} /></Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}><LabelData label={t("fields.status")} value={<ActiveStatusChip status={routine?.status} />} isLoading={isLoading} /></Grid>
            </Grid>
        </Box>
    )
}