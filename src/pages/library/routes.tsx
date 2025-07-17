import { Route } from "react-router-dom";

import { MdOutlineDashboard } from "react-icons/md";

import { LANG_LIBRARY } from "@common/constant";
import {
  LIBRARY_AUTHOR_CREATE,
  LIBRARY_AUTHOR_EDIT,
  LIBRARY_AUTHOR_LIST,
  LIBRARY_AUTHOR_NAME,
  LIBRARY_AUTHOR_SHOW,
  LIBRARY_BARCODE_GENERATE,
  LIBRARY_BARCODE_LIST,
  LIBRARY_BARCODE_NAME,
  LIBRARY_BCODE_GENERATE,
  LIBRARY_BCODE_LIST,
  LIBRARY_BOOK_ACTIVITY_LIST,
  LIBRARY_BOOK_ACTIVITY_NAME,
  LIBRARY_BOOK_COPY_CREATE,
  LIBRARY_BOOK_COPY_LIST,
  LIBRARY_BOOK_COPY_NAME,
  LIBRARY_BOOK_COPY_SHOW,
  LIBRARY_BOOK_CREATE,
  LIBRARY_BOOK_DISCARDED_LIST,
  LIBRARY_BOOK_DISCARDED_NAME,
  LIBRARY_BOOK_DUES_LIST,
  LIBRARY_BOOK_DUES_NAME,
  LIBRARY_BOOK_EDIT,
  LIBRARY_BOOK_LIST,
  LIBRARY_BOOK_MISSING_LIST,
  LIBRARY_BOOK_MISSING_NAME,
  LIBRARY_BOOK_NAME,
  LIBRARY_BOOK_SHOW,
  LIBRARY_CATALOGING,
  LIBRARY_CHECK_IN_OUT_EDIT,
  LIBRARY_CHECK_IN_OUT_LIST,
  LIBRARY_CHECK_IN_OUT_NAME,
  LIBRARY_CHECK_IN_OUT_SHOW,
  LIBRARY_DASHBOARD_LIST,
  LIBRARY_DASHBOARD_NAME,
  LIBRARY_DATAVALUE_EDIT,
  LIBRARY_DATAVALUE_LIST,
  LIBRARY_DATAVALUE_NAME,
  LIBRARY_EBOOK_CREATE,
  LIBRARY_EBOOK_EDIT,
  LIBRARY_EBOOK_LIST,
  LIBRARY_EBOOK_NAME,
  LIBRARY_EBOOK_SHOW,
  LIBRARY_LABELS,
  LIBRARY_NEW_BOOK_LIST,
  LIBRARY_NEW_BOOK_NAME,
  LIBRARY_NEW_BOOK_SHOW,
  LIBRARY_PATRON_CARD_LIST,
  LIBRARY_PATRON_CARD_NAME,
  LIBRARY_PATRON_CREATE,
  LIBRARY_PATRON_EDIT,
  LIBRARY_PATRON_LIST,
  LIBRARY_PATRON_NAME,
  LIBRARY_PATRON_SHOW,
  // LIBRARY_PATRON_STUDENT_DETAIL,
  LIBRARY_PATRON_TYPE_CREATE,
  LIBRARY_PATRON_TYPE_EDIT,
  LIBRARY_PATRON_TYPE_LIST,
  LIBRARY_PATRON_TYPE_NAME,
  LIBRARY_PUBLISHER_CREATE,
  LIBRARY_PUBLISHER_EDIT,
  LIBRARY_PUBLISHER_LIST,
  LIBRARY_PUBLISHER_NAME,
  LIBRARY_REPORTS,
  LIBRARY_SETTING,
  LIBRARY_SPINE_GENERATE,
  LIBRARY_SPINE_LIST,
  LIBRARY_SPINE_NAME,
} from "@library/constant";
import { AiOutlineTablet } from "react-icons/ai";
import { LuArrowUpDown } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { PiBooksLight } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineCog, HiTag } from "react-icons/hi2";

import { lazy } from "react";

const AuthorCreate = lazy(() => import("./author/create"));
const AuthorEdit = lazy(() => import("./author/edit"));
const AuthorList = lazy(() => import("./author/list"));
const BarcodeCreate = lazy(() => import("./labels/barcode"));
const BarcodeList = lazy(() => import("./labels/barcode"));
const BookCopyList = lazy(() => import("./book-copy/list"));
const BookCopyShow = lazy(() => import("./book-copy/show"));
const BookCreate = lazy(() => import("./book/create"));
const BookEdit = lazy(() => import("./book/edit"));
const BookList = lazy(() => import("./book/list"));
const BookShow = lazy(() => import("./book/show"));
const CheckInOutLIst = lazy(() => import("./check-in-out/list"));
const EBookList = lazy(() => import("./ebook/list"));
const EBookShow = lazy(() => import("./ebook/show"));
const LibraryDataValueEdit = lazy(() => import("./datavalue/edit"));
const LibraryDataValueList = lazy(() => import("./datavalue/list"));
const LibraryDashboard = lazy(() => import("./dashboard/dashboard"));
const NewBookList = lazy(() => import("./new-book/list"));
const PatronCardList = lazy(() => import("./labels/card"));
const PatronEdit = lazy(() => import("./patron/edit"));
const PatronList = lazy(() => import("./patron/list"));
const PatronShow = lazy(() => import("./patron/show"));
const PatronTypeEdit = lazy(() => import("./patron_type/edit"));
const PatronTypeList = lazy(() => import("./patron_type/list"));
const PublisherCreate = lazy(() => import("./publisher/create"));
const PublisherEdit = lazy(() => import("./publisher/edit"));
const PublisherList = lazy(() => import("./publisher/list"));
const ReportActivityList = lazy(() => import("./report/activity"));
const ReportDiscardList = lazy(() => import("./report/discard"));
const ReportDueList = lazy(() => import("./report/due"));
const ReportMissingList = lazy(() => import("./report/missing"));
const SpineList = lazy(() => import("./labels/spine"));

import GenerateSpine from "@library/labels/components/_generateSpine";
import GenerateBarcode from "@library/labels/components/_generateBarcode";

export const libraryRoute =  [
    {
      path: LIBRARY_DASHBOARD_NAME,
      element: <LibraryDashboard />,
    },
    {
      path: LIBRARY_EBOOK_LIST,
      element: <EBookList />,
    },
    {
      path: LIBRARY_EBOOK_SHOW,
      element: <EBookShow />,
    },
    {
      path: LIBRARY_BOOK_LIST,
      element: <BookList />,
    },
    {
      path: LIBRARY_BOOK_EDIT,
      element: <BookEdit />,
    },
    {
      path: LIBRARY_BOOK_CREATE,
      element: <BookCreate />,
    },
    {
      path: LIBRARY_BOOK_SHOW,
      element: <BookShow />,
    },
    {
      path: LIBRARY_PATRON_LIST,
      element: <PatronList />,
    },
    {
      path: LIBRARY_PATRON_SHOW,
      element: <PatronShow />,
    },
    {
      path: LIBRARY_PATRON_EDIT,
      element: <PatronEdit />,
    },

    {
      path: LIBRARY_AUTHOR_LIST,
      element: <AuthorList />,
      children: [
        {
          path: "new",
          element: <AuthorCreate />,
        },
        {
          path: ":id/edit",
          element: <AuthorEdit />,
        },
      ],
    },

    {
      path: LIBRARY_PATRON_TYPE_LIST,
      element: <PatronTypeList />,
      children: [
        {
          path: ":id/edit",
          element: <PatronTypeEdit />,
        },
      ],
    },

    {
      path: LIBRARY_PUBLISHER_NAME,
      element: <PublisherList />,
      children: [
        {
          path: "new",
          element: <PublisherCreate />,
        },
        {
          path: ":id/edit",
          element: <PublisherEdit />,
        },
      ],
    },

    {
      path: LIBRARY_BOOK_COPY_LIST,
      element: <BookCopyList />,
    },
    {
      path: LIBRARY_BOOK_COPY_CREATE,
      element: <BookCreate />,
    },
    {
      path: LIBRARY_BOOK_COPY_SHOW,
      element: <BookCopyShow />,
    },

    {
      path: LIBRARY_NEW_BOOK_LIST,
      element: <NewBookList />,
    },

    {
      path: LIBRARY_CHECK_IN_OUT_LIST,
      element: <CheckInOutLIst />,
    },

    // ReportActivityList
    {
      path: LIBRARY_BOOK_ACTIVITY_LIST,
      element: <ReportActivityList />,
    },

    {
      path: LIBRARY_BOOK_DUES_LIST,
      element: <ReportDueList />,
    },

    {
      path: LIBRARY_BOOK_MISSING_LIST,
      element: <ReportMissingList />,
    },

    {
      path: LIBRARY_BOOK_DISCARDED_LIST,
      element: <ReportDiscardList />,
    },

    // for label
    {
      path: LIBRARY_PATRON_CARD_LIST,
      element: <PatronCardList />,
    },

    {
      path: LIBRARY_SPINE_LIST,
      element: <SpineList />,
    },
    {
      path: LIBRARY_SPINE_GENERATE,
      element: <GenerateSpine />,
    },

    {
      path: LIBRARY_BARCODE_LIST,
      element: <BarcodeList />,
    },
    {
      path: LIBRARY_BARCODE_GENERATE,
      element: <GenerateSpine />,
    },
    {
      path: LIBRARY_BCODE_LIST,
      element: <BarcodeCreate />,
    },
    {
      path: LIBRARY_BCODE_GENERATE,
      element: <GenerateBarcode />,
    },

    {
      path: LIBRARY_DATAVALUE_LIST,
      element: <LibraryDataValueList />,
    },
    {
      path: LIBRARY_DATAVALUE_EDIT,
      element: <LibraryDataValueEdit />,
    },
  ]

export const getLibraryResource = (t: any) => {
  return [
    {
      name: LIBRARY_DASHBOARD_NAME,
      list: LIBRARY_DASHBOARD_LIST,
      meta: {
        icon: <MdOutlineDashboard />,
        label: t("dashboard.dashboard", { ns: LANG_LIBRARY }),
      },
    },
    {
      name: LIBRARY_EBOOK_NAME,
      list: LIBRARY_EBOOK_LIST,
      create: LIBRARY_EBOOK_CREATE,
      edit: LIBRARY_EBOOK_EDIT,
      show: LIBRARY_EBOOK_SHOW,
      meta: {
        icon: <AiOutlineTablet />,
        label: t("ebook.ebook", { ns: LANG_LIBRARY }),
      },
    },

    {
      name: LIBRARY_CHECK_IN_OUT_NAME,
      list: LIBRARY_CHECK_IN_OUT_LIST,
      edit: LIBRARY_CHECK_IN_OUT_EDIT,
      show: LIBRARY_CHECK_IN_OUT_SHOW,
      meta: {
        icon: <LuArrowUpDown />,
        label: t("checkInOut.checkInOut", { ns: LANG_LIBRARY }),
      },
    },

    {
      name: LIBRARY_PATRON_NAME,
      list: LIBRARY_PATRON_LIST,
      create: LIBRARY_PATRON_CREATE,
      edit: LIBRARY_PATRON_EDIT,
      show: LIBRARY_PATRON_SHOW,
      meta: {
        icon: <FiUsers />,
        label: t("patron.patron", { ns: LANG_LIBRARY }),
      },
    },

    // cataloging

    {
      name: LIBRARY_CATALOGING,
      meta: {
        icon: <PiBooksLight />,
        label: t("cataloging.cataloging", { ns: LANG_LIBRARY }),
      },
    },

    {
      name: LIBRARY_BOOK_NAME,
      list: LIBRARY_BOOK_LIST,
      create: LIBRARY_BOOK_CREATE,
      edit: LIBRARY_BOOK_EDIT,
      show: LIBRARY_BOOK_SHOW,
      meta: {
        label: t("book.book", { ns: LANG_LIBRARY }),
        parent: LIBRARY_CATALOGING,
      },
    },

    {
      name: LIBRARY_NEW_BOOK_NAME,
      list: LIBRARY_NEW_BOOK_LIST,
      show: LIBRARY_NEW_BOOK_SHOW,
      meta: {
        label: t("book.titles.newBook", { ns: LANG_LIBRARY }),
        parent: LIBRARY_CATALOGING,
      },
    },
    {
      name: LIBRARY_BOOK_COPY_NAME,
      list: LIBRARY_BOOK_COPY_LIST,
      show: LIBRARY_BOOK_COPY_SHOW,
      meta: {
        label: t("bookCopy.bookCopy", { ns: LANG_LIBRARY }),
        parent: LIBRARY_CATALOGING,
      },
    },

    // Reports
    {
      name: LIBRARY_REPORTS,
      list: LIBRARY_REPORTS,
      meta: {
        icon: <TbReportAnalytics />,
        label: t("report.report", { ns: LANG_LIBRARY }),
      },
    },
    {
      name: LIBRARY_BOOK_ACTIVITY_NAME,
      list: LIBRARY_BOOK_ACTIVITY_LIST,
      meta: {
        label: t("report.titles.bookActivity", { ns: LANG_LIBRARY }),
        parent: LIBRARY_REPORTS,
      },
    },
    {
      name: LIBRARY_BOOK_DUES_NAME,
      list: LIBRARY_BOOK_DUES_LIST,
      meta: {
        label: t("report.titles.duesAndFines", { ns: LANG_LIBRARY }),
        parent: LIBRARY_REPORTS,
      },
    },
    {
      name: LIBRARY_BOOK_MISSING_NAME,
      list: LIBRARY_BOOK_MISSING_LIST,
      meta: {
        label: t("report.titles.missingCopies", { ns: LANG_LIBRARY }),
        parent: LIBRARY_REPORTS,
      },
    },
    {
      name: LIBRARY_BOOK_DISCARDED_NAME,
      list: LIBRARY_BOOK_DISCARDED_LIST,
      meta: {
        label: t("report.titles.discardedCopies", { ns: LANG_LIBRARY }),
        parent: LIBRARY_REPORTS,
      },
    },

    // Labels
    {
      name: LIBRARY_LABELS,
      list: LIBRARY_LABELS,
      meta: {
        icon: <IoPricetagsOutline />,
        label: t("labels.labels", { ns: LANG_LIBRARY }),
      },
    },
    {
      name: LIBRARY_PATRON_CARD_NAME,
      list: LIBRARY_PATRON_CARD_LIST,
      meta: {
        label: t("patronCard.patronCard", { ns: LANG_LIBRARY }),
        parent: LIBRARY_LABELS,
      },
    },
    {
      name: LIBRARY_SPINE_NAME,
      list: LIBRARY_SPINE_LIST,
      generate: LIBRARY_SPINE_GENERATE,
      meta: {
        label: t("spine.spine", { ns: LANG_LIBRARY }),
        parent: LIBRARY_LABELS,
      },
    },
    {
      name: LIBRARY_BARCODE_NAME,
      list: LIBRARY_BARCODE_LIST,
      // generate:LIBRARY_BARCODE_GENERATE,
      // To Do : Generate Barcode create form
      meta: {
        label: t("barcode.barcode", { ns: LANG_LIBRARY }),
        parent: LIBRARY_LABELS,
      },
    },

    // {
    //   name: LIBRARY_BCODE_NAME,
    //   list: LIBRARY_BCODE_LIST,
    //   generate:LIBRARY_BARCODE_GENERATE,
    //   // To Do : Generate Barcode create form
    //   meta: {
    //     label: t("barcode.barcode", { ns: LANG_LIBRARY }),
    //     parent: LIBRARY_LABELS,
    //   },
    // },

    // setting
    {
      name: LIBRARY_SETTING,
      list: LIBRARY_SETTING,
      meta: {
        icon: <HiOutlineCog />,
        label: t("setting.setting", { ns: LANG_LIBRARY }),
      },
    },
    {
      name: LIBRARY_AUTHOR_NAME,
      list: LIBRARY_AUTHOR_LIST,
      create: LIBRARY_AUTHOR_CREATE,
      edit: LIBRARY_AUTHOR_EDIT,
      show: LIBRARY_AUTHOR_SHOW,
      meta: {
        label: t("author.author", { ns: LANG_LIBRARY }),
        parent: LIBRARY_SETTING,
      },
    },
    {
      name: LIBRARY_PATRON_TYPE_NAME,
      list: LIBRARY_PATRON_TYPE_LIST,
      create: LIBRARY_PATRON_TYPE_CREATE,
      edit: LIBRARY_PATRON_TYPE_EDIT,
      meta: {
        label: t("patronType.patronType", { ns: LANG_LIBRARY }),
        parent: LIBRARY_SETTING,
      },
    },
    {
      name: LIBRARY_PUBLISHER_NAME,
      list: LIBRARY_PUBLISHER_LIST,
      create: LIBRARY_PUBLISHER_CREATE,
      edit: LIBRARY_PUBLISHER_EDIT,
      meta: {
        label: t("publisher.publisher", { ns: LANG_LIBRARY }),
        parent: LIBRARY_SETTING,
      },
    },
    {
      name: LIBRARY_DATAVALUE_NAME,
      list: LIBRARY_DATAVALUE_LIST,
      edit: LIBRARY_DATAVALUE_EDIT,
      meta: {
        label: t("datavalue.datavalue", { ns: LANG_LIBRARY }),
        parent: LIBRARY_SETTING,
      },
    },
  ];
};
