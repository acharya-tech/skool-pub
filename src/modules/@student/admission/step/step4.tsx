import { useFieldArray } from "react-hook-form";
import {
    useOne,
    useUpdate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";

import { useEffect, useRef } from "react";
import { StepFormProps } from "../../interface/types";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { STUDENT_ADMISSION_FORM_URL } from "../../constant";
import { AcademicGridInput } from "../../components/_academic";
import { IStudentAcademic } from "@student/interface";
import { IBillEntranceFormData } from "@billing/interface";
import { useRefineForm } from "@hooks/useForm";

export const StepFourForm = ({ onBack, onClose, admissionId, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_STUDENT, "student_academic");
    const isNext = useRef(false)

    const { data: query } = useOne<IBillEntranceFormData>({
        id: admissionId,
        resource: STUDENT_ADMISSION_FORM_URL,
    })
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useRefineForm<Partial<IBillEntranceFormData>>({
        defaultValues: {
            parents: [] as Partial<IStudentAcademic>[]
        }
    });
    const { mutate, isLoading: busyButton } = useUpdate<IBillEntranceFormData>({
        resource: STUDENT_ADMISSION_FORM_URL,
        id: admissionId
    })
    const onFinish = (data: Partial<IBillEntranceFormData>) => {
        mutate({
            id: admissionId,
            values: data
        }, {
            onSuccess: () => {
                if (isNext.current) {
                    onNext?.()
                } else {
                    onClose?.()
                }
            }
        })
    }
    useEffect(() => {
        if (query && query.data) {
            reset({ academics: [] })
            query.data?.academics?.forEach(e => {
                append({
                    ...e
                })
            })
        }
    }, [query])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "academics"
    });
    useEffect(() => {
        return () => {
            isNext.current = false
            reset({ academics: [] })
        }
    }, [])

    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <Grid size={12}>
                        {fields.map((field: any, index) => (
                            <Grid container spacing={2} key={field.id}>
                                <Grid size={11}>
                                    <Grid container spacing={2}>
                                        <AcademicGridInput key={field.id} field={field} index={index} name="academics" control={control} errors={errors} />
                                    </Grid>
                                </Grid>
                                <Grid size={1}>
                                    <IconButton
                                        onClick={() => remove(index)}
                                        color="error"
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </Grid>
                                <Grid size={12}>
                                    <Divider sx={{ mb: 4 }} />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid size={12}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                append({
                                    type: "",
                                    institute_name: "",
                                    regid: "",
                                    remark: "",
                                    score: "",
                                    image: undefined,
                                    symbol: "",
                                    passed_year_en: "",
                                    passed_year_np: "",
                                })
                            }
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ mb: 2 }}
                        >
                            {t("actions.add")}
                        </Button>
                    </Grid>
                    <Grid size={2}>
                        <Button
                            disabled={busyButton}
                            onClick={onBack}
                            color="info"
                            variant="contained"
                        >{t("@actions.back")}</Button>
                    </Grid>
                    <Grid size={10}>
                        <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
                            <Button
                                disabled={busyButton}
                                color="success"
                                variant="contained"
                                type="submit"
                                onClick={(e) => {
                                    isNext.current = true
                                }}
                            >{t("@actions.stepNext")}</Button>
                            <Button
                                color="primary"
                                disabled={busyButton}
                                variant="contained"
                                onClick={onNext}
                            >{t("@actions.skip")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};