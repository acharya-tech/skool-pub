import { Outlet, Route } from "react-router-dom";
import {
    MAIN_ACADEMIC,
    ACADEMIC_BATCH_CREATE,
    ACADEMIC_BATCH_EDIT,
    ACADEMIC_BATCH_LIST,
    ACADEMIC_BATCH_NAME,
    ACADEMIC_CLASS_CREATE,
    ACADEMIC_CLASS_EDIT,
    ACADEMIC_CLASS_LIST,
    ACADEMIC_CLASS_NAME,
    ACADEMIC_DASHBOARD,
    ACADEMIC_HOSTEL_CREATE,
    ACADEMIC_HOSTEL_EDIT,
    ACADEMIC_HOSTEL_LIST,
    ACADEMIC_HOSTEL_NAME,
    ACADEMIC_HOUSE_CREATE,
    ACADEMIC_HOUSE_EDIT,
    ACADEMIC_HOUSE_LIST,
    ACADEMIC_HOUSE_NAME,
    ACADEMIC_PERIOD_CREATE,
    ACADEMIC_PERIOD_EDIT,
    ACADEMIC_PERIOD_LIST,
    ACADEMIC_PERIOD_NAME,
    ACADEMIC_PROGRAM_CREATE,
    ACADEMIC_PROGRAM_EDIT,
    ACADEMIC_PROGRAM_LIST,
    ACADEMIC_PROGRAM_NAME,
    ACADEMIC_ROOM_CREATE,
    ACADEMIC_ROOM_EDIT,
    ACADEMIC_ROOM_LIST,
    ACADEMIC_ROOM_NAME,
    ACADEMIC_SECTION_CREATE,
    ACADEMIC_SECTION_EDIT,
    ACADEMIC_SECTION_LIST,
    ACADEMIC_SECTION_NAME,
    ACADEMIC_SESSION_CREATE,
    ACADEMIC_SESSION_EDIT,
    ACADEMIC_SESSION_LIST,
    ACADEMIC_SESSION_NAME,
    ACADEMIC_SETTING,
    ACADEMIC_SUBJECT_LIST,
    ACADEMIC_SUBJECT_NAME,
    ACADEMIC_SUBJECT_CREATE,
    ACADEMIC_SUBJECT_EDIT,
    ACADEMIC_SUBJECT_SHOW,
    ACADEMIC_CLASS_SUBJECT_LIST,
    ACADEMIC_CLASS_SUBJECT_NAME,
    ACADEMIC_TIMELINE_LIST,
    ACADEMIC_TIMELINE_CREATE,
    ACADEMIC_TIMELINE_NAME,
    ACADEMIC_TIMELINE_EDIT
} from "@academic/constant/urls";
import { FiBook } from "react-icons/fi";
import { PiTimer } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi";
import { LANG_ACADEMIC } from "@common/constant";
import { lazy } from "react";

const DashboardPage = lazy(() => import("./dashboard"))
const BatchCreate = lazy(() => import("./batch/create"))
const BatchEdit = lazy(() => import("./batch/edit"))
const BatchList = lazy(() => import("./batch/list"))
const ProgramCreate = lazy(() => import("./program/create"))
const ProgramEdit = lazy(() => import("./program/edit"))
const ProgramList = lazy(() => import("./program/list"))
const ClassCreate = lazy(() => import("./class/create"))
const ClassEdit = lazy(() => import("./class/edit"))
const ClassList = lazy(() => import("./class/list"))
const ClassSubjectList = lazy(() => import("./class-subject/list"))
const SectionCreate = lazy(() => import("./section/create"))
const SectionEdit = lazy(() => import("./section/edit"))
const SectionList = lazy(() => import("./section/list"))
const PeriodCreate = lazy(() => import("./period/create"))
const PeriodEdit = lazy(() => import("./period/edit"))
const PeriodList = lazy(() => import("./period/list"))
const RoomCreate = lazy(() => import("./room/create"))
const RoomEdit = lazy(() => import("./room/edit"))
const RoomList = lazy(() => import("./room/list"))
const HouseCreate = lazy(() => import("./house/create"))
const HouseEdit = lazy(() => import("./house/edit"))
const HouseList = lazy(() => import("./house/list"))
const HostelCreate = lazy(() => import("./hostel/create"))
const HostelEdit = lazy(() => import("./hostel/edit"))
const HostelList = lazy(() => import("./hostel/list"))
const SessionCreate = lazy(() => import("./session/create"))
const SessionEdit = lazy(() => import("./session/edit"))
const SessionList = lazy(() => import("./session/list"))
const SubjectList = lazy(() => import("./subject/list"))
const SubjectCreate = lazy(() => import("./subject/create"))
const SubjectEdit = lazy(() => import("./subject/edit"))
const SubjectView = lazy(() => import("./subject/view"))


const TimetableCreate = lazy(() => import("./timetable/create"))
const TimetableList = lazy(() => import("./timetable/list"))
const TimetableEdit = lazy(() => import("./timetable/edit"))

export const academicRoute = [
    {
        path: ACADEMIC_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: ACADEMIC_SUBJECT_LIST,
        element: <SubjectList><Outlet /></SubjectList>,
        children: [
            { path: "new", element: <SubjectCreate /> },
            { path: ":id/edit", element: <SubjectEdit /> }
        ]
    },
    {
        path: `${ACADEMIC_SUBJECT_LIST}/:id/show`,
        element: <SubjectView />
    },
    {
        path: ACADEMIC_TIMELINE_LIST,
        element: <TimetableList><Outlet /></TimetableList>,
        children: [
            { path: ":id/edit", element: <TimetableEdit /> }
        ]
    },
    {
        path: ACADEMIC_TIMELINE_CREATE,
        element: <TimetableCreate />,
    },
    {
        path: ACADEMIC_BATCH_LIST,
        element: <BatchList><Outlet /></BatchList>,
        children: [
            { path: "new", element: <BatchCreate /> },
            { path: ":id/edit", element: <BatchEdit /> }
        ]
    },
    {
        path: ACADEMIC_PROGRAM_LIST,
        element: <ProgramList><Outlet /></ProgramList>,
        children: [
            { path: "new", element: <ProgramCreate /> },
            { path: ":id/edit", element: <ProgramEdit /> }
        ]
    },
    {
        path: ACADEMIC_CLASS_LIST,
        element: <ClassList><Outlet /></ClassList>,
        children: [
            { path: "new", element: <ClassCreate /> },
            { path: ":id/edit", element: <ClassEdit /> }
        ]
    },
    {
        path: ACADEMIC_CLASS_SUBJECT_LIST,
        element: <ClassSubjectList />
    },
    {
        path: ACADEMIC_SECTION_LIST,
        element: <SectionList><Outlet /></SectionList>,
        children: [
            { path: "new", element: <SectionCreate /> },
            { path: ":id/edit", element: <SectionEdit /> }
        ]
    },
    {
        path: ACADEMIC_PERIOD_LIST,
        element: <PeriodList><Outlet /></PeriodList>,
        children: [
            { path: "new", element: <PeriodCreate /> },
            { path: ":id/edit", element: <PeriodEdit /> }
        ]
    },
    {
        path: ACADEMIC_ROOM_LIST,
        element: <RoomList><Outlet /></RoomList>,
        children: [
            { path: "new", element: <RoomCreate /> },
            { path: ":id/edit", element: <RoomEdit /> }
        ]
    },
    {
        path: ACADEMIC_HOUSE_LIST,
        element: <HouseList><Outlet /></HouseList>,
        children: [
            { path: "new", element: <HouseCreate /> },
            { path: ":id/edit", element: <HouseEdit /> }
        ]
    },
    {
        path: ACADEMIC_HOSTEL_LIST,
        element: <HostelList><Outlet /></HostelList>,
        children: [
            { path: "new", element: <HostelCreate /> },
            { path: ":id/edit", element: <HostelEdit /> }
        ]
    },
    {
        path: ACADEMIC_SESSION_LIST,
        element: <SessionList><Outlet /></SessionList>,
        children: [
            { path: "new", element: <SessionCreate /> },
            { path: ":id/edit", element: <SessionEdit /> }
        ]
    }
]


export const getAcademicResource = (t: any) => {
    return [
        {
            name: ACADEMIC_DASHBOARD,
            list: ACADEMIC_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_ACADEMIC }),
            },
        },
        {
            name: ACADEMIC_SUBJECT_NAME,
            list: ACADEMIC_SUBJECT_LIST,
            create: ACADEMIC_SUBJECT_CREATE,
            edit: ACADEMIC_SUBJECT_EDIT,
            show: ACADEMIC_SUBJECT_SHOW,
            meta: {
                icon: <FiBook />,
                label: t("subject.subject", { ns: LANG_ACADEMIC }),
            },
        },
        {
            name: ACADEMIC_TIMELINE_NAME,
            list: ACADEMIC_TIMELINE_LIST,
            create: ACADEMIC_TIMELINE_CREATE,
            edit: ACADEMIC_TIMELINE_EDIT,
            meta: {
                icon: <PiTimer />,
                label: t("timeline.timeline", { ns: LANG_ACADEMIC }),
            },
        },
        {
            name: ACADEMIC_SETTING,
            list: ACADEMIC_SETTING,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_ACADEMIC }),
            },
        },
        {
            name: ACADEMIC_BATCH_NAME,
            list: ACADEMIC_BATCH_LIST,
            create: ACADEMIC_BATCH_CREATE,
            edit: ACADEMIC_BATCH_EDIT,
            meta: {
                label: t("batch.batch", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_PROGRAM_NAME,
            list: ACADEMIC_PROGRAM_LIST,
            create: ACADEMIC_PROGRAM_CREATE,
            edit: ACADEMIC_PROGRAM_EDIT,
            meta: {
                label: t("program.program", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_CLASS_NAME,
            list: ACADEMIC_CLASS_LIST,
            create: ACADEMIC_CLASS_CREATE,
            edit: ACADEMIC_CLASS_EDIT,
            meta: {
                label: t("class.class", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_CLASS_SUBJECT_NAME,
            list: ACADEMIC_CLASS_SUBJECT_LIST,
            meta: {
                label: t("classSubject.classSubject", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_SECTION_NAME,
            list: ACADEMIC_SECTION_LIST,
            create: ACADEMIC_SECTION_CREATE,
            edit: ACADEMIC_SECTION_EDIT,
            meta: {
                label: t("section.section", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_PERIOD_NAME,
            list: ACADEMIC_PERIOD_LIST,
            create: ACADEMIC_PERIOD_CREATE,
            edit: ACADEMIC_PERIOD_EDIT,
            meta: {
                label: t("period.period", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },

        {
            name: ACADEMIC_ROOM_NAME,
            list: ACADEMIC_ROOM_LIST,
            create: ACADEMIC_ROOM_CREATE,
            edit: ACADEMIC_ROOM_EDIT,
            meta: {
                label: t("room.room", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_HOUSE_NAME,
            list: ACADEMIC_HOUSE_LIST,
            create: ACADEMIC_HOUSE_CREATE,
            edit: ACADEMIC_HOUSE_EDIT,
            meta: {
                label: t("house.house", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_HOSTEL_NAME,
            list: ACADEMIC_HOSTEL_LIST,
            create: ACADEMIC_HOSTEL_CREATE,
            edit: ACADEMIC_HOSTEL_EDIT,
            meta: {
                label: t("hostel.hostel", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
        {
            name: ACADEMIC_SESSION_NAME,
            list: ACADEMIC_SESSION_LIST,
            create: ACADEMIC_SESSION_CREATE,
            edit: ACADEMIC_SESSION_EDIT,
            meta: {
                label: t("session.session", { ns: LANG_ACADEMIC }),
                parent: ACADEMIC_SETTING
            },
        },
    ]
}