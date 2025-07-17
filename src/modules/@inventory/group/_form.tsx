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
import {
  INVENTORY_GROUP_LIST,
  INVENTORY_GROUP_URL,
} from "../constant";
import { IStoreGroup } from "../interface";
import { useNav } from "@hooks/useNavlHook";
import { useRefineForm } from "@hooks/useForm";

export const GroupForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_INVENTORY, "groups");
  const { show } = useNav(INVENTORY_GROUP_LIST);
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IStoreGroup, HttpError, Nullable<IStoreGroup>>({
    refineCoreProps: {
      resource: INVENTORY_GROUP_URL,
      redirect: false,
      action: props.action,
      onMutationSuccess: (data) => {
        show(data?.data?.id)
        props.onClose()
      },
    },
  });

  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 2 }} />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish({ ...data });
        })}
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
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
