import { useFieldArray } from "react-hook-form";
import {
    useInvalidate,
    useList,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";
import { useEffect, useRef } from "react";
import { CSHiddenInput } from "@components/input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { STUDENT_DOC_CREATE_MANY_URL, STUDENT_DOC_URL } from "../../constant";
import { DocGridInput } from "../../components/_doc";
import { ATFormProps } from "src/interfaces";
import { useRefineForm } from "@hooks/useForm";

export const EditDocForm = ({ id: studentId, onClose, setActionProps }: ATFormProps) => {
    const t = useTranslate(LANG_STUDENT, "student_doc");

    const { data } = useList({
        meta: { customQuery: { image: true, student_id: studentId } },
        resource: STUDENT_DOC_URL
    })

    const invalidate = useInvalidate()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm({
        defaultValues: {
            student_id: studentId,
            docs: [] as any
        },
        refineCoreProps: {
            redirect: false,
            resource: STUDENT_DOC_CREATE_MANY_URL,
            action: "create",
            onMutationSuccess: () => {
                invalidate({
                    resource: STUDENT_DOC_URL,
                    invalidates: ['list'],
                });
                onClose()
            }
        }
    });

    useEffect(() => {
        if (data && data.data) {
            reset({ student_id: studentId, docs: [] })
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
                                        <CSHiddenInput name={`docs.${index}.student_id`} defaultValue={studentId} control={control} />
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
                    <Grid size={12}>
                        <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
                            <Button
                                onClick={onClose}
                                color="info"
                                variant="contained"
                            >{t("@actions.cancel")}</Button>
                            <Button
                                disabled={busyButton}
                                color="success"
                                variant="contained"
                                type="submit"
                                onClick={buttonOnClick}
                            >{t("@actions.save")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};