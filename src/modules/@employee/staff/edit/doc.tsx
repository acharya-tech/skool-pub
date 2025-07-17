import { useFieldArray } from "react-hook-form";
import {
    useInvalidate,
    useList,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { LANG_EMPLOYEE } from "@common/constant";
import { useEffect } from "react";
import { CSHiddenInput } from "@components/input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { DocGridInput } from "../../components/_doc";
import { ATFormProps } from "src/interfaces";
import { EMPLOYEE_DOC_CREATE_MANY_URL, EMPLOYEE_DOC_URL } from "../../constant";
import { useRefineForm } from "@hooks/useForm";

export const EditDocForm = ({ id: staffId, onClose, setActionProps }: ATFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff_doc");

    const { data } = useList({
        meta: { customQuery: { image: true, staff_id: staffId } },
        resource: EMPLOYEE_DOC_URL
    })

    const invalidate = useInvalidate()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isLoading },
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
            onMutationSuccess: () => {
                invalidate({
                    resource: EMPLOYEE_DOC_URL,
                    invalidates: ['list'],
                });
                onClose()
            }
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
                                    remark: "",
                                    image: undefined,
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
                                disabled={busyButton}
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