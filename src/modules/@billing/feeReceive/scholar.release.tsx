import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSHiddenInput, CSNumber, CSSelect } from "@components/input";
import { IBillScholar, IBillScholarCreate } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BILLING_SCHOLAR_RELEASE_CREATE_URL, BILLING_SCHOLAR_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { NepaliMonthEnum, StatusEnum } from "@common/all.enum";
import { useEffect } from "react";
import { useRefineForm } from "@hooks/useForm";

type ScholarReleaseStudentProps = {
  student: IStudentInfo
} & ATFormProps
export const ScholarReleaseStudent = (props: ScholarReleaseStudentProps) => {
  const t = useTranslate(LANG_BILLING, "feeRelease");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    watch,
    setValue,
    saveButtonProps,
  } = useRefineForm<IBillScholarCreate, HttpError>({
    refineCoreProps: {
      resource: BILLING_SCHOLAR_RELEASE_CREATE_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: props.onClose,
    }
  });
  const selectedMonth = watch("month")
  const selectedStudent = watch("studentMeta.0.student")

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
  const { autocompleteProps: scholarAutoProps } = useAutocomplete<IBillScholar>({
    resource: BILLING_SCHOLAR_URL,
    meta: {
      customQuery: {
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
  useEffect(() => {
    if (selectedStudent) {
      setValue("class", selectedStudent.class)
    }
  }, selectedStudent)
  const title = t("titles.addScholar");
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
            <CSHiddenInput defaultValue={selectedStudent?.class} name="class" control={control} />
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
              error={metaError?.[0]?.["student"]}
            />
          </Grid>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              required
              disabled={selectedStudent === undefined || selectedMonth === undefined}
              getOptionLabel={(r: IBillScholar) => r.name}
              renderLabel={(r: IBillScholar) => `${r.name}`}
              autocompleteProps={scholarAutoProps}
              name="scholar"
              label={t("fields.scholar")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSNumber
              fullWidth
              disabled={selectedStudent === undefined || selectedMonth === undefined}
              name="studentMeta.0.amount"
              label={t("fields.amount")}
              required
              control={control}
              error={metaError?.[0]?.["amount"]}
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
