import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';
import { IUser } from 'src/interfaces';
import { ActiveStatusChip } from '@components/label/status.label';
import NoDataLabel from '@components/other/no.data';
import { TextLabel } from '@components/other/text.label';


// ----------------------------------------------------------------------

type Props = {
  info?: IUser;
};

export function ProfileHome({ info }: Props) {

  const renderAbout = () => (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
        <Box>{info?.staff?.name}</Box>
        <Box sx={{ display: 'flex' }}>
          <Iconify width={24} icon="mingcute:location-fill" sx={{ mr: 2 }} />
          {info?.address}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Iconify width={24} icon="fluent:mail-24-filled" sx={{ mr: 2 }} />
          {info?.email}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Iconify width={24} icon="fluent:phone-24-filled" sx={{ mr: 2 }} />
          <TextLabel text={info?.phone} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Iconify width={24} icon="ic:round-business-center" sx={{ mr: 2 }} />
          {info?.address}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Iconify width={24} icon="ic:round-business-center" sx={{ mr: 2 }} />
          <ActiveStatusChip status={info?.status} />
        </Box>
      </Stack>
    </Card>
  );


  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        {renderAbout()}
      </Grid>
    </Grid>
  );
}
