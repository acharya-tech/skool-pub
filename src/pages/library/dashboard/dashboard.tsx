import { LegendToggleRounded } from "@mui/icons-material";
import { Select, Typography } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Card, Grid2 as Grid } from "@mui/material";
import { HttpError, useList } from "@refinedev/core";
import { LANG_LIBRARY } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import {
  LIBRARY_DASHBOARD_FINE_DATE,
  LIBRARY_DASHBOARD_REPORT_LIST,
  LIBRARY_PATRON_TYPE_CHART,
} from "@library/constant";
import { ILibDashboardReport } from "@library/interface";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";

const LibraryDashboard = () => {
  const t = useTranslate(LANG_LIBRARY, "dashboard");

  const { data } = useList<ILibDashboardReport, HttpError>({
    resource: LIBRARY_DASHBOARD_REPORT_LIST,
  });

  const dashboardReport = data?.data;

  // const stats = [
  //   {
  //     label: t("titles.fine"),
  //     value: dashboardReport?.fine?.total || "N/A",
  //     icon: <AiOutlineDollarCircle />,
  //     color: "#8E7DFF",
  //   },
  //   {
  //     label: t("titles.book"),
  //     value: dashboardReport?.book,
  //     icon: <AiOutlineBook />,
  //     color: "#FFDD82",
  //   },
  //   {
  //     label: t("titles.total_copies"),
  //     value: dashboardReport?.bookCopy,
  //     icon: <AiOutlineCopy />,
  //     color: "#FF9999",
  //   },
  //   {
  //     label: t("titles.patron"),
  //     value: dashboardReport?.patron,
  //     icon: <AiOutlineUser />,
  //     color: "#72D9B5",
  //   },
  // ];

  const lineChartData = [
    { name: "1 day", checkIn: 40, checkOut: 30, overdue: 20, reserved: 10 },
    { name: "2 days", checkIn: 30, checkOut: 20, overdue: 40, reserved: 30 },
    { name: "4 days", checkIn: 20, checkOut: 40, overdue: 10, reserved: 40 },
    { name: "6 days", checkIn: 40, checkOut: 10, overdue: 30, reserved: 20 },
    { name: "8 days", checkIn: 30, checkOut: 20, overdue: 40, reserved: 10 },
  ];



  const dummyData = [
  {
    date: "2025-01-03T18:15:00.000Z",
    count: 3,
  },
  {
    date: "2025-01-04T18:15:00.000Z",
    count: 5,
  },
  {
    date: "2025-01-05T18:15:00.000Z",
    count: 8,
  },
  {
    date: "2025-01-06T18:15:00.000Z",
    count: 10,
  },
  {
    date: "2025-01-07T18:15:00.000Z",
    count: 7,
  },
  {
    date: "2025-01-08T18:15:00.000Z",
    count: 6,
  },
  {
    date: "2025-01-09T18:15:00.000Z",
    count: 4,
  },
];


    const { data: billUserTypeCount } = useList<any>({
      resource: LIBRARY_PATRON_TYPE_CHART,
    });
    const patronTypeData = billUserTypeCount?.data;
  

  const { data: fineDataList } = useList<ILibDashboardReport, HttpError>({
    resource: LIBRARY_DASHBOARD_FINE_DATE,
  });

  const fineData = fineDataList?.data;


  return (
    <>
      <h2>{t("dashboard")}</h2>
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {/* {stats.map((stat, index) => (
          <Grid size={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: stat.color,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))} */}

        {/* Line Chart */}
        <Grid size={12} >
          <Card style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Typography variant="h6">Check IN/OUT Statistics</Typography>
              <Select defaultValue="1D" size="small">
                <MenuItem value="1D">1D</MenuItem>
                <MenuItem value="1W">1W</MenuItem>
                <MenuItem value="Max">Max</MenuItem>
              </Select>
            </div>
            <LineChart
              width={900}
              height={300}
              data={lineChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {/* <Tooltip /> */}
              <Line type="monotone" dataKey="checkIn" stroke="#8E7DFF" />
              <Line type="monotone" dataKey="checkOut" stroke="#FFDD82" />
              <Line type="monotone" dataKey="overdue" stroke="#FF9999" />
              <Line type="monotone" dataKey="reserved" stroke="#72D9B5" />
            </LineChart>
          </Card>
        </Grid>

        {/* Pie Chart with Legend */}
        <Grid size={12} >
          <Card style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Typography variant="h6">Patron Details</Typography>
            </div>
            <Grid container spacing={2}>
              <Grid size={8}>
                <PieChart width={300} height={250}>
                <Pie
                  data={patronTypeData}
                  dataKey="count"
                  nameKey="patron_type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  // label
                >
                  {patronTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                  {/* <Tooltip /> */}
                  <LegendToggleRounded />
                </PieChart>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Fine Bar Chart */}
        <Grid size={12} >
          <Card style={{ padding: "16px" }}>
            <Typography variant="h6">Fine Statistics</Typography>
            <BarChart
              width={500}
              height={300}
              data={fineData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {/* <Tooltip /> */}
              <Bar dataKey="fine" fill="#8E7DFF" />
            </BarChart>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LibraryDashboard;
