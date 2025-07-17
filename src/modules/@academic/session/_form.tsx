import {
  HttpError,
} from "@refinedev/core";
import { ISession } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSInput, CSMultiSelect } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { WeekDaysEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";
import { ACADEMIC_SESSION_URL } from "@academic/constant/server.url";


export const SessionForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "session");


  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<ISession, HttpError, Nullable<ISession>>({
    defaultValues: {
      name: "",
      week: []
    },
    refineCoreProps: {
      resource: ACADEMIC_SESSION_URL,
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
            <CSMultiSelect
              fullWidth
              name="week"
              label={t("fields.week")}
              required
              control={control}
              errors={errors}
            >
              {Object.keys(WeekDaysEnum).map(e => {
                return <MenuItem value={e}>{e}</MenuItem>
              })}
            </CSMultiSelect>
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
