import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { ServerErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useTranslate } from '@hooks/useTranslate';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export function View500() {
  const t = useTranslate("common", "error")
  return (
    <Container component={MotionContainer}>
      <Stack ml={-25} direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>{t('403Title')}</Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>{t('403Description')}</Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">{t('goHome')}</Button>
      </Stack>
    </Container>
  );
}
