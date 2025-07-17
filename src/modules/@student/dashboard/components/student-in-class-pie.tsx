import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart, ChartLegends } from 'src/components/chart';
import { fNumber } from '@utils/format-number';
import { VEHICLE_DASHBOARD_URL } from '@vehicle/constant';
import { useOne } from '@refinedev/core';
import { IPieReportDto } from 'src/interfaces';
import { VEHICLE_DASHBOARD_VEHICLE_STUDENT_ID } from '@vehicle/constant/constants';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_STUDENT } from '@common/constant';
import { STUDENT_DASHBOARD_URL } from '@student/constant';
import { STUDENT_DASHBOARD_CERTIFICATE_PIE_ID, STUDENT_DASHBOARD_STUDENTINCLASS_PIE_ID } from '@student/constant/constant';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart?: {
    colors?: string[];
    options?: ChartOptions;
  };
};

export function StudentInClassPie({ title, chart, subheader, sx, ...other }: Props) {
  const t = useTranslate(LANG_STUDENT, "dashboard")
  const theme = useTheme();
  const { data: chartDataRaw } = useOne<IPieReportDto>({
    resource: STUDENT_DASHBOARD_URL,
    id: STUDENT_DASHBOARD_STUDENTINCLASS_PIE_ID
  })
  const chartData = chartDataRaw?.data?.data ?? []
  const chartSeries = chartData?.map((item) => item.value);

  const chartColors = chart?.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.light,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chartData?.map((item) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart?.options,
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title ?? t("labels.certificatePie")} subheader={subheader} />
      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        sx={{
          my: 6,
          mx: 'auto',
          width: { xs: 240, xl: 260 },
          height: { xs: 240, xl: 260 },
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}
