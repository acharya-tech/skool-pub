import { useState } from "react";
import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { } from "recharts";

import { HttpError, useList, useOne } from "@refinedev/core";
import {
  IStoreBilling,
  IStoreDashboardReport,
  IStoreInEntry,
  IStoreItemCheckOut,
  IStoreProduct,
  IStorePurchaseSales,
  IStoreRequisition,
} from "../interface";
import { TableListProp } from "src/interfaces";
import { LANG_INVENTORY } from "@common/constant";
import { useTranslate } from "@hooks/useTranslate";
import {
  INVENTORY_BILLING_NAME,
  INVENTORY_DASHBOARD_BILL_TYPE_COUNT,
  INVENTORY_DASHBOARD_IN_OUT_REPORT,
  INVENTORY_DASHBOARD_REPORT_LIST,
  INVENTORY_DASHBOARD_REQUISITION_STATUS_COUNT,
  INVENTORY_INENTRY_LIST,
  INVENTORY_ITEM_CHECKOUT_LIST,
  INVENTORY_PRODUCT_LIST,
  INVENTORY_REQUISITION_LIST,
  INVENTORY_SALES_URL,
  ProductCategoryEnum,
} from "../constant";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid2 as Grid,
  LinearProgress,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ListItemText } from "@mui/material";
import { DateLabel } from "@components/label/date.label";

// Mock data
const weeklyActivityData = [
  { day: "Sunday", in: 5000, out: 7000 },
  { day: "Monday", in: 8000, out: 12000 },
  { day: "Tuesday", in: 15000, out: 14000 },
  { day: "Wednesday", in: 20000, out: 23000 },
  { day: "Thursday", in: 25000, out: 21000 },
  { day: "Friday", in: 30000, out: 28000 },
  { day: "Saturday", in: 27000, out: 29000 },
];

const monthlyActivityData = [
  { week: "Week 1", in: 150000, out: 200000 },
  { week: "Week 2", in: 170000, out: 220000 },
  { week: "Week 3", in: 180000, out: 240000 },
  { week: "Week 4", in: 190000, out: 260000 },
];

const dummyData = {
  stockDetails: [
    {
      date: "2024-01-25",
      productName: "Scout Dress Materials",
      title: "received from tailor",
      quantity: 114,
      status: "Available",
      life: "31day(s) 0Hour(s)",
    },
    // Add more entries as needed
  ],
  lowStockProducts: [
    {
      name: "White Board Markers",
      total: 512,
      out: 492,
      remaining: 20,
      percentage: 86.5,
    },
    {
      name: "Brooms",
      total: 512,
      out: 492,
      remaining: 20,
      percentage: 84.5,
    },
    {
      name: "Brooms",
      total: 512,
      out: 410,
      remaining: 200,
      percentage: 79.5,
    },
    // Add more entries as needed
  ],
};

export const Dashboard = () => {
  const t = useTranslate(LANG_INVENTORY, "dashboard");

  const [selectedCategory, setSelectedCategory] = useState("Packet");

  const { data } = useList<IStoreDashboardReport, HttpError>({
    resource: INVENTORY_DASHBOARD_REPORT_LIST,
  });

  const dashboardReport = data?.data;

  const { data: productListData } = useList<IStoreProduct, HttpError>({
    resource: INVENTORY_PRODUCT_LIST,
    filters: [
      {
        field: "category",
        operator: "eq",
        value: selectedCategory,
      },
    ],
  });

  const { data: inEntryData } = useList<IStoreInEntry, HttpError>({
    resource: INVENTORY_INENTRY_LIST,
    meta: { customQuery: { user: true, procument: true, items: true } },
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });
  const inEntry = inEntryData?.data[0];


  const { data: outEntryData } = useList<IStoreItemCheckOut, HttpError>({
    resource: INVENTORY_SALES_URL,
    meta: { customQuery: { user: true, items: true } },
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });
  const outEntry = outEntryData?.data[0];

  const { data: productData } = useList<IStoreProduct, HttpError>({
    resource: INVENTORY_PRODUCT_LIST,
  });
  const stocklist = productData?.data;

  const { data: billdatalist } = useList<IStoreBilling, HttpError>({
    resource: INVENTORY_BILLING_NAME,
  });
  const billData = billdatalist?.data;

  const { data: requisitionDataList } = useList<IStoreRequisition, HttpError>({
    resource: INVENTORY_REQUISITION_LIST,
  });
  const requisitionData = requisitionDataList?.data;

  const { data: billUserTypeCount } = useList<any>({
    resource: INVENTORY_DASHBOARD_BILL_TYPE_COUNT,
  });
  const billUserData = billUserTypeCount?.data;
  console.log(billUserData, "billUserData")

  const { data: requisitionTypeCount } = useList<any>({
    resource: INVENTORY_DASHBOARD_REQUISITION_STATUS_COUNT,
  });
  const requistionTypeCount = requisitionTypeCount?.data;

  console.log(requisitionTypeCount, "requisitionTypeCount")

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const ProductList = productListData?.data;

  const dummyActivities = [
    {
      avatar: "",
      description: "Created a bill for Ramesh Acharya",
      time: "Just now",
    },
    {
      avatar: "",
      description: "Released a new version.",
      time: "59 minutes ago",
    },
    { avatar: "", description: "Submitted a bug.", time: "12 hours ago" },
    {
      avatar: "",
      description: "Modified A data in Page X.",
      time: "Today, 11:59 AM",
    },
    {
      avatar: "",
      description: "Modified A data in Page X.",
      time: "Today, 11:59 AM",
    },
    {
      avatar: "",
      description: "Modified A data in Page X.",
      time: "Today, 11:59 AM",
    },
    {
      avatar: "",
      description: "Modified A data in Page X.",
      time: "Today, 11:59 AM",
    },
  ];

  // const stats = [
  //   {
  //     label: t("titles.total_product"),
  //     value: dashboardReport?.productCount,
  //     icon: <AiOutlineAppstore />,
  //     color: "#8E7DFF",
  //   },
  //   {
  //     label: t("titles.total_in"),
  //     value: dashboardReport?.InCount,
  //     icon: <AiOutlineArrowRight />,
  //     color: "#FFDD82",
  //   },
  //   {
  //     label: t("titles.total_out"),
  //     value: dashboardReport?.OutCount,
  //     icon: <AiOutlineArrowLeft />,
  //     color: "#FF9999",
  //   },
  //   {
  //     label: t("titles.total_bills"),
  //     value: dashboardReport?.billCount,
  //     icon: <AiOutlineFileText />,
  //     color: "#72D9B5",
  //   },
  //   {
  //     label: t("titles.bill_amount"),
  //     value: dashboardReport?.billAmount,
  //     icon: <AiOutlineDollarCircle />,
  //     color: "#FF78A6",
  //   },
  //   {
  //     label: t("titles.total_requisition"),
  //     value: dashboardReport?.totalRequisition,
  //     icon: <AiOutlineUsergroupAdd />,
  //     color: "#FFBEBE",
  //   },
  //   {
  //     label: t("titles.total_vendor"),
  //     value: dashboardReport?.totalVendor,
  //     icon: <AiOutlineShop />,
  //     color: "#FFE380",
  //   },
  //   {
  //     label: t("titles.total_groups"),
  //     value: dashboardReport?.totalGroup,
  //     icon: <AiOutlineTeam />,
  //     color: "#7DBEFF",
  //   },
  // ];

  return (
    <>
      <h2>Dashboard</h2>
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
        {/* TODO  In/Out Activity in dashboard*/}
        {/* <Grid size={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                IN/OUT Activity
              </Typography>
              <Select
                value={timeRange}
                onChange={handleTimeRangeChange}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem value="this_week">This Week</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
              </Select>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === "this_week" ? "day" : "week"} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="in" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="out" stroke="#82ca9d"  strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid> */}

        <Grid size={12} >
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" gutterBottom>
              {t("titles.product_details_list")}
            </Typography>
            <ButtonGroup variant="outlined" style={{ marginBottom: "10px" }}>
              <Button
                variant={
                  selectedCategory === "Packet" ? "contained" : "outlined"
                }
                onClick={() => handleCategoryChange("Packet")}
              >
                {t("titles.packet")}
              </Button>
              <Button
                variant={
                  selectedCategory === "Liquid" ? "contained" : "outlined"
                }
                onClick={() => handleCategoryChange("Liquid")}
              >
                {t("titles.liquid")}
              </Button>
              <Button
                variant={
                  selectedCategory === "Weight" ? "contained" : "outlined"
                }
                onClick={() => handleCategoryChange("Weight")}
              >
                {t("titles.weight")}
              </Button>
            </ButtonGroup>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell>{t("fields.id")}</TableCell>
                <TableCell>{t("fields.product_name")}</TableCell>
                <TableCell>{t("fields.unit")}</TableCell>
                <TableCell>{t("fields.stock")}</TableCell>
                <TableCell>{t("fields.min_qty")}</TableCell>
              </TableRow>
              {ProductList?.slice(0, 7)?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.si_units}</TableCell>
                  <TableCell>{row.min_qty}</TableCell>
                  <TableCell>{row.min_qty}</TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Grid>
        {/* TODO : Recent activities part is pending in dashboard page */}

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("titles.recent_activities")}
              </Typography>
              <List>
                {dummyActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <Avatar style={{ marginRight: "10px" }} />
                    <ListItemText
                      primary={activity.description}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* TODO :Low Stock Products part is pending in dashboard page */}
        {/* Low Stock Products */}
        <Grid size={12} >
          <Card>
            <CardContent>
              <Typography variant="h6">
                {t("titles.low_stock_products")}
              </Typography>
              {dummyData.lowStockProducts.map((product, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`${product.total} / ${product.out} Out | ${product.remaining} Remaining`}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={product.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        product.percentage > 80 ? "lightpink" : "lightgreen",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          product.percentage > 80 ? "red" : "green",
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={8}>
          <Box p={4}>
            <Typography variant="h6">{t("titles.stock_detail")}</Typography>

            {/* Stock Details Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell>{t("fields.date")}</TableCell>
                  <TableCell>{t("fields.product_name")}</TableCell>
                  <TableCell>{t("fields.type")}</TableCell>
                  <TableCell>{t("fields.quantity")}</TableCell>
                  <TableCell>{t("fields.status")}</TableCell>
                  <TableCell>{t("fields.life")}</TableCell>
                </TableRow>

                {stocklist?.slice(0, 7)?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.min_qty}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.life_expn}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Recent IN Entry Details */}
        <Grid size={12} >
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("titles.recent_in_entry_details")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {t("titles.procurement_title")} {inEntry?.procument?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <DateLabel date={inEntry?.entry_date} /> {t("titles.user")}
                  {inEntry?.user?.name}
                </Typography>
              </Box>

              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableRow>
                    <TableCell>{t("fields.id")}</TableCell>
                    <TableCell>{t("fields.product_name")}</TableCell>
                    <TableCell>{t("fields.quantity")}</TableCell>
                    <TableCell>{t("fields.rate")}</TableCell>
                    <TableCell>{t("fields.total")}</TableCell>
                  </TableRow>
                  {inEntry?.items?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.product_name}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row?.qty * row?.amount}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent OUT Entry Details */}
        <Grid size={12} >
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("titles.recent_out_entry_details")}{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {t("titles.title")} {outEntry?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <DateLabel date={outEntry?.entry_date} />{t("titles.user")}
                  {outEntry?.user?.name}
                </Typography>
              </Box>

              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableRow>
                    <TableCell>{t("fields.id")}</TableCell>
                    <TableCell>{t("fields.product_name")}</TableCell>
                    <TableCell>{t("fields.quantity")}</TableCell>
                    <TableCell>{t("fields.rate")}</TableCell>
                    <TableCell>{t("fields.total")}</TableCell>
                  </TableRow>
                  {outEntry?.items?.map((row: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.product_name}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row?.qty * row?.amount}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={4} >
          {/* Bill Revenue Statistics */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">{t("titles.bill_revenue_statistics")}</Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
              <PieChart width={300} height={250}>
                <Pie
                  data={billUserData}
                  dataKey="count"
                  nameKey="user_type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {billUserData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={8} >
          {/* Recent Bills Details */}
          <Card sx={{ flex: 2 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">{t("titles.recent_bill_details")}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell>{t("fields.bill_no")}</TableCell>
                    <TableCell>{t("fields.user_party_name")}</TableCell>
                    <TableCell>{t("fields.date")}</TableCell>
                    <TableCell>{t("fields.user_type")}</TableCell>
                    <TableCell>{t("fields.amount")}</TableCell>
                  </TableRow>
                  {billData?.slice(0, 7)?.map((bill, index) => (
                    <TableRow key={index}>
                      <TableCell>{bill.bill_no}</TableCell>
                      <TableCell>{bill.customer_name}</TableCell>
                      <TableCell>
                        <DateLabel date={bill.entry_date} />
                      </TableCell>
                      <TableCell>{bill.user_type}</TableCell>
                      <TableCell>{bill.amount}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={8} >
          {/* Recent Bills Details */}
          <Card sx={{ flex: 2 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">{t("titles.requisition_detail")}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell>{t("fields.id")}</TableCell>
                    <TableCell>{t("fields.title")}</TableCell>
                    <TableCell>{t("fields.date")}</TableCell>
                    <TableCell>{t("fields.amount")}</TableCell>
                  </TableRow>
                  {requisitionData?.slice(0, 7)?.map((bill, index) => (
                    <TableRow key={index}>
                      <TableCell>{bill.id}</TableCell>
                      <TableCell>{bill.title}</TableCell>
                      <TableCell>
                        <DateLabel date={bill.entry_date} />
                      </TableCell>
                      <TableCell>{bill.amount}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={4} >
          {/* Bill Revenue Statistics */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">{t("titles.requisition_statistics")}</Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
              <PieChart width={300} height={250}>
                <Pie
                  data={requistionTypeCount}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {requistionTypeCount?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
