import {
    Box,
    Typography,
    Grid2 as Grid,
    Card,
    Avatar,
    Stack,
    Paper,
    CardHeader,
} from '@mui/material';
import { DateLabel } from '@components/label/date.label';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';

import { StudentStateChip } from '@components/other/student.chip';
import { CsLabel } from '@components/label';
import { IStudentInfo } from '@student/interface';
import { STUDENT_CURRENT_URL, StudentLogStateEnum } from '@student/constant';
import { useRefineShow } from '@hooks/useShow';
type StudentDetailProps = {
    id?: string
}
function StudentDetails({ id }: StudentDetailProps) {
    const t = useTranslate(LANG_STUDENT, "info");
    const { query: { data, isLoading }, } = useRefineShow<IStudentInfo>({
        meta: { customQuery: { simg: true, cls: true, sec: true, hus: true, hst: true, bt: true } },
        resource: STUDENT_CURRENT_URL,
        id
    });
    const record = data?.data;

    return (
        <>
            <Box>
                <Card sx={{ p: 2, mb: 2 }}>
                    <Stack direction={"row"} gap={2}>
                        <Paper elevation={1}>
                            <Avatar variant="square" src={record?.image?.url} sx={{ width: 100, height: 100 }} />
                        </Paper>
                        <Stack gap={0.5}>
                            <Typography variant="subtitle2">{record?.full_name}</Typography>
                            <Typography variant="subtitle2" color={'Highlight'}>{record?.regid}</Typography>
                            {record?.uni_reg && (
                                <Typography variant="subtitle2">{record?.uni_reg}</Typography>
                            )}
                            <StudentStateChip state={record?.state as unknown as StudentLogStateEnum} />
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                    <CardHeader
                        title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.basicInfo')}</Typography>}
                        sx={{ p: 0 }}
                    />
                    <Grid container gap={1}>
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
                        <Grid size={4}><CsLabel text={t('labels.house')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.house?.name ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.hostel')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.hostel?.name ?? <NotSetLabel />}</Typography></Grid>
                    </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                    <CardHeader
                        title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.personalInfo')}</Typography>}
                        sx={{ p: 0 }}
                    />
                    <Grid container gap={1}>
                        <Grid size={4}><CsLabel text={t('labels.gender')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.gender ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.dob')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary"><DateLabel date={record?.dob_en} /></Typography></Grid>
                        <Grid size={4}><CsLabel text={t('labels.blood_group')} /></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.blood_group ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><Typography variant='subtitle2'>{t('labels.disability')}</Typography></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.disability ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><Typography variant='subtitle2'>{t('labels.nationality')}</Typography></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.nationality ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><Typography variant='subtitle2'>{t('labels.caste')}</Typography></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.caste ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><Typography variant='subtitle2'>{t('labels.religion')}</Typography></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.religion ?? <NotSetLabel />}</Typography></Grid>
                        <Grid size={4}><Typography variant='subtitle2'>{t('labels.ethnic')}</Typography></Grid>
                        <Grid size={6}><Typography variant='body2' color="textSecondary">{record?.ethnic ?? <NotSetLabel />}</Typography></Grid>
                    </Grid>
                </Card>

            </Box>
        </>
    );
}



export default StudentDetails;
