import { IRoute } from "../interface";
import { Button, Grid2 as Grid, Paper, Table, TableBody, TableCell, TableRow, Typography, Avatar } from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_VEHICLE } from "@common/constant";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { LocationStudent } from "./component/locationStudent";
import { VEHICLE_ROUTE_URL } from "@vehicle/constant";
import { useRefineShow } from "@hooks/useShow";

export const RouteShow = () => {
    const t = useTranslate(LANG_VEHICLE, "route");
    const { query: { data, isLoading }, } = useRefineShow<IRoute>({
        resource: VEHICLE_ROUTE_URL,
        meta: { customQuery: { bus: true } }
    });

    const record = data?.data;

    return <>
        <Typography variant="h5">
            {t("titles.show")} #{record?.name}
        </Typography>
        <Grid container gap={2}>
            <Grid size={12}>
                <Paper elevation={3}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={3}>
                                    <Avatar variant="square" sx={{ height: 120, width: 'auto' }} src={record?.bus.image?.url} alt={record?.bus.image?.name} />
                                </TableCell>
                                <TableCell>{t("fields.bus")}</TableCell>
                                <TableCell>{record?.bus.name}</TableCell>
                                <TableCell>{t("fields.bus_number")}</TableCell>
                                <TableCell>{record?.bus.number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("fields.depart_time")}</TableCell>
                                <TableCell>{dayjs(record?.depart_time).format("hh:mm A").toString()}</TableCell>
                                <TableCell>{t("fields.arrival_time")}</TableCell>
                                <TableCell>{dayjs(record?.arrival_time).format("hh:mm A").toString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("fields.map")}</TableCell>
                                <TableCell><Link to={""}><Button>{t("actions.map")}</Button></Link></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid size={12}>
                <LocationStudent route={record} />
            </Grid>
        </Grid>
    </>
}