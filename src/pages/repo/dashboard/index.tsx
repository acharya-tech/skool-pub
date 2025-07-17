import { Outlet } from "react-router-dom";
import { RepoDashboard } from "@repo/dashboard/list";
import { RefineListView } from "@components/view";

export default () => {
    return (
        <>
            <RefineListView
                noCard
            >
                <RepoDashboard />
            </RefineListView>
            <Outlet />
        </>
    );
};