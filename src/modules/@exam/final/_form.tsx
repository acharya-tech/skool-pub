import { IExmFinal, IExmRoutine } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSNumber, } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmRoutinePostStatusEnum } from "../constant/enum";
import { useFieldArray } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect } from "react";
import { IBatch, IClass } from "@academic/interface";
import { ACADEMIC_BATCH_LIST, ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { useAutocomplete } from "@refinedev/mui";
import { EXAM_ROUTINE_LIST } from "../constant/local.urls";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { useRefineForm } from "@hooks/useForm";

export const FinalForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "final");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<Partial<IExmFinal>>({
    refineCoreProps: {
      meta: { customQuery: { class: true, batch: true, template: true } },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_LIST,
    onSearch: (value) => {
      return [
        {
          field: "class_name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: batchAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_BATCH_LIST,
    onSearch: (value) => {
      return [
        {
          field: "batch_name",
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
        data_key: DataKeyTemplateEnum.EXAM_TRANSCRIPT
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

  const batchValue = watch('batch')
  const classValue = watch('class')
  const routineValue = watch('meta')


  const routineList = routineValue?.map((r: any) => r.routine?.id).filter((r: any) => Boolean(r))
  const { autocompleteProps: routineAutoProps } = useAutocomplete<IExmRoutine>({
    resource: EXAM_ROUTINE_LIST,
    meta: {
      customQuery: {
        type: true,
        batch_id: batchValue?.id,
        class_id: classValue?.id,
        state: [ExmRoutinePostStatusEnum.Completed, ExmRoutinePostStatusEnum.Published]
      }
    },
    onSearch: (value) => {
      return [
        {
          field: "code",
          operator: "eq",
          value
        }
      ]
    },

  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meta"
  });

  useEffect(() => {
    return () => {
      reset({ meta: [] })
    }
  }, [])



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
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: IClass) => r.name}
              autocompleteProps={classAutoProps}
              name="class"
              label={t("fields.class")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: IBatch) => r.name}
              autocompleteProps={batchAutoProps}
              name="batch"
              label={t("fields.batch")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: IDataValue) => r.name}
              autocompleteProps={templateAutoProps}
              name="template"
              label={t("fields.template")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            {fields.map((field: any, index) => (
              <Grid container spacing={2} key={field.id}>
                <Grid size={11}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <CSAutoComplete
                        disabled={!Boolean(classValue) || !Boolean(batchValue)}
                        fullWidth
                        getOptionLabel={(r: IExmRoutine) => r.code + " - " + r.type.name}
                        renderLabel={(r: IExmRoutine) => r.code + " - " + r.type.name}
                        filterOptions={(options: any) => options.filter((option: any) => !routineList?.includes(option.id))}
                        autocompleteProps={routineAutoProps}
                        name={`meta.${index}.routine`}
                        label={t("fields.routine")}
                        control={control}
                        errors={errors}
                      />
                    </Grid>
                    <Grid size={6}>
                      <CSNumber
                        disabled={!Boolean(classValue) || !Boolean(batchValue)}
                        fullWidth
                        name={`meta.${index}.value`}
                        label={t("fields.value")}
                        required
                        control={control}
                        rules={{
                          validate: (value: string, fd: any) => {
                            const total = routineValue?.map((r: any) => Number(r.value)).filter((r: any) => Boolean(r)).reduce((a: any, b: any) => a + b, 0) ?? 0
                            if (total > 100) {
                              return t('validation.total')
                            }
                            return (parseFloat(value) <= 0) ? t('validation.min') : undefined
                          }
                        }}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={1}>
                  <IconButton
                    onClick={() => remove(index)}
                    color="error"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
                <Grid size={12}>
                  <Divider sx={{ mb: 1 }} />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid size={12}>
            <Button
              variant="outlined"
              disabled={!Boolean(classValue) || !Boolean(batchValue)}
              onClick={() =>
                append({
                  "routine": undefined,
                  "value": 0,
                })
              }
              fullWidth
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mb: 2 }}
            >
              {t("actions.add")}
            </Button>
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
