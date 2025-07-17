import { Box, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useTranslate } from "@hooks/useTranslate"
import { DateTimeLabel } from "@components/label/date.label"
import { LANG_BILLING } from "@common/constant"
import { IBillFeeRelease } from "../../interface"
import { ActiveStatusChip } from "@components/label/status.label"
import { LabelData } from "@components/other/label.data"

type SmsGroupViewProps = {
    feeRelease?: IBillFeeRelease
    isLoading: boolean
}

export const ReleaseView = ({ feeRelease, isLoading }: SmsGroupViewProps) => {
    const t = useTranslate(LANG_BILLING, "feeRelease");
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.name")} value={feeRelease?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.entry")} value={feeRelease?.dr_cr} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.release_month")} value={feeRelease?.month} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.account_type")} value={feeRelease?.accountYear?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.class")} value={feeRelease?.class?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.created_by")} value={feeRelease?.createdBy?.name} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.total_amount")} value={feeRelease?.total_amount} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.avg_amount")} value={feeRelease?.avg_amount} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.total_post")} value={feeRelease?.total_post} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.release_date")} value={<DateTimeLabel date={feeRelease?.release_date} />} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.created_at")} value={<DateTimeLabel date={feeRelease?.created_at} />} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <LabelData label={t("fields.created_at")} value={<ActiveStatusChip status={feeRelease?.status} />} isLoading={isLoading} />
                </Grid>
            </Grid>
        </Box>
    )
}