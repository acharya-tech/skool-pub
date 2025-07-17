import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';

import { Grid2 as Grid } from '@mui/material';
import { WidgetList } from './components/widget-list';
import { SubjectTypePie } from './components/subject-by-type-pie';
import { RunningSchedule } from './components/runningSchedule';

export function AcademicDashboard() {
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
                <RunningSchedule />
              </Grid>
              <Grid size={4}>
                <SubjectTypePie />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
