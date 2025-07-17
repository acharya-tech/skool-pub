import {
  HttpError,
} from "@refinedev/core";
import { ISubject } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSCheckboxYesNo, CSInput, CSNumber, CSSelect } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { SubjectTypeEnum, YesNoEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const SubjectForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "subject");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
    watch
  } = useRefineForm<ISubject, HttpError, Nullable<ISubject>>({
    defaultValues: {
      isLocal: YesNoEnum.No
    },
    refineCoreProps: {
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });
  const subjectType = watch('type') ?? query?.data?.data?.type
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
            <CSInput
              fullWidth
              name="full_name"
              label={t("fields.full_name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="code"
              label={t("fields.code")}
              required
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid size={6}>
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(SubjectTypeEnum).map((e: SubjectTypeEnum) => {
                return <MenuItem value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          {(subjectType == SubjectTypeEnum.TH || subjectType === SubjectTypeEnum.IN_TH) && (
            <Grid size={6}>
              <CSNumber
                fullWidth
                name="th_credit"
                label={t("fields.th_credit")}
                required
                control={control}
                errors={errors}
              />
            </Grid>
          )}
          {(subjectType == SubjectTypeEnum.IN || subjectType === SubjectTypeEnum.IN_TH) && (
            <Grid size={6}>
              <CSNumber
                fullWidth
                name="in_credit"
                label={t("fields.in_credit")}
                required
                control={control}
                errors={errors}
              />
            </Grid>
          )}
          <Grid size={12}>
            <CSCheckboxYesNo
              fullWidth
              name="isLocal"
              label={t("fields.isLocal")}
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
