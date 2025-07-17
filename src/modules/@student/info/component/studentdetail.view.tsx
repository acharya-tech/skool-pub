import { useState } from 'react';
import {
    Box,
    Typography,
    Grid2 as Grid,
    Card,
    Avatar,
    Stack,
    Divider,
    Paper,
    CardHeader,
    IconButton
} from '@mui/material';
import { STUDENT_INFO_URL, StudentLogStateEnum } from '../../constant';
import { DateLabel } from '@components/label/date.label';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn } from '@mui/icons-material';
import { StudentStateChip } from '@components/other/student.chip';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from '@components/modal/basic.modal';
import { EditStudentInfoForm } from '../edit/info';
import { EditStudentClassForm } from '../edit/student.class';
import { CsLabel } from '@components/label';
import { IStudentInfo } from '../../interface';
import { useRefineShow } from '@hooks/useShow';
import { LabelData } from '@components/other/label.data';
type StudentDetailProps = {
    id?: string
}
function StudentDetails({ id }: StudentDetailProps) {
    const t = useTranslate(LANG_STUDENT, "info");
    const [isEditingInfo, setEditingInfo] = useState(false)
    const [isEditingClass, setEditingClass] = useState(false)
    const { query: { data, isLoading }, } = useRefineShow<IStudentInfo>({
        meta: { customQuery: { image: true, class: true, section: true, house: true, hostel: true, batch: true } },
        resource: STUDENT_INFO_URL,
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
                        action={
                            <IconButton
                                size='small'
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => setEditingClass(true)}
                            >
                                <EditOutlinedIcon fontSize='small' />
                            </IconButton>
                        }
                    />
                    <Grid container gap={1}>
                        <Grid size={12}><LabelData label={t('fields.batch')} value={record?.batch?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.class')} value={record?.class?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.section')} value={record?.section?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.roll_no')} value={record?.roll_no} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.symbol')} value={record?.symbol} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.house')} value={record?.house?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.hostel')} value={record?.hostel?.name} isLoading={isLoading} /></Grid>
                    </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                    <CardHeader
                        title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.personalInfo')}</Typography>}
                        sx={{ p: 0 }}
                        action={
                            <IconButton
                                size='small'
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => setEditingInfo(true)}
                            >
                                <EditOutlinedIcon fontSize='small' />
                            </IconButton>
                        }
                    />

                    <Grid container gap={1}>
                        <Grid size={12}><LabelData label={t('fields.gender')} value={record?.gender} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.dob')} value={<DateLabel date={record?.dob_en} />} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.blood_group')} value={record?.blood_group} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.disability')} value={record?.disability} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.nationality')} value={record?.nationality} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.caste')} value={record?.caste} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.religion')} value={record?.religion} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.ethnic')} value={record?.ethnic} isLoading={isLoading} /></Grid>
                    </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.contactInfo')}</Typography>
                    <ContactCard
                        icon={<EmailIcon color="disabled" sx={{ mr: 1 }} />}
                        label={t('labels.email')}
                        value={record?.email ?? <NotSetLabel />} />
                    <Divider sx={{ m: 1 }} />
                    <ContactCard
                        icon={<PhoneIcon color="disabled" sx={{ mr: 1 }} />}
                        label={t('labels.phone')}
                        value={record?.phone ?? <NotSetLabel />} />
                    <Divider sx={{ m: 1 }} />
                    <ContactCard
                        icon={<LocationOn color="disabled" sx={{ mr: 1 }} />}
                        label={t('labels.address')}
                        value={record?.address1 ?? <NotSetLabel />} />
                </Card>
            </Box>
            <BasicModal
                size="lg"
                onClose={() => { setEditingInfo(false) }}
                open={isEditingInfo}
                title={t('titles.personalInfo')}
            >
                <EditStudentInfoForm action='edit' id={id} onClose={() => setEditingInfo(false)} />
            </BasicModal>
            <BasicModal
                size="lg"
                onClose={() => { setEditingClass(false) }}
                open={isEditingClass}
                title={t('titles.basicInfo')}
            >
                <EditStudentClassForm action='edit' id={id} onClose={() => setEditingClass(false)} />
            </BasicModal>
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

export default StudentDetails;
