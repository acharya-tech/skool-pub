import { useFieldArray } from "react-hook-form";
import {
    useInvalidate,
    useList,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";

import { useEffect } from "react";
import { CSHiddenInput } from "@components/input";
import { ParentRelationEnum } from "../../constant/enums";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { YesNoEnum } from "@common/all.enum";
import { SiblingGridInput } from "../../components/_sibling";
import { STUDENT_SIBLING_CREATE_MANY_URL, STUDENT_SIBLING_URL } from "../../constant";
import { ATFormProps } from "src/interfaces";
import { useRefineForm } from "@hooks/useForm";

export const EditSiblingForm = ({ id: studentId, onClose }: ATFormProps) => {
    const t = useTranslate(LANG_STUDENT, "sibling");
    const { data } = useList({
        meta: { customQuery: { sibling: true, student_id: studentId } },
        resource: STUDENT_SIBLING_URL

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
            siblings: [] as any
        },
        refineCoreProps: {
            redirect: false,
            resource: STUDENT_SIBLING_CREATE_MANY_URL,
            action: "create",
            onMutationSuccess: () => {
                invalidate({
                    resource: STUDENT_SIBLING_URL,
                    invalidates: ['list'],
                });
                onClose()
            }
        }
    });
    useEffect(() => {
        if (data && data.data) {
            reset({ student_id: studentId, siblings: [] })
            data.data.forEach(e => {
                append({
                    id: e.id,
                    sibling: e.sibling,
                    relation: e.relation
                })
            })
        }
    }, [data])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "siblings"
    });
    useEffect(() => {
        return () => {
            reset({ student_id: studentId, siblings: [] })
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
                                        <CSHiddenInput name={`siblings.${index}.student_id`} defaultValue={studentId} control={control} />
                                        <SiblingGridInput key={field.id} field={field} index={index} name="siblings" control={control} errors={errors} />
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
                                    name: "",
                                    phone: "",
                                    relation: ParentRelationEnum.Father,
                                    isGuardian: YesNoEnum.No
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