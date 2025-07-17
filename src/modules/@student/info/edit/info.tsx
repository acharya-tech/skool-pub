import {
    HttpError,
    useInvalidate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";

import { IStudentInfo } from "../../interface";
import { STUDENT_CURRENT_URL } from "../../constant";
import { StudentGridEdit } from "../component/_student.edit";
import { CSHiddenInput } from "@components/input";
import { useRefineForm } from "@hooks/useForm";

export const EditStudentInfoForm = ({ id: studentId, onClose }: ATFormProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const invalidate = useInvalidate()
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm<IStudentInfo, HttpError, Nullable<IStudentInfo>>({
        refineCoreProps: {
            meta: { customQuery: { image: true } },
            redirect: false,
            resource: STUDENT_CURRENT_URL,
            id: studentId,
            action: 'edit',
            onMutationSuccess: () => {
                invalidate({
                    resource: STUDENT_CURRENT_URL,
                    id: studentId,
                    invalidates: ['detail'],
                });
                onClose()
            }
        },
    })
    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <CSHiddenInput name="id" control={control} defaultValue={studentId} />
                    <StudentGridEdit control={control} errors={errors} />
                    <Grid size={12}>
                        <Divider />
                    </Grid>
                    <Grid size={12}>
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
                </Grid>
            </form>
        </Box>
    );
};
