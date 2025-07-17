import {
  HttpError,
  useList,
  useOne,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSCheckboxYesNo, CSHiddenInput } from "@components/input";
import { LANG_BILLING } from "@common/constant";
import { IStudentInfo } from "@student/interface";
import { StatusEnum, YesNoEnum } from "@common/all.enum";
import { IBillFeeClass, IBillFeeReceive, IStudentDueByFeeHead } from "../../interface";
import { BILL_FEE_DUE_BY_FEE_HEAD_ID, BILLING_FEE_CLASS_LIST, BILLING_FEE_CLASS_URL, BILLING_FEE_RELEASE_CREATE_INVOICE_URL, BILLING_FEE_REPORT_URL } from "../../constant";
import { Paper } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { FeeReceiveForm } from "./_fee.receive.form";
import { FeeDueList } from "./_fee.due.list";
import { IAccountYear } from "@account/interface";
import { FeeInvoiceHistory } from "./_fee.invoice.history";
import { useRefineForm } from "@hooks/useForm";

type FeeReceiveProps = {
  student: IStudentInfo
  currentYear: IAccountYear
  onSuccess: (data: any) => void
  onClose: () => void
}
export const FeeReceive = (props: FeeReceiveProps) => {
  const t = useTranslate(LANG_BILLING, "feeReceive");
  const { data: dueByFeeHeadData } = useOne<IStudentDueByFeeHead>({
    resource: BILLING_FEE_REPORT_URL,
    id: BILL_FEE_DUE_BY_FEE_HEAD_ID,
    meta: {
      customQuery: {
        studentIds: props.student.id
      }
    }
  })
  const { data: feeClassData } = useList<IBillFeeClass>({
    resource: BILLING_FEE_CLASS_URL,
    meta: {
      customQuery: {
        class_id: props.student.class_id,
        fee: true,
        status: StatusEnum.Active
      }
    }
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    watch,
    saveButtonProps,
  } = useRefineForm<IBillFeeReceive, HttpError>({
    defaultValues: {
      customer_name: `${props.student.regid} | ${props.student.full_name}`,
      customer_address: props.student.address1,
      send_notice: YesNoEnum.Yes,
      send_sms: YesNoEnum.Yes
    },
    refineCoreProps: {
      resource: BILLING_FEE_RELEASE_CREATE_INVOICE_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: props.onSuccess,
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
  const dueByFeeHead = dueByFeeHeadData?.data
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
              <CSHiddenInput name="student" defaultValue={props.student} control={control} />
              <FeeReceiveForm control={control} errors={errors} watch={watch} t={t} fields={fields} remove={remove} />
            </Paper>
          </Grid>
          <Grid size={6}>
            <Stack p={2}>
              <Box>
                <Typography variant="subtitle2">{t("titles.feeHeads")}</Typography>
                <Paper sx={{ p: 2 }}>
                  <FeeDueList append={append} update={update} fields={fields} t={t} key={"feedueList"} student={props.student} feeDue={dueByFeeHead} feeClassList={feeClassList} />
                </Paper>
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2">{t("titles.billHistory")}</Typography>
                <Paper sx={{ p: 2 }}>
                  <FeeInvoiceHistory student={props.student} />
                </Paper>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
