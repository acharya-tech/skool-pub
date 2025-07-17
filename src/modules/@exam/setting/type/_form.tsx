import {
  HttpError,
} from "@refinedev/core";
import { IAcademicHouse } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSHiddenInput, CSInput, CSNumber, CSSelect } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmTypeEnum } from "../../constant/enum";
import { IExmType } from "../../interface";
import { useRefineForm } from "@hooks/useForm";


export const TypeForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "type");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IExmType, HttpError, Nullable<IExmType>>({
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
          <Grid size={4}>
            {props.action === "edit" && <CSHiddenInput name="id" control={control} />}
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
              fullWidth
              name="code"
              label={t("fields.code")}
              required
              rules={{
                validate: (value: string) => {
                  if (value.length < 3 || value.length > 10) {
                    return t('validation.codeLength')
                  }
                }
              }}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmTypeEnum).map((e: ExmTypeEnum) => {
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
