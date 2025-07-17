import {
  HttpError,
} from "@refinedev/core";
import { IClass, IProgram } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput, CSNumber, CSSelect } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { ACADEMIC_PROGRAM_LIST } from "../constant/urls";
import { useAutocomplete } from "@refinedev/mui";
import { useRefineForm } from "@hooks/useForm";
import { GradingFormulaTypeEnum } from "@exam/constant/enum";


export const ClassForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "class");

  const { autocompleteProps: programAutoProps } = useAutocomplete<IProgram>({
    resource: ACADEMIC_PROGRAM_LIST,
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

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IClass, HttpError, Nullable<IClass>>({
    refineCoreProps: {
      meta: { customQuery: { program: true } },
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
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
              max={3}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => r.name}
              autocompleteProps={programAutoProps}
              name="program"
              label={t("fields.program")}
              placeholder={t("fields.program")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="shift"
              label={t("fields.shift")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              fullWidth
              name="medium"
              label={t("fields.medium")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
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
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="totalSubjects"
              label={t("fields.totalSubjects")}
              min={1}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSInput
              type="number"
              fullWidth
              name="sort"
              label={t("fields.sort")}
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
