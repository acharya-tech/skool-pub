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
import { DateLabel } from '@components/label/date.label';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_EMPLOYEE } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from '@components/modal/basic.modal';
import { EMPLOYEE_STAFF_URL } from '../../constant';
import { IStaff } from '../../interface';
import { EditStaffInfoForm } from '../edit/staffinfo';
import { useRefineShow } from '@hooks/useShow';
import { LabelData } from '@components/other/label.data';
import { ActiveStatusChip } from '@components/label/status.label';
import { StatusSlide } from '@components/other';
type StudentDetailProps = {
    id?: string
}
function StaffDetails({ id }: StudentDetailProps) {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const [isEditingInfo, setEditingInfo] = useState(false)
    const { query: { data, isLoading }, } = useRefineShow<IStaff>({
        meta: { customQuery: { image: true, department: true, post: true } },
        resource: EMPLOYEE_STAFF_URL,
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
                            <Typography variant="subtitle2">{record?.name}</Typography>
                            <Typography variant="subtitle2" color={'Highlight'}>{record?.emp_code}</Typography>
                            <ActiveStatusChip status={record?.status} />
                            <StatusSlide resource={EMPLOYEE_STAFF_URL} record={record!} />
                        </Stack>
                    </Stack>
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
                        <Grid size={12}><LabelData label={t('fields.post')} value={record?.post?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.department')} value={record?.department?.name} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.emp_type')} value={record?.emp_type} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.contract_type')} value={record?.contract_type} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.gender')} value={record?.gender} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.date_of_birth')} value={<DateLabel date={record?.date_of_birth} />} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.date_of_join')} value={<DateLabel date={record?.date_of_join} />} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.blood_group')} value={record?.blood_group} isLoading={isLoading} /></Grid>
                        <Grid size={12}><LabelData label={t('fields.work_shift')} value={record?.work_shift} isLoading={isLoading} /></Grid>
                    </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.contactInfo')}</Typography>
                    <ContactCard
                        icon={<EmailIcon color="disabled" sx={{ mr: 1 }} />}
                        label={t('fields.email')}
                        value={record?.email ?? <NotSetLabel />} />
                    <Divider sx={{ m: 1 }} />
                    <ContactCard
                        icon={<PhoneIcon color="disabled" sx={{ mr: 1 }} />}
                        label={t('fields.phone')}
                        value={record?.phone ?? <NotSetLabel />} />
                    <Divider sx={{ m: 1 }} />
                    <ContactCard
                        icon={<LocationOn color="disabled" sx={{ mr: 1 }} />}
                        label={t('fields.address')}
                        value={record?.address1 ?? <NotSetLabel />} />
                </Card>
            </Box>
            <BasicModal
                size="lg"
                onClose={() => { setEditingInfo(false) }}
                open={isEditingInfo}
                title={t('titles.personalInfo')}
            >
                <EditStaffInfoForm action='edit' id={id} onClose={() => setEditingInfo(false)} />
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

export default StaffDetails;
