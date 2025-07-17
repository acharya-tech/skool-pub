import {
  HttpError,
  useInvalidate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSInput, CSSelect } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IAccountLedger, IAccountPayroll } from "../../interface";
import { ACCOUNT_LEDGER_URL, ACCOUNT_PAYROLL_SETUP_URL } from "../../constant/server.urls";
import { AccounPayrollTypeEnum, AccountLedgerGroupTypeEnum } from "../../constant/enum";
import { EMPLOYEE_STAFF_URL } from "@employee/constant";
import { useRefineForm } from "@hooks/useForm";

type PayrollFormProps = {
  employee_id: string
} & ATFormProps
export const PayrollSetupForm = (props: PayrollFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "payroll");
  const invalidate = useInvalidate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IAccountPayroll, HttpError>({
    refineCoreProps: {
      resource: ACCOUNT_PAYROLL_SETUP_URL,
      meta: {
        customQuery: {
          ledger: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: () => {
        invalidate({
          resource: EMPLOYEE_STAFF_URL,
          id: props.employee_id,
          invalidates: ["detail"]
        })
        props.onClose()
      },
    }
  });

  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
    resource: ACCOUNT_LEDGER_URL,
    meta: {
      customQuery: {
        group_type: AccountLedgerGroupTypeEnum.Salary
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
        {
          field: "code",
          operator: "eq",
          value,
        },
      ];
    },
  });

  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <CSHiddenInput name="employee_id" defaultValue={props.employee_id} control={control} />
        <Grid container spacing={2}>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
              autocompleteProps={ledgerAutoProps}
              name="ledger"
              label={t("fields.ledger")}
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
              {Object.values(AccounPayrollTypeEnum).filter(e => e !== AccounPayrollTypeEnum.Payment).map((e: AccounPayrollTypeEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSInput
              fullWidth
              name="amount"
              label={t("fields.amount")}
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
