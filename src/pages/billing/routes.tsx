import { Outlet, Route } from "react-router-dom";
import DashboardPage from "../dashboard";
import {
    BILLING_DASHBOARD, BILLING_DATAVALUE_EDIT,
    BILLING_DATAVALUE_LIST, BILLING_DATAVALUE_NAME,
    BILLING_ENTRANCE_ADMISSION_LIST,
    BILLING_ENTRANCE_APPLICATION_CREATE,
    BILLING_ENTRANCE_APPLICATION_LIST,
    BILLING_ENTRANCE_NAME, BILLING_FEE_CLASS_CREATE,
    BILLING_FEE_CLASS_EDIT, BILLING_FEE_CLASS_LIST,
    BILLING_FEE_CLASS_NAME, BILLING_FEE_ITEM_CREATE,
    BILLING_FEE_ITEM_EDIT, BILLING_FEE_ITEM_LIST, BILLING_FEE_ITEM_NAME,
    BILLING_FEE_NAME, BILLING_FEE_RECEIVE_LIST, BILLING_FEE_RECEIVE_NAME,
    BILLING_FEE_RELEASE_CREATE, BILLING_FEE_RELEASE_EDIT,
    BILLING_FEE_RELEASE_LIST, BILLING_FEE_RELEASE_NAME,
    BILLING_FEE_RELEASE_SHOW, BILLING_FEE_STUDENT_CREATE,
    BILLING_FEE_STUDENT_LIST, BILLING_FEE_STUDENT_NAME,
    BILLING_INVOICE_LIST, BILLING_INVOICE_NAME, BILLING_INVOICE_SHOW,
    BILLING_LEDGER_CREATE, BILLING_LEDGER_EDIT, BILLING_LEDGER_LIST,
    BILLING_LEDGER_NAME, BILLING_OTHER_NAME, BILLING_REPORT_FEE_COLLECTION,
    BILLING_REPORT_FEE_DUE, BILLING_REPORT_FEE_DUE_LEDGER, BILLING_REPORT_FEE_SCHOLAR,
    BILLING_REPORT_FEE_SUMMARY, BILLING_REPORT_NAME, BILLING_SCHOLAR_ITEM_CREATE,
    BILLING_SCHOLAR_ITEM_EDIT, BILLING_SCHOLAR_ITEM_LIST, BILLING_SCHOLAR_ITEM_NAME,
    BILLING_SCHOLAR_NAME, BILLING_SCHOLAR_PERCENT_CREATE, BILLING_SCHOLAR_PERCENT_LIST,
    BILLING_SCHOLAR_PERCENT_NAME, BILLING_SCHOLAR_PERCENT_SHOW, BILLING_SCHOLAR_POST_CREATE,
    BILLING_SCHOLAR_POST_EDIT, BILLING_SCHOLAR_POST_LIST, BILLING_SCHOLAR_POST_NAME
} from "@billing/constant";
import { lazy } from "react";

import { HiOutlineCog } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GoGraph } from "react-icons/go";

import { LANG_BILLING } from "@common/constant";

import { TbReceiptRupee } from "react-icons/tb";
import { CiDiscount1 } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";

import { IoMdCheckboxOutline } from "react-icons/io";


const FeeItemCreate = lazy(() => import("./feeItem/create"));
const FeeItemEdit = lazy(() => import("./feeItem/edit"));
const FeeItemList = lazy(() => import("./feeItem/list"));
const FeeClassCreate = lazy(() => import("./feeClass/create"));
const FeeClassEdit = lazy(() => import("./feeClass/edit"));
const FeeClassList = lazy(() => import("./feeClass/list"));
const ScholarItemCreate = lazy(() => import("./scholarItem/create"));
const ScholarItemEdit = lazy(() => import("./scholarItem/edit"));
const ScholarItemList = lazy(() => import("./scholarItem/list"));
const ScholarPostCreate = lazy(() => import("./scholarPost/create"));
const ScholarPostEdit = lazy(() => import("./scholarPost/edit"));
const ScholarPostList = lazy(() => import("./scholarPost/list"));
const ScholarPercentCreate = lazy(() => import("./scholarPercent/create"));
const ScholarPercentList = lazy(() => import("./scholarPercent/list"));
const ScholarPercentShow = lazy(() => import("./scholarPercent/show"));
const FeeStudentCreate = lazy(() => import("./feeStudent/create"));
const FeeStudentList = lazy(() => import("./feeStudent/list"));
const FeeReleaseCreate = lazy(() => import("./feeRelease/create"));
const FeeReleaseList = lazy(() => import("./feeRelease/list"));
const FeeReleaseEdit = lazy(() => import("./feeRelease/edit"));
const FeeReleaseShow = lazy(() => import("./feeRelease/show"));
const FeeReceiveShow = lazy(() => import("./feeReceive/list"));
const InvoiceList = lazy(() => import("./invoice/list"));
const BillingDataValueList = lazy(() => import("./datavalue/list"));
const BillingDataValueEdit = lazy(() => import("./datavalue/edit"));
const BillingShow = lazy(() => import("./invoice/show"));
const FeeCollection = lazy(() => import("./reports/fee.collection"));
const FeeDue = lazy(() => import("./reports/fee.due"));
const FeeDueLedger = lazy(() => import("./reports/fee.due.ledger"));
const FeeSummary = lazy(() => import("./reports/fee.summary"));
const ScholarPost = lazy(() => import("./reports/scholar.post"));
const EntranceApplicationList = lazy(() => import("./entrance/list"));
const LedgerCreate = lazy(() => import("./ledger/create"));
const LedgerEdit = lazy(() => import("./ledger/edit"));
const LedgerList = lazy(() => import("./ledger/list"));
const EntranceCreate = lazy(() => import("./entrance/create"));
const EntranceAdmissionList = lazy(() => import("./entrance/admission"));

export const billingRoute = [
    {
        path: BILLING_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: BILLING_FEE_ITEM_LIST,
        element: <FeeItemList><Outlet /></FeeItemList>,
        children: [
            { path: "new", element: <FeeItemCreate /> },
            { path: ":id/edit", element: <FeeItemEdit /> },
        ],
    },
    {
        path: BILLING_FEE_CLASS_LIST,
        element: <FeeClassList><Outlet /></FeeClassList>,
        children: [
            { path: "new", element: <FeeClassCreate /> },
            { path: ":id/edit", element: <FeeClassEdit /> },
        ],
    },
    {
        path: BILLING_FEE_STUDENT_LIST,
        element: <FeeStudentList><Outlet /></FeeStudentList>,
        children: [
            { path: "new", element: <FeeStudentCreate /> },
        ],
    },
    {
        path: BILLING_ENTRANCE_APPLICATION_CREATE,
        element: <EntranceCreate />,
    },
    {
        path: BILLING_ENTRANCE_APPLICATION_LIST,
        element: <EntranceApplicationList />,
    },
    {
        path: BILLING_ENTRANCE_ADMISSION_LIST,
        element: <EntranceAdmissionList />,
    },
    {
        path: BILLING_REPORT_FEE_COLLECTION,
        element: <FeeCollection />,
    },
    {
        path: BILLING_REPORT_FEE_DUE,
        element: <FeeDue />,
    },
    {
        path: BILLING_REPORT_FEE_DUE_LEDGER,
        element: <FeeDueLedger />,
    },
    {
        path: BILLING_REPORT_FEE_SUMMARY,
        element: <FeeSummary />,
    },
    {
        path: BILLING_REPORT_FEE_SCHOLAR,
        element: <ScholarPost />,
    },
    {
        path: BILLING_SCHOLAR_POST_LIST,
        element: <ScholarPostList><Outlet /></ScholarPostList>,
        children: [
            { path: "new", element: <ScholarPostCreate /> },
            { path: ":id/edit", element: <ScholarPostEdit /> },
        ],
    },
    {
        path: BILLING_SCHOLAR_PERCENT_LIST,
        element: <ScholarPercentList><Outlet /></ScholarPercentList>,
        children: [
            { path: "new", element: <ScholarPercentCreate /> },
        ],
    },
    {
        path: BILLING_SCHOLAR_PERCENT_SHOW,
        element: <ScholarPercentShow />,
    },
    {
        path: BILLING_SCHOLAR_ITEM_LIST,
        element: <ScholarItemList><Outlet /></ScholarItemList>,
        children: [
            { path: "new", element: <ScholarItemCreate /> },
            { path: ":id/edit", element: <ScholarItemEdit /> },
        ],
    },
    {
        path: BILLING_FEE_RELEASE_LIST,
        element: <FeeReleaseList />,
    },
    {
        path: BILLING_FEE_RELEASE_EDIT,
        element: <FeeReleaseEdit />,
    },
    {
        path: BILLING_FEE_RELEASE_CREATE,
        element: <FeeReleaseCreate />,
    },
    {
        path: BILLING_FEE_RELEASE_SHOW,
        element: <FeeReleaseShow />,
    },
    {
        path: BILLING_FEE_RECEIVE_LIST,
        element: <FeeReceiveShow />,
    },
    {
        path: BILLING_INVOICE_LIST,
        element: <InvoiceList />,
    },
    {
        path: BILLING_INVOICE_SHOW,
        element: <BillingShow />,
    },
    {
        path: BILLING_LEDGER_LIST,
        element: <LedgerList><Outlet /></LedgerList>,
        children: [
            { path: "new", element: <LedgerCreate /> },
            { path: ":id/edit", element: <LedgerEdit /> },
        ],
    },
    {
        path: BILLING_DATAVALUE_LIST,
        element: <BillingDataValueList />,
    },
    {
        path: BILLING_DATAVALUE_EDIT,
        element: <BillingDataValueEdit />,
    },
]


export const getBillingResource = (t: any) => {
    return [
        {
            name: BILLING_FEE_RECEIVE_NAME,
            list: BILLING_FEE_RECEIVE_LIST,
            meta: {
                icon: <LiaFileInvoiceDollarSolid />,
                label: t("feeReceive.feeReceive", { ns: LANG_BILLING }),
            }
        },
        {
            name: BILLING_FEE_RELEASE_NAME,
            list: BILLING_FEE_RELEASE_LIST,
            create: BILLING_FEE_RELEASE_CREATE,
            edit: BILLING_FEE_RELEASE_EDIT,
            show: BILLING_FEE_RELEASE_SHOW,
            meta: {
                icon: <IoMdCheckboxOutline />,
                label: t("feeRelease.feeRelease", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_INVOICE_NAME,
            list: BILLING_INVOICE_LIST,
            show: BILLING_INVOICE_SHOW,
            meta: {
                icon: <CiReceipt />,
                label: t("invoice.invoice", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_ENTRANCE_NAME,
            meta: {
                icon: <PiStudent />,
                label: t("entrance.entrance", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_ENTRANCE_APPLICATION_CREATE,
            list: BILLING_ENTRANCE_APPLICATION_CREATE,
            meta: {
                parent: BILLING_ENTRANCE_NAME,
                label: t("entrance.form", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_ENTRANCE_APPLICATION_LIST,
            list: BILLING_ENTRANCE_APPLICATION_LIST,
            meta: {
                parent: BILLING_ENTRANCE_NAME,
                label: t("entrance.application", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_ENTRANCE_ADMISSION_LIST,
            list: BILLING_ENTRANCE_ADMISSION_LIST,
            meta: {
                parent: BILLING_ENTRANCE_NAME,
                label: t("entrance.admission", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_NAME,
            meta: {
                icon: <GoGraph />,
                label: t("report.report", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_FEE_COLLECTION,
            list: BILLING_REPORT_FEE_COLLECTION,
            meta: {
                parent: BILLING_REPORT_NAME,
                label: t("report.titles.feeCollection", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_FEE_DUE,
            list: BILLING_REPORT_FEE_DUE,
            meta: {
                parent: BILLING_REPORT_NAME,
                label: t("report.titles.feeDue", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_FEE_DUE_LEDGER,
            list: BILLING_REPORT_FEE_DUE_LEDGER,
            meta: {
                parent: BILLING_REPORT_NAME,
                label: t("report.titles.feeDueLedger", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_FEE_SUMMARY,
            list: BILLING_REPORT_FEE_SUMMARY,
            meta: {
                parent: BILLING_REPORT_NAME,
                label: t("report.titles.feeSummary", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_REPORT_FEE_SCHOLAR,
            list: BILLING_REPORT_FEE_SCHOLAR,
            meta: {
                parent: BILLING_REPORT_NAME,
                label: t("report.titles.feeScholar", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_FEE_NAME,
            meta: {
                icon: <TbReceiptRupee />,
                label: t("fee.fee", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_FEE_CLASS_NAME,
            list: BILLING_FEE_CLASS_LIST,
            create: BILLING_FEE_CLASS_CREATE,
            edit: BILLING_FEE_CLASS_EDIT,
            meta: {
                parent: BILLING_FEE_NAME,
                label: t("feeClass.feeClass", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_FEE_STUDENT_NAME,
            list: BILLING_FEE_STUDENT_LIST,
            create: BILLING_FEE_STUDENT_CREATE,
            meta: {
                parent: BILLING_FEE_NAME,
                label: t("feeStudent.feeStudent", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_FEE_ITEM_NAME,
            list: BILLING_FEE_ITEM_LIST,
            create: BILLING_FEE_ITEM_CREATE,
            edit: BILLING_FEE_ITEM_EDIT,
            meta: {
                parent: BILLING_FEE_NAME,
                label: t("feeItem.feeItem", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_SCHOLAR_NAME,
            meta: {
                icon: <CiDiscount1 />,
                label: t("scholar.scholar", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_SCHOLAR_PERCENT_NAME,
            list: BILLING_SCHOLAR_PERCENT_LIST,
            create: BILLING_SCHOLAR_PERCENT_CREATE,
            show: BILLING_SCHOLAR_PERCENT_SHOW,
            // edit: BILLING_SCHOLAR_PERCENT_EDIT,
            meta: {
                parent: BILLING_SCHOLAR_NAME,
                label: t("scholarPercent.scholarPercent", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_SCHOLAR_POST_NAME,
            list: BILLING_SCHOLAR_POST_LIST,
            create: BILLING_SCHOLAR_POST_CREATE,
            edit: BILLING_SCHOLAR_POST_EDIT,
            meta: {
                parent: BILLING_SCHOLAR_NAME,
                label: t("scholarPost.scholarPost", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_SCHOLAR_ITEM_NAME,
            list: BILLING_SCHOLAR_ITEM_LIST,
            create: BILLING_SCHOLAR_ITEM_CREATE,
            edit: BILLING_SCHOLAR_ITEM_EDIT,
            meta: {
                parent: BILLING_SCHOLAR_NAME,
                label: t("scholarItem.scholarItem", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_OTHER_NAME,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_LEDGER_NAME,
            list: BILLING_LEDGER_LIST,
            create: BILLING_LEDGER_CREATE,
            edit: BILLING_LEDGER_EDIT,
            meta: {
                parent: BILLING_OTHER_NAME,
                label: t("ledger.ledger", { ns: LANG_BILLING }),
            },
        },
        {
            name: BILLING_DATAVALUE_NAME,
            list: BILLING_DATAVALUE_LIST,
            edit: BILLING_DATAVALUE_EDIT,
            meta: {
                label: t("datavalue.datavalue", { ns: LANG_BILLING }),
                parent: BILLING_OTHER_NAME
            },
        },
    ]
}