import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import {
  Box,
  Button,
  Grid2 as Grid,
  MenuItem,
  Stack,
} from "@mui/material";
import { CSDatePicker, CSInput, CSSelect } from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreProcurementCreate } from "../interface";
import {
  INVENTORY_PROCUREMENT_LIST,
  ProcurementEnum,
} from "../constant";
import { useRefineForm } from "@hooks/useForm";

export const ProcurementForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "procurement");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IStoreProcurementCreate, HttpError, Nullable<IStoreProcurementCreate>>({
    refineCoreProps: {
      resource: INVENTORY_PROCUREMENT_LIST,
      redirect: false,
      action: props.action,
      onMutationSuccess: props.onClose,

    },
    defaultValues: {
      entry_date: new Date(),
    },
  });

  return (
    <Box p={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onFinish({ ...data }); // Pass products with the form data
        })}
      >
        <Grid container spacing={3}>
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
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
              defaultValue={query?.data?.data?.type}
            >
              {Object.values(ProcurementEnum).map((e: ProcurementEnum) => {
                return (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </CSSelect>
          </Grid>
          <Grid size={4}>
            <CSDatePicker
              fullWidth
              name="entry_date"
              label={t("fields.entry_date")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSInput
              fullWidth
              multiline={3}
              name="remark"
              label={t("fields.remark")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Stack direction={"row"} gap={2} mt={4} justifyContent="flex-end">
          <Button onClick={props.onClose}>{t("@buttons.cancel")}</Button>
          <Button {...saveButtonProps} variant="contained">
            {t("@buttons.save")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
