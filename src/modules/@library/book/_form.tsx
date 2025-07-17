import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, IFileResponse, Nullable } from "src/interfaces";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  CSAutoComplete,
  CSDatePicker,
  CSInput,
  CSNumber,
  CSSelect,
  CSCheckboxYesNo,
} from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import {
  LIBRARY_AUTHOR_LIST,
  LIBRARY_PUBLISHER_LIST,
} from "../constant/local.urls";
import { ILibAuthor, ILibBook, ILibPublisher } from "../interface";
import { BookFileTypeEnum, BookTypeEnum, LanguageEnum } from "../constant";
import { useState } from "react";
import { ACADEMIC_SUBJECT_LIST } from "@academic/constant/urls";
import { ISubject } from "@academic/interface";
import { YesNoEnum } from "@common/all.enum";
import { useFieldArray } from "react-hook-form";
import { EbookForm } from "../component/_ebook_form";
import { useRefineForm } from "@hooks/useForm";

export const BookForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "book");

  const { autocompleteProps: authorAutoProps } = useAutocomplete<ILibAuthor>({
    resource: LIBRARY_AUTHOR_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
      ];
    },
  });

  const { autocompleteProps: publisherAutoProps } = useAutocomplete<ILibPublisher>(
    {
      resource: LIBRARY_PUBLISHER_LIST,
      onSearch: (value: string) => {
        return [
          {
            field: "name",
            operator: "eq",
            value,
          },
        ];
      },
    }
  );

  const { autocompleteProps: subjectAutoProps } = useAutocomplete<ISubject>(
    {
      resource: ACADEMIC_SUBJECT_LIST,
      onSearch: (value: string) => {
        return [
          {
            field: "name",
            operator: "eq",
            value,
          },
        ];
      },
    }
  );
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    watch,
    setValue,
    saveButtonProps,
  } = useRefineForm<ILibBook, HttpError, Nullable<ILibBook>>({
    refineCoreProps: {
      meta: { customQuery: { publisher: true, subject: true, authors: true, ebooks: true } },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose
    },
  });
  const bookType = watch('book_type');
  const isEbookChecked = bookType === BookTypeEnum.Book_Ebook || bookType === BookTypeEnum.Ebook;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ebooks",
  });
  return (
    <Box width={"100%"} padding={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2} direction={{ xs: "column", lg: "column" }}>
          <Grid size={12} >
            <Typography variant="subtitle1" mb={2}>
              {t("titles.statement")}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="title"
                  label={t("fields.title")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSSelect
                  fullWidth
                  name="language"
                  label={t("fields.language")}
                  required
                  control={control}
                  errors={errors}
                >
                  {Object.values(LanguageEnum).map((e: LanguageEnum) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </CSSelect>
              </Grid>
              <Grid size={12} >
                <CSNumber
                  fullWidth
                  name="new_book"
                  label={t("fields.new_book")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSAutoComplete
                  fullWidth
                  multiple
                  required
                  getOptionLabel={(r: any) => r.name}
                  autocompleteProps={authorAutoProps}
                  name="authors"
                  label={t("fields.authors")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSAutoComplete
                  fullWidth
                  multiple
                  getOptionLabel={(r: any) => `${r.name} | ${r.code}`}
                  renderLabel={(r: any) => `${r.name} | ${r.code}`}
                  autocompleteProps={subjectAutoProps}
                  name="subject"
                  label={t("fields.subject")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSAutoComplete
                  fullWidth
                  required
                  getOptionLabel={(r: any) => r.name}
                  autocompleteProps={publisherAutoProps}
                  name="publisher"
                  label={t("fields.publisher")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSDatePicker
                  fullWidth
                  name="publish_date"
                  label={t("fields.publish_date")}
                  control={control}
                  errors={errors}
                />
              </Grid>

              <Grid size={12} >
                <CSSelect
                  fullWidth
                  name="book_type"
                  label={t("fields.book_type")}
                  placeholder={t("fields.book_type")}
                  required
                  control={control}
                  errors={errors}
                >
                  {Object.values(BookTypeEnum).map((e: BookTypeEnum) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </CSSelect>
              </Grid>
              <Grid size={12} >
                <CSNumber
                  fullWidth
                  name="price"
                  label={t("fields.price")}
                  control={control}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Second Inner Card */}
          <Grid size={12} mt={2} >
            <Typography variant="subtitle1" mb={2}>
              {t("titles.codes")}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="classification"
                  label={t("fields.classification")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="biblography"
                  label={t("fields.biblography")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="isbn"
                  label={t("fields.isbn")}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="edition"
                  label={t("fields.edition")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="cutter_no"
                  label={t("fields.cutter_no")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="pages"
                  label={t("fields.pages")}
                  control={control}
                  errors={errors}
                />
              </Grid>

              <Grid size={12} >
                <CSInput
                  fullWidth
                  name="iccn"
                  label={t("fields.iccn")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={12} >
                <CSCheckboxYesNo
                  name="is_reference"
                  control={control}
                  defaultValue={YesNoEnum.No}
                  label={t("fields.is_reference")}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </Grid>

          {isEbookChecked && (
            <Grid size={12} mt={2} >
              <Typography variant="subtitle1" mb={2}>
                {t("ebooks")}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={12} >
                  {fields.map((field: any, index) => (
                    <EbookForm name="ebooks" setValue={setValue} key={field.id} remove={remove} field={field} index={index} control={control} errors={errors} />
                  ))}
                </Grid>
                <Grid size={12} >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      append({ files: [] as IFileResponse[], remark: "", type: BookFileTypeEnum.PDF })
                    }
                    fullWidth
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ mb: 2 }}
                  >
                    {t("actions.addEbook")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          {showMore && (
            <Grid size={12} >
              <Typography variant="subtitle1" mb={2}>
                {t("titles.otherInfo")}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={12} >
                  <CSNumber
                    fullWidth
                    name="source"
                    label={t("fields.source")}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid size={12} >
                  <CSInput
                    fullWidth
                    name="keyword"
                    label={t("fields.keyword")}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid size={12} >
                  <CSInput
                    fullWidth
                    name="subtitle"
                    label={t("fields.subtitle")}
                    control={control}
                    errors={errors}
                  />
                </Grid>

                <Grid size={12} >
                  <CSInput
                    fullWidth
                    name="series"
                    label={t("fields.series")}
                    control={control}
                    errors={errors}
                  />
                </Grid>

                <Grid size={12} >
                  <CSInput
                    fullWidth
                    name="series_no"
                    label={t("fields.series_no")}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid size={12} >
                  <CSNumber
                    fullWidth
                    defaultValue={1}
                    min={1}
                    name="shortage_threshold"
                    label={t("fields.min_qty")}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid size={12} mt={2} >
            <Typography
              component="span"
              sx={{ cursor: "pointer", color: "primary.main" }}
              onClick={toggleShowMore}
            >
              {showMore ? t("actions.showLess") : t("actions.showMore")}
            </Typography>
          </Grid>
        </Grid>
        <Grid size={12} mt={2}>
          <Divider />
          <Stack direction={"row"} gap={5} mt={2} justifyContent="flex-end">
            <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
            <Button {...saveButtonProps} variant="contained">
              {t("@buttons.save")}
            </Button>
          </Stack>
        </Grid>
      </form>
    </Box >
  );
};
