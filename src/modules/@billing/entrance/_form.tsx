import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid2 as Grid, MenuItem, Stack } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSInput, CSSelect } from "@components/input";
import { IBillEntrance, IBillLedger } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { NepaliMonthEnum } from "@common/all.enum";
import { IBatch, IClass } from "@academic/interface";
import { useAutocomplete } from "@refinedev/mui";
import { BILLING_ENTRANCE_URL, BILLING_LEDGER_URL } from "../constant";
import { useEffect, useState } from "react";
import { BasicModal } from "@components/modal/basic.modal";
import { BillingView } from "./component/bill.view";
import { ACADEMIC_BATCH_URL, ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { useRefineForm } from "@hooks/useForm";

export const EntranceForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const [formData, setFormData] = useState<IBillEntrance | null>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    reset,
    watch,
    setValue,
    saveButtonProps,
  } = useRefineForm<IBillEntrance, HttpError>({
    refineCoreProps: {
      resource: BILLING_ENTRANCE_URL,
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: (data: any) => {
        setFormData(data.data)
        if (persistForm) {
          setValue("name", "")
          setValue("phone", "")
          setValue("address", "")
        } else {
          reset({
            name: "",
            phone: "",
            amount: undefined,
            ledger: null,
            class: null,
            batch: null,
            address: "",
            remark: "",
          })
        }
      },
    }
  });
  const [persistForm, setPersistForm] = useState(false)
  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
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

  const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
    resource: ACADEMIC_BATCH_URL,
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

  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IBillLedger>({
    resource: BILLING_LEDGER_URL,
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

  const ledger = watch("ledger")

  useEffect(() => {
    if (ledger) {
      setValue("amount", ledger.amount)
    }
  }, [ledger])

  return (
    <Box p={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={3}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IClass) => `${r.name}`}
              autocompleteProps={classAutoProps}
              name="aclass"
              label={t("fields.class")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IBatch) => `${r.name}`}
              autocompleteProps={batchAutoProps}
              name="batch"
              label={t("fields.batch")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSDatePicker
              fullWidth
              name="application_date"
              label={t("fields.date")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSSelect
              fullWidth
              name="month"
              label={t("fields.month")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IBillLedger) => `${r.name}`}
              autocompleteProps={ledgerAutoProps}
              name="ledger"
              label={t("fields.ledger")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="amount"
              label={t("fields.amount")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.full_name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="phone"
              label={t("fields.phone")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="address"
              label={t("fields.address")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              // multiline={3}
              fullWidth
              name="remark"
              label={t("fields.remark")}
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
              <FormGroup>
                <FormControlLabel control={
                  <Checkbox
                    checked={persistForm}
                    onChange={(e) => setPersistForm(e.target.checked)} />}
                  label={t("fields.persist")}
                />
              </FormGroup>
              <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
              <Button {...saveButtonProps} variant="contained">
                {t("@buttons.save")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
      {Boolean(formData) && Boolean(formData?.form_invoice_id) && (
        <BasicModal
          open={true}
          onClose={() => setFormData(null)}
          title={t("titles.billview")}
        >
          <BillingView billId={formData?.form_invoice_id} />
        </BasicModal>
      )}
    </Box>
  );
};
