import { LANG_STUDENT } from "@common/constant"
import {
    STUDENT_DASHBOARD,
    STUDENT_PROGRAM_NAME,
    STUDENT_PROGRAM_LIST,
    STUDENT_PROGRAM_VIEW,
    STUDENT_CURRENT_NAME,
    STUDENT_CURRENT_LIST,
    STUDENT_CURRENT_VIEW,
    STUDENT_ADMISSION_NAME,
    STUDENT_ADMISSION_LIST,
    STUDENT_ADMISSION_CREATE,
    STUDENT_ADMISSION_EDIT,
    STUDENT_INFO_LOCATER,
    STUDENT_TRANSFER_LIST,
    STUDENT_TRANSFER_NAME,
    STUDENT_MANAGE_LIST,
    STUDENT_MANAGE_NAME,
    STUDENT_SETUP_NAME,
    STUDENT_SETUP_LIST,
    STUDENT_SUBJECT_NAME,
    STUDENT_SUBJECT_LIST,
    STUDENT_SUBJECT_VIEW,
    STUDENT_ADMISSION_IMPORT,
    STUDENT_CERTIFICATE_TYPE_LIST,
    STUDENT_CERTIFICATE_TYPE_CREATE,
    STUDENT_CERTIFICATE_TYPE_EDIT,
    STUDENT_CERTIFICATE_TYPE_NAME,
    STUDENT_CERTIFICATE_NAME,
    STUDENT_CERTIFICATE_LIST,
    STUDENT_CERTIFICATE_CREATE,
    STUDENT_CERTIFICATE_SHOW,
    STUDENT_DATAVALUE_LIST,
    STUDENT_DATAVALUE_EDIT,
    STUDENT_OTHER_NAME,
    STUDENT_DATAVALUE_NAME,
    STUDENT_CERTIFICATE_GROUP
} from "@student/constant/local.urls"
import { MdOutlineDashboard } from "react-icons/md"
import { FaUsers } from "react-icons/fa";
import { MdPersonAddAlt } from "react-icons/md";
import { lazy } from "react";
import Import from "./admission/import";
import { LiaAwardSolid } from "react-icons/lia";
import { Outlet } from "react-router";
import { HiOutlineCog } from "react-icons/hi";


const DashboardPage = lazy(() => import("./dashboard"));
const ProgramList = lazy(() => import("./program/list"));
const StudentList = lazy(() => import("./current/list"));
const AdmissionList = lazy(() => import("./admission/list"));
const StudentInfoCreate = lazy(() => import("./admission/create"));
const StudentLocator = lazy(() => import("./info/landing"));
const StudentInfoShow = lazy(() => import("./info/show"));
const StudentTransferPage = lazy(() => import("./transfer/list"));
const ManageList = lazy(() => import("./manage/list"));
const SetupList = lazy(() => import("./setup/list"));
const ClassList = lazy(() => import("./subject/list"));
const SubjectShow = lazy(() => import("./subject/show"));

const CertificateTypeList = lazy(() => import("./certificateType/list"));
const CertificateTypeCreate = lazy(() => import("./certificateType/create"));
const CertificateTypeEdit = lazy(() => import("./certificateType/edit"));

const CertificateList = lazy(() => import("./certificate/list"));
const CertificateCreate = lazy(() => import("./certificate/create"));
const CertificateShow = lazy(() => import("./certificate/show"));

const StudentDataValueList = lazy(() => import("./datavalue/list"));
const StudentDataValueEdit = lazy(() => import("./datavalue/edit"));


export const studentRoute = [
    {
        path: STUDENT_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: STUDENT_PROGRAM_LIST,
        element: <ProgramList />,
    },
    {
        path: STUDENT_PROGRAM_VIEW,
        element: <StudentList />,
    },
    {
        path: STUDENT_ADMISSION_LIST,
        element: <AdmissionList />,
        children: [
            { path: STUDENT_ADMISSION_IMPORT, element: <Import /> },
        ]
    },
    {
        path: STUDENT_ADMISSION_EDIT,
        element: <StudentInfoCreate />,
    },
    {
        path: STUDENT_ADMISSION_CREATE,
        element: <StudentInfoCreate />,
    },
    {
        path: STUDENT_CERTIFICATE_TYPE_LIST,
        element: <CertificateTypeList><Outlet /></CertificateTypeList>,
        children: [
            { path: "new", element: <CertificateTypeCreate /> },
            { path: ":id/edit", element: <CertificateTypeEdit /> },

        ]
    },
    {
        path: STUDENT_CERTIFICATE_LIST,
        element: <CertificateList><Outlet /></CertificateList>,
        children: [
            { path: "new", element: <CertificateCreate /> },
        ]
    },
    {
        path: STUDENT_CERTIFICATE_SHOW,
        element: <CertificateShow />,
    },
    {
        path: STUDENT_CURRENT_LIST,
        element: <StudentList />,
    },
    {
        path: STUDENT_CURRENT_VIEW,
        element: <StudentInfoShow />,
    },
    {
        path: STUDENT_INFO_LOCATER,
        element: <StudentLocator />,
    },
    {
        path: STUDENT_TRANSFER_LIST,
        element: <StudentTransferPage />,
    },
    {
        path: STUDENT_MANAGE_LIST,
        element: <ManageList />,
    },
    {
        path: STUDENT_SETUP_LIST,
        element: <SetupList />,
    },
    {
        path: STUDENT_SUBJECT_LIST,
        element: <ClassList />,
    },
    {
        path: STUDENT_SUBJECT_VIEW,
        element: <SubjectShow />,
    },
    {
        path: STUDENT_DATAVALUE_LIST,
        element: <StudentDataValueList />,
    },
    {
        path: STUDENT_DATAVALUE_EDIT,
        element: <StudentDataValueEdit />,
    },
]

export const getStudentResource = (t: any) => {
    return [
        {
            name: STUDENT_DASHBOARD,
            list: STUDENT_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_PROGRAM_NAME,
            list: STUDENT_PROGRAM_LIST,
            show: STUDENT_PROGRAM_VIEW,
            meta: {
                icon: <FaUsers />,
                label: t("program.program", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_CURRENT_NAME,
            list: STUDENT_CURRENT_LIST,
            show: STUDENT_CURRENT_VIEW,
            meta: {
                parent: STUDENT_PROGRAM_NAME,
                label: t("info.student", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_TRANSFER_NAME,
            list: STUDENT_TRANSFER_LIST,
            meta: {
                parent: STUDENT_PROGRAM_NAME,
                label: t("transfer.transfer", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_MANAGE_NAME,
            list: STUDENT_MANAGE_LIST,
            meta: {
                parent: STUDENT_PROGRAM_NAME,
                label: t("manage.manage", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_SETUP_NAME,
            list: STUDENT_SETUP_LIST,
            meta: {
                parent: STUDENT_PROGRAM_NAME,
                label: t("setup.setup", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_SUBJECT_NAME,
            list: STUDENT_SUBJECT_LIST,
            show: STUDENT_SUBJECT_VIEW,
            meta: {
                parent: STUDENT_PROGRAM_NAME,
                label: t("subject.subject", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_ADMISSION_NAME,
            list: STUDENT_ADMISSION_LIST,
            show: STUDENT_ADMISSION_IMPORT,
            create: STUDENT_ADMISSION_CREATE,
            edit: STUDENT_ADMISSION_EDIT,
            meta: {
                icon: <MdPersonAddAlt />,
                label: t("admission.admission", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_CERTIFICATE_GROUP,
            meta: {
                icon: <LiaAwardSolid />,
                label: t("certificate.certificate", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_CERTIFICATE_NAME,
            list: STUDENT_CERTIFICATE_LIST,
            create: STUDENT_CERTIFICATE_CREATE,
            show: STUDENT_CERTIFICATE_SHOW,
            meta: {
                parent: STUDENT_CERTIFICATE_GROUP,
                label: t("certificate.issue", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_CERTIFICATE_TYPE_NAME,
            list: STUDENT_CERTIFICATE_TYPE_LIST,
            create: STUDENT_CERTIFICATE_TYPE_CREATE,
            edit: STUDENT_CERTIFICATE_TYPE_EDIT,
            meta: {
                parent: STUDENT_CERTIFICATE_GROUP,
                label: t("certificate.type", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_OTHER_NAME,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_STUDENT }),
            },
        },
        {
            name: STUDENT_DATAVALUE_NAME,
            list: STUDENT_DATAVALUE_LIST,
            edit: STUDENT_DATAVALUE_EDIT,
            meta: {
                label: t("datavalue.datavalue", { ns: LANG_STUDENT }),
                parent: STUDENT_OTHER_NAME
            },
        },
    ]
}