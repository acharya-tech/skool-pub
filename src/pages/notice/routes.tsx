import { Route } from "react-router-dom";

import { LiaSmsSolid } from "react-icons/lia";
import { AiOutlineNotification } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi2";
import { LANG_NOTICE } from "@common/constant";

import { NOTICE_DASHBOARD, NOTICE_DATAVALUE_EDIT, NOTICE_DATAVALUE_LIST, NOTICE_DATAVALUE_NAME, NOTICE_EMAIL_CREATE, NOTICE_EMAIL_LIST, NOTICE_EMAIL_NAME, NOTICE_EMAIL_VIEW, NOTICE_NOTICE_CREATE, NOTICE_NOTICE_LIST, NOTICE_NOTICE_NAME, NOTICE_NOTICE_VIEW, NOTICE_OTHER_NAME, NOTICE_SMS_CREATE, NOTICE_SMS_LIST, NOTICE_SMS_NAME, NOTICE_SMS_VIEW, NOTICE_TEMPLATE_CREATE, NOTICE_TEMPLATE_EDIT, NOTICE_TEMPLATE_LIST, NOTICE_TEMPLATE_NAME } from "@notice/constant/local.urls";
import { lazy } from "react";


const SmsList = lazy(() => import("./sms/list"));
const SMSCreate = lazy(() => import("./sms/create"));
const SmsShow = lazy(() => import("./sms/show"));
const NoticeList = lazy(() => import("./message/list"));
const NoticeShow = lazy(() => import("./message/show"));
const EmailList = lazy(() => import("./email/list"));
const EmailShow = lazy(() => import("./email/show"));
const EmailCreate = lazy(() => import("./email/create"));
const TemplateList = lazy(() => import("./template/list"));
const TemplateCreate = lazy(() => import("./template/create"));
const TemplateEdit = lazy(() => import("./template/edit"));
const NoticeDataValueList = lazy(() => import("./datavalue/list"));
const NoticeDataValueEdit = lazy(() => import("./datavalue/edit"));
const NoticeCreate = lazy(() => import("./message/create"));
const DashboardPage = lazy(() => import("../dashboard"));



export const noticeRoute = [
    {
        path: NOTICE_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        path: NOTICE_SMS_LIST,
        element: <SmsList />,
    },
    {
        path: NOTICE_SMS_CREATE,
        element: <SMSCreate />,
    },
    {
        path: NOTICE_SMS_VIEW,
        element: <SmsShow />,
    },
    {
        path: NOTICE_EMAIL_LIST,
        element: <EmailList />,
    },
    {
        path: NOTICE_EMAIL_CREATE,
        element: <EmailCreate />,
    },
    {
        path: NOTICE_EMAIL_VIEW,
        element: <EmailShow />,
    },
    {
        path: NOTICE_NOTICE_LIST,
        element: <NoticeList />,
    },
    {
        path: NOTICE_NOTICE_VIEW,
        element: <NoticeShow />,
    },
    {
        path: NOTICE_NOTICE_CREATE,
        element: <NoticeCreate />,
    },
    {
        path: NOTICE_TEMPLATE_LIST,
        element: <TemplateList />,
    },
    {
        path: NOTICE_TEMPLATE_CREATE,
        element: <TemplateCreate />,
    },
    {
        path: NOTICE_TEMPLATE_EDIT,
        element: <TemplateEdit />,
    },
    {
        path: NOTICE_DATAVALUE_LIST,
        element: <NoticeDataValueList />,
    },
    {
        path: NOTICE_DATAVALUE_EDIT,
        element: <NoticeDataValueEdit />,
    },
]

export const getNoticeResource = (t: any) => {
    return [
        {
            name: NOTICE_SMS_NAME,
            list: NOTICE_SMS_LIST,
            create: NOTICE_SMS_CREATE,
            show: NOTICE_SMS_VIEW,
            meta: {
                icon: <LiaSmsSolid />,
                label: t("sms.sms", { ns: LANG_NOTICE }),
            },
        },
        {
            name: NOTICE_EMAIL_NAME,
            list: NOTICE_EMAIL_LIST,
            create: NOTICE_EMAIL_CREATE,
            show: NOTICE_EMAIL_VIEW,
            meta: {
                icon: <MdOutlineEmail />,
                label: t("email.email", { ns: LANG_NOTICE }),
            },
        },
        {
            name: NOTICE_NOTICE_NAME,
            list: NOTICE_NOTICE_LIST,
            create: NOTICE_NOTICE_CREATE,
            show: NOTICE_NOTICE_VIEW,
            meta: {
                icon: <AiOutlineNotification />,
                label: t("notice.notice", { ns: LANG_NOTICE }),
            },
        },
        {
            name: NOTICE_OTHER_NAME,
            meta: {
                icon: <HiOutlineCog />,
                label: t("setting.setting", { ns: LANG_NOTICE }),
            },
        },
        {
            name: NOTICE_TEMPLATE_NAME,
            list: NOTICE_TEMPLATE_LIST,
            create: NOTICE_TEMPLATE_CREATE,
            edit: NOTICE_TEMPLATE_EDIT,
            meta: {
                parent: NOTICE_OTHER_NAME,
                label: t("template.template", { ns: LANG_NOTICE }),
            },
        },
        {
            name: NOTICE_DATAVALUE_NAME,
            list: NOTICE_DATAVALUE_LIST,
            edit: NOTICE_DATAVALUE_EDIT,
            meta: {
                label: t("datavalue.datavalue", { ns: LANG_NOTICE }),
                parent: NOTICE_OTHER_NAME
            },
        },
    ]
}