import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput, CSNumber } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { LIBRARY_PATRON_TYPE_URL } from "@library/constant";
import { useRefineForm } from "@hooks/useForm";

export const PatronTypeForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "patronType");

  const { autocompleteProps: templateAutoProps } = useAutocomplete<IDataValue>(
    {
      resource: DATAVALUE_URL,
      meta: {
        customQuery: {
          data_key: DataKeyTemplateEnum.LIBRARY_CARD
        }
      },
      onSearch: (value: string) => {
        return [
          {
            field: "name",
            operator: "eq",
            value,
          },
        ];
      },
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IInfo, HttpError, Nullable<IInfo>>({
    refineCoreProps: {
      resource: LIBRARY_PATRON_TYPE_URL,
      redirect: false,
      id: props.id,
      action: props.action,
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
            <CSInput
              fullWidth
              disabled
              name="patron_type"
              label={t("fields.patron_type")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSNumber
              fullWidth
              name="allow_days"
              label={t("fields.allow_days")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSNumber
              fullWidth
              name="per_day_fine"
              label={t("fields.per_day_fine")}
              required
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid size={4}>
            <CSNumber
              fullWidth
              name="number_of_books"
              label={t("fields.number_of_books")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSNumber
              fullWidth
              name="valid_period"
              label={t("fields.valid_period")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: any) => r.name}
              renderLabel={(r: any) => r.name}
              autocompleteProps={templateAutoProps}
              name="template"
              label={t("fields.template")}
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
