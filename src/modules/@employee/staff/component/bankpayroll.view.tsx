import React, { useState } from 'react';
import {
    Typography,
    Grid2 as Grid,
    Card,
    CardHeader,
    IconButton
} from '@mui/material';
import { NotSetLabel } from '@components/label/notset.label';
import { LANG_EMPLOYEE } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from '@components/modal/basic.modal';
import { CsLabel } from '@components/label';
import { IStaff } from '../../interface';
import { EditStaffBankPayrollForm } from '../edit/bankpayroll';
import { EMPLOYEE_STAFF_URL } from '../../constant';
import { useRefineShow } from '@hooks/useShow';
import { LabelData } from '@components/other/label.data';
type BankPayrollProps = {
    id?: string
}
function BankPayroll({ id }: BankPayrollProps) {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const [isEditingInfo, setEditingInfo] = useState(false)
    const { query: { data, isLoading }, } = useRefineShow<IStaff>({
        meta: { customQuery: { image: true, department: true, post: true } },
        resource: EMPLOYEE_STAFF_URL,
        id,
        queryOptions: {
            enabled: Boolean(id)
        }
    });
    const staff = data?.data;
    return (
        <>
            <Card sx={{ p: 2, mb: 2 }}>
                <CardHeader
                    title={<Typography variant="h6" sx={{ mb: 1 }}>{t('titles.payrollBank')}</Typography>}
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
                    <Grid size={12}><LabelData label={t('fields.ssf_no')} value={staff?.ssf_no} isLoading={isLoading} /></Grid>
                    <Grid size={12}><LabelData label={t('fields.pf_no')} value={staff?.pf_no} isLoading={isLoading} /></Grid>
                    <Grid size={12}><LabelData label={t('fields.pan_no')} value={staff?.pan_no} isLoading={isLoading} /></Grid>
                    <Grid size={12}><LabelData label={t('fields.bank_name')} value={staff?.bank_detail?.bank_name} isLoading={isLoading} /></Grid>
                    <Grid size={12}><LabelData label={t('fields.account_name')} value={staff?.bank_detail?.account_name} isLoading={isLoading} /></Grid>
                    <Grid size={12}><LabelData label={t('fields.account_no')} value={staff?.bank_detail?.account_no} isLoading={isLoading} /></Grid>
                </Grid>
            </Card>
            <BasicModal
                size="lg"
                onClose={() => { setEditingInfo(false) }}
                open={isEditingInfo}
                title={t('titles.payrollBank')}
            >
                <EditStaffBankPayrollForm action='edit' id={staff?.id} onClose={() => setEditingInfo(false)} />
            </BasicModal>
        </>
    );
}


export default BankPayroll;
