import { useTranslate } from "@hooks/useTranslate";
import { Alert, Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import {
  CSAutoComplete,
  CSSelect,
} from "@components/input";
import { useAutocomplete } from "@refinedev/mui";
import {
  ACADEMIC_SECTION_LIST,
  ACADEMIC_HOUSE_LIST,
  ACADEMIC_HOSTEL_LIST,
  ACADEMIC_BATCH_LIST,
} from "@academic/constant/urls";

import { ISection, IAcademicHouse, IHostel, IBatch } from "@academic/interface";
import LoadingButton from "@mui/lab/LoadingButton";
import { STUDENT_LOG_URL, STUDENT_MANAGE_URL, StudentStateEnum } from "../constant";
import { LANG_STUDENT } from "@common/constant";
import { useInvalidate } from "@refinedev/core";
import { useEffect } from "react";
import { useRefineForm } from "@hooks/useForm";

type ManageFormProps = {
  students: string[]
  onClose: () => void,
}

export const ManageForm = ({ students, onClose }: ManageFormProps) => {
  const t = useTranslate(LANG_STUDENT, "manage");
  const { autocompleteProps: batchAutoProps } = useAutocomplete<IBatch>({
    resource: ACADEMIC_BATCH_LIST,
  });

  const { autocompleteProps: sectionAutoProps } = useAutocomplete<ISection>({
    resource: ACADEMIC_SECTION_LIST,
  });

  const { autocompleteProps: houseAutoProps } = useAutocomplete<IAcademicHouse>({
    resource: ACADEMIC_HOUSE_LIST,
  });

  const { autocompleteProps: hostelAutoProps } = useAutocomplete<IHostel>({
    resource: ACADEMIC_HOSTEL_LIST,
  });
  const invalidate = useInvalidate()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm({
    defaultValues: { students },
    refineCoreProps: {
      resource: STUDENT_MANAGE_URL,
      action: "create",
      redirect: false,
      onMutationSuccess: () => {
        onClose()
        invalidate({ resource: STUDENT_LOG_URL, invalidates: ['list'] })
      },
    }
  });

  useEffect(() => {
    setValue('students', students)
  }, [students])

  return (
    <Box>
      <Typography variant="h6">{t('manage')}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data)
        })}
      >
        <Grid container spacing={2}>
          <>
            <Grid size={6}>
              <CSAutoComplete
                fullWidth
                autocompleteProps={batchAutoProps}
                getOptionLabel={(r: IBatch) => r.name}
                name="batch"
                label={t("fields.batch")}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={6}>
              <CSAutoComplete
                fullWidth
                autocompleteProps={sectionAutoProps}
                getOptionLabel={(r: ISection) => r.name}
                name="section"
                label={t("fields.section")}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={6}>
              <CSAutoComplete
                fullWidth
                autocompleteProps={houseAutoProps}
                getOptionLabel={(r: IAcademicHouse) => r.name}
                name="house"
                label={t("fields.house")}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={6}>
              <CSAutoComplete
                fullWidth
                autocompleteProps={hostelAutoProps}
                getOptionLabel={(r: IHostel) => r.name}
                name="hostel"
                label={t("fields.hostel")}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={6}>
              <CSSelect
                fullWidth
                name="state"
                label={t("fields.state")}
                defaultValue={StudentStateEnum.Current}
                required
                control={control}
                errors={errors}
              >
                {Object.values(StudentStateEnum).map((e: StudentStateEnum) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </CSSelect>
            </Grid>
          </>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
              <Button
                color="secondary"
                disabled={saveButtonProps.disabled}
                variant="outlined"
                onClick={onClose}>{t("@buttons.close")}</Button>
              <LoadingButton
                {...saveButtonProps}
                loading={saveButtonProps.disabled}
                color="success"
                variant="contained"
                type="submit"
              >{t("@buttons.update")}</LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box >
  )
}