import { Card, CardHeader, Grid2 as Grid, Typography } from "@mui/material"
import { LANG_LIBRARY } from "@common/constant"
import { DateLabel } from "@components/label/date.label"
import { useTranslate } from "@hooks/useTranslate"
import { useRefineShow } from "@hooks/useShow"
import { IStudentInfo } from "@student/interface"
import { STUDENT_INFO_URL } from "@student/constant"
import { LabelData } from "@components/other/label.data"
type PatronDetailProps = {
    id?: string
}

export const PatronDetail = ({ id }: PatronDetailProps) => {
    const { query: { data, isLoading }, } = useRefineShow<IStudentInfo>({
        meta: { customQuery: { patron: true } },
        resource: STUDENT_INFO_URL,
        id
    });
    const patron = data?.data?.patron

    const t = useTranslate(LANG_LIBRARY, "patron");


    return (
        <Card sx={{ p: 2, mb: 2 }}>
            <CardHeader
                title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.patronInfo')}</Typography>}
                sx={{ p: 0 }}
            />
            <Grid container gap={1}>
                <Grid size={12}><LabelData label={t('fields.patron_no')} value={patron?.patron_no} isLoading={isLoading || !Boolean(patron)} /></Grid>
                <Grid size={12}><LabelData label={t('fields.patron_type')} value={patron?.patronType?.patron_type} isLoading={isLoading || !Boolean(patron)} /></Grid>
                <Grid size={12}><LabelData label={t('fields.checkout_count')} value={`${patron?.checkout_count} / ${patron?.patronType?.number_of_books ?? 0}`} isLoading={isLoading || !Boolean(patron)} /></Grid>
                <Grid size={12}><LabelData label={t('fields.fine_booked')} value={patron?.fine_booked} isLoading={isLoading || !Boolean(patron)} /></Grid>
                <Grid size={12}><LabelData label={t('fields.added_on')} value={<DateLabel date={patron?.valid_till} />} isLoading={isLoading || !Boolean(patron)} /></Grid>
                <Grid size={12}><LabelData label={t('fields.valid_till')} value={<DateLabel date={patron?.created_at} />} isLoading={isLoading || !Boolean(patron)} /></Grid>
            </Grid>
        </Card>
    )
}