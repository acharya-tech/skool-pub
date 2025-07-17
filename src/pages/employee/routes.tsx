import { LANG_EMPLOYEE } from "@common/constant"
import { EMPLOYEE_ATTENDANCE_LIST, EMPLOYEE_ATTENDANCE_NAME, EMPLOYEE_DASHBOARD, EMPLOYEE_DEPARTMENT_CREATE, EMPLOYEE_DEPARTMENT_EDIT, EMPLOYEE_DEPARTMENT_LIST, EMPLOYEE_DEPARTMENT_NAME, EMPLOYEE_GROUP_CREATE, EMPLOYEE_GROUP_EDIT, EMPLOYEE_GROUP_LIST, EMPLOYEE_GROUP_NAME, EMPLOYEE_GROUP_SHOW, EMPLOYEE_OTHERS, EMPLOYEE_POST_CREATE, EMPLOYEE_POST_EDIT, EMPLOYEE_POST_LIST, EMPLOYEE_POST_NAME, EMPLOYEE_STAFF_CREATE, EMPLOYEE_STAFF_LIST, EMPLOYEE_STAFF_NAME, EMPLOYEE_STAFF_SHOW, } from "@employee/constant/local.urls"
import { MdOutlineDashboard } from "react-icons/md"
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiOutlineCog } from "react-icons/hi2";
import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard"));
const StaffList = lazy(() => import("./staff/list"));
const StaffInfoCreate = lazy(() => import("./staff/create"));
const DepartmentList = lazy(() => import("./department/list"));
const DepartmentCreate = lazy(() => import("./department/create"));
const DepartmentEdit = lazy(() => import("./department/edit"));
const PostList = lazy(() => import("./post/list"));
const PostEdit = lazy(() => import("./post/edit"));
const PostCreate = lazy(() => import("./post/create"));
const StaffInfoShow = lazy(() => import("./staff/show"));
const EmpGroupList = lazy(() => import("./group/list"));
const EmpGroupCreate = lazy(() => import("./group/create"));
const EmpGroupShow = lazy(() => import("./group/show"));
const EmpGroupEdit = lazy(() => import("./group/edit"));

export const employeeRoute = [
    {
        path: EMPLOYEE_DASHBOARD,
        element: <Dashboard />
    },
    {
        path: EMPLOYEE_STAFF_LIST,
        element: <StaffList />,
    },
    {
        path: EMPLOYEE_STAFF_SHOW,
        element: <StaffInfoShow />,
    },
    {
        path: EMPLOYEE_STAFF_CREATE,
        element: <StaffInfoCreate />,
    },
    {
        path: EMPLOYEE_DEPARTMENT_LIST,
        element: <DepartmentList />,
        children: [
            {
                path: "new",
                element: <DepartmentCreate />,
            },
            {
                path: ":id/edit",
                element: <DepartmentEdit />,
            },
        ],
    },
    // {
    //     path: EMPLOYEE_DEPARTMENT_LIST,
    //     element: <DepartmentShow />,
    // },
    {
        path: EMPLOYEE_POST_LIST,
        element: <PostList />,
        children: [
            {
                path: "new",
                element: <PostCreate />,
            },
            {
                path: ":id/edit",
                element: <PostEdit />,
            },
        ],
    },
    {
        path: EMPLOYEE_GROUP_LIST,
        element: <EmpGroupList />,
    },
    {
        path: EMPLOYEE_GROUP_CREATE,
        element: <EmpGroupCreate />,
    },
    {
        path: EMPLOYEE_GROUP_SHOW,
        element: <EmpGroupShow />,
    },
    {
        path: EMPLOYEE_GROUP_EDIT,
        element: <EmpGroupEdit />,
    },
]

export const getStaffResource = (t: any) => {
    return [
        {
            name: EMPLOYEE_DASHBOARD,
            list: EMPLOYEE_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_EMPLOYEE }),
            },
        },
        {
            name: EMPLOYEE_STAFF_NAME,
            list: EMPLOYEE_STAFF_LIST,
            show: EMPLOYEE_STAFF_SHOW,
            create: EMPLOYEE_STAFF_CREATE,
            meta: {
                icon: <FaUsers />,
                label: t("staff.staff", { ns: LANG_EMPLOYEE }),
            },
        },
        // {
        //     name: EMPLOYEE_ATTENDANCE_NAME,
        //     list: EMPLOYEE_ATTENDANCE_LIST,
        //     meta: {
        //         icon: <FaClipboardList />,
        //         label: t("attendance.attendance", { ns: LANG_EMPLOYEE }),
        //     },
        // },
        {
            name: EMPLOYEE_GROUP_NAME,
            list: EMPLOYEE_GROUP_LIST,
            show: EMPLOYEE_GROUP_SHOW,
            edit: EMPLOYEE_GROUP_EDIT,
            create: EMPLOYEE_GROUP_CREATE,
            meta: {
                icon: <FaUserGroup />,
                label: t("group.group", { ns: LANG_EMPLOYEE }),
            },
        },
        {
            name: EMPLOYEE_OTHERS,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_EMPLOYEE }),
            },
        },
        {
            name: EMPLOYEE_DEPARTMENT_NAME,
            list: EMPLOYEE_DEPARTMENT_LIST,
            create: EMPLOYEE_DEPARTMENT_CREATE,
            edit: EMPLOYEE_DEPARTMENT_EDIT,
            meta: {
                label: t("department.department", { ns: LANG_EMPLOYEE }),
                parent: EMPLOYEE_OTHERS,
            },
        },
        {
            name: EMPLOYEE_POST_NAME,
            list: EMPLOYEE_POST_LIST,
            create: EMPLOYEE_POST_CREATE,
            edit: EMPLOYEE_POST_EDIT,
            meta: {
                label: t("post.post", { ns: LANG_EMPLOYEE }),
                parent: EMPLOYEE_OTHERS,
            },
        },
    ]
}