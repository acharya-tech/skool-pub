import {
  HttpError,
} from "@refinedev/core";
import { IAcademicHouse } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSInput, CSSelect } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { StatusEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";


export const EsubjectForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "esubject");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IAcademicHouse, HttpError, Nullable<IAcademicHouse>>({
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
            <CSSelect
              fullWidth
              name="status"
              label={t("fields.status")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(StatusEnum).map((e: StatusEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
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
