import {
    HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { LANG_EMPLOYEE } from "@common/constant";
import { IStaff } from "../../interface";
import { useRef } from "react";
import { StepFormProps } from "../../interface/types";
import { EMPLOYEE_STAFF_URL } from "../../constant";
import { StaffBankGridInput } from "../../components/_staff_bank";
import { CSHiddenInput } from "@components/input";
import { useRefineForm } from "@hooks/useForm";

export const StepFourForm = ({ onClose, staffId, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const isNext = useRef(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish, query },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm<IStaff, HttpError, Nullable<IStaff>>({
        refineCoreProps: {
            meta: { customQuery: { image: true } },
            redirect: false,
            resource: EMPLOYEE_STAFF_URL,
            id: staffId,
            action: "edit",
            onMutationSuccess(data, variables, context, isAutoSave) {
                if (isNext.current) {
                    onNext?.()
                } else {
                    onClose?.()
                }
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
                    <CSHiddenInput name={`id`} defaultValue={staffId} control={control} />
                    <StaffBankGridInput control={control} errors={errors} />
                    <Grid size={12}>
                        <Divider />
                    </Grid>
                    <Grid size={2}>
                        <Button
                            disabled={busyButton}
                            onClick={onClose}
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
                                onClick={(e) => {
                                    isNext.current = true
                                    buttonOnClick(e)
                                }}>{t("@actions.stepNext")}</Button>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={onNext}>{t("@actions.skip")}</Button>
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
