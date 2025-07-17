import { ILocation, IRouteLocation } from "../../interface";
import { ATFormProps, Nullable } from "src/interfaces";
import { HttpError } from "@refinedev/core";
import { LANG_VEHICLE } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSInput } from "@components/input";
import { VEHICLE_LOCATION_LIST } from "../../constant/local.urls";
import { useAutocomplete } from "@refinedev/mui";
import { VEHICLE_ROUTE_LOCATION_URL } from "../../constant";
import { useRefineForm } from "@hooks/useForm";

type AddEditLocationProps = ATFormProps & {
    routeid: string
}
export const AddEditLocation = (props: AddEditLocationProps) => {
    const t = useTranslate(LANG_VEHICLE, "routeLocation");

    const { autocompleteProps: locationAutoProps } = useAutocomplete<ILocation>({
        resource: VEHICLE_LOCATION_LIST,
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
        saveButtonProps,
    } = useRefineForm<IRouteLocation, HttpError, Nullable<IRouteLocation>>({
        refineCoreProps: {
            meta: { customQuery: { location: true } },
            resource: VEHICLE_ROUTE_LOCATION_URL,
            redirect: false,
            id: props.id,
            action: props.action,
            onMutationSuccess: props.onClose,
        }
    });

    const title = props.action === "create" ? t("actions.add") : t("actions.edit");
    return (
        <Box>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ my: 2 }} />
            <form
                onSubmit={handleSubmit((data) => {
                    onFinish(data);
                })}
            >
                <CSHiddenInput name="route_id" control={control} defaultValue={props.routeid} />
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <CSAutoComplete
                            fullWidth
                            required
                            getOptionLabel={(r: any) => r.name}
                            autocompleteProps={locationAutoProps}
                            name="location"
                            label={t("fields.location")}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={6}>
                        <CSInput
                            fullWidth
                            type="number"
                            name="price"
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
                            gap={5}
                            mt={2}
                            justifyContent="flex-end"
                        >
                            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
                            <Button {...saveButtonProps} variant="contained">
                                {t("@buttons.save")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}