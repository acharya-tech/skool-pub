import {
    HttpError,
    useInvalidate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { LANG_EMPLOYEE } from "@common/constant";
import { CSAutoComplete, CSHiddenInput } from "@components/input";
import { IEmpGroup, IStaff } from "../../interface";
import { EMPLOYEE_GROUP_URL, EMPLOYEE_STAFF_URL } from "../../constant";
import { useAutocomplete } from "@refinedev/mui";
import { useRefineForm } from "@hooks/useForm";

export const EditGroupForm = ({ id: staffId, onClose }: ATFormProps) => {
    const t = useTranslate(LANG_EMPLOYEE, "staff");
    const invalidate = useInvalidate()
    const { autocompleteProps: groupAutoProps } = useAutocomplete<IEmpGroup>({
        resource: EMPLOYEE_GROUP_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps: { disabled: busyButton, onClick: buttonOnClick },
    } = useRefineForm<IStaff, HttpError, Nullable<IStaff>>({
        refineCoreProps: {
            meta: { customQuery: { groups: true } },
            redirect: false,
            resource: EMPLOYEE_STAFF_URL,
            id: staffId,
            action: 'edit',
            onMutationSuccess: () => {
                invalidate({
                    resource: EMPLOYEE_STAFF_URL,
                    id: staffId,
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
                    <CSHiddenInput name="id" control={control} defaultValue={staffId} />
                    <Grid size={12}>
                        <CSAutoComplete
                            fullWidth
                            getOptionLabel={(r: any) => r.name}
                            autocompleteProps={groupAutoProps}
                            control={control}
                            name="groups"
                            label={t("fields.groups")}
                            multiple
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Divider />
                    </Grid>
                    <Grid size={12}>
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
                </Grid>
            </form>
        </Box>
    );
};
