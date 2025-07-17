import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';

import { StudentInClass } from './components/student-in-class';
import { Grid2 as Grid } from '@mui/material';
import { StudentBirthday } from './components/student-birthday';
import { RecentCertificate } from './components/recent-certificate';
import { CertificatePie } from './components/certificate-pie';
import { WidgetList } from './components/widget-list';
import { PendingAdmission } from './components/pending-admission';
import { AdmissionPie } from './components/admission-pie';

// ----------------------------------------------------------------------

export function StudentDashboard() {
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
                <StudentInClass />
              </Grid>
              <Grid size={4}>
                <StudentBirthday />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid size={8}>
                <PendingAdmission />
              </Grid>
              <Grid size={4}>
                <AdmissionPie />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid size={8}>
                <RecentCertificate />
              </Grid>
              <Grid size={4}>
                <CertificatePie />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
