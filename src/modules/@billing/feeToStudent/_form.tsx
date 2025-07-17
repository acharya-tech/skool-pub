import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete } from "@components/input";
import { IBillFee, IBillFeeStudent } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BILLING_FEE_ITEM_URL, BILLING_FEE_STUDENT_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { useRefineForm } from "@hooks/useForm";

export const FeeStudentForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "feeStudent");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IBillFeeStudent, HttpError>({
    refineCoreProps: {
      resource: BILLING_FEE_STUDENT_URL,
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

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
          field: "full_name",
          operator: "eq",
          value,
        },
        {
          field: "regid",
          operator: "eq",
          value,
        }
      ];
    },
  });
  const { autocompleteProps: feeAutoProps } = useAutocomplete<IBillFee>({
    resource: BILLING_FEE_ITEM_URL,
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
              getOptionLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
              renderLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name} | ${r.class?.name} | ${r.section?.name}`}
              autocompleteProps={studentAutoProps}
              name="student"
              label={t("fields.student")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IBillFee) => r.name}
              autocompleteProps={feeAutoProps}
              name="fee"
              label={t("fields.fee")}
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
