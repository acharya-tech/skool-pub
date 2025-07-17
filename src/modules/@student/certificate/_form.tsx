import {
  HttpError,
} from "@refinedev/core";
import { IAcademicHouse } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSInput } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { IStudentCertificateType, IStudentInfo } from "@student/interface";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_CERTIFICATE_TYPE_URL, STUDENT_INFO_URL } from "@student/constant";
import { useRefineForm } from "@hooks/useForm";


export const CertificateForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_STUDENT, "certificate");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IAcademicHouse, HttpError, Nullable<IStudentCertificateType>>({
    refineCoreProps: {
      meta: {
        customQuery: {
          certificate: true,
          student: true
        }
      },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: studentAutoProps } = useAutocomplete<IStudentInfo>({
    resource: STUDENT_INFO_URL,
    onSearch: (value) => {
      return [
        {
          field: "full_name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: typeAutoProps } = useAutocomplete<IStudentCertificateType>({
    resource: STUDENT_CERTIFICATE_TYPE_URL,
    onSearch: (value) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });
  return (
    <Box>
      <Typography variant="h6">{t("actions.add")}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <CSDatePicker
              fullWidth
              required
              defaultValue={new Date()}
              name={"issue_date"}
              label={t("fields.issue_date")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => (r.name)}
              autocompleteProps={typeAutoProps}
              placeholder={t("fields.type")}
              name={"type"}
              label={t("fields.type")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              required
              multiple
              getOptionLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name}`}
              renderLabel={(r: IStudentInfo) => `${r.regid} | ${r.full_name}`}
              autocompleteProps={studentAutoProps}
              placeholder={t("fields.student")}
              name={"students"}
              label={t("fields.student")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSInput
              fullWidth
              name="remark"
              multiline={3}
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
