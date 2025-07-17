import { useFieldArray } from "react-hook-form";
import {
    useList,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack } from "@mui/material";
import { LANG_EMPLOYEE } from "@common/constant";
import { useEffect, useRef } from "react";
import { StepFormProps } from "../../interface/types";
import { CSHiddenInput } from "@components/input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { EMPLOYEE_DOC_CREATE_MANY_URL, EMPLOYEE_DOC_URL } from "../../constant";
import { DocGridInput } from "../../components/_doc";
import { useRefineForm } from "@hooks/useForm";

export const StepFiveForm = ({ onBack, onClose, staffId, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff_doc");
    const isNext = useRef(false)

    const { data } = useList({
        meta: { customQuery: { image: true, staff_id: staffId } },
        resource: EMPLOYEE_DOC_URL
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        refineCore: { onFinish, query },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm({
        defaultValues: {
            staff_id: staffId,
            docs: [] as any
        },
        refineCoreProps: {
            redirect: false,
            resource: EMPLOYEE_DOC_CREATE_MANY_URL,
            action: "create",
            onMutationSuccess(data, variables, context, isAutoSave) {
                if (isNext.current) {
                    onNext?.()
                } else {
                    onClose?.()
                }
            },
        }
    });
    useEffect(() => {
        if (data && data.data) {
            reset({ staff_id: staffId, docs: [] })
            data.data.forEach(e => {
                append({
                    ...e
                })
            })
        }
    }, [data])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "docs"
    });
    console.log(errors, 'errors')
    useEffect(() => {
        return () => {
            isNext.current = false
            reset({ staff_id: staffId, docs: [] })
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
                                        <CSHiddenInput name={`docs.${index}.staff_id`} defaultValue={staffId} control={control} />
                                        <DocGridInput key={field.id} field={field} index={index} name="docs" control={control} errors={errors} />
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
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={(e) => {
                                    isNext.current = true
                                    buttonOnClick(e)
                                }}
                            >{t("@actions.stepNext")}</Button>
                            <Button
                                color="success"
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