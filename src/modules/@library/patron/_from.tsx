import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSDatePicker, CSInput } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { ILibPatron } from "../interface";
import { useRefineForm } from "@hooks/useForm";

export const PatronForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "patron");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<ILibPatron, HttpError, Nullable<ILibPatron>>({
    refineCoreProps: {
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
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="patron_no"
              label={t("fields.patron_no")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSDatePicker
              fullWidth
              name="valid_till"
              label={t("fields.valid_till")}
              required
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid size={6}>
            <CSDatePicker
              fullWidth
              name="valid_till"
              label={t("fields.valid_till")}
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
