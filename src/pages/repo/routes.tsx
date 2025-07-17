import { LANG_REPO } from "@common/constant"
import { MAIN_REPO, REPO_DASHBOARD, REPO_FILE_MANAGER_LIST, REPO_FILE_STARRED_LIST, REPO_FILE_TRASH_LIST } from "@repo/constant/local.urls";
import { GoFileDirectory } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineStarBorder } from "react-icons/md";
import { lazy } from "react";

const RepoDashboardPage = lazy(() => import("./dashboard/index"));
const RepoFileManagerPage = lazy(() => import("./myfolder/index"));
const RepoTrashManagerPage = lazy(() => import("./trash/index"));
const RepoStarredManagerPage = lazy(() => import("./starred/index"));

export const repoRoute = [
    {
        index: true,
        path: REPO_DASHBOARD,
        element: <RepoDashboardPage />,
    },
    {
        path: REPO_FILE_MANAGER_LIST,
        element: <RepoFileManagerPage />,
    },
    {
        path: REPO_FILE_TRASH_LIST,
        element: <RepoTrashManagerPage />,
    },
    {
        path: REPO_FILE_STARRED_LIST,
        element: <RepoStarredManagerPage />,
    },
]

export const getRepoResource = (t: any) => {
    return [
        {
            name: REPO_DASHBOARD,
            list: REPO_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_REPO }),
            },
        },
        {
            name: REPO_FILE_MANAGER_LIST,
            list: REPO_FILE_MANAGER_LIST,
            meta: {
                icon: <GoFileDirectory />,
                label: t("repo.repo", { ns: LANG_REPO }),
            },
        },
        {
            name: REPO_FILE_STARRED_LIST,
            list: REPO_FILE_STARRED_LIST,
            meta: {
                icon: <MdOutlineStarBorder />,
                label: t("starred.starred", { ns: LANG_REPO }),
            },
        },
        {
            name: REPO_FILE_TRASH_LIST,
            list: REPO_FILE_TRASH_LIST,
            meta: {
                icon: <FaRegTrashAlt />,
                label: t("trash.trash", { ns: LANG_REPO }),
            },
        },
    ]
}