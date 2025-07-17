import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSInput } from "@components/input";
import { LANG_ACCOUNT } from "@common/constant";
import { IAccountLedger, IAccountLedgerGroup } from "../interface";
import { useAutocomplete } from "@refinedev/mui";
import { ACCOUNT_LEDGER_GROUP_URL, ACCOUNT_LEDGER_URL } from "../constant/server.urls";
import { useRefineForm } from "@hooks/useForm";

export const LedgerForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_ACCOUNT, "ledger");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IAccountLedger, HttpError>({
    refineCoreProps: {
      redirect: false,
      id: props.id,
      action: props.action,
      resource: ACCOUNT_LEDGER_URL,
      onMutationSuccess: props.onClose,
      meta: {
        customQuery: {
          ledgerGroup: true
        }
      }
    }
  });

  const { autocompleteProps: lgroupAutoProps } = useAutocomplete<IAccountLedgerGroup>({
    resource: ACCOUNT_LEDGER_GROUP_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        }
      ];
    },
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
            <CSInput
              fullWidth
              name="code"
              label={t("fields.code")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              required
              getOptionLabel={(r: IAccountLedgerGroup) => `${r.name}`}
              autocompleteProps={lgroupAutoProps}
              name="ledgerGroup"
              label={t("fields.ledgerGroup")}
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
