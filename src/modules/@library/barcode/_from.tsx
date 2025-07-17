import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSInput, CSNumber } from "@components/input";
import { LANG_LIBRARY } from "@common/constant";
import { useRefineForm } from "@hooks/useForm";
// import { useAutocomplete } from "@refinedev/mui";
// import { LIBRARY_PATRON_TYPE_LIST } from "../constant/local.urls";
// import { ILibPatronType } from "../interface";

export const BarcodeForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_LIBRARY, "barcode");

  // const { autocompleteProps: busAutoProps } = useAutocomplete<ILibPatronType>({
  //   resource: LIBRARY_PATRON_TYPE_LIST,
  //   onSearch: (value: string) => {
  //     return [
  //       {
  //         field: "name",
  //         operator: "eq",
  //         value
  //       }
  //     ]
  //   }
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IInfo, HttpError, Nullable<IInfo>>({
    refineCoreProps: {
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  return (
    <Box p={4}>
      <Typography variant="h6" textAlign={"center"}>{t("actions.add")}</Typography>
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
              name="last_barcode_number"
              label={t("fields.last_barcode_number")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="number_of_barcode"
              label={t("fields.number_of_barcode")}
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
