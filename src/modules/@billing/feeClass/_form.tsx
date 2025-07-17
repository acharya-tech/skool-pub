import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSNumber, CSSelect } from "@components/input";
import { IBillFee, IBillFeeClass } from "../interface";
import { LANG_BILLING } from "@common/constant";
import { BillFeeClassTypeEnum, BillFeeModuleEnum, BILLING_FEE_CLASS_URL, BILLING_FEE_ITEM_URL } from "../constant";
import { useAutocomplete } from "@refinedev/mui";
import { IClass, IClassSubject, ISubject } from "@academic/interface";
import { IStoreHouse } from "@inventory/interface";
import { INVENTORY_HOUSE_URL } from "@inventory/constant";
import { ACADEMIC_CLASS_SUBJECT_URL, ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { useRefineForm } from "@hooks/useForm";

export const FeeClassForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_BILLING, "feeClass");
  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, query },
    watch,
    saveButtonProps,
  } = useRefineForm<IBillFeeClass, HttpError>({
    refineCoreProps: {
      resource: BILLING_FEE_CLASS_URL,
      meta: {
        customQuery: {
          fee: true,
          class: true,
          batch: true,
          subject: true
        }
      },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });

  const { autocompleteProps: feeAutoProps } = useAutocomplete<IBillFee>({
    resource: BILLING_FEE_ITEM_URL,
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
  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
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

  // const { autocompleteProps: yearAutoProps } = useAutocomplete<IAccountYear>({
  //   resource: ACCOUNT_YEAR_URL,
  //   onSearch: (value: string) => {
  //     return [
  //       {
  //         field: "name",
  //         operator: "eq",
  //         value,
  //       }
  //     ];
  //   },
  // });
  const classModel = watch("class")
  const postType = watch("post_type")
  const moduleType = watch("module_type")
  const { autocompleteProps: subjectAutoProps } = useAutocomplete<IClassSubject>({
    meta: {
      customQuery: {
        class_id: classModel?.id,
        subject: true
      }
    },
    resource: ACADEMIC_CLASS_SUBJECT_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "subject_name",
          operator: "eq",
          value,
        }
      ];
    },
    queryOptions: {
      enabled: !!classModel
    }
  });

  const { autocompleteProps: storeHouseAutoProps } = useAutocomplete<IStoreHouse>({
    resource: INVENTORY_HOUSE_URL,
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
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: IBillFee) => `${r.name}`}
              autocompleteProps={feeAutoProps}
              name="fee"
              label={t("fields.fee")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSAutoComplete
              fullWidth
              getOptionLabel={(r: IClass) => `${r.name}`}
              autocompleteProps={classAutoProps}
              name="class"
              label={t("fields.class")}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSNumber
              fullWidth
              name="amount"
              label={t("fields.amount")}
              required
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid size={6}>
            <CSSelect
              fullWidth
              name="post_type"
              label={t("fields.post_type")}
              required
              control={control}
              errors={errors}
            >
              {Object.values(BillFeeClassTypeEnum).map((e: BillFeeClassTypeEnum) => {
                return <MenuItem value={e} key={e}>{e}</MenuItem>
              })}
            </CSSelect>
          </Grid>
          <Grid size={6}>
            {postType === BillFeeClassTypeEnum.Subject && (
              <CSAutoComplete
                fullWidth
                required
                disabled={!classModel}
                getOptionLabel={(r: ISubject) => `${r.code} | ${r.name}`}
                autocompleteProps={subjectAutoProps}
                isOptionEqualToValue={((option: IClassSubject, value: ISubject) => { return option.subject.id === value.id })}
                onChange={(newValue: IClassSubject, field: any) => {
                  field.onChange(newValue?.subject);
                }}
                renderLabel={(r: IClassSubject) => `${r.subject.code} | ${r.subject.name}`}
                name="subject"
                label={t("fields.subject")}
                control={control}
                errors={errors}
              />
            )}
            {postType === BillFeeClassTypeEnum.Module && (
              <CSSelect
                fullWidth
                name="module_type"
                label={t("fields.module_type")}
                required
                control={control}
                errors={errors}
              >
                {Object.values(BillFeeModuleEnum).map((e: BillFeeModuleEnum) => {
                  return <MenuItem value={e} key={e}>{e}</MenuItem>
                })}
              </CSSelect>
            )}
          </Grid>
          <Grid size={6}>
            {moduleType === BillFeeModuleEnum.Store && (
              <CSAutoComplete
                fullWidth
                getOptionLabel={(r: IStoreHouse) => `${r.code} | ${r.name}`}
                autocompleteProps={storeHouseAutoProps}
                required
                name="module"
                label={t("fields.module")}
                control={control}
                errors={errors}
              />
            )}
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
