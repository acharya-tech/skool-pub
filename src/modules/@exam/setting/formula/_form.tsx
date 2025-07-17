import {
  HttpError,
} from "@refinedev/core";
import { IExmFormula } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput, CSNumber, CSSelect } from "@components/input";
import { LANG_EXAM } from "@common/constant";
import { ExmFormulaTypeEnum, GradingFormulaTypeEnum } from "../../constant/enum";
import { useFieldArray } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect } from "react";
import { IClass } from "@academic/interface";
import { useAutocomplete } from "@refinedev/mui";
import { useRefineForm } from "@hooks/useForm";
import { ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { EXAM_FORMULA_URL } from "@exam/constant/service.urls";

export const FormulaForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_EXAM, "formula");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IExmFormula, HttpError, Nullable<IExmFormula>>({
    refineCoreProps: {
      resource: EXAM_FORMULA_URL,
      meta: { customQuery: { classes: true } },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
    sorters: [{
      field: "sort",
      order: "asc"
    }],
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
    name: "meta"
  });

  // useEffect(() => {
  //   return () => {
  //     reset({ meta: [] })
  //   }
  // }, [])

  const baseValue = watch('base')

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
            <CSNumber
              fullWidth
              name="base"
              label={t("fields.base")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ExmFormulaTypeEnum).map((e: ExmFormulaTypeEnum) => {
                return <MenuItem key={e} value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={12}>
            <CSAutoComplete
              fullWidth
              multiple
              getOptionLabel={(r: IClass) => r.name}
              autocompleteProps={classAutoProps}
              name="classes"
              label={t("fields.classes")}
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
                    <Grid size={2}>
                      <CSInput
                        fullWidth
                        name={`meta.${index}.rank`}
                        label={t("fields.rank")}
                        required
                        control={control}
                        error={errors.meta?.[index]?.['rank'] ?? undefined}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CSNumber
                        fullWidth
                        name={`meta.${index}.from`}
                        label={t("fields.from")}
                        required
                        control={control}
                        error={errors.meta?.[index]?.['from'] ?? undefined}
                        rules={{
                          validate: (value: string, fd: any) => {
                            if (parseFloat(value) > 100) {
                              return t('validation.maxfrom')
                            }
                            return (parseFloat(value) < 0) ? t('validation.minto') : undefined
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={2}>
                      <CSNumber
                        fullWidth
                        name={`meta.${index}.to`}
                        label={t("fields.to")}
                        required
                        control={control}
                        error={errors.meta?.[index]?.['to'] ?? undefined}
                        rules={{
                          validate: (value: string, fd: any) => {
                            if (parseFloat(value) > 100) {
                              return t('validation.maxto')
                            }
                            return (parseFloat(value) <= 0) ? t('validation.minto') : undefined
                          }
                        }}

                      />
                    </Grid>
                    <Grid size={2}>
                      <CSNumber
                        fullWidth
                        name={`meta.${index}.point`}
                        label={t("fields.point")}
                        required
                        control={control}
                        error={errors.meta?.[index]?.['point'] ?? undefined}
                      />
                    </Grid>
                    <Grid size={4}>
                      <CSInput
                        fullWidth
                        name={`meta.${index}.remark`}
                        label={t("fields.remark")}
                        control={control}
                        error={errors.meta?.[index]?.['remark'] ?? undefined}
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
              disabled={!Boolean(baseValue)}
              onClick={() =>
                append({
                  "from": undefined,
                  "rank": "",
                  "remark": "",
                  "to": undefined
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
