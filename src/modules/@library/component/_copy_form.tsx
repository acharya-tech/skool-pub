import {
  HttpError,
  useInvalidate,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSCheckboxYesNo, CSHiddenInput, CSInput, CSNumber } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { useAutocomplete } from "@refinedev/mui";
import { LIBRARY_BOOK_COPY_LIST, LIBRARY_BOOK_LIST } from "../constant/local.urls";
import { ILibBook, ILibBookCopy } from "../interface";
import { YesNoEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const BookCopyForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const invalidate = useInvalidate();
  const { autocompleteProps: bookAutoProps } = useAutocomplete<ILibBook>({
    resource: LIBRARY_BOOK_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "title",
          operator: "eq",
          value
        },
        {
          field: "id",
          operator: "eq",
          value
        }
      ]
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<ILibBookCopy, HttpError, Nullable<ILibBookCopy>>({
    refineCoreProps: {
      resource: LIBRARY_BOOK_COPY_LIST,
      meta: {
        customQuery: {
          book: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: () => {
        invalidate({
          id: query?.data?.data?.book_id,
          invalidates: ['detail'],
          resource: LIBRARY_BOOK_LIST,
        });
        props.onClose();
      },
    }
  });

  return (
    <Box>
      <Typography variant="h6">{t("titles.edit")}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={4}>
            <CSHiddenInput name="id" control={control} defaultValue={props?.id} />
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: any) => (`${r.id} | ${r.title}`)}
              autocompleteProps={bookAutoProps}
              renderLabel={(r: any) => (`${r.id} | ${r.title}`)}
              placeholder={t("fields.book")}
              name={"book"}
              label={t("fields.book")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSInput
              fullWidth
              name="prefix"
              label={t("fields.prefix")}
              required
              rules={{
                validate: (value: string) => {
                  if (value.length < 2 || value.length > 5) {
                    return t('validation.prefix')
                  }
                }
              }}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSNumber
              fullWidth
              name="accession_id"
              label={t("fields.accession_id")}
              min={10001}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4} >
            <CSInput
              fullWidth
              name="edition"
              label={t("fields.edition")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4} >
            <CSNumber
              fullWidth
              name="price"
              min={0}
              label={t("fields.price")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={4}>
            <CSCheckboxYesNo
              name="is_gifted"
              control={control}
              defaultValue={YesNoEnum.No}
              label={t("fields.is_gifted")}
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
