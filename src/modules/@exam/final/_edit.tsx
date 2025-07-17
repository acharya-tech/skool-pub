import {
  HttpError,
} from "@refinedev/core";
import { IExmFinal, IExmRoutine } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSLabel, CSNumber } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmRoutinePostStatusEnum } from "../constant/enum";
import { useFieldArray } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect } from "react";
import { useAutocomplete } from "@refinedev/mui";
import { EXAM_ROUTINE_LIST } from "../constant/local.urls";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { useRefineForm } from "@hooks/useForm";

export const FinalFormEdit = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "final");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<Partial<IExmFinal>, HttpError>({
    refineCoreProps: {
      meta: { customQuery: { class: true, batch: true, template: true } },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
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

  const routineValue = watch('meta')
  const routineList = routineValue?.map((r: any) => r.routine?.id).filter((r: any) => Boolean(r))
  const { autocompleteProps: routineAutoProps } = useAutocomplete<IExmRoutine>({
    resource: EXAM_ROUTINE_LIST,
    meta: {
      customQuery: {
        type: true,
        batch_id: query?.data?.data?.batch_id,
        class_id: query?.data?.data?.class_id,
        state: [ExmRoutinePostStatusEnum.Completed, ExmRoutinePostStatusEnum.Published]
      }
    },
    queryOptions: {
      enabled: !!query?.data?.data
    },
    onSearch: (value) => {
      return [
        {
          field: "code",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meta",
  });
  useEffect(() => {
    if (query?.data?.data.meta) {
      reset({ template: query?.data?.data.template, meta: query?.data?.data.meta?.map((r: any) => ({ routine: { id: r.routine_id, code: r.routine_code, type: { name: r.exam_type } }, value: r.value })) })
    }
  }, [query?.data?.data.meta])

  useEffect(() => {
    return () => {
      reset({ meta: [] })
    }
  }, [])

  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
  const metaError: any = errors["meta"]
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
            <CSLabel
              fullWidth
              label={t("fields.class")}
              defaultValue={query?.data?.data?.class?.name}
            />
          </Grid>
          <Grid size={4}>
            <CSLabel
              fullWidth
              label={t("fields.batch")}
              defaultValue={query?.data?.data?.batch?.name}
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
                        error={metaError?.[index]?.['value'] ?? undefined}
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