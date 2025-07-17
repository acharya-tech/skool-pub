import {
  HttpError,
  useInvalidate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSNumber } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { IAccountLedger } from "../../interface";
import { ACCOUNT_EMPLOYEE_URL, ACCOUNT_LEDGER_URL } from "../../constant/server.urls";
import { IStaff } from "@employee/interface";
import { EMPLOYEE_STAFF_URL } from "@employee/constant";
import { AccountLedgerGroupTypeEnum } from "../../constant/enum";
import { useRefineForm } from "@hooks/useForm";

type EmployeeLedgerFormProps = {
  employee: IStaff
} & ATFormProps
export const EmployeeLedgerForm = (props: EmployeeLedgerFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "employee");
  const invalidate = useInvalidate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IStaff, HttpError>({
    defaultValues: {
      ledger: {
        id: props.employee.ledger_id,
      }
    },
    refineCoreProps: {
      resource: ACCOUNT_EMPLOYEE_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: () => {
        invalidate({
          resource: EMPLOYEE_STAFF_URL,
          id: props.employee.id,
          invalidates: ["detail"]
        })
        props?.onClose()
      },
    }
  });
  //TODO : filter ledger from payroll category
  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
    resource: ACCOUNT_LEDGER_URL,
    meta: {
      customQuery: {
        group_type: AccountLedgerGroupTypeEnum.Employee,
        not_employee: true
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
        }
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
        <CSHiddenInput name="employee_id" defaultValue={props.employee.id} control={control} />
        <Grid container spacing={2}>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
              renderLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
              autocompleteProps={ledgerAutoProps}
              name="ledger"
              label={t("fields.ledger")}
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
