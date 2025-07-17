import {
  HttpError,
} from "@refinedev/core";
import { IAcademicHouse } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSInput } from "@components/input";
import { LANG_STUDENT } from "@common/constant";
import { IStudentCertificateType } from "@student/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { useAutocomplete } from "@refinedev/mui";
import { IDataValue } from "@datavalue/interface";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { STUDENT_CERTIFICATE_TYPE_URL } from "@student/constant";
import { useRefineForm } from "@hooks/useForm";


export const CertificateTypeForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_STUDENT, "certificateType");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IAcademicHouse, HttpError, Nullable<IStudentCertificateType>>({
    refineCoreProps: {
      resource: STUDENT_CERTIFICATE_TYPE_URL,
      meta: {
        customQuery: {
          template: true
        }
      },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: templateAutoProps } = useAutocomplete<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.STUDENT_CERTIFICATE
      }
    },
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
          <Grid size={4}>
            {props.action === "edit" && <CSHiddenInput name="id" control={control} />}
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSInput
              fullWidth
              name="prefix"
              label={t("fields.prefix")}
              required
              rules={{
                validate: (value: string) => {
                  if (value.length !== 3) {
                    return t('validation.prefixLength')
                  }
                }
              }}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => (r.name)}
              autocompleteProps={templateAutoProps}
              placeholder={t("fields.template")}
              name={"template"}
              label={t("fields.template")}
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
