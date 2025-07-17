import { LANG_ACADEMIC } from "@common/constant"
import { MdOutlineDashboard } from "react-icons/md"
import { MAIN_DASHBOARD } from "@dashboard/constant/urls";
import { Route } from "react-router-dom";
import { lazy } from "react";
const DashboardPage = lazy(() => import("./index"))


export const dashboardRoute = [
    {
        path: MAIN_DASHBOARD,
        element: <DashboardPage />,
    }
]

export const getDashboardResource = (t: any) => {
    return [
        {
            name: MAIN_DASHBOARD,
            list: MAIN_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_ACADEMIC }),
            },
        }
    ]
}