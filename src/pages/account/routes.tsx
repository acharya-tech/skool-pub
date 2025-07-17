import { LANG_ACCOUNT } from "@common/constant"
import { ACCOUNT_DASHBOARD, ACCOUNT_DATAVALUE_EDIT, ACCOUNT_DATAVALUE_LIST, ACCOUNT_DATAVALUE_NAME, ACCOUNT_PAYROLL_EMPLOYEE_LIST, ACCOUNT_PAYROLL_EMPLOYEE_NAME, ACCOUNT_ENTRY_CONTRA, ACCOUNT_ENTRY_JOURNAL, ACCOUNT_ENTRY_NAME, ACCOUNT_ENTRY_PURCHASE, ACCOUNT_ENTRY_SALES, ACCOUNT_LEDGER_CREATE, ACCOUNT_LEDGER_EDIT, ACCOUNT_LEDGER_GROUP_CREATE, ACCOUNT_LEDGER_GROUP_EDIT, ACCOUNT_LEDGER_GROUP_LIST, ACCOUNT_LEDGER_GROUP_NAME, ACCOUNT_LEDGER_LIST, ACCOUNT_LEDGER_NAME, ACCOUNT_OTHER_NAME, ACCOUNT_PAYROLL_NAME, ACCOUNT_PAYROLL_SETTING_CREATE, ACCOUNT_PAYROLL_SETTING_EDIT, ACCOUNT_PAYROLL_SETTING_LIST, ACCOUNT_PAYROLL_SETTING_NAME, ACCOUNT_REPORT_BS, ACCOUNT_REPORT_LEDGER, ACCOUNT_REPORT_NAME, ACCOUNT_REPORT_PL, ACCOUNT_REPORT_TRIAL, ACCOUNT_SETTING_NAME, ACCOUNT_USER_LIST, ACCOUNT_USER_NAME, ACCOUNT_VOUCHER_LIST, ACCOUNT_VOUCHER_NAME, ACCOUNT_VOUCHER_SHOW, ACCOUNT_PAYROLL_POST_LIST, ACCOUNT_PAYROLL_POST_NAME, ACCOUNT_PAYROLL_RELEASE_NAME, ACCOUNT_PAYROLL_RELEASE_LIST, ACCOUNT_PAYROLL_REPORT_NAME, ACCOUNT_PAYROLL_REPORT_LIST, ACCOUNT_PAYROLL_REPORT_RELEASE_NAME, ACCOUNT_PAYROLL_REPORT_RELEASE_LIST, ACCOUNT_PAYROLL_HISTORY_LIST, ACCOUNT_PAYROLL_HISTORY_NAME, ACCOUNT_PAYROLL_REPORT_PREPOST_LIST, ACCOUNT_PAYROLL_REPORT_PREPOST_NAME, ACCOUNT_PAYROLL_REPORT_BANKVOUCHER_LIST, ACCOUNT_PAYROLL_REPORT_BANKVOUCHER_NAME, ACCOUNT_PAYROLL_EMPLOYEE_SHOW } from "@account/constant/urls"
import { MdOutlineDashboard } from "react-icons/md"
import { Outlet } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineCog } from "react-icons/hi2";
import { LuBookText } from "react-icons/lu";
import { GoGraph } from "react-icons/go";


import { lazy } from "react";

const DashboardPage = lazy(() => import("../dashboard"));
const LedgerCreate = lazy(() => import("./ledger/create"));
const LedgerEdit = lazy(() => import("./ledger/edit"));
const LedgerList = lazy(() => import("./ledger/list"));
const LedgerGroupCreate = lazy(() => import("./ledgerGroup/create"));
const LedgerGroupEdit = lazy(() => import("./ledgerGroup/edit"));
const LedgerGroupList = lazy(() => import("./ledgerGroup/list"));
const PayrollSettingCreate = lazy(() => import("./payrollSetting/create"));
const PayrollSettingEdit = lazy(() => import("./payrollSetting/edit"));
const PayrollSettingList = lazy(() => import("./payrollSetting/list"));
const PurchaseEntry = lazy(() => import("./voucher/purchase"));
const SalesEntry = lazy(() => import("./voucher/sales"));
const ContraEntry = lazy(() => import("./voucher/contra"));
const JournalEntry = lazy(() => import("./voucher/journal"));
const VoucherList = lazy(() => import("./voucher/list"));
const PayrollEmployeeList = lazy(() => import("./employee/list"));
const AccountDataValueList = lazy(() => import("./datavalue/list"));
const AccountDataValueEdit = lazy(() => import("./datavalue/edit"));
const VoucherShow = lazy(() => import("./voucher/show"));
const LedgerReport = lazy(() => import("./report/ledger.report"));
const TrialReport = lazy(() => import("./report/trial.report"));
const PLReport = lazy(() => import("./report/pl.report"));
const BSReport = lazy(() => import("./report/bs.report"));
const PayrollPostList = lazy(() => import("./payrollPost/list"));
const PayrollReleaseHistoryList = lazy(() => import("./payrollRelease/list"));
const PayrollReleaseForm = lazy(() => import("./payrollRelease/release"));
const PayrollReleaseReport = lazy(() => import("./payrollReport/payroll.release"));
const PayrollPrepostReport = lazy(() => import("./payrollReport/payroll.prepost"));
const PayrollBankvoucherReport = lazy(() => import("./payrollReport/payroll.bankvoucher"));


export const accountRoute = [
    {
        path: ACCOUNT_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: ACCOUNT_LEDGER_LIST,
        element: (
            <LedgerList>
                <Outlet />
            </LedgerList>
        ),
        children: [
            {
                path: "new",
                element: <LedgerCreate />,
            },
            {
                path: ":id/edit",
                element: <LedgerEdit />,
            },
        ],
    },
    {
        path: ACCOUNT_LEDGER_GROUP_LIST,
        element: (
            <LedgerGroupList>
                <Outlet />
            </LedgerGroupList>
        ),
        children: [
            {
                path: "new",
                element: <LedgerGroupCreate />,
            },
            {
                path: ":id/edit",
                element: <LedgerGroupEdit />,
            },
        ],
    },

    {
        path: ACCOUNT_ENTRY_PURCHASE,
        element: <PurchaseEntry />,
    },
    {
        path: ACCOUNT_ENTRY_SALES,
        element: <SalesEntry />,
    },
    {
        path: ACCOUNT_ENTRY_CONTRA,
        element: <ContraEntry />,
    },
    {
        path: ACCOUNT_ENTRY_JOURNAL,
        element: <JournalEntry />,
    },
    {
        path: ACCOUNT_VOUCHER_LIST,
        element: <VoucherList />,
    },
    {
        path: ACCOUNT_VOUCHER_SHOW,
        element: <VoucherShow />,
    },

    {
        path: ACCOUNT_REPORT_LEDGER,
        element: <LedgerReport />,
    },
    {
        path: ACCOUNT_REPORT_TRIAL,
        element: <TrialReport />,
    },
    {
        path: ACCOUNT_REPORT_PL,
        element: <PLReport />,
    },
    {
        path: ACCOUNT_REPORT_BS,
        element: <BSReport />,
    },
    {
        path: ACCOUNT_PAYROLL_EMPLOYEE_LIST,
        element: <PayrollEmployeeList />,
    },
    {
        path: ACCOUNT_PAYROLL_EMPLOYEE_SHOW,
        element: <PayrollEmployeeList />,
    },
    {
        path: ACCOUNT_PAYROLL_POST_LIST,
        element: <PayrollPostList />,
    },
    {
        path: ACCOUNT_PAYROLL_RELEASE_LIST,
        element: <PayrollReleaseForm />,
    },
    {
        path: ACCOUNT_PAYROLL_REPORT_RELEASE_LIST,
        element: <PayrollReleaseReport />,
    },
    {
        path: ACCOUNT_PAYROLL_REPORT_PREPOST_LIST,
        element: <PayrollPrepostReport />,
    },
    {
        path: ACCOUNT_PAYROLL_HISTORY_LIST,
        element: <PayrollReleaseHistoryList />,
    },
    {
        path: ACCOUNT_PAYROLL_REPORT_BANKVOUCHER_LIST,
        element: <PayrollBankvoucherReport />,
    },

    // 
    {
        path: ACCOUNT_PAYROLL_SETTING_LIST,
        element: (
            <PayrollSettingList>
                <Outlet />
            </PayrollSettingList>
        ),
        children: [
            {
                path: "new",
                element: <PayrollSettingCreate />,
            },
            {
                path: ":id/edit",
                element: <PayrollSettingEdit />,
            },
        ],
    },
    {
        path: ACCOUNT_DATAVALUE_LIST,
        element: <AccountDataValueList />,
    },
    {
        path: ACCOUNT_DATAVALUE_EDIT,
        element: <AccountDataValueEdit />,
    },
]

export const getAccountResource = (t: any) => {
    return [
        {
            name: ACCOUNT_DASHBOARD,
            list: ACCOUNT_DASHBOARD,
            meta: {
                icon: <MdOutlineDashboard />,
                label: t("dashboard.dashboard", { ns: LANG_ACCOUNT }),
            },
        },

        {
            name: ACCOUNT_VOUCHER_NAME,
            list: ACCOUNT_VOUCHER_LIST,
            show: ACCOUNT_VOUCHER_SHOW,
            meta: {
                icon: <FaRegFileAlt />,
                label: t("voucher.voucher", { ns: LANG_ACCOUNT }),
            },
        },

        {
            name: ACCOUNT_PAYROLL_NAME,
            meta: {
                icon: <GrUserManager />,
                label: t("payroll.payroll", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_EMPLOYEE_NAME,
            list: ACCOUNT_PAYROLL_EMPLOYEE_LIST,
            show: ACCOUNT_PAYROLL_EMPLOYEE_SHOW,
            meta: {
                parent: ACCOUNT_PAYROLL_NAME,
                label: t("employee.employee", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_POST_NAME,
            list: ACCOUNT_PAYROLL_POST_LIST,
            meta: {
                parent: ACCOUNT_PAYROLL_NAME,
                label: t("payrollPost.payrollPost", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_RELEASE_NAME,
            list: ACCOUNT_PAYROLL_RELEASE_LIST,
            meta: {
                parent: ACCOUNT_PAYROLL_NAME,
                label: t("payrollRelease.payrollRelease", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_HISTORY_NAME,
            list: ACCOUNT_PAYROLL_HISTORY_LIST,
            meta: {
                // icon: <FaRegCalendarCheck />,
                parent: ACCOUNT_PAYROLL_NAME,
                label: t("payrollHistory.payrollHistory", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_SETTING_NAME,
            list: ACCOUNT_PAYROLL_SETTING_LIST,
            create: ACCOUNT_PAYROLL_SETTING_CREATE,
            edit: ACCOUNT_PAYROLL_SETTING_EDIT,
            meta: {
                parent: ACCOUNT_PAYROLL_NAME,
                label: t("payrollSetting.payrollSetting", { ns: LANG_ACCOUNT }),
            },
        },
        // {
        //     name: ACCOUNT_PAYROLL_REPORT_NAME,
        //     list: ACCOUNT_PAYROLL_REPORT_LIST,
        //     meta: {
        //         parent: ACCOUNT_PAYROLL_NAME,
        //         label: t("payrollReport.payrollReport", { ns: LANG_ACCOUNT }),
        //     },
        // },

        {
            name: ACCOUNT_ENTRY_NAME,
            meta: {
                icon: <LuBookText />,
                label: t("entry.entry", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_ENTRY_PURCHASE,
            list: ACCOUNT_ENTRY_PURCHASE,
            meta: {
                parent: ACCOUNT_ENTRY_NAME,
                label: t("entry.titles.purchase", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_ENTRY_SALES,
            list: ACCOUNT_ENTRY_SALES,
            meta: {
                parent: ACCOUNT_ENTRY_NAME,
                label: t("entry.titles.sales", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_ENTRY_CONTRA,
            list: ACCOUNT_ENTRY_CONTRA,
            meta: {
                parent: ACCOUNT_ENTRY_NAME,
                label: t("entry.titles.contra", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_ENTRY_JOURNAL,
            list: ACCOUNT_ENTRY_JOURNAL,
            meta: {
                parent: ACCOUNT_ENTRY_NAME,
                label: t("entry.titles.journal", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_REPORT_NAME,
            meta: {
                icon: <GoGraph />,
                label: t("report.report", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_REPORT_LEDGER,
            list: ACCOUNT_REPORT_LEDGER,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("report.titles.ledger", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_REPORT_TRIAL,
            list: ACCOUNT_REPORT_TRIAL,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("report.titles.trial", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_REPORT_PL,
            list: ACCOUNT_REPORT_PL,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("report.titles.pl", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_REPORT_BS,
            list: ACCOUNT_REPORT_BS,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("report.titles.bs", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_REPORT_RELEASE_NAME,
            list: ACCOUNT_PAYROLL_REPORT_RELEASE_LIST,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("payrollReport.titles.release", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_REPORT_PREPOST_NAME,
            list: ACCOUNT_PAYROLL_REPORT_PREPOST_LIST,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("payrollReport.titles.prepost", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_PAYROLL_REPORT_BANKVOUCHER_NAME,
            list: ACCOUNT_PAYROLL_REPORT_BANKVOUCHER_LIST,
            meta: {
                parent: ACCOUNT_REPORT_NAME,
                label: t("payrollReport.titles.bankvoucher", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_SETTING_NAME,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_LEDGER_NAME,
            list: ACCOUNT_LEDGER_LIST,
            create: ACCOUNT_LEDGER_CREATE,
            edit: ACCOUNT_LEDGER_EDIT,
            meta: {
                parent: ACCOUNT_SETTING_NAME,
                label: t("ledger.ledger", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_LEDGER_GROUP_NAME,
            list: ACCOUNT_LEDGER_GROUP_LIST,
            create: ACCOUNT_LEDGER_GROUP_CREATE,
            edit: ACCOUNT_LEDGER_GROUP_EDIT,
            meta: {
                parent: ACCOUNT_SETTING_NAME,
                label: t("ledgerGroup.ledgerGroup", { ns: LANG_ACCOUNT }),
            },
        },
        {
            name: ACCOUNT_DATAVALUE_NAME,
            list: ACCOUNT_DATAVALUE_LIST,
            edit: ACCOUNT_DATAVALUE_EDIT,
            meta: {
                label: t("datavalue.datavalue", { ns: LANG_ACCOUNT }),
                parent: ACCOUNT_SETTING_NAME
            },
        },
    ]
}