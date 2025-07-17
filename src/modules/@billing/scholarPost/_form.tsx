import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSNumber } from "@components/input";
import { IBillScholar, IBillScholarPostbase } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BILLING_SCHOLAR_ITEM_LIST, BILLING_SCHOLAR_POST_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { STUDENT_INFO_URL, StudentStateEnum } from "@student/constant";
import { IStudentInfo } from "@student/interface";
import { useRefineForm } from "@hooks/useForm";

export const ScholarPostForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "scholarPost");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IBillScholarPostbase, HttpError>({
    refineCoreProps: {
      resource: BILLING_SCHOLAR_POST_URL,
      meta: {
        customQuery: {
          scholar: true,
          student: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: scholarAutoProps } = useAutocomplete<IBillScholar>({
    resource: BILLING_SCHOLAR_ITEM_LIST,
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
              getOptionLabel={(r: IBillScholar) => r.name}
              autocompleteProps={scholarAutoProps}
              name="scholar"
              label={t("fields.scholar")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
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
            <CSNumber
              fullWidth
              name="amount"
              label={t("fields.amount")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="post_over"
              label={t("fields.post_over")}
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
