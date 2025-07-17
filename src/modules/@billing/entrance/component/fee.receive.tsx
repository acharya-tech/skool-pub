import {
  HttpError,
  useInvalidate,
  useList,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { StatusEnum } from "@common/all.enum";
import { IBillEntrance, IBillFeeClass, IBillFeeReceive } from "../../interface";
import { BILLING_ENTRANCE_ADMIT_URL, BILLING_ENTRANCE_URL, BILLING_FEE_CLASS_URL } from "../../constant";
import { Paper } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { FeeReceiveForm } from "./_fee.receive.form";
import { FeeDueList } from "./_fee.due.list";
import { FeeInvoiceHistory } from "./_fee.invoice.history";
import { CSCheckboxYesNo, CSHiddenInput } from "@components/input";
import { useRefineForm } from "@hooks/useForm";

type FeeReceiveProps = {
  entrance: IBillEntrance
  onSuccess: (data: any) => void
  onClose: () => void
}
export const FeeReceive = (props: FeeReceiveProps) => {
  const t = useTranslate(LANG_BILLING, "feeReceive");
  const { entrance } = props
  const { data: feeClassData } = useList<IBillFeeClass>({
    resource: BILLING_FEE_CLASS_URL,
    meta: {
      customQuery: {
        class_id: entrance.class_id,
        fee: true,
        status: StatusEnum.Active
      }
    }
  })
  const invalidate = useInvalidate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    watch,
    saveButtonProps
  } = useRefineForm<IBillFeeReceive, HttpError>({
    defaultValues: {
      customer_name: entrance.name,
      customer_address: entrance.address,
    },
    refineCoreProps: {
      resource: BILLING_ENTRANCE_ADMIT_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: (data) => {
        invalidate({
          resource: BILLING_ENTRANCE_URL,
          invalidates: ["list"]
        })
        props.onSuccess(data)
      }
    }
  });
  const items = 'items'
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: items,
    rules: {
      validate: (items) => items.length > 0 || "At least one item is required",
    },
  });
  const feeClassList = feeClassData?.data
  return (
    <Box p={1}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={1}>
          <Grid size={6}>
            <Stack direction={"row"} justifyContent="space-between" p={0.5} alignItems={"end"}>
              <Typography variant="subtitle2">{t("titles.billDetail")}</Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <CSHiddenInput defaultValue={props.entrance} name="entrance" control={control} />
                <CSCheckboxYesNo
                  name="send_notice"
                  control={control}
                  size="small"
                  label={t("labels.sendNotice")}
                />
                <CSCheckboxYesNo
                  name="send_sms"
                  control={control}
                  size="small"
                  label={t("labels.sendSms")}
                />
                <Button size="small"
                  {...saveButtonProps}
                  variant="contained"
                  sx={{
                    minWidth: "50px",
                    padding: "3px 9px",
                    fontSize: "12px",
                    height: "24px",
                    lineHeight: "1",
                  }}
                >
                  {t("actions.receive")}
                </Button>
              </Stack>
            </Stack>
            <Paper sx={{ p: 3 }}>
              <FeeReceiveForm control={control} errors={errors} watch={watch} t={t} fields={fields} remove={remove} />
            </Paper>
          </Grid>
          <Grid size={6}>
            <Stack p={2}>
              <Box>
                <Typography variant="subtitle2">{t("titles.feeHeads")}</Typography>
                <Paper sx={{ p: 2 }}>
                  <FeeDueList append={append} update={update} fields={fields} t={t} key={"feedueList"} feeClassList={feeClassList} />
                </Paper>
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2">{t("titles.billHistory")}</Typography>
                <Paper sx={{ p: 2 }}>
                  <FeeInvoiceHistory invoiceId={entrance.form_invoice_id} />
                </Paper>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
