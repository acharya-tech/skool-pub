import { ICreateExmRoutine, IExmSubject, IExmType } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSDateTimePicker, CSLabel, CSNumber, CSSelect, CSTime } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import LoadingButton from "@mui/lab/LoadingButton";
import { EXAM_SUBJECT_URL } from "../constant/service.urls";
import { SubjectTypeEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const SubjectEditForm = (props: ATFormProps) => {
    const t = useTranslate(LANG_EXAM, "esubjects");
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        refineCore: { onFinish, query },
        saveButtonProps,
    } = useRefineForm<IExmSubject>({
        refineCoreProps: {
            meta: {
                customQuery: {
                    subject: true,
                    routine: true
                }
            },
            resource: EXAM_SUBJECT_URL,
            id: props.id,
            action: props.action,
            redirect: false,
            onMutationSuccess: props.onClose
        }
    });
    const esubject = query?.data?.data;
    const subject = query?.data?.data?.subject;
    const subjectType = watch('type')
    return (
        <Box>
            <Typography variant="h6">{t("titles.edit")}</Typography>
            <Divider sx={{ my: 2 }} />
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <Grid size={4} alignContent={'end'}>
                        <CSLabel
                            fullWidth
                            label={t("fields.subject_name")}
                            defaultValue={subject?.name}
                        />
                    </Grid>
                    <Grid size={4} alignContent={'end'}>
                        <CSLabel
                            fullWidth
                            label={t("fields.subject_code")}
                            defaultValue={subject?.code}
                        />
                    </Grid>
                    <Grid size={4} alignContent={'end'}>
                        <CSSelect
                            fullWidth
                            name={`type`}
                            label={t("fields.type")}
                            required
                            control={control}
                            errors={errors}
                        >
                            {(subject?.type === SubjectTypeEnum.IN_TH || subject?.type === SubjectTypeEnum.TH) && (
                                <MenuItem value={SubjectTypeEnum.TH}>{SubjectTypeEnum.TH}</MenuItem>
                            )}
                            {(subject?.type === SubjectTypeEnum.IN_TH || subject?.type === SubjectTypeEnum.IN) && (
                                <MenuItem value={SubjectTypeEnum.IN}>{SubjectTypeEnum.IN}</MenuItem>
                            )}
                            {subject?.type === SubjectTypeEnum.IN_TH && (
                                <MenuItem value={SubjectTypeEnum.IN_TH}>{SubjectTypeEnum.IN_TH}</MenuItem>
                            )}
                        </CSSelect>
                    </Grid>
                    {(subjectType === SubjectTypeEnum.IN_TH || subjectType === SubjectTypeEnum.TH) && (
                        <>
                            <Grid size={(subjectType === SubjectTypeEnum.IN_TH ? 3 : 6)}>
                                <CSNumber
                                    fullWidth
                                    required
                                    type="number"
                                    name="th_fm"
                                    min={1}
                                    defaultValue={esubject?.th_fm}
                                    label={t("fields.th_fm")}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid size={(subjectType === SubjectTypeEnum.IN_TH ? 3 : 6)}>
                                <CSNumber
                                    fullWidth
                                    required
                                    type="number"
                                    min={1}
                                    name="th_pm"
                                    defaultValue={esubject?.th_pm}
                                    rules={{
                                        validate: (value: number, field: IExmSubject) => {
                                            return (value > parseFloat((field?.th_fm ?? 0).toString())) ? t('validation.maxtpm') : undefined
                                        }
                                    }}
                                    label={t("fields.th_pm")}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                        </>)}
                    {(subjectType === SubjectTypeEnum.IN_TH || subjectType === SubjectTypeEnum.IN) && (
                        <>
                            <Grid size={(subjectType === SubjectTypeEnum.IN_TH ? 3 : 6)}>
                                <CSNumber
                                    fullWidth
                                    required
                                    type="number"
                                    name="in_fm"
                                    min={1}
                                    label={t("fields.in_fm")}
                                    defaultValue={esubject?.in_fm}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid size={(subjectType === SubjectTypeEnum.IN_TH ? 3 : 6)}>
                                <CSNumber
                                    fullWidth
                                    required
                                    type="number"
                                    name="in_pm"
                                    min={1}
                                    defaultValue={esubject?.in_pm}
                                    rules={{
                                        validate: (value: number, field: IExmSubject) => {
                                            return (value > parseFloat((field?.in_pm ?? 0).toString())) ? t('validation.maxppm') : undefined
                                        }
                                    }}
                                    label={t("fields.in_pm")}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                        </>)}
                    <Grid size={4} alignContent={'end'}>
                        <CSDateTimePicker
                            fullWidth
                            name="start_date"
                            label={t("fields.start_date")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4} alignContent={'end'}>
                        <CSTime
                            fullWidth
                            format="HH:mm"
                            ampm={false}
                            name="duration"
                            label={t("fields.duration")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid size={12}>
                        <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
                            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                            <LoadingButton {...saveButtonProps} loading={isSubmitting} variant="contained">
                                {t("@buttons.save")}
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
