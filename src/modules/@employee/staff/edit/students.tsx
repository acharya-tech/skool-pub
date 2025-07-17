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
import { EMPLOYEE_STUDENT_CREATE_MANY_URL, EMPLOYEE_STUDENT_URL, EmployeeToStudentEnum } from "../../constant";
import { ATFormProps } from "src/interfaces";
import { StaffStudentGridInput } from "../../components/_staff_student";
import { useRefineForm } from "@hooks/useForm";

export const EditStudentForm = ({ id: staffId, onClose }: ATFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "student");
    const { data } = useList({
        meta: { customQuery: { student: true, staff_id: staffId } },
        resource: EMPLOYEE_STUDENT_URL
    })
    const invalidate = useInvalidate()
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
            students: [] as any
        },
        refineCoreProps: {
            redirect: false,
            resource: EMPLOYEE_STUDENT_CREATE_MANY_URL,
            action: "create",
            onMutationSuccess: () => {
                invalidate({
                    resource: EMPLOYEE_STUDENT_URL,
                    invalidates: ['list'],
                });
                onClose()
            }
        }
    });
    useEffect(() => {
        if (data && data.data) {
            reset({ staff_id: staffId, students: [] })
            data.data.forEach(e => {
                append({
                    id: e.id,
                    student: e.student,
                    relation: e.relation
                })
            })
        }
    }, [data])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "students"
    });
    useEffect(() => {
        return () => {
            reset({ staff_id: staffId, students: [] })
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
                                        <CSHiddenInput name={`students.${index}.staff_id`} defaultValue={staffId} control={control} />
                                        <StaffStudentGridInput key={field.id} field={field} index={index} name="students" control={control} errors={errors} />
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
                                    relation: EmployeeToStudentEnum.Other
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