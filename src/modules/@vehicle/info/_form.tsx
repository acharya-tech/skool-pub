import {
  HttpError,
} from "@refinedev/core";
import { IInfo } from "@vehicle/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, Nullable } from "src/interfaces";
import { Box, Button, Divider, Grid2 as Grid, MenuItem, Stack, Typography } from "@mui/material";
import { CSAutoComplete, CSDatePicker, CSHiddenInput, CSImage, CSInput, CSSelect } from "@components/input";
import { LANG_VEHICLE } from "@common/constant";
import { EMPLOYEE_STAFF_LIST } from "@employee/constant/local.urls";
import { EmployeeTypeEnum } from "@employee/constant/enums";
import { VechicleType } from "../constant/enums";
import { useAutocomplete } from "@refinedev/mui";
import { IStaff } from "@employee/interface";
import { useRefineForm } from "@hooks/useForm";

export const InfoForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_VEHICLE, "info");

  const { autocompleteProps: staffAutoProps } = useAutocomplete<IStaff>({
    resource: EMPLOYEE_STAFF_LIST,
    meta: { customQuery: { emp_type: EmployeeTypeEnum.Staff } },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
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
    refineCore: { onFinish },
    saveButtonProps,
  } = useRefineForm<IInfo, HttpError, Nullable<IInfo>>({
    refineCoreProps: {
      meta: { customQuery: { image: true, staffs: true } },
      redirect: false,
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
        <CSHiddenInput name="id" control={control} defaultValue={props.id} />
        <Grid container spacing={2}>
          <Grid size={3}>
            <CSImage
              name={`image`}
              label={t("fields.image")}
              control={control}
              height={100}
              width={100}
              error={errors}
            />
          </Grid>
          <Grid size={9}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <CSInput
                  fullWidth
                  name="name"
                  label={t("fields.name")}
                  rules={[
                    {
                      required: true
                    }
                  ]}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={6}>
                <CSAutoComplete
                  fullWidth
                  multiple
                  required
                  getOptionLabel={(r: any) => r.name}
                  autocompleteProps={staffAutoProps}
                  name="staffs"
                  label={t("fields.staff")}
                  control={control}
                  errors={errors}
                />
              </Grid>
              <Grid size={6}>
                <CSSelect
                  fullWidth
                  name="type_id"
                  label={t("fields.type")}
                  placeholder={t("fields.type")}
                  required
                  control={control}
                  errors={errors}
                >
                  {Object.values(VechicleType).map((e: VechicleType) => {
                    return <MenuItem key={e} value={e}>{e}</MenuItem>
                  })}
                </CSSelect>
              </Grid>
              <Grid size={6}>
                <CSInput
                  fullWidth
                  name="number"
                  label={t("fields.number")}
                  rules={[
                    {
                      required: true
                    }
                  ]}
                  required
                  control={control}
                  errors={errors}
                />
              </Grid>

            </Grid>
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
