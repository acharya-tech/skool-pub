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
import { EmployeeRelationEnum } from "../../constant/enums";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { StaffRelationGridInput } from "../../components/_staff_relation";
import { EMPLOYEE_RELATION_CREATE_MANY_URL, EMPLOYEE_RELATION_URL } from "../../constant";
import { useRefineForm } from "@hooks/useForm";

export const StepThreeForm = ({ onBack, onClose, staffId, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff_relation");
    const isNext = useRef(false)

    const { data } = useList({
        meta: { customQuery: { relatedStaff: true, staff_id: staffId } },
        resource: EMPLOYEE_RELATION_URL
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
            relatedStaff: [] as any
        },
        refineCoreProps: {
            redirect: false,
            resource: EMPLOYEE_RELATION_CREATE_MANY_URL,
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
            reset({ staff_id: staffId, relatedStaff: [] })
            data.data.forEach(e => {
                append({
                    id: e.id,
                    relatedStaff: e.relatedStaff,
                    relation: e.relation
                })
            })
        }
    }, [data])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "relatedStaffs"
    });
    useEffect(() => {
        return () => {
            isNext.current = false
            reset({ staff_id: staffId, relatedStaff: [] })
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
                                        <CSHiddenInput name={`relatedStaffs.${index}.staff_id`} defaultValue={staffId} control={control} />
                                        <StaffRelationGridInput key={field.id} field={field} index={index} name="relatedStaffs" control={control} errors={errors} />
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
                                    relation: EmployeeRelationEnum.Father
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