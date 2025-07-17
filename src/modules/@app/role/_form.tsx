import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_APP } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";
import { IRoles } from "../interface";
import { APP_ROLE_URL } from "@app/constant";

export const RoleForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_APP, "roles");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IRoles, HttpError, Nullable<IRoles>>({
    refineCoreProps: {
      resource: APP_ROLE_URL,
      meta: { customQuery: { image: true, staffs: true } },
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
        <CSHiddenInput name="id" control={control} defaultValue={props.id} />
        <Grid container spacing={2}>
          <Grid size={12}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSInput
              multiline={3}
              fullWidth
              name="description"
              label={t("fields.description")}
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
    </Box >
  );
};
