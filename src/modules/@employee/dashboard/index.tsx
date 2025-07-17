import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';

import { StaffByType } from './components/staff-by-type';
import { Grid2 as Grid } from '@mui/material';
import { StaffBirthday } from './components/staff-birthday';
import { WidgetList } from './components/widget-list';
import { NewStaff } from './components/new-staff';
import { GroupPie } from './components/group-pie';

// ----------------------------------------------------------------------

export function EmployeeDashboard() {
  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={[
        (theme) => ({
          borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}` },
        }),
      ]}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box
          sx={[
            (theme) => ({
              gap: 3,
              display: 'flex',
              minWidth: { lg: 0 },
              py: { lg: 3, xl: 5 },
              flexDirection: 'column',
              flex: { lg: '1 1 auto' },
              px: { xs: 2, sm: 3, xl: 5 },
              borderRight: {
                lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              },
            }),
          ]}
        >
          <WidgetList />
          <Box>
            <Grid container spacing={3}>
              <Grid size={8}>
                <StaffByType />
              </Grid>
              <Grid size={4}>
                <StaffBirthday />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid size={8}>
                <NewStaff />
              </Grid>
              <Grid size={4}>
                <GroupPie />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
