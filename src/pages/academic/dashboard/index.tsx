import { Outlet } from "react-router-dom";
import { RefineListView } from "@components/view";
import { AcademicDashboard } from "@academic/dashboard";

export default () => {
    return (
        <>
            <RefineListView
                noCard
            >
                <AcademicDashboard />
            </RefineListView>
            <Outlet />
        </>
    );
};