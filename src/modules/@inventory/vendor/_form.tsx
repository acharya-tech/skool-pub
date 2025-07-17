import { HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { CSInput } from "@components/input";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreVendor } from "../interface";

import {
  INVENTORY_VENDOR_URL,
} from "../constant";
import { useRefineForm } from "@hooks/useForm";

export const VendorForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "vendor");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IStoreVendor, HttpError, Nullable<IStoreVendor>>({
    refineCoreProps: {
      resource: INVENTORY_VENDOR_URL,
      redirect: false,
      action: props.action,
      onMutationSuccess: props.onClose,
    },
  });

  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");

  console.log(query?.data?.data);
  return (
    <Box p={2}>
      <Typography variant="h6">{title}</Typography>

      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish({ ...data });
        })}
      >
        <Grid container spacing={3}>
          <Grid size={3}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSInput
              fullWidth
              name="address"
              label={t("fields.address")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSInput
              fullWidth
              name="phone"
              label={t("fields.phone")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSInput
              fullWidth
              name="email"
              label={t("fields.email")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <CSInput
              fullWidth
              multiline={3}
              name="description"
              label={t("fields.description")}
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
