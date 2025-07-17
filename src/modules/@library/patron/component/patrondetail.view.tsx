import {
    Box,
    Typography,
    Grid2 as Grid,
    Card,
    CardHeader,
    Avatar,
    Stack,
    Divider,
} from '@mui/material';
import { DateLabel } from '@components/label/date.label';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_LIBRARY } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { CsLabel } from '@components/label';
import { ILibPatron } from '../../interface';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn } from '@mui/icons-material';
import { PatronDetail } from './patrindetail';

type PatronDetailProps = {
    patron?: ILibPatron
}
export function PatronDetailView({ patron }: PatronDetailProps) {
    const t = useTranslate(LANG_LIBRARY, "patron");
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12} >
                    <PatronDetail patron={patron} />
                </Grid>
                <Grid size={12} >
                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.contactInfo')}</Typography>
                        <ContactCard
                            icon={<EmailIcon color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.email')}
                            value={patron?.email ?? <NotSetLabel />} />
                        <Divider sx={{ m: 1 }} />
                        <ContactCard
                            icon={<PhoneIcon color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.contact')}
                            value={patron?.contact ?? <NotSetLabel />} />
                        <Divider sx={{ m: 1 }} />
                        <ContactCard
                            icon={<LocationOn color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.address')}
                            value={patron?.patron_no ?? <NotSetLabel />} />
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <CardHeader
                            title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.cardInfo')}</Typography>}
                            sx={{ p: 0 }}
                        />
                        <Avatar variant="square" src={patron?.image?.url} sx={{ width: 200, height: 300 }} />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

const ContactCard = ({ icon, label, value }: any) => {
    return <Stack direction={'row'} alignItems={'center'} gap={2}>
        {icon}
        <Stack direction={'column'}>
            <Typography variant='subtitle2'>{label}</Typography>
            <Typography variant='body2' color="textSecondary">{value ?? <NotSetLabel />}</Typography>
        </Stack>
    </Stack>
}