import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSInput, CSSelect } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { IAccountLedgerGroup } from "../interface";
import { AccountBsHeadsEnum, AccountLedgerGroupTypeEnum } from "../constant/enum";
import { ACCOUNT_LEDGER_GROUP_URL } from "@account/constant/server.urls";
import { useRefineForm } from "@hooks/useForm";

export const LedgerGroupForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "ledgerGroup");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IAccountLedgerGroup, HttpError>({
    refineCoreProps: {
      redirect: false,
      resource: ACCOUNT_LEDGER_GROUP_URL,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const title = props.action === "edit" ? t("actions.edit") : t("actions.add");
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
            <CSInput
              fullWidth
              name="name"
              label={t("fields.name")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSSelect
              fullWidth
              name="bs_head"
              label={t("fields.bs_head")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(AccountBsHeadsEnum).map((e: AccountBsHeadsEnum) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={6}>
            <CSSelect
              fullWidth
              name="group_type"
              label={t("fields.group_type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(AccountLedgerGroupTypeEnum).map((e: AccountLedgerGroupTypeEnum) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
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
