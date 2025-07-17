import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_EMPLOYEE } from "@common/constant";
import { IPost } from "../interface";
import { EMPLOYEE_POST_URL } from "@employee/constant";
import { useRefineForm } from "@hooks/useForm";

export const PostForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EMPLOYEE, "post");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IPost, HttpError, Nullable<IPost>>({
    refineCoreProps: {
      resource:EMPLOYEE_POST_URL,
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
              name="level"
              label={t("fields.level")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSInput
              fullWidth
              multiline={3}
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
    </Box>
  );
};
