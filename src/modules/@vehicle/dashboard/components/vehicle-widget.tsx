import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fNumber } from '@utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  value: number;
  icon: string;
};

export function VehicleWidget({ title, value, icon, sx, ...other }: Props) {

  return (
    <Card
      sx={[
        () => ({
          p: 2,
          pl: 3,
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
        <Box sx={{ my: 1.5, typography: 'h3' }}>{fNumber(value)}</Box>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component="img" src={icon} sx={{ width: 60, height: 60 }} />
      </Box>
    </Card>
  );
}
