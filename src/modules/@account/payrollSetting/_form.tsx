import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSNumber } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { IAccountLedger, IPayrollSetting } from "../interface";
import { ACCOUNT_LEDGER_URL, ACCOUNT_PAYROLL_SETTING_URL } from "../constant/server.urls";
import { useAutocomplete } from "@refinedev/mui";
import { AccountLedgerGroupTypeEnum } from "../constant/enum";
import { useRefineForm } from "@hooks/useForm";

export const PayrollSettingForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "payrollSetting");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IPayrollSetting, HttpError>({
    refineCoreProps: {
      resource: ACCOUNT_PAYROLL_SETTING_URL,
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
    resource: ACCOUNT_LEDGER_URL,
    meta: {
      customQuery: {
        group_type: AccountLedgerGroupTypeEnum.Payroll_annual_deduction
      }
    },
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
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IAccountLedger) => `${r.name}`}
              autocompleteProps={ledgerAutoProps}
              name="ledger"
              label={t("fields.ledger")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="max_amount"
              label={t("fields.max_amount")}
              min={1}
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
