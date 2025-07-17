import { Outlet } from "react-router-dom";
import { StarredManager } from "@repo/manager/starred";

export default () => {
    return (
        <>
            <StarredManager />
            <Outlet />
        </>
    );
};