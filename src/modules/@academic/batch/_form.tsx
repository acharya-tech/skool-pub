import {
  HttpError,
} from "@refinedev/core";
import { IBatch } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSCheckboxYesNo, CSDatePicker, CSInput } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";
import { YesNoEnum } from "@common/all.enum";

export const BatchForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "batch");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IBatch, HttpError, Nullable<IBatch>>({
    defaultValues: {
      isCurrent: YesNoEnum.No
    },
    refineCoreProps: {
      redirect: false,
      id: props.id,
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
          <Grid size={8}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSCheckboxYesNo
              fullWidth
              name="isCurrent"
              label={t("fields.isCurrent")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSDatePicker
              fullWidth
              name="start_date"
              label={t("fields.start_date")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSDatePicker
              fullWidth
              name="end_date"
              label={t("fields.end_date")}
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
