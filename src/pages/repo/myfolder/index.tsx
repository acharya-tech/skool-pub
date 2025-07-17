import { Outlet } from "react-router-dom";
import { FileManager } from "@repo/manager/myfolder";


export default () => {
    return (
        <>
            <FileManager />
            <Outlet />
        </>
    );
};