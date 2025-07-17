import {
  HttpError,
} from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { ATFormProps, IUser, Nullable } from "src/interfaces";
import { Box, Button, Card, FormControlLabel, Grid2 as Grid, MenuItem, Stack, Switch, Typography } from "@mui/material";
import { CSAutoComplete, CSImage, CSInput, CSPassword, CSSelect } from "@components/input";
import { LANG_APP } from "@common/constant";
import { EMPLOYEE_STAFF_LIST } from "@employee/constant/local.urls";
import { useAutocomplete } from "@refinedev/mui";
import { IStaff } from "@employee/interface";
import { useRefineForm } from "@hooks/useForm";
import { Label } from "src/components/label";
import { IRoles } from "../interface";
import { Controller } from "react-hook-form";
import { APP_ROLE_URL } from "../constant";
import { StatusEnum } from "@common/all.enum";
import { UserTypeEnum } from "@app/constant/enums";

export const UserForm = (props: ATFormProps) => {
  const t = useTranslate(LANG_APP, "users");

  const { autocompleteProps: rolesAutoProps } = useAutocomplete<IRoles>({
    resource: APP_ROLE_URL,
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

  const { autocompleteProps: staffAutoProps } = useAutocomplete<IStaff>({
    resource: EMPLOYEE_STAFF_LIST,
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
    refineCore: { onFinish, query },
    saveButtonProps,
    watch
  } = useRefineForm<IUser, HttpError, Nullable<IUser>>({
    refineCoreProps: {
      meta: { customQuery: { image: true, staff: true, roles: true } },
      redirect: false,
      id: props.id,
      action: props.action,
      onMutationSuccess: props.onClose,
    }
  });
  const values = watch();
  const currentUser = query?.data?.data
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onFinish(data);
      })}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'Active' && 'success') ||
                  (values.status === 'Inactive' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <CSImage
                name={"image"}
                label={t("fields.image")}
                control={control}
                height={150}
                width={150}
                errors={errors}
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== StatusEnum.Active}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? StatusEnum.Inactive : StatusEnum.Active)
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Active
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <CSInput
                fullWidth
                name="name"
                label={t("fields.name")}
                control={control}
                errors={errors}
                required
              />
              <CSInput
                fullWidth
                name="phone"
                label={t("fields.phone")}
                control={control}
                errors={errors}
              />
              <CSInput
                fullWidth
                name="email"
                label={t("fields.email")}
                control={control}
                errors={errors}
                required
              />
              <CSPassword
                fullWidth
                name="password"
                label={t("fields.password")}
                control={control}
                errors={errors}
              />
              <CSSelect
                fullWidth
                name="account_type"
                label={t("fields.account_type")}
                control={control}
                errors={errors}
              >
                {Object.values(UserTypeEnum).map((e: UserTypeEnum) => {
                  return <MenuItem key={e} value={e}>{e}</MenuItem>
                })}
              </CSSelect>

              <CSAutoComplete
                fullWidth
                getOptionLabel={(r: any) => r.name}
                name="roles"
                label={t("fields.roles")}
                multiple
                autocompleteProps={rolesAutoProps}
                control={control}
                errors={errors}
              />
              <CSAutoComplete
                fullWidth
                getOptionLabel={(r: any) => r.name}
                name="staff"
                label={t("fields.staff")}
                autocompleteProps={staffAutoProps}
                control={control}
                errors={errors}
              />
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Button {...saveButtonProps} variant="contained">
                {t("@buttons.save")}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};
