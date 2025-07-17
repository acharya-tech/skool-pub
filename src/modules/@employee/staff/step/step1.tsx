import {
    HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { LANG_EMPLOYEE, } from "@common/constant";

import { StaffGridInput } from "../../components/_staff";
import { IStaff } from "../../interface";
import { useEffect, useRef } from "react";
import { StepFormProps } from "../../interface/types";
import { EMPLOYEE_STAFF_URL } from "../../constant";
import { useRefineForm } from "@hooks/useForm";

export const StepOneForm = ({ onClose, staffId, setStaff, onNext }: StepFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const isNext = useRef(true)
    useEffect(() => {
        return () => { isNext.current = true }
    }, [])

    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish, query },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm<IStaff, HttpError, Nullable<IStaff>>({
        refineCoreProps: {
            redirect: false,
            resource: EMPLOYEE_STAFF_URL,
            id: staffId,
            action: staffId ? 'edit' : 'create',
            onMutationSuccess(data) {
                setStaff?.(data.data.id)
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
                    const formattedData = {
                        ...data,
                        department_id: data.department?.id ? data.department.id : null,
                        post_id: data.post?.id ? data.post.id : null,
                    };
                    onFinish(formattedData);
                })}
            >
                <Grid container spacing={2}>
                    <StaffGridInput control={control} errors={errors} />
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
                                onClick={buttonOnClick}>{t("@actions.stepNext")}</Button>
                            {staffId && (
                                <Button
                                    color="success"
                                    variant="contained"
                                    onClick={onNext}>{t("@actions.next")}</Button>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
