import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';
import { useOne } from '@refinedev/core';
import { IDataActivityReportDto } from 'src/interfaces';
import { VEHICLE_DASHBOARD_URL } from '@vehicle/constant';
import { VEHICLE_DASHBOARD_DATA_ACTIVITY_ID } from '@vehicle/constant/constants';
import { fNumber } from '@utils/format-number';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_STUDENT } from '@common/constant';
import { STUDENT_DASHBOARD_URL } from '@student/constant';
import { STUDENT_DASHBOARD_STUDENTINCLASS_ID } from '@student/constant/constant';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart?: {
    colors?: string[];
    options?: ChartOptions;
  };
};

export function StudentInClass({ title, subheader, chart, sx, ...other }: Props) {
  const t = useTranslate(LANG_STUDENT, "dashboard")
  const theme = useTheme();
  const { data: chartData } = useOne<IDataActivityReportDto>({
    resource: STUDENT_DASHBOARD_URL,
    id: STUDENT_DASHBOARD_STUDENTINCLASS_ID
  })
  const chartDataRaw = chartData?.data ?? {
    categories: [],
    data: [],
    name: title
  };
  const chartColors = chart?.colors ?? [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    hexAlpha(theme.palette.grey[500], 0.48),
  ];

  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    stroke: { width: 0 },
    legend: { show: true },
    xaxis: { categories: chartDataRaw?.categories },
    tooltip: { y: { formatter: (value: number) => fNumber(value) } },
    ...chart?.options,
  });


  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title ?? t("labels.studentInClass")}
        subheader={subheader}
      />
      <Chart
        type="bar"
        series={chartDataRaw.data}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 370,
        }}
      />
    </Card>
  );
}
