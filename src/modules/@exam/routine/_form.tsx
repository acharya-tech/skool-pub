import {
  useDataProvider,
} from "@refinedev/core";
import { ICreateExmRoutine, IExmFormula, IExmRule, IExmType } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid2 as Grid } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSDateTimePicker, CSTime } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmFormulaTypeEnum, GradingFormulaTypeEnum } from "../constant/enum";
import { useFieldArray } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { SubjectForm } from "./component/subject.form";
import { useAutocomplete } from "@refinedev/mui";
import { IBatch, IClass, IClassSubject } from "@academic/interface";
import { EXAM_ROUTINE_URL, EXAM_RULE_URL, EXAM_TYPE_URL } from "../constant/service.urls";
import { SubjectTypeEnum } from "@common/all.enum";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { IDataValue } from "@datavalue/interface";
import { ACADEMIC_BATCH_URL, ACADEMIC_CLASS_SUBJECT_URL, ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { useRefineForm } from "@hooks/useForm";

export const RoutineForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "routine");
  const [isLoading, setIsLoading] = useState(false)
  const [showMore, setShowMore] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
    refineCore: { onFinish, },
    saveButtonProps,
  } = useRefineForm<ICreateExmRoutine>({
    refineCoreProps: {
      resource: EXAM_ROUTINE_URL,
      redirect: false,
      action: "create",
      onMutationSuccess: props.onClose
    }
  });

  const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
    resource: ACADEMIC_BATCH_URL,
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

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
    meta: {
      customQuery: {
        formulas: true,
      }
    },
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

  const { autocompleteProps: typeAutoProps } = useAutocomplete<IExmType>({
    resource: EXAM_TYPE_URL,
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

  const { autocompleteProps: ruleAutoProps } = useAutocomplete<IExmRule>({
    resource: EXAM_RULE_URL,
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

  const { autocompleteProps: templateAutoProps } = useAutocomplete<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.EXAM_SHEET
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

  const { autocompleteProps: gradeTemplateAutoProps } = useAutocomplete<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.EXAM_GRADE_LEDGER
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

  const { autocompleteProps: markTemplateAutoProps } = useAutocomplete<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.EXAM_MARK_LEDGER
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "esubjects"
  });


  useEffect(() => {
    return () => {
      reset({ esubjects: [] })
    }
  }, [])

  const routineClass = watch("class");
  const start_date = watch("start_date");
  const duration = watch("duration");
  const rule = watch("rule");
  const dataProvider = useDataProvider()

  const handleSubject = async () => {
    setIsLoading(true)
    const { data } = await dataProvider().getList<IClassSubject>({
      resource: ACADEMIC_CLASS_SUBJECT_URL,
      sorters: [{
        field: "sno",
        order: "asc"
      }],
      meta: {
        customQuery: {
          class_id: routineClass?.id,
          subject: true
        }
      },
    })
    handleAddSubject(data)
  }

  const handleAddSubject = (data: IClassSubject[]) => {
    remove(fields.map((item: any) => item.id))
    setIsLoading(false)
    if (data.length > 0 && duration && start_date) {
      const nextDay = new Date(start_date); // Create a new date object to avoid mutating the original
      data.forEach((item: IClassSubject) => {
        append({
          subject: item.subject,
          type: rule.regulation === GradingFormulaTypeEnum.Regular ? item.subject.type : SubjectTypeEnum.IN,
          duration: duration,
          start_date: nextDay.toISOString()
        })
        nextDay.setDate(nextDay.getDate() + 1)
      })
    }
  }

  return (
    <Box width={"100%"} padding={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Card sx={{ mb: 2 }}>
          <CardHeader title={t("titles.create")} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={4}>
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => (r.name)}
                  autocompleteProps={batchAutoProps}
                  placeholder={t("fields.batch")}
                  name={"batch"}
                  label={t("fields.batch")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={4}>
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => (r.name)}
                  autocompleteProps={classAutoProps}
                  placeholder={t("fields.class")}
                  name={"class"}
                  label={t("fields.class")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={2}>
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
              <Grid size={2}>
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => (r.name)}
                  autocompleteProps={ruleAutoProps}
                  placeholder={t("fields.rule")}
                  name={"rule"}
                  label={t("fields.rule")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={4} alignContent={'end'}>
                <CSDateTimePicker
                  fullWidth
                  name="start_date"
                  label={t("fields.start_date")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={4}>
                <CSTime
                  fullWidth
                  format="HH:mm"
                  ampm={false}
                  name="duration"
                  label={t("fields.duration")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={4} alignContent={'end'}>
                <CSDatePicker
                  fullWidth
                  name="result_date"
                  label={t("fields.result_date")}
                  required
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
              <Grid size={4}>
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => (r.name)}
                  autocompleteProps={gradeTemplateAutoProps}
                  placeholder={t("fields.grade_template")}
                  name={"gradeLedgerTemplate"}
                  label={t("fields.grade_template")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={4}>
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => (r.name)}
                  autocompleteProps={markTemplateAutoProps}
                  placeholder={t("fields.mark_template")}
                  name={"markLedgerTemplate"}
                  label={t("fields.mark_template")}
                  control={control}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'end' }}>
            {/* <Button variant="text" onClick={() => setShowMore(!showMore)}>
              {t(`actions.${showMore ? "showLess" : "showMore"}`)}
            </Button> */}
            <Button
              loading={isLoading}
              variant="outlined"
              color="info"
              disabled={!Boolean(duration && routineClass && start_date)}
              onClick={handleSubject}>
              {t("actions.subject")}
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: 2 }}>
          <CardHeader title={t("titles.subjects")} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                {fields.map((field: any, index) => (
                  <SubjectForm setValue={setValue} regulation={rule.regulation} watch={watch} key={field.id} remove={remove} field={field} index={index} control={control} errors={errors} name="esubjects" />
                ))}
              </Grid>
              <Grid size={12}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    append({
                      type: rule.regulation === GradingFormulaTypeEnum.Regular ? SubjectTypeEnum.TH : SubjectTypeEnum.IN,
                      duration: new Date(duration!).toISOString(),
                      start_date: new Date(start_date!).toISOString(),
                    })
                  }
                  fullWidth
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ mb: 2 }}
                >
                  {t("actions.addSubject")}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
            <Button {...saveButtonProps} loading={isSubmitting} variant="contained">
              {t("@buttons.save")}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box >
  );
};
