import {
  HttpError,
} from "@refinedev/core";
import { IHostel } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";


export const HostelForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "hostel");


  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IHostel, HttpError, Nullable<IHostel>>({
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
