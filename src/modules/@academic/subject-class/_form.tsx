import {
  HttpError
} from "@refinedev/core";
import { IClassSubject } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSLabel, CSSelect } from "@components/input";
import { LANG_ACADEMIC } from "@common/constant";
import { CourseTypeEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";
import { ACADEMIC_CLASS_SUBJECT_URL } from "@academic/constant/server.url";

// TODO : setting 10 subject shows only 9 dropdowns
// TODO : creating subject generates error but altermatily creates the subject
// TODO : in exam mark upload after submitting marks the section goes away??
// TODO : mark entry does not accept 0 mark
export const ClassSubjectForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACADEMIC, "classSubject");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IClassSubject, HttpError, Nullable<IClassSubject>>({
    refineCoreProps: {
      resource: ACADEMIC_CLASS_SUBJECT_URL,
      redirect: false,
      id: props.id,
      onMutationSuccess: props.onClose,
    }
  });

  const title = t("actions.edit");
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
            <CSLabel
              fullWidth
              label={t("fields.name")}
              defaultValue={query?.data?.data.subject.name}
              required
            />
          </Grid>
          <Grid size={3}>
            <CSSelect
              fullWidth
              name="course_type"
              label={t("fields.course_type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(CourseTypeEnum).map((e: CourseTypeEnum) => {
                return <MenuItem value={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={3}>
            <CSSelect
              fullWidth
              name="sno"
              label={t("fields.sno")}
              required
              control={control}
              errors={errors}
            >
              {Array.from({ length: query?.data?.data.class.totalSubjects ?? 0 }).map((e, i) => {
                return <MenuItem value={i}>{i}</MenuItem>
              })}
            </CSSelect>
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
