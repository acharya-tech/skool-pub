import {
  HttpError,
} from "@refinedev/core";
import { IProgram } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_ACADEMIC, LANG_COMMON } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";

export const ProgramForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "program");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IProgram, HttpError, Nullable<IProgram>>({
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
              name="faculty"
              required
              label={t("fields.faculty")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="affiliation"
              label={t("fields.affiliation")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              required
              name="type"
              label={t("fields.type")}
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
              <Button onClick={props.onClose}>{t("@buttons.cancel", { ns: LANG_COMMON })}</Button>
              <Button {...saveButtonProps} variant="contained">
                {t("@buttons.save", { ns: LANG_COMMON })}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
