import { useOne } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";

import { LANG_VEHICLE } from "@common/constant";

import Grid from '@mui/material/Grid2';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';
import { VehicleWidget } from "./components/vehicle-widget";
import { VEHICLE_DASHBOARD_STATUS_ID } from "@vehicle/constant/constants";
import { VEHICLE_DASHBOARD_URL } from "@vehicle/constant";
import { IVehicleDashboardStatus } from "@vehicle/interface";
import { VehicleDataActivity } from "./components/vehicle-data-activity";
import { VehicleLocationPie } from "./components/vehicle-location-pie";
import { RecentAddedStudent } from "./components/recent-added-student";


// ----------------------------------------------------------------------
export const VehicleDashboard = () => {
    const t = useTranslate(LANG_VEHICLE, "dashboard");

    const { data: statusData } = useOne<IVehicleDashboardStatus>({
        resource: VEHICLE_DASHBOARD_URL,
        id: VEHICLE_DASHBOARD_STATUS_ID
    })

    return (
        <>
            <DashboardContent maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <VehicleWidget
                            title={t("labels.students")}
                            value={statusData?.data?.students ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-vehicle-student.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <VehicleWidget
                            title={t("labels.routes")}
                            value={statusData?.data?.routes ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-vehicle-route.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <VehicleWidget
                            title={t("labels.locations")}
                            value={statusData?.data?.locations ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-vehicle-location.png`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <VehicleWidget
                            title={t("labels.buses")}
                            value={statusData?.data?.buses ?? 0}
                            icon={`${CONFIG.assetsDir}/assets/icons/apps/ic-app-vehicle-bus.png`}
                        />
                    </Grid>
                    <Grid container size={12}>
                        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                            <VehicleDataActivity title={t("labels.dataActivity")} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                            <VehicleLocationPie title={t("labels.locationPie")} />
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                        <RecentAddedStudent title={t("labels.recentAddedStudent")} />
                    </Grid>
                </Grid>
            </DashboardContent>
        </>
    );
}

