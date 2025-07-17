import { Outlet } from "react-router-dom";
import { RefineListView } from "@components/view";
import { StudentDashboard } from "@student/dashboard";

export default () => {
    return (
        <>
            <RefineListView
                noCard
            >
                <StudentDashboard />
            </RefineListView>
            <Outlet />
        </>
    );
};