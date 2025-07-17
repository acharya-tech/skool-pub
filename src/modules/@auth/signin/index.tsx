import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { LoginFormTypes, useActiveAuthProvider, useLogin } from '@refinedev/core';
import { ILoginUser } from '../interface';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { CSInput, CSPassword } from '@components/input';
import { FormHead } from '../components/form-head';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_AUTH } from '@common/constant';

export const SignInView = () => {
  const t = useTranslate(LANG_AUTH, "signin")
  const router = useRouter();

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const methods = useForm({
    defaultValues: {
      email: "sksharma72000@gmail.com",
      password: "123456789"
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      login(data)
    } catch (error) {
    }
    return false
  });
  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <CSInput
        fullWidth
        type='email'
        name="email"
        control={control}
        label={t("fields.email")}
        required
        errors={errors}
      />
      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >{t("actions.forgot")}</Link>

        <CSPassword
          fullWidth
          name="password"
          control={control}
          label={t("fields.password")}
          required
          errors={errors}
        />
      </Box>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >{t("actions.signin")}</LoadingButton>
    </Box >
  );

  return (
    <>
      <FormHead
        title={t("titles.signin")}
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          {renderForm()}
        </form>
      </FormProvider>
    </>
  );
}
