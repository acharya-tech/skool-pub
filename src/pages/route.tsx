import { MAIN_ACADEMIC } from "@academic/constant/urls";
import { academicRoute, getAcademicResource } from "./academic/routes";
import { MAIN_ACCOUNT } from "@account/constant/urls";
import { accountRoute, getAccountResource } from "./account/routes";
import { MAIN_EMPLOYEE } from "@employee/constant/local.urls";
import { employeeRoute, getStaffResource } from "./employee/routes";
import { getStudentResource, studentRoute } from "./student/routes";
import { dashboardRoute } from "./dashboard/routes";
import { MAIN_VEHICLE } from "@vehicle/constant/local.urls";
import { getLocationResource, locationRoute } from "./vehicle/routes";
import { MAIN_STUDENT } from "@student/constant/local.urls";
import { MAIN_REPO } from "@repo/constant/local.urls";
import { getRepoResource, repoRoute } from "./repo/routes";
import { MAIN_EXAM } from "@exam/constant/local.urls";
import { examRoute, getExamResource } from "./exam/routes";
import { MAIN_LIBRARY } from "@library/constant";
// import { MAIN_INVENTORY } from "@inventory/constant";
import { getLibraryResource, libraryRoute } from "./library/routes";
// import { getInventoryResource, inventoryRoute } from "./inventory/routes";
import { getNoticeResource, noticeRoute } from "./notice/routes";
import { MAIN_NOTICE } from "@notice/constant/local.urls";
import { MAIN_BILLING } from "@billing/constant";
import { billingRoute, getBillingResource } from "./billing/routes";
import ApplicationHome from "src/pages/home/index";
import { MAIN_APP } from "@app/constant";
import { appRoute, getAppResource } from "./app/routes";

export const switchRoutes = (route: string, t: any) => {
  switch (route) {
    case MAIN_ACADEMIC:
      return getAcademicResource(t);
    case MAIN_EMPLOYEE:
      return getStaffResource(t);
    case MAIN_VEHICLE:
      return getLocationResource(t);
    case MAIN_STUDENT:
      return getStudentResource(t);
    case MAIN_REPO:
      return getRepoResource(t);
    case MAIN_EXAM:
      return getExamResource(t);
    case MAIN_LIBRARY:
      return getLibraryResource(t);
    // case MAIN_INVENTORY:
    //   return getInventoryResource(t);
    case MAIN_NOTICE:
      return getNoticeResource(t);
    case MAIN_BILLING:
      return getBillingResource(t);
    case MAIN_ACCOUNT:
      return getAccountResource(t);
    case MAIN_APP:
      return getAppResource(t);
    default:
      return [];
  }
};

export const getRoutes = () => {
  return [
    {
      path: "/",
      element: <ApplicationHome />,
    },
    ...academicRoute,
    ...locationRoute,
    ...dashboardRoute,
    ...studentRoute,
    ...repoRoute,
    ...examRoute,
    ...libraryRoute,
    // ...inventoryRoute,
    ...employeeRoute,
    ...noticeRoute,
    ...billingRoute,
    ...accountRoute,
    ...appRoute
  ];
};
