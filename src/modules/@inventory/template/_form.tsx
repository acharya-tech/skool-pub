import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreTemplate } from "../interface";
import { INVENTORY_TEMPLATE_URL } from "../constant";
import { useRefineForm } from "@hooks/useForm";

export const TemplateForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "template");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IStoreTemplate, HttpError, Nullable<IStoreTemplate>>({
    refineCoreProps: {
      resource: INVENTORY_TEMPLATE_URL,
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  //TODO : check all submit , create, edit, delete button disabled when clicked

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
              fullWidth
              multiline={3}
              name="template"
              label={t("fields.template")}
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
