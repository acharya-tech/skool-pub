import { Box, Button, Checkbox, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_NOTICE } from '@common/constant';
import { DateTimeLabel } from '@components/label/date.label';
import { useEffect, useState } from 'react';
import { useInvalidate, useOne, useUpdate } from '@refinedev/core';
import { INoticeSms } from '../../interface';
import { LabelData } from '@components/other/label.data';
import { NoticeState } from '../../component/common';
import { NOTICE_SMS_GROUP_RESEND_URL, NOTICE_SMS_GROUP_URL } from '../../constant/server.urls';
import { SmsStateEnum } from '../../constant/enum';
import { useConfirm } from '@hooks/confirm.hook';
type PropertiesDialogProps = {
    onClose: () => void;
    sms: INoticeSms;
}
export const PropertiesDialog = ({ sms, onClose }: PropertiesDialogProps) => {
    const t = useTranslate(LANG_NOTICE, "sms")
    const [resendList, setResendList] = useState<SmsStateEnum[]>([])
    const [smsData, setSmsData] = useState<INoticeSms>(sms)
    const { data, isLoading, refetch } = useOne<INoticeSms>({
        resource: NOTICE_SMS_GROUP_URL,
        id: sms.id
    })
    const { mutate } = useUpdate<INoticeSms>({
        resource: NOTICE_SMS_GROUP_RESEND_URL,
    })

    const invalidate = useInvalidate();

    const [confirmResend, ConfirmResendEle] = useConfirm({
        onConfirm: () => {
            mutate({
                id: sms.id,
                values: {
                    resend: resendList
                }
            },
                {
                    onSuccess: () => {
                        invalidate({ resource: NOTICE_SMS_GROUP_URL, invalidates: ["all"] })
                    }
                })
        },
        confirmTitle: t("info.resend")
    })

    const toggleResend = (state: SmsStateEnum) => {
        if (resendList.includes(state)) {
            setResendList(resendList.filter(item => item !== state))
        } else {
            setResendList([...resendList, state])
        }
    }

    useEffect(() => {
        if (data?.data?.id) {
            setSmsData(data.data)
        }
        return () => setSmsData({} as INoticeSms)
    }, [data, sms])

    return (
        <Paper
            elevation={2}
            sx={{ padding: "1rem", ml: 2, height: '100%', transition: "width 1s ease", width: 500, position: "fixed", right: 0, top: 0 }}
        >
            <IconButton
                onClick={onClose}
                size='small'
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: 'white',
                    boxShadow: 2,
                }}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
            <Box mt={2} sx={{ overflowY: 'auto', height: '100%' }}>
                <Typography variant="h6">{sms.title}</Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                    {smsData.schedule && <LabelData label={t('fields.schedule')} value={<DateTimeLabel date={smsData.schedule} />} />}
                    <LabelData label={t('fields.audiance')} value={smsData.total_audiance} />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                    <Typography variant="h6">{t('fields.state')}</Typography>
                    <Stack alignContent={'stretch'} justifyContent={'center'}>
                        {Object.keys(SmsStateEnum).map((key) => {
                            return <Stack key={key} direction="row" gap={1} alignItems={'center'}>
                                <Checkbox checked={resendList.includes(key as SmsStateEnum)} onClick={() => toggleResend(key as SmsStateEnum)} />
                                <NoticeState state={key as SmsStateEnum} />
                                <Typography variant="subtitle2">({smsData?.countByState?.[key as SmsStateEnum] ?? 0})</Typography>
                            </Stack>
                        })}
                    </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1} direction={'row'} mb={5}>
                    <Button variant='outlined' color='success' disabled={resendList.length == 0} onClick={confirmResend} >{t("actions.resend")}</Button>
                    <Button variant='outlined' color='info' onClick={() => refetch()}>{t("actions.reload")}</Button>
                    <Button variant='outlined' color='warning' onClick={onClose}>{t("@buttons.close")}</Button>
                </Stack>
            </Box>
            {ConfirmResendEle}
        </Paper>
    );
};

