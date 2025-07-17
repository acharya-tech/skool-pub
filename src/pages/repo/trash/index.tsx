import { Outlet } from "react-router-dom";
import { TrashManager } from "@repo/manager/trash";

export default () => {
    return (
        <>
            <TrashManager />
            <Outlet />
        </>
    );
};