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

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart?: {
    colors?: string[];
    options?: ChartOptions;
  };
};

export function VehicleDataActivity({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const { data: chartData } = useOne<IDataActivityReportDto>({
    resource: VEHICLE_DASHBOARD_URL,
    id: VEHICLE_DASHBOARD_DATA_ACTIVITY_ID
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
        title={title}
        subheader={subheader}
      // action={
      //   <ChartSelect
      //     options={["Yearly", "Monthly", "Weekly", "Daily"]}
      //     value={selectedSeries}
      //     onChange={handleChangeSeries}
      //   />
      // }
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
