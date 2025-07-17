import { Outlet } from "react-router-dom";
import { RefineListView } from "@components/view";
import { EmployeeDashboard } from "@employee/dashboard";

export default () => {
    return (
        <>
            <RefineListView
                noCard
            >
                <EmployeeDashboard />
            </RefineListView>
            <Outlet />
        </>
    );
};