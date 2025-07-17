import {
  HttpError,
} from "@refinedev/core";
import { IClass, ISession } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";
import { ACADEMIC_CLASS_URL, ACADEMIC_SESSION_URL } from "@academic/constant/server.url";
import { useAutocomplete } from "@refinedev/mui";


export const ClassSessionForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "class");


  const { autocompleteProps: sessionAutoProps } = useAutocomplete<ISession>({
    resource: ACADEMIC_SESSION_URL,
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
  } = useRefineForm<IClass, HttpError, Nullable<IClass>>({
    defaultValues: {
      sessions: []
    },
    refineCoreProps: {
      resource: ACADEMIC_CLASS_URL,
      meta: {
        customQuery: {
          sessions: true
        }
      },
      redirect: false,
      id: props.id,
      action: "edit",
      onMutationSuccess: props.onClose,
    }
  });

  return (
    <Box>
      <Typography variant="h6">{t("actions.edit")}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              multiple
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={sessionAutoProps}
              name="sessions"
              label={t("fields.sessions")}
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
