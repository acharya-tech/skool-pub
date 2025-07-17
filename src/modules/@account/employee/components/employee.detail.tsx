import {
    Typography,
    Grid2 as Grid,
    Card,
    Avatar,
    Stack,
    Paper,
    Divider,
    Box,
    CardHeader,
    Button,
} from '@mui/material';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_EMPLOYEE } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { CsLabel } from '@components/label';
import { IStaff } from '@employee/interface';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn } from '@mui/icons-material';
import { FiEdit } from "react-icons/fi";
import LoadingWrapper from '@components/other/loading';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import { EmployeeLedgerForm } from './payroll.ledger.form';
type EmployeeDetailProps = {
    employee?: IStaff
}
export function EmployeeDetails({ employee }: EmployeeDetailProps) {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const [openLedger, setOpenLedger] = useState(false)
    return (
        <Box>
            <LoadingWrapper value={employee}>
                <Box>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <Stack direction={"row"} gap={2}>
                            <Paper elevation={1}>
                                <Avatar variant="square" src={employee?.image?.url} sx={{ width: 100, height: 100 }} />
                            </Paper>
                            <Stack gap={0.5}>
                                <Typography variant="subtitle2">{employee?.name}</Typography>
                                <Typography variant="subtitle2" color={'Highlight'}>{employee?.emp_code}</Typography>
                                <Typography variant="subtitle2">{employee?.ledger?.code ?? <NotSetLabel />}</Typography>
                                <Button onClick={() => setOpenLedger(true)} size='small' variant='outlined' startIcon={<FiEdit size={16} />}>{t("actions.setLedger")}</Button>
                            </Stack>
                        </Stack>
                    </Card>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <CardHeader
                            title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.personalInfo')}</Typography>}
                            sx={{ p: 0 }}
                        />
                        <Grid container gap={1}>
                            <Grid size={4}><Typography variant='subtitle2'>{t('fields.post')}</Typography></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.post?.name}</Typography></Grid>
                            <Grid size={4}><Typography variant='subtitle2'>{t('fields.department')}</Typography></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.department?.name}</Typography></Grid>
                            <Grid size={4}><CsLabel text={t('fields.type')} /></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.emp_type ?? <NotSetLabel />}</Typography></Grid>
                            <Grid size={4}><CsLabel text={t('fields.contract_type')} /></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.contract_type}</Typography></Grid>
                            <Grid size={4}><CsLabel text={t('fields.gender')} /></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.gender ?? <NotSetLabel />}</Typography></Grid>
                            <Grid size={4}><Typography variant='subtitle2'>{t('fields.work_shift')}</Typography></Grid>
                            <Grid size={6}><Typography variant='body2' color="textSecondary">{employee?.work_shift ?? <NotSetLabel />}</Typography></Grid>
                            <Grid size={4}><Typography variant='subtitle2'>{t('fields.salary')}</Typography></Grid>
                            <Grid size={6}>
                                {employee?.salaryMeta ? (<>
                                    <Typography variant='body2' color="textSecondary">+{employee?.salaryMeta.plus_amount ?? 0}{' | '}-{employee?.salaryMeta.minus_amount ?? 0}</Typography>
                                </>) : <NotSetLabel />}
                            </Grid>
                        </Grid>
                    </Card>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>{t('titles.contactInfo')}</Typography>
                        <ContactCard
                            icon={<EmailIcon color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.email')}
                            value={employee?.email ?? <NotSetLabel />} />
                        <Divider sx={{ m: 1 }} />
                        <ContactCard
                            icon={<PhoneIcon color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.phone')}
                            value={employee?.phone ?? <NotSetLabel />} />
                        <Divider sx={{ m: 1 }} />
                        <ContactCard
                            icon={<LocationOn color="disabled" sx={{ mr: 1 }} />}
                            label={t('fields.address')}
                            value={employee?.address1 ?? <NotSetLabel />} />
                    </Card>
                </Box>
                <BasicModal
                    onClose={() => setOpenLedger(false)}
                    open={openLedger}
                    title={t("actions.setLedger") + ' : ' + employee?.name}
                >
                    <EmployeeLedgerForm action='edit' employee={employee!} onClose={() => setOpenLedger(false)} />
                </BasicModal>
            </LoadingWrapper>

        </Box>
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
