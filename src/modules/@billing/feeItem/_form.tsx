import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSCheckboxYesNo, CSInput, CSSelect } from "@components/input";
import { IBillFee } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BillFeeTypeEnum, BILLING_FEE_ITEM_URL } from "../constant";
import { YesNoEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const FeeItemForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "feeItem");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IBillFee, HttpError>({
    refineCoreProps: {
      redirect: false,
      resource: BILLING_FEE_ITEM_URL,
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
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(BillFeeTypeEnum).map((e: BillFeeTypeEnum) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={6}>
            <Stack direction={"row"} gap={2}>
              <CSCheckboxYesNo
                name="is_deposit"
                label={t("fields.isDeposit")}
                defaultValue={YesNoEnum.No}
                control={control}
                errors={errors}
              />
              <CSCheckboxYesNo
                name="is_default_fee"
                label={t("fields.isDefaultFee")}
                defaultValue={YesNoEnum.No}
                control={control}
                errors={errors}
              />
            </Stack>
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
