import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput } from "@components/input";
import { IBillFee, IBillScholar } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BILLING_FEE_ITEM_URL, BILLING_SCHOLAR_ITEM_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { useRefineForm } from "@hooks/useForm";

export const ScholarItemForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "scholarItem");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IBillScholar, HttpError>({
    refineCoreProps: {
      resource: BILLING_SCHOLAR_ITEM_URL,
      meta: {
        customQuery: {
          fee: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: feeAutoProps } = useAutocomplete<IBillFee>({
    resource: BILLING_FEE_ITEM_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        }
      ];
    },
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
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IBillFee) => r.name}
              autocompleteProps={feeAutoProps}
              name="fee"
              label={t("fields.fee")}
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
