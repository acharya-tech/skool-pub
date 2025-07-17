import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSHiddenInput, CSInput, CSLabel } from "@components/input";
import { LANG_DATAVALUE } from "@common/constant";
import { IDataValue, IDataValueCreateFormProps } from "./interface";
import { DATAVALUE_URL } from "./constant/server.url";
import { useRefineForm } from "@hooks/useForm";


export const DataValueCloneForm = (props: IDataValueCreateFormProps) => {
  const t = useTranslate(LANG_DATAVALUE, "datavalue");
  const { name, data_type, id } = props.clone || {}
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IDataValue, HttpError, Nullable<IDataValue>>({
    refineCoreProps: {
      resource: DATAVALUE_URL,
      redirect: false,
      action: 'create',
      onMutationSuccess: props.onClose,
    },
    defaultValues: { name }
  });

  const title = t("actions.clone");
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
            <CSHiddenInput
              name="clone_id"
              control={control}
              defaultValue={id}
            />
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSLabel
              fullWidth
              label={t("fields.data_type")}
              defaultValue={data_type}
              required
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
