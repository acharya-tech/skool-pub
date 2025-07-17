import {
    Typography,
    Grid2 as Grid,
    Card,
    Avatar,
    Stack,
    Paper,
    Divider,
} from '@mui/material';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { StudentStateChip } from '@components/other/student.chip';
import { CsLabel } from '@components/label';
import { StudentLogStateEnum } from '@student/constant';
import { IStudentInfo } from '@student/interface';
type StudentDetailProps = {
    record?: IStudentInfo
}
function StudentDetails({ record }: StudentDetailProps) {
    const t = useTranslate(LANG_STUDENT, "info");


    return (
        <>
            <Card sx={{ p: 2, mb: 2 }}>
                <Stack gap={2} alignItems={"center"}>
                    <Avatar variant="square" src={record?.image?.url} sx={{ width: 100, height: 100 }} />
                    <Typography variant="subtitle2">{record?.full_name} | {record?.regid}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Grid container gap={1}>
                    <Grid size={4}><CsLabel text={t('fields.state')} /></Grid>
                    <Grid size={6}><StudentStateChip state={record?.state as unknown as StudentLogStateEnum} /></Grid>
                    <Grid size={4}><CsLabel text={t('labels.batch')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.batch?.name}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.class')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.class?.name}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.section')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.section?.name ?? <NotSetLabel />}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.roll_no')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.roll_no ?? <NotSetLabel />}</Typography></Grid>
                    <Grid size={4}><CsLabel text={t('labels.symbol')} /></Grid>
                    <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.symbol ?? <NotSetLabel />}</Typography></Grid>
                </Grid>
            </Card>
        </>
    );
}

export default StudentDetails;
