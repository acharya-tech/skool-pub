import { Card, CardHeader, Grid2 as Grid, Typography } from "@mui/material"
import { LANG_LIBRARY } from "@common/constant"
import { CsLabel } from "@components/label"
import { DateLabel } from "@components/label/date.label"
import { NotSetLabel } from "@components/label/notset.label"
import { useTranslate } from "@hooks/useTranslate"
import { ILibPatron } from "../../interface"
type PatronDetailProps = {
    patron?: ILibPatron
}
export const PatronDetail = ({ patron }: PatronDetailProps) => {
    const t = useTranslate(LANG_LIBRARY, "patron");
    return (
        <Card sx={{ p: 2, mb: 2 }}>
            <CardHeader
                title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.patronInfo')}</Typography>}
                sx={{ p: 0 }}
            />
            <Grid container gap={1}>
                <Grid size={4}><CsLabel text={t('fields.patron_no')} /></Grid>
                <Grid size={6}><Typography variant='body2' color="textSecondary">{patron?.patron_no}</Typography></Grid>
                <Grid size={4}><CsLabel text={t('fields.patron_type')} /></Grid>
                <Grid size={6}><Typography variant='body2' color="textSecondary">{patron?.patronType?.patron_type}</Typography></Grid>
                <Grid size={4}><CsLabel text={t('fields.checkout_count')} /></Grid>
                <Grid size={6}><Typography variant='body2' color="textSecondary">{`${patron?.checkout_count} / ${patron?.patronType?.number_of_books}`}</Typography></Grid>
                <Grid size={4}><CsLabel text={t('fields.fine_booked')} /></Grid>
                <Grid size={6}><Typography variant='body2' color="textSecondary">{patron?.fine_booked}</Typography></Grid>
                <Grid size={4}><CsLabel text={t('fields.valid_from')} /></Grid>
                <Grid size={6}><DateLabel color="textSecondary" date={patron?.valid_from} /></Grid>
                <Grid size={4}><CsLabel text={t('fields.valid_till')} /></Grid>
                <Grid size={6}><DateLabel color="textSecondary" date={patron?.valid_till} /></Grid>
                <Grid size={4}><CsLabel text={t('fields.added_by')} /></Grid>
                <Grid size={6}><Typography variant='body2' color="textSecondary">{patron?.user?.name ?? <NotSetLabel />}</Typography></Grid>
                <Grid size={4}><CsLabel text={t('fields.added_on')} /></Grid>
                <Grid size={6}><DateLabel color="textSecondary" date={patron?.created_at} /></Grid>
            </Grid>
        </Card>
    )
}