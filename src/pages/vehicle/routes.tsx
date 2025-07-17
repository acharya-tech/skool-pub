import { Outlet, Route } from "react-router-dom";
import {
    VEHICLE_DASHBOARD,
    VEHICLE_INFO_CREATE,
    VEHICLE_INFO_EDIT,
    VEHICLE_INFO_LIST,
    VEHICLE_INFO_NAME,
    VEHICLE_LOCATION_CREATE,
    VEHICLE_LOCATION_EDIT,
    VEHICLE_LOCATION_LIST,
    VEHICLE_LOCATION_NAME,
    VEHICLE_ROUTE_CREATE,
    VEHICLE_ROUTE_EDIT,
    VEHICLE_ROUTE_LIST,
    VEHICLE_ROUTE_NAME,
    VEHICLE_ROUTE_SHOW,
    VEHICLE_STUDENT_LIST,
    VEHICLE_STUDENT_NAME
} from "@vehicle/constant/local.urls";
import { MdOutlineDashboard } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaRoute } from "react-icons/fa";
import { LANG_VEHICLE } from "@common/constant";
import { IoBusSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { lazy } from "react";

const DashboardPage = lazy(() => import("./dashboard"));
const LocationCreate = lazy(() => import("./location/create"));
const LocationEdit = lazy(() => import("./location/edit"));
const LocationList = lazy(() => import("./location/list"));
const InfoCreate = lazy(() => import("./info/create"));
const InfoEdit = lazy(() => import("./info/edit"));
const InfoList = lazy(() => import("./info/list"));
const RouteList = lazy(() => import("./route/list"));
const RouteCreate = lazy(() => import("./route/create"));
const RouteEdit = lazy(() => import("./route/edit"));
const RouteShow = lazy(() => import("./route/show"));
const StudentList = lazy(() => import("./student/list"));

export const locationRoute = [
    {
        index: true,
        path: VEHICLE_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: VEHICLE_ROUTE_LIST,
        element: <RouteList />,
        children: [
            {
                path: "new",
                element: <RouteCreate />,
            },
            {
                path: ":id/edit",
                element: <RouteEdit />,
            },
        ],
    },
    {
        path: VEHICLE_ROUTE_SHOW,
        element: <RouteShow />,
    },
    {
        path: VEHICLE_LOCATION_LIST,
        element: <LocationList />,
        children: [
            {
                path: "new",
                element: <LocationCreate />,
            },
            {
                path: ":id/edit",
                element: <LocationEdit />,
            },
        ],
    },
    {
        path: VEHICLE_INFO_LIST,
        element: <InfoList />,
        children: [
            {
                path: "new",
                element: <InfoCreate />,
            },
            {
                path: ":id/edit",
                element: <InfoEdit />,
            },
        ],
    },
    {
        path: VEHICLE_STUDENT_LIST,
        element: <StudentList />,
    },
]


export const getLocationResource = (t: any) => {
    return [
        {
            name: VEHICLE_DASHBOARD,
            list: VEHICLE_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_VEHICLE }),
            },
        },
        {
            name: VEHICLE_STUDENT_NAME,
            list: VEHICLE_STUDENT_LIST,
            meta: {
                icon: <FaUserGroup />,
                label: t("student.student", { ns: LANG_VEHICLE }),
            },
        },
        {
            name: VEHICLE_ROUTE_NAME,
            list: VEHICLE_ROUTE_LIST,
            create: VEHICLE_ROUTE_CREATE,
            edit: VEHICLE_ROUTE_EDIT,
            show: VEHICLE_ROUTE_SHOW,
            meta: {
                icon: <FaRoute />,
                label: t("route.route", { ns: LANG_VEHICLE }),
            },
        },
        {
            name: VEHICLE_LOCATION_NAME,
            list: VEHICLE_LOCATION_LIST,
            create: VEHICLE_LOCATION_CREATE,
            edit: VEHICLE_LOCATION_EDIT,
            meta: {
                icon: <CiLocationOn />,
                label: t("location.location", { ns: LANG_VEHICLE }),
            },
        },
        {
            name: VEHICLE_INFO_NAME,
            list: VEHICLE_INFO_LIST,
            create: VEHICLE_INFO_CREATE,
            edit: VEHICLE_INFO_EDIT,
            meta: {
                icon: <IoBusSharp />,
                label: t("info.info", { ns: LANG_VEHICLE }),
            },
        },
    ]
}