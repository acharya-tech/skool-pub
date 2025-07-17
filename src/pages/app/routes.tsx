import { MdOutlineSecurity } from "react-icons/md";
import { LANG_APP } from "@common/constant";
import { lazy } from "react";
import { APP_ROLE_CREATE, APP_ROLE_EDIT, APP_ROLE_LIST, APP_ROLE_NAME, APP_ROLE_VIEW, APP_USERS_CREATE, APP_USERS_EDIT, APP_USERS_LIST, APP_USERS_NAME, APP_USERS_VIEW } from "@app/constant";
import { FaRegUser } from "react-icons/fa6";

const UserCreate = lazy(() => import("./user/create"));
const UserEdit = lazy(() => import("./user/edit"));
const UserList = lazy(() => import("./user/list"));
const UserShow = lazy(() => import("./user/show"));
const RoleCreate = lazy(() => import("./role/create"));
const RoleEdit = lazy(() => import("./role/edit"));
const RoleList = lazy(() => import("./role/list"));
const RoleShow = lazy(() => import("./role/show"));

export const appRoute = [
    {
        path: APP_USERS_LIST,
        element: <UserList />
    },
    {
        path: APP_USERS_CREATE,
        element: <UserCreate />,
    },
    {
        path: APP_USERS_EDIT,
        element: <UserEdit />,
    },
    {
        path: APP_USERS_VIEW,
        element: <UserShow />,
    },
    {
        path: APP_ROLE_LIST,
        element: <RoleList />,
        children: [
            {
                path: "new",
                element: <RoleCreate />,
            },
            {
                path: ":id/edit",
                element: <RoleEdit />,
            },
        ],
    },
    {
        path: APP_ROLE_VIEW,
        element: <RoleShow />
    }
]


export const getAppResource = (t: any) => {
    return [
        {
            name: APP_USERS_NAME,
            list: APP_USERS_LIST,
            create: APP_USERS_CREATE,
            edit: APP_USERS_EDIT,
            show: APP_USERS_VIEW,
            meta: {
                icon: <FaRegUser />,
                label: t("users.users", { ns: LANG_APP }),
            },
        },
        {
            name: APP_ROLE_NAME,
            list: APP_ROLE_LIST,
            create: APP_ROLE_CREATE,
            edit: APP_ROLE_EDIT,
            show: APP_ROLE_VIEW,
            meta: {
                icon: <MdOutlineSecurity />,
                label: t("roles.roles", { ns: LANG_APP }),
            },
        },
    ]
}