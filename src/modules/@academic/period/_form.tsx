import {
  HttpError,
  type BaseKey,
} from "@refinedev/core";
import { IPeriod } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSDateTimePicker, CSInput, CSTime } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";

export const PeriodForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "period");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IPeriod, HttpError, Nullable<IPeriod>>({
    refineCoreProps: {
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });
  const start_time = watch("start_time")

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
            <CSInput
              type="number"
              fullWidth
              name="sort"
              label={t("fields.sort")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSTime
              fullWidth
              name="start_time"
              label={t("fields.start_time")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSTime
              fullWidth
              disabled={!start_time}
              name="end_time"
              label={t("fields.end_time")}
              rules={{
                validate: (value: string) => {
                  if (new Date(value) < new Date(start_time!)) {
                    return t("validation.greaterThan")
                  }
                  return undefined
                },
              }}
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
