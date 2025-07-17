import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { IDataValue, IDataValueFormProps } from "../interface";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_DATAVALUE } from "@common/constant";
import { CSInput } from "@components/input";

export const StringForm = (props: IDataValueFormProps) => {
  const t = useTranslate(LANG_DATAVALUE, "datavalue");
  const { handleSubmit, onFinish, saveButtonProps, control, formState: { errors } } = props
  return (
    <Box>
      <form
        onSubmit={handleSubmit((data: Partial<IDataValue>) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="data_value"
              label={t("fields.data_value")}
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
    </Box >
  );
};
