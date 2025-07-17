import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput, CSTime } from "@components/input";
import { LANG_VEHICLE } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IStaff } from "@employee/interface";
import { VEHICLE_INFO_LIST } from "../constant/local.urls";
import { useRefineForm } from "@hooks/useForm";

export const RouteForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_VEHICLE, "route");

  const { autocompleteProps: busAutoProps } = useAutocomplete<IStaff>({
    resource: VEHICLE_INFO_LIST,
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
  } = useRefineForm<IInfo, HttpError, Nullable<IInfo>>({
    refineCoreProps: {
      meta: { customQuery: { bus: true } },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
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
          <Grid size={6}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              rules={[
                {
                  required: true
                }
              ]}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={busAutoProps}
              name="bus"
              label={t("fields.bus")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSTime
              fullWidth
              name="depart_time"
              label={t("fields.depart_time")}
              placeholder={t("fields.depart_time")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSTime
              fullWidth
              name="arrival_time"
              label={t("fields.arrival_time")}
              placeholder={t("fields.arrival_time")}
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
};
