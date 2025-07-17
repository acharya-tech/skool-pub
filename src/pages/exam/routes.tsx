import { Outlet, Route } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";

import { LANG_DATAVALUE, LANG_EXAM } from "@common/constant";
import { EXAM_DASHBOARD, EXAM_DATAVALUE_EDIT, EXAM_DATAVALUE_LIST, EXAM_DATAVALUE_NAME, EXAM_ESUBJECT_CREATE, EXAM_ESUBJECT_EDIT, EXAM_ESUBJECT_LIST, EXAM_ESUBJECT_NAME, EXAM_FINAL_CREATE, EXAM_FINAL_EDIT, EXAM_FINAL_LIST, EXAM_FINAL_NAME, EXAM_FINAL_VIEW, EXAM_FORMULA_CREATE, EXAM_FORMULA_EDIT, EXAM_FORMULA_LIST, EXAM_FORMULA_NAME, EXAM_RESULT_LIST, EXAM_RESULT_NAME, EXAM_ROUTINE_CREATE, EXAM_ROUTINE_EDIT, EXAM_ROUTINE_LIST, EXAM_ROUTINE_NAME, EXAM_ROUTINE_SUBJECT_VIEW, EXAM_ROUTINE_VIEW, EXAM_RULE_CREATE, EXAM_RULE_EDIT, EXAM_RULE_LIST, EXAM_RULE_NAME, EXAM_SETTING, EXAM_TEMPLATE_LIST, EXAM_TEMPLATE_NAME, EXAM_TYPE_CREATE, EXAM_TYPE_EDIT, EXAM_TYPE_LIST, EXAM_TYPE_NAME } from "@exam/constant/local.urls";
import { HiOutlineCog } from "react-icons/hi2";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { PiExam } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { lazy } from "react";

const DashboardPage = lazy(() => import("../dashboard"))
const TypeCreate = lazy(() => import("./type/create"))
const TypeEdit = lazy(() => import("./type/edit"))
const TypeList = lazy(() => import("./type/list"))
const RuleCreate = lazy(() => import("./rule/create"))
const RuleEdit = lazy(() => import("./rule/edit"))
const RuleList = lazy(() => import("./rule/list"))
const FormulaCreate = lazy(() => import("./formula/create"))
const FormulaEdit = lazy(() => import("./formula/edit"))
const FormulaList = lazy(() => import("./formula/list"))
const EsubjectCreate = lazy(() => import("./esubject/create"))
const EsubjectEdit = lazy(() => import("./esubject/edit"))
const EsubjectList = lazy(() => import("./esubject/list"))
const RoutineCreate = lazy(() => import("./routine/create"))
const RoutineEdit = lazy(() => import("./routine/edit"))
const RoutineList = lazy(() => import("./routine/list"))
const RoutineShow = lazy(() => import("./routine/show"))
const RoutineSubjectShow = lazy(() => import("./routine/subject"))
const FinalCreate = lazy(() => import("./final/create"))
const FinalEdit = lazy(() => import("./final/edit"))
const FinalList = lazy(() => import("./final/list"))
const FinalResultShow = lazy(() => import("./final/show"))
const ResultList = lazy(() => import("./result/list"))
const ExamDataValueList = lazy(() => import("./datavalue/list"))
const ExamDataValueEdit = lazy(() => import("./datavalue/edit"))

export const examRoute = [
    {
        path: EXAM_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: EXAM_ROUTINE_LIST,
        element: <RoutineList><Outlet /></RoutineList>,
    },
    {
        path: EXAM_ROUTINE_CREATE,
        element: <RoutineCreate />,
    },
    {
        path: EXAM_ROUTINE_EDIT,
        element: <RoutineEdit />,
    },
    {
        path: EXAM_ROUTINE_VIEW,
        element: <RoutineShow />,
    },
    {
        path: EXAM_ROUTINE_SUBJECT_VIEW,
        element: <RoutineSubjectShow />,
    },
    {
        path: EXAM_TYPE_LIST,
        element: <TypeList><Outlet /></TypeList>,
        children: [
            {
                path: "new",
                element: <TypeCreate />,
            },
            {
                path: ":id/edit",
                element: <TypeEdit />,
            },
        ],
    },
    {
        path: EXAM_RULE_LIST,
        element: <RuleList><Outlet /></RuleList>,
        children: [
            {
                path: "new",
                element: <RuleCreate />,
            },
            {
                path: ":id/edit",
                element: <RuleEdit />,
            },
        ],
    },
    {
        path: EXAM_ESUBJECT_LIST,
        element: <EsubjectList><Outlet /></EsubjectList>,
        children: [
            {
                path: "new",
                element: <EsubjectCreate />,
            },
            {
                path: ":id/edit",
                element: <EsubjectEdit />,
            },
        ],
    },
    {
        path: EXAM_FORMULA_LIST,
        element: <FormulaList><Outlet /></FormulaList>,
        children: [
            {
                path: "new",
                element: <FormulaCreate />,
            },
            {
                path: ":id/edit",
                element: <FormulaEdit />,
            },
        ],
    },
    {
        path: EXAM_DATAVALUE_LIST,
        element: <ExamDataValueList />,
    },
    {
        path: EXAM_DATAVALUE_EDIT,
        element: <ExamDataValueEdit />,
    },
    {
        path: EXAM_RESULT_LIST,
        element: <ResultList />,
    },
    {
        path: EXAM_FINAL_LIST,
        element: <FinalList><Outlet /></FinalList>,
        children: [
            {
                path: "new",
                element: <FinalCreate />,
            },
            {
                path: ":id/edit",
                element: <FinalEdit />,
            },
        ],
    },
    {
        path: EXAM_FINAL_VIEW,
        element: <FinalResultShow />,
    },
]

export const getExamResource = (t: any) => {
    return [
        {
            name: EXAM_DASHBOARD,
            list: EXAM_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_EXAM }),
            },
        },
        {
            name: EXAM_ROUTINE_NAME,
            list: EXAM_ROUTINE_LIST,
            create: EXAM_ROUTINE_CREATE,
            edit: EXAM_ROUTINE_EDIT,
            show: EXAM_ROUTINE_VIEW,
            meta: {
                icon: <RiCalendarScheduleLine />,
                label: t("routine.routine", { ns: LANG_EXAM }),
            },
        },
        {
            name: EXAM_RESULT_NAME,
            list: EXAM_RESULT_LIST,
            meta: {
                icon: <PiExam />,
                label: t("result.result", { ns: LANG_EXAM }),
            },
        },
        {
            name: EXAM_FINAL_NAME,
            list: EXAM_FINAL_LIST,
            create: EXAM_FINAL_CREATE,
            edit: EXAM_FINAL_EDIT,
            show: EXAM_FINAL_VIEW,
            meta: {
                icon: <PiGraduationCap />,
                label: t("final.final", { ns: LANG_EXAM }),
            },
        },
        {
            name: EXAM_SETTING,
            list: EXAM_SETTING,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_EXAM }),
            },
        },
        {
            name: EXAM_FORMULA_NAME,
            list: EXAM_FORMULA_LIST,
            create: EXAM_FORMULA_CREATE,
            edit: EXAM_FORMULA_EDIT,
            meta: {
                label: t("formula.formula", { ns: LANG_EXAM }),
                parent: EXAM_SETTING
            },
        },
        {
            name: EXAM_RULE_NAME,
            list: EXAM_RULE_LIST,
            create: EXAM_RULE_CREATE,
            edit: EXAM_RULE_EDIT,
            meta: {
                label: t("rule.rule", { ns: LANG_EXAM }),
                parent: EXAM_SETTING
            },
        },
        {
            name: EXAM_TYPE_NAME,
            list: EXAM_TYPE_LIST,
            create: EXAM_TYPE_CREATE,
            edit: EXAM_TYPE_EDIT,
            meta: {
                label: t("type.type", { ns: LANG_EXAM }),
                parent: EXAM_SETTING
            },
        },
        {
            name: EXAM_ESUBJECT_NAME,
            list: EXAM_ESUBJECT_LIST,
            create: EXAM_ESUBJECT_CREATE,
            edit: EXAM_ESUBJECT_EDIT,
            meta: {
                label: t("esubject.esubject", { ns: LANG_EXAM }),
                parent: EXAM_SETTING
            },
        },
        {
            name: EXAM_DATAVALUE_NAME,
            list: EXAM_DATAVALUE_LIST,
            edit: EXAM_DATAVALUE_EDIT,
            meta: {
                label: t("datavalue.datavalue", { ns: LANG_DATAVALUE }),
                parent: EXAM_SETTING
            },
        },
    ]
}