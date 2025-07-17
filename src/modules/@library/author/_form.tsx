import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSDatePicker, CSInput } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { LIBRARY_AUTHOR_URL } from "@library/constant";
import { useRefineForm } from "@hooks/useForm";

export const AuthorForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "author");


  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IInfo, HttpError, Nullable<IInfo>>({
    refineCoreProps: {
      resource: LIBRARY_AUTHOR_URL,
      // meta: { customQuery: { bus: true } },
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
            <CSInput
              fullWidth
              name="country"
              label={t("fields.country")}
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
            <CSDatePicker
              fullWidth
              name="dob"
              label={t("fields.dob")}
              placeholder={t("fields.dob")}
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
