import {
  HttpError,
} from "@refinedev/core";
import { IAcademicHouse } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSHiddenInput, CSInput, CSNumber, CSSelect } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmFormulaTypeEnum, ExmResultPassByEnum, ExmResultRankByEnum, ExmResultSubjectPassByEnum, ExmRoutineCasEnum, ExmTypeEnum, GradingFormulaTypeEnum } from "../../constant/enum";
import { IExmFormula, IExmRule, IExmType } from "../../interface";
import { useRefineForm } from "@hooks/useForm";
import { EXAM_FORMULA_URL } from "@exam/constant/service.urls";
import { useAutocomplete } from "@refinedev/mui";
import { useEffect } from "react";


export const RuleForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "rule");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IExmRule, HttpError, Nullable<IExmRule>>({
    refineCoreProps: {
      redirect: false,
      id: props.id,
      meta: {
        customQuery: {
          formula_grade: true,
          formula_mark: true
        }
      },
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: formulaGradeAutoProps } = useAutocomplete<IExmFormula>({
    resource: EXAM_FORMULA_URL,
    meta: { customQuery: { type: ExmFormulaTypeEnum.Grade } },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: formulaMarkAutoProps } = useAutocomplete<IExmFormula>({
    resource: EXAM_FORMULA_URL,
    meta: { customQuery: { type: ExmFormulaTypeEnum.Mark } },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const regulation = watch("regulation");
  useEffect(() => {
    if (regulation === GradingFormulaTypeEnum.Regular) {
      setValue("cas_type", ExmRoutineCasEnum.Regular);
    }
  }, [regulation])
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
            <CSSelect
              fullWidth
              name="regulation"
              label={t("fields.regulation")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(GradingFormulaTypeEnum).map((e: GradingFormulaTypeEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="cas_type"
              label={t("fields.cas_type")}
              disabled={regulation === GradingFormulaTypeEnum.Regular}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmRoutineCasEnum).map((e: ExmRoutineCasEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="rank_by"
              label={t("fields.rank_by")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmResultRankByEnum).map((e: ExmResultRankByEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="internal_pass_by"
              label={t("fields.internal_pass_by")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmResultPassByEnum).map((e: ExmResultPassByEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="subject_pass_by"
              label={t("fields.subject_pass_by")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmResultSubjectPassByEnum).map((e: ExmResultSubjectPassByEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => (r.name)}
              autocompleteProps={formulaGradeAutoProps}
              placeholder={t("fields.formula_grade")}
              name={"formula_grade"}
              label={t("fields.formula_grade")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4} >
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => (r.name)}
              autocompleteProps={formulaMarkAutoProps}
              placeholder={t("fields.formula_mark")}
              name={"formula_mark"}
              label={t("fields.formula_mark")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}></Grid>
          <Grid size={3} >
            <CSNumber
              fullWidth
              name="th_fm"
              label={t("fields.th_fm")}
              min={1}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSNumber
              fullWidth
              name="th_pm"
              label={t("fields.th_pm")}
              min={1}
              rules={{
                validate: (value: number, field: IExmRule) => {
                  return (value > parseFloat((field.th_pm).toString())) ? t('validation.maxtpm') : undefined
                }
              }}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSNumber
              fullWidth
              name="in_fm"
              label={t("fields.in_fm")}
              min={1}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSNumber
              fullWidth
              name="in_pm"
              label={t("fields.in_pm")}
              min={1}
              rules={{
                validate: (value: number, field: IExmRule) => {
                  return (value > parseFloat((field.in_fm).toString())) ? t('validation.maxppm') : undefined
                }
              }}
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
