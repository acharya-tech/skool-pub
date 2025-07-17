
import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSNumber } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IAccountPayrollAnnualDeduction, IPayrollSetting } from "../../interface";
import { ACCOUNT_PAYROLL_ANNUAL_DEDUCTION_URL, ACCOUNT_PAYROLL_SETTING_URL } from "../../constant/server.urls";
import { useRefineForm } from "@hooks/useForm";

type PayrollAnnualDeductionFormProps = {
  employee_id: string
} & ATFormProps
export const PayrollAnnualDeductionForm = (props: PayrollAnnualDeductionFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "deduction");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    watch,
    saveButtonProps,
  } = useRefineForm<IAccountPayrollAnnualDeduction, HttpError>({
    refineCoreProps: {
      resource: ACCOUNT_PAYROLL_ANNUAL_DEDUCTION_URL,
      meta: {
        customQuery: {
          deduction: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IPayrollSetting>({
    resource: ACCOUNT_PAYROLL_SETTING_URL,
    meta: {
      customQuery: {
        ledger: true
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "ledger_name",
          operator: "eq",
          value,
        },
        {
          field: "ledger_code",
          operator: "eq",
          value,
        }
      ];
    },
  });

  const selectedLedger = watch("deduction")
  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <CSHiddenInput name="employee_id" defaultValue={props.employee_id} control={control} />
        <Grid container spacing={2}>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IPayrollSetting) => `${r.ledger.name} | ${r.ledger.code}`}
              renderLabel={(r: IPayrollSetting) => `${r.ledger.name} | ${r.ledger.code}`}
              autocompleteProps={ledgerAutoProps}
              name="deduction"
              label={t("fields.ledger")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="amount"
              label={t("fields.amount")}
              disabled={!Boolean(selectedLedger)}
              required
              min={100}
              max={Number(selectedLedger?.max_amount)}
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
