import { Route } from "react-router-dom";

import { MdOutlineDashboard } from "react-icons/md";

import { LANG_DATAVALUE, LANG_INVENTORY } from "@common/constant";
import {
  INVENTORY_BILLING_CREATE,
  INVENTORY_BILLING_LIST,
  INVENTORY_BILLING_NAME,
  INVENTORY_BILLING_SHOW,
  INVENTORY_DASHBOARD_LIST,
  INVENTORY_DASHBOARD_NAME,
  INVENTORY_DATAVALUE_EDIT,
  INVENTORY_DATAVALUE_LIST,
  INVENTORY_DATAVALUE_NAME,
  INVENTORY_GROUP_CREATE,
  INVENTORY_GROUP_EDIT,
  INVENTORY_GROUP_LIST,
  INVENTORY_GROUP_NAME,
  INVENTORY_GROUP_SHOW,
  INVENTORY_INENTRY_CREATE,
  INVENTORY_INENTRY_EDIT,
  INVENTORY_INENTRY_LIST,
  INVENTORY_INENTRY_NAME,
  INVENTORY_INENTRY_SHOW,
  INVENTORY_ITEM_CHECKOUT_CREATE,
  INVENTORY_ITEM_CHECKOUT_EDIT,
  INVENTORY_ITEM_CHECKOUT_LIST,
  INVENTORY_ITEM_CHECKOUT_NAME,
  INVENTORY_ITEM_CHECKOUT_SHOW,
  INVENTORY_OTHER_LIST,
  INVENTORY_OTHER_NAME,
  INVENTORY_OUTENTRY_LIST,
  INVENTORY_OUTENTRY_NAME,
  INVENTORY_PROCUREMENT_CREATE,
  INVENTORY_PROCUREMENT_EDIT,
  INVENTORY_PROCUREMENT_LIST,
  INVENTORY_PROCUREMENT_NAME,
  INVENTORY_PROCUREMENT_SHOW,
  INVENTORY_PRODUCT_CREATE,
  INVENTORY_PRODUCT_EDIT,
  INVENTORY_PRODUCT_LIST,
  INVENTORY_PRODUCT_NAME,
  INVENTORY_PRODUCT_SHOW,
  INVENTORY_REPORT_NAME,
  INVENTORY_REPORT_STOCKSUMMARY,
  INVENTORY_REQUISITION_CREATE,
  INVENTORY_REQUISITION_EDIT,
  INVENTORY_REQUISITION_LIST,
  INVENTORY_REQUISITION_NAME,
  INVENTORY_REQUISITION_SHOW,
  INVENTORY_TEMPLATE_CREATE,
  INVENTORY_TEMPLATE_EDIT,
  INVENTORY_TEMPLATE_LIST,
  INVENTORY_TEMPLATE_NAME,
  INVENTORY_VENDOR_CREATE,
  INVENTORY_VENDOR_EDIT,
  INVENTORY_VENDOR_LIST,
  INVENTORY_VENDOR_NAME,
} from "@inventory/constant";
import { BsBoxArrowInDown } from "react-icons/bs";
import { BsBoxArrowUp } from "react-icons/bs";
import { CiPaperplane } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GoGraph } from "react-icons/go";
import { HiOutlineCog } from "react-icons/hi2";
import { lazy } from "react";

import { Dashboard } from "@inventory/dashboard/list";
const BillingCreate = lazy(() => import("./billing/create"));
const BillingList = lazy(() => import("./billing/list"));
const BillingShow = lazy(() => import("./billing/show"));
const GroupCreate = lazy(() => import("./group/create"));
const GroupEdit = lazy(() => import("./group/edit"));
const GroupList = lazy(() => import("./group/list"));
const GroupShow = lazy(() => import("./group/show"));
const InEntryCreate = lazy(() => import("./inEntry/create"));
const InEntryEdit = lazy(() => import("./inEntry/edit"));
const InEntryList = lazy(() => import("./inEntry/list"));
const InEntryShow = lazy(() => import("./inEntry/show"));
const InventoryDataValueEdit = lazy(() => import("./datavalue/edit"));
const InventoryDataValueList = lazy(() => import("./datavalue/list"));
const ItemCheckoutCreate = lazy(() => import("./itemCheckout/create"));
const ItemCheckoutList = lazy(() => import("./itemCheckout/list"));
const ItemCheckoutShow = lazy(() => import("./itemCheckout/show"));
const ProcurementCreate = lazy(() => import("./procurements/create"));
const ProcurementEdit = lazy(() => import("./procurements/edit"));
const ProcurementList = lazy(() => import("./procurements/list"));
const ProcurementShow = lazy(() => import("./procurements/show"));
const ProductCreate = lazy(() => import("./product/create"));
const ProductEdit = lazy(() => import("./product/edit"));
const ProductList = lazy(() => import("./product/list"));
const ProductShow = lazy(() => import("./product/show"));
const RequisitionCreate = lazy(() => import("./requsition/create"));
const RequisitionList = lazy(() => import("./requsition/list"));
const RequisitionShow = lazy(() => import("./requsition/show"));
const StockSummary = lazy(() => import("./reports/stockSummary"));
const TemplateCreate = lazy(() => import("./template/create"));
const TemplateEdit = lazy(() => import("./template/edit"));
const TemplateList = lazy(() => import("./template/list"));
const VendorCreate = lazy(() => import("./vendor/create"));
const VendorEdit = lazy(() => import("./vendor/edit"));
const VendorList = lazy(() => import("./vendor/list"));

export const inventoryRoute = [
  {
    path: INVENTORY_DASHBOARD_NAME,
    element: <Dashboard />,
  },
  // PRODUCT ROUTES
  {
    path: INVENTORY_PRODUCT_LIST,
    element: <ProductList />,
  },
  {
    path: INVENTORY_PRODUCT_CREATE,
    element: <ProductCreate />,
  },
  {
    path: INVENTORY_PRODUCT_EDIT,
    element: <ProductEdit />,
  },
  {
    path: INVENTORY_PRODUCT_SHOW,
    element: <ProductShow />,
  },
  // PROCUREMENTS ROUTES
  {
    path: INVENTORY_PROCUREMENT_LIST,
    element: <ProcurementList />,
  },
  {
    path: INVENTORY_PROCUREMENT_CREATE,
    element: <ProcurementCreate />,
  },
  {
    path: INVENTORY_PROCUREMENT_EDIT,
    element: <ProcurementEdit />,
  },
  {
    path: INVENTORY_PROCUREMENT_SHOW,
    element: <ProcurementShow />,
  },
  // IN ENTRY LIST
  {
    path: INVENTORY_INENTRY_LIST,
    element: <InEntryList />,
  },
  {
    path: INVENTORY_INENTRY_CREATE,
    element: <InEntryCreate />,
  },
  {
    path: INVENTORY_INENTRY_EDIT,
    element: <InEntryEdit />,
  },
  {
    path: INVENTORY_INENTRY_SHOW,
    element: <InEntryShow />,
  },
  // ITEM CHECKOUT LIST
  {
    path: INVENTORY_ITEM_CHECKOUT_LIST,
    element: <ItemCheckoutList />,
  },
  {
    path: INVENTORY_ITEM_CHECKOUT_CREATE,
    element: <ItemCheckoutCreate />,
  },
  {
    path: INVENTORY_ITEM_CHECKOUT_SHOW,
    element: <ItemCheckoutShow />,
  },
  // VENDOR LIST
  {
    path: INVENTORY_VENDOR_LIST,
    element: <VendorList />,
    children: [
      { path: "new", element: <VendorCreate /> },
      { path: ":id/edit", element: <VendorEdit /> },
    ],
  },
  // TEMPLATE LIST
  {
    path: INVENTORY_TEMPLATE_LIST,
    element: <TemplateList />,
    children: [
      { path: "new", element: <TemplateCreate /> },
      { path: ":id/edit", element: <TemplateEdit /> },
    ],
  },
  // DATA VALUE LIST
  {
    path: INVENTORY_DATAVALUE_LIST,
    element: <InventoryDataValueList />,
  },
  {
    path: INVENTORY_DATAVALUE_EDIT,
    element: <InventoryDataValueEdit />,
  },
  // BILLING LIST
  {
    path: INVENTORY_BILLING_LIST,
    element: <BillingList />,
  },
  {
    path: INVENTORY_BILLING_CREATE,
    element: <BillingCreate />,
  },
  {
    path: INVENTORY_BILLING_SHOW,
    element: <BillingShow />,
  },
  // ITEM REQUISITION LIST
  {
    path: INVENTORY_REQUISITION_NAME,
    element: <RequisitionList />,
  },
  {
    path: INVENTORY_REQUISITION_CREATE,
    element: <RequisitionCreate />,
  },
  {
    path: INVENTORY_REQUISITION_SHOW,
    element: <RequisitionShow />,
  },
  // BILL SUMMARY
  {
    path: INVENTORY_REPORT_STOCKSUMMARY,
    element: <StockSummary />,
  },
  // Group
  {
    path: INVENTORY_GROUP_LIST,
    element: <GroupList />,
    children: [
      { path: "new", element: <GroupCreate /> },
      { path: ":id/edit", element: <GroupEdit /> },
    ],
  },
  {
    path: INVENTORY_GROUP_SHOW,
    element: <GroupShow />,
  },
];



export const getInventoryResource = (t: any) => {
  return [
    {
      name: INVENTORY_DASHBOARD_NAME,
      list: INVENTORY_DASHBOARD_LIST,
      meta: {
        icon: <MdOutlineDashboard />,
        label: t("dashboard.dashboard", { ns: LANG_INVENTORY }),
      },
    },
    {
      name: INVENTORY_INENTRY_NAME,
      list: INVENTORY_INENTRY_LIST,
      create: INVENTORY_INENTRY_CREATE,
      edit: INVENTORY_INENTRY_EDIT,
      show: INVENTORY_INENTRY_SHOW,
      meta: {
        icon: <BsBoxArrowInDown />,
        label: t("inEntry.inEntry", { ns: LANG_INVENTORY }),
      },
    },

    {
      name: INVENTORY_OUTENTRY_NAME,
      list: INVENTORY_OUTENTRY_LIST,
      meta: {
        icon: <BsBoxArrowUp />,
        label: t("outEntry.outEntry", { ns: LANG_INVENTORY }),
      },
    },
    {
      name: INVENTORY_PROCUREMENT_NAME,
      list: INVENTORY_PROCUREMENT_LIST,
      create: INVENTORY_PROCUREMENT_CREATE,
      edit: INVENTORY_PROCUREMENT_EDIT,
      show: INVENTORY_PROCUREMENT_SHOW,
      meta: {
        icon: <CiPaperplane />,
        label: t("procurement.procurement", { ns: LANG_INVENTORY }),
      },
    },
    {
      name: INVENTORY_ITEM_CHECKOUT_NAME,
      list: INVENTORY_ITEM_CHECKOUT_LIST,
      create: INVENTORY_ITEM_CHECKOUT_CREATE,
      edit: INVENTORY_ITEM_CHECKOUT_EDIT,
      show: INVENTORY_ITEM_CHECKOUT_SHOW,
      meta: {
        label: t("itemCheckout.itemCheckout", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OUTENTRY_NAME,
      },
    },
    {
      name: INVENTORY_REQUISITION_NAME,
      list: INVENTORY_REQUISITION_LIST,
      create: INVENTORY_REQUISITION_CREATE,
      edit: INVENTORY_REQUISITION_EDIT,
      show: INVENTORY_REQUISITION_SHOW,
      meta: {
        label: t("requisition.requisition", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OUTENTRY_NAME,
      },
    },
    {
      name: INVENTORY_BILLING_NAME,
      list: INVENTORY_BILLING_LIST,
      create: INVENTORY_BILLING_CREATE,
      show: INVENTORY_BILLING_SHOW,
      // edit: INVENTORY_TEMPLATE_EDIT,
      meta: {
        icon: <LiaFileInvoiceDollarSolid />,
        label: t("billing.billing", { ns: LANG_INVENTORY }),
      },
    },

    {
      name: INVENTORY_REPORT_NAME,
      meta: {
        icon: <GoGraph />,
        label: t("reports.reports", { ns: LANG_INVENTORY }),
      },
    },
    {
      name: INVENTORY_REPORT_STOCKSUMMARY,
      list: INVENTORY_REPORT_STOCKSUMMARY,
      meta: {
        label: t("reports.stockSummary", { ns: LANG_INVENTORY }),
        parent: INVENTORY_REPORT_NAME,
      },
    },
    {
      name: INVENTORY_OTHER_NAME,
      list: INVENTORY_OTHER_LIST,
      meta: {
        icon: <HiOutlineCog />,
        label: t("setting.setting", { ns: LANG_INVENTORY }),
      },
    },
    {
      name: INVENTORY_PRODUCT_NAME,
      list: INVENTORY_PRODUCT_LIST,
      create: INVENTORY_PRODUCT_CREATE,
      edit: INVENTORY_PRODUCT_EDIT,
      show: INVENTORY_PRODUCT_SHOW,
      meta: {
        label: t("product.product", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OTHER_NAME,
      },
    },
    {
      name: INVENTORY_VENDOR_NAME,
      list: INVENTORY_VENDOR_LIST,
      create: INVENTORY_VENDOR_CREATE,
      edit: INVENTORY_VENDOR_EDIT,
      meta: {
        label: t("vendor.vendor", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OTHER_NAME,
      },
    },
    {
      name: INVENTORY_GROUP_NAME,
      list: INVENTORY_GROUP_LIST,
      create: INVENTORY_GROUP_CREATE,
      show: INVENTORY_GROUP_SHOW,
      edit: INVENTORY_GROUP_EDIT,
      meta: {
        label: t("groups.groups", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OTHER_NAME,
      },
    },
    {
      name: INVENTORY_TEMPLATE_NAME,
      list: INVENTORY_TEMPLATE_LIST,
      create: INVENTORY_TEMPLATE_CREATE,
      edit: INVENTORY_TEMPLATE_EDIT,
      meta: {
        label: t("template.template", { ns: LANG_INVENTORY }),
        parent: INVENTORY_OTHER_NAME,
      },
    },
    {
      name: INVENTORY_DATAVALUE_NAME,
      list: INVENTORY_DATAVALUE_LIST,
      edit: INVENTORY_DATAVALUE_EDIT,
      meta: {
        label: t("datavalue.datavalue", { ns: LANG_DATAVALUE }),
        parent: INVENTORY_OTHER_NAME
      },
    },
  ];
};
