import { ILocation, IRouteLocation, IVehicleStudent } from "../../interface";
import { ATFormProps } from "src/interfaces";
import { HttpError } from "@refinedev/core";
import { LANG_VEHICLE } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSInput } from "@components/input";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_INFO_URL } from "@student/constant";
import { VEHICLE_STUDENT_URL } from "../../constant";
import { useRef } from "react";
import { IStudentInfo } from "@student/interface";
import { useRefineForm } from "@hooks/useForm";

type AddStudentProps = ATFormProps & {
    routeLocation?: IRouteLocation
}


export const AddStudent = (props: AddStudentProps) => {
    const t = useTranslate(LANG_VEHICLE, "student");
    const isNext = useRef(false)
    const { autocompleteProps: studentAutoProps } = useAutocomplete<ILocation>({
        meta: { customQuery: { class: true, vehicle: true } },
        resource: STUDENT_INFO_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "full_name",
                    operator: "eq",
                    value
                },
                {
                    field: "regid",
                    operator: "eq",
                    value
                }
            ]
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        refineCore: { onFinish },
        saveButtonProps,
    } = useRefineForm<IVehicleStudent, HttpError, IVehicleStudent>({
        refineCoreProps: {
            meta: { customQuery: { student: true } },
            resource: VEHICLE_STUDENT_URL,
            redirect: false,
            id: props.id,
            action: props.action,
            onMutationSuccess(data) {
                if (!isNext.current) {
                    props.onClose?.()
                } else {
                    reset({
                        route_location_id: props.routeLocation?.id,
                        price: props.routeLocation?.price
                    })
                }
            },
        }
    });
    const title = props.action === 'create' ? t("actions.add") : t("actions.edit")
    return (
        <Box>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ my: 2 }} />
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data)
                })}
            >
                <CSHiddenInput name="id" control={control} defaultValue={props.id} />
                <CSHiddenInput name="route_location_id" control={control} defaultValue={props.routeLocation?.id} />
                <Grid container spacing={2}>
                    <Grid size={8}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(option: any) => `${option?.full_name} | ${option?.regid} | ${option.class?.name}`}
                            autocompleteProps={studentAutoProps}
                            name="student"
                            label={t("fields.student")}
                            renderLabel={(option: IStudentInfo) => {
                                if (option.vehicle) {
                                    return `${option?.full_name} | ${option?.regid} | ${option.class?.name} | ${option.vehicle?.routeLocation?.location?.name}`
                                }
                                return `${option?.full_name} | ${option?.regid} | ${option.class?.name}`
                            }}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={4}>
                        <CSInput
                            fullWidth
                            type="number"
                            name="price"
                            defaultValue={props.routeLocation?.price}
                            label={t("fields.price")}
                            required
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={12} mt={2}>
                        <Divider />
                        <Stack
                            direction={"row"}
                            gap={2}
                            mt={2}
                            justifyContent="flex-end"
                        >
                            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                            <Button {...saveButtonProps} onClick={(e) => {
                                isNext.current = false
                                saveButtonProps.onClick(e)
                            }} variant="contained" color="success">
                                {t("@buttons.add")}
                            </Button>
                            <Button {...saveButtonProps}
                                onClick={(e) => {
                                    isNext.current = true
                                    saveButtonProps.onClick(e)
                                }}
                                variant="contained">
                                {t("@buttons.addMore")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}