import { HttpError, useCustom } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput, CSHiddenInput, CSLabel, CSNumber, CSCheckboxYesNo } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { useRef, useState, useEffect } from "react";
import { NEW_BOOK_URL } from "../constant";
import { ILibBookCopy } from "../interface";
import { BASE_URL } from "@common/options";
import { YesNoEnum } from "@common/all.enum";
import { useRefineForm } from "@hooks/useForm";

export const AcessionBookForm = (props: any) => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const isNext = useRef<boolean>(false);

  const book = props.book;

  const [remainingBooks, setRemainingBooks] = useState(book?.new_book || 0);

  useEffect(() => {
    setRemainingBooks(book?.new_book || 0);
  }, [book]);

  // TODO : replace this useCustom with dataProvider
  const { data, refetch } = useCustom<ILibBookCopy>({
    method: "get",
    url: `${BASE_URL}/${NEW_BOOK_URL}/max`,
  });
  useEffect(() => {
    if (data) {
      setValue("accession_id", Number(data?.data?.accession_id ?? 10000) + 1);
    }
  }, [data])

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
    setValue
  } = useRefineForm<ILibBookCopy, HttpError, Nullable<ILibBookCopy>>({
    refineCoreProps: {
      meta: { customQuery: { book: true } },
      resource: NEW_BOOK_URL,
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: (data) => {
        if (!isNext.current || remainingBooks === 1) {
          props.onClose?.();
        } else {
          setRemainingBooks(Number(data?.data?.book?.new_book));
          refetch()
        }
      },
    },
  });

  const handleSaveClick = (e: React.MouseEvent) => {
    isNext.current = false;
    saveButtonProps.onClick(e);
  };

  const handleAddMoreClick = (e: React.MouseEvent) => {
    isNext.current = true;
    saveButtonProps.onClick(e);
  };

  const isSaveAndContinueDisabled = remainingBooks === 0;

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid size={6}>
          <Typography variant="h6">{t("titles.addAccession")}</Typography>
        </Grid>
        <Grid size={6} textAlign="right">
          <Typography variant="h6">
            {t("titles.reminingNewBook")} : {remainingBooks}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid size={3}>
            <CSLabel label={t("fields.last_accession_no")} defaultValue={data?.data.accession_no ?? "Not set"} />
          </Grid>
          <Grid size={3}>
            <CSLabel label={t("fields.next_accession_id")} defaultValue={(Number(data?.data?.accession_id ?? 10000) + 1)} />
          </Grid>
          <Grid size={6}>
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
          <Grid size={6} >
            <CSInput
              fullWidth
              name="edition"
              defaultValue={book?.edition}
              label={t("fields.edition")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6} >
            <CSNumber
              fullWidth
              name="price"
              min={0}
              defaultValue={book?.price}
              label={t("fields.price")}
              required
              control={control}
              errors={errors}
            />
            <CSHiddenInput
              name="book_id"
              control={control}
              defaultValue={book?.id} // Default value for book_id based on passed book data
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
            <Stack direction={"row"} gap={3} mt={2} justifyContent="flex-end">
              <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
              <Button
                {...saveButtonProps}
                onClick={handleSaveClick}
                variant="contained"
              >
                {t("@buttons.save")}
              </Button>
              <Button
                {...saveButtonProps}
                onClick={handleAddMoreClick}
                variant="contained"
                color="info"
                disabled={isSaveAndContinueDisabled} // Disable if no remaining books
              >
                {t("@actions.stepNext")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
