import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, List, ListItem, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSNumber, CSSelect } from "@components/input";
import { IBillFeeClass, IBillFeeRelease, IBillFeeReleaseMeta } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BillFeeReleaseTypeEnum, BILLING_FEE_CLASS_LIST, BILLING_FEE_CLASS_URL, BILLING_FEE_RELEASE_CREATE_FEE_URL, BILLING_FEE_RELEASE_META_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { useEffect, useState } from "react";
import { NepaliMonthEnum, StatusEnum } from "@common/all.enum";
import { useDataProvider } from "@refinedev/core";
import { a } from "@react-spring/web";
import { useRefineForm } from "@hooks/useForm";

type FeeReleaseStudentProps = {
  student?: IStudentInfo
} & ATFormProps
export const FeeReleaseStudent = (props: FeeReleaseStudentProps) => {
  const t = useTranslate(LANG_BILLING, "feeRelease");
  const dataProvider = useDataProvider();
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    setValue,
    watch,
    saveButtonProps,
  } = useRefineForm<IBillFeeRelease, HttpError>({
    refineCoreProps: {
      resource: BILLING_FEE_RELEASE_CREATE_FEE_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: props.onClose,
    }
  });
  // const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [releaseHistory, setReleaseHistory] = useState<IBillFeeReleaseMeta[]>([]);
  const selectedMonth = watch("month")
  const selectedStudent = watch("studentMeta.0.student")
  const selectedFeeClass = watch("feeClass")
  // useEffect(() => {
  //   setHistoryLoaded(false)
  // }, [selectedMonth, selectedStudent, selectedFeeClass])
  const handleReleaseLoad = async () => {
    if (selectedFeeClass) {
      setValue("studentMeta.0.amount", selectedFeeClass.amount)
      const { data } = await dataProvider().getList<IBillFeeReleaseMeta>({
        resource: BILLING_FEE_RELEASE_META_URL,
        meta: {
          customQuery: {
            month: selectedMonth,
            release: true,
            student_id: selectedStudent?.id,
            bill_fc_id: selectedFeeClass?.id,
            status: StatusEnum.Active,
            release_status: StatusEnum.Active,
            release_type: BillFeeReleaseTypeEnum.Fee
          }
        },
      });
      setReleaseHistory(data);
      // setHistoryLoaded(true)
    }
  }
  useEffect(() => {
    handleReleaseLoad()
  }, [selectedFeeClass])

  const { autocompleteProps: studentAutoProps } = useAutocomplete<IStudentInfo>({
    resource: STUDENT_INFO_URL,
    meta: {
      customQuery: {
        class: true,
        section: true,
        state: [StudentStateEnum.Current]
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "regid",
          operator: "eq",
          value,
        },
        {
          field: "full_name",
          operator: "eq",
          value,
        }
      ];
    },
  });
  const { autocompleteProps: feeAutoProps } = useAutocomplete<IBillFeeClass>({
    resource: BILLING_FEE_CLASS_URL,
    meta: {
      customQuery: {
        fee: true,
        status: StatusEnum.Active,
        class_id: selectedStudent?.class_id
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "fee_name",
          operator: "eq",
          value,
        }
      ];
    },
    queryOptions: {
      enabled: !!selectedStudent
    }
  });
  const title = t("actions.add");

  const metaError = errors["studentMeta"] as undefined
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
            <CSSelect
              fullWidth
              name="month"
              label={t("fields.release_month")}
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
            <CSDatePicker
              fullWidth
              name="release_date"
              label={t("fields.release_date")}
              defaultValue={new Date()}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              disabled={props.student !== undefined}
              defaultValue={props.student}
              getOptionLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
              renderLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
              autocompleteProps={studentAutoProps}
              name="studentMeta.0.student"
              label={t("fields.student")}
              required
              control={control}
              error={metaError?.[0]?.['student']}
            />
          </Grid>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              required
              disabled={selectedStudent === undefined}
              getOptionLabel={(r: IBillFeeClass) => r.fee?.name}
              renderLabel={(r: IBillFeeClass) => `${r.fee?.name}`}
              autocompleteProps={feeAutoProps}
              name="feeClass"
              label={t("fields.fee")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSNumber
              fullWidth
              disabled={selectedFeeClass === undefined || selectedMonth === undefined}
              name="studentMeta.0.amount"
              label={t("fields.amount")}
              required
              control={control}
              error={metaError?.[0]?.['amount']}
            />
          </Grid>
          <Grid size={12}>
            <List nonce="list">
              {releaseHistory.map((releaseMeta, index) => (
                <ListItem color="warning" key={index}>
                  <Typography color="warning" variant="body1">
                    {releaseMeta.release.name} exists for month <i>{releaseMeta.release.month}</i> of amount <b>{releaseMeta.amount}</b>
                  </Typography>
                </ListItem>
              ))}
            </List>
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
              <Button {...saveButtonProps} disabled={saveButtonProps.disabled} variant="contained">
                {t("@buttons.save")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
