import { Button, Card, CardContent, CardHeader, CircularProgress, Grid2 as Grid, Typography } from "@mui/material"
import { LocationCard } from "./locationCard"
import { IRoute, IRouteLocation } from "../../interface"
import { useTranslate } from "@hooks/useTranslate";
import { LANG_VEHICLE } from "@common/constant";
import { useEffect, useState } from "react";
import { BasicModal } from "@components/modal/basic.modal";
import { AddEditLocation } from "./addEditLocation";
import { useList } from "@refinedev/core";
import { VEHICLE_ROUTE_LOCATION_URL } from "../../constant";
import LoadingComponent from "@components/other/loading";
import { StudentLocationListTable } from "./studentList";
import { RefineListView } from "@components/index";
import { CSSearch } from "@components/input";
import { AddStudent } from "./addStudent";
type LocationStudentProps = {
    route?: IRoute
}
export const LocationStudent = ({ route }: LocationStudentProps) => {
    const t = useTranslate(LANG_VEHICLE, "routeLocation");
    const [openAddLocation, setOpenAddLocation] = useState<boolean | undefined | string>()
    const [openAddStudent, setOpenAddStudent] = useState<boolean | string | undefined>()
    const [active, setActive] = useState<IRouteLocation | undefined>()
    const [search, setSearch] = useState<string>("")
    const { data: locationList, isLoading: locationLoading } = useList<IRouteLocation>({
        meta: { customQuery: { location: true, route_id: route?.id } },
        resource: VEHICLE_ROUTE_LOCATION_URL,
    });
    useEffect(() => {
        if (locationList?.data.length && !active) {
            setActive(locationList.data[0]);
        }
    }, [locationList])


    return <>
        <Grid container spacing={2}>
            <Grid size={3}>
                <Card sx={{ margin: '0 auto', padding: 1 }}>
                    <CardHeader
                        title={<Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{t("titles.list")}</Typography>}
                        action={
                            <Button variant="contained" onClick={() => setOpenAddLocation(true)}>{t("actions.add")}</Button>
                        }
                    />
                    <CardContent>
                        {locationLoading && <CircularProgress />}
                        {!locationLoading && locationList?.data?.map((rl: IRouteLocation) => {
                            return <LocationCard key={rl.id} {...{ active, setOpenAddLocation, setActive }} routeLocation={rl} />
                        })}
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={9}>
                <RefineListView
                    title={t('titles.student')}
                    breadcrumb={false}
                    headerButtons={(props) => [
                        <Button
                            onClick={() => setOpenAddStudent(true)}
                            variant="contained"
                            color="inherit"
                            key="create"
                        >
                            {t("student.actions.add", { ns: LANG_VEHICLE })}
                        </Button>,
                        <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
                    ]}
                >
                    <StudentLocationListTable search={search} edit={setOpenAddStudent} active={active} />
                </RefineListView>
            </Grid>
        </Grid>
        <BasicModal
            onClose={() => { setOpenAddLocation(undefined) }}
            open={Boolean(openAddLocation)}
        >
            <AddEditLocation
                action={openAddLocation === true ? "create" : 'edit'}
                id={openAddLocation !== true ? openAddLocation : undefined}
                routeid={route?.id!}
                onClose={() => setOpenAddLocation(undefined)} />
        </BasicModal>
        <BasicModal
            onClose={() => { setOpenAddStudent(undefined) }}
            open={Boolean(openAddStudent)}
        >
            <AddStudent
                action={openAddStudent === true ? "create" : 'edit'}
                id={openAddStudent !== true ? openAddStudent : undefined}
                routeLocation={active}
                onClose={() => setOpenAddStudent(undefined)} />
        </BasicModal>
    </>
}