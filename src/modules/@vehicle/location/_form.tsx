import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_VEHICLE } from "@common/constant";
import { useLocationForm } from "../hooks/useLocationForm";
import { LocationMap } from "./map/location-map";

export const LocationForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_VEHICLE, "location");
  const {
    latLng,
    location,
    control,
    formState: { errors },
    saveButtonProps,
    handleSubmit,
    refineCore: { onFinish },
    handleMapOnDragEnd
  } = useLocationForm({
    id: props.id,
    action: props.action,
    onMutationSuccess: props.onClose,
  });




  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={9}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSInput
              fullWidth
              name="duration"
              label={t("fields.duration")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <Box height={300}>
              <LocationMap
                lat={latLng.lat}
                lng={latLng.lng}
                location={location}
                onDragEnd={handleMapOnDragEnd}
              />
            </Box>
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
};
