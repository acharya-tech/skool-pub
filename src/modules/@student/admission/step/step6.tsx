import {
    HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";
import { IAdmission } from "../../interface";
import { useEffect, useRef } from "react";
import { StepFormProps } from "../../interface/types";
import { STUDENT_ADMISSION_FORM_URL } from "../../constant";
import { StudentMoreGridInput } from "../../components/_student_more";
import { useRefineForm } from "@hooks/useForm";

export const StepSixForm = ({ onClose, admissionId, onBack }: StepFormProps) => {
    const t = useTranslate(LANG_STUDENT, "info");
    const isNext = useRef(false)
    useEffect(() => {
        return () => { isNext.current = false }
    }, [])
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm<IAdmission, HttpError, Nullable<IAdmission>>({
        refineCoreProps: {
            redirect: false,
            resource: STUDENT_ADMISSION_FORM_URL,
            id: admissionId,
            action: "edit",
            onMutationSuccess(data) {
                onClose?.()
            },
        }
    });
    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <Grid container spacing={2}>
                    <StudentMoreGridInput control={control} errors={errors} />
                    <Grid size={12}>
                        <Divider />
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
                                onClick={buttonOnClick}>{t("@actions.save")}</Button>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={onClose}>{t("@actions.close")}</Button>
                            {/* <Button
                                color="primary"
                                disabled={busyButton}
                                variant="contained"
                                onClick={(e) => {
                                    isNext.current = true 
                                    buttonOnClick(e)
                                }}
                            >{t("@actions.stepNext")}</Button> */}
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
