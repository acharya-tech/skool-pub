import { HttpError} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
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
  CSInput,
  CSNumber,
  CSSelect
} from "@components/input";
import { LANG_INVENTORY} from "@common/constant";
import { IStoreProduct } from "../interface";
import { INVENTORY_PRODUCT_URL, ProductCategoryEnum, ProductTypeEnum } from "../constant";
import { useRefineForm } from "@hooks/useForm";

export const ProductForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "product");

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    saveButtonProps,
  } = useRefineForm<IStoreProduct, HttpError, Nullable<IStoreProduct>>({
    refineCoreProps: {
      resource: INVENTORY_PRODUCT_URL,
      redirect: false,
      action: props.action,
      onMutationSuccess: props.onClose,
    },
  });



  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
  return (
    <Box p={2}>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Grid container spacing={3}>
          <Grid size={3} >
            <CSInput
              fullWidth
              name="code"
              label={t("fields.code")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
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
            <CSNumber
              fullWidth
              name="life_expn"
              label={t("fields.life_expn")}
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid size={3}>
            <CSNumber
              fullWidth
              name="min_qty"
              label={t("fields.min_qty")}
              required
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid size={3}>
            <CSInput
              fullWidth
              name="si_units"
              label={t("fields.si_units")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={3}>
            <CSSelect
              fullWidth
              name="type"
              label={t("fields.type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ProductTypeEnum).map((e: ProductTypeEnum) => {
                return (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </CSSelect>
          </Grid>



          <Grid size={3}>
            <CSSelect
              fullWidth
              name="category"
              label={t("fields.category")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(ProductCategoryEnum).map((e: ProductCategoryEnum) => {
                return (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </CSSelect>
          </Grid>
          <Grid size={12}>
            <CSInput
              fullWidth
              multiline={3}
              name="description"
              label={t("fields.description")}
              control={control}
              errors={errors}
            />
          </Grid>



          <Grid size={12} mt={2}>
            <Divider />
            <Stack direction={"row"} gap={2} mt={2} justifyContent="flex-end">
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
