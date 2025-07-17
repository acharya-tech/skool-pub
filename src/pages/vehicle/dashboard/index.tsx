import { Outlet } from "react-router-dom";
import { RefineListView } from "@components/view";
import { VehicleDashboard } from "@vehicle/dashboard/list";

export default () => {
    return (
        <>
            <RefineListView
                noCard
            >
                <VehicleDashboard />
            </RefineListView>
            <Outlet />
        </>
    );
};