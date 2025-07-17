import { MdOutlineDashboard, MdStorefront } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";

import { GiTeacher } from "react-icons/gi";
import { FaUsersLine } from "react-icons/fa6";
import { PiExam } from "react-icons/pi";
import { IoBusOutline } from "react-icons/io5";
import { GoFileDirectory } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";

import { MAIN_ACADEMIC } from "@academic/constant/urls";
import { MAIN_DASHBOARD } from "@dashboard/constant/urls";
import { MAIN_EMPLOYEE } from "@employee/constant/local.urls";
import { MAIN_STUDENT } from "@student/constant/local.urls";
import { MAIN_EXAM } from "@exam/constant/local.urls";
import { MAIN_VEHICLE } from "@vehicle/constant/local.urls";
import { MAIN_REPO } from "@repo/constant/local.urls";
import { MAIN_LIBRARY } from "@library/constant";
import { MAIN_INVENTORY } from "@inventory/constant";
import { IoLibraryOutline } from "react-icons/io5";
import { MAIN_NOTICE } from "@notice/constant/local.urls";
import { MAIN_BILLING } from "@billing/constant";
import { MAIN_ACCOUNT } from "@account/constant/urls";
// import { MAIN_APP } from "@app/constant";
import { RiAppsLine } from "react-icons/ri";
import { accessControlProvider } from "src/accessControlProvider";
import { MAIN_APP } from "@app/constant";


const getMainRes = (t: any) => {
  return [
    {
      name: MAIN_DASHBOARD,
      meta: {
        icon: <MdOutlineDashboard />,
        label: t("menus.dashboard"),
      },
    },
    {
      name: MAIN_STUDENT,
      meta: {
        icon: <GiTeacher />,
        label: t("menus.student"),
      },
    },
    {
      name: MAIN_ACADEMIC,
      meta: {
        icon: <HiAcademicCap />,
        label: t("menus.academic"),
      },
    },
    {
      name: MAIN_EMPLOYEE,
      meta: {
        icon: <FaUsersLine />,
        label: t("menus.employee"),
      },
    },
    {
      name: MAIN_BILLING,
      meta: {
        icon: <LuReceiptIndianRupee />,
        label: t("menus.bill"),
      },
    },
    {
      name: MAIN_ACCOUNT,
      meta: {
        icon: <MdOutlineAccountBalance />,
        label: t("menus.account"),
      },
    },
    {
      name: MAIN_EXAM,
      meta: {
        icon: <PiExam />,
        label: t("menus.exam"),
      },
    },
    {
      name: MAIN_VEHICLE,
      meta: {
        icon: <IoBusOutline />,
        label: t("menus.vehicle"),
      },
    },
    {
      name: MAIN_REPO,
      meta: {
        icon: <GoFileDirectory />,
        label: t("menus.repo"),
      },
    },
    {
      name: MAIN_LIBRARY,
      meta: {
        icon: <IoLibraryOutline />,
        label: t("menus.library"),
      },
    },
    {
      name: MAIN_INVENTORY,
      meta: {
        icon: <MdStorefront />,
        label: t("menus.inventory"),
      },
    },
    {
      name: MAIN_NOTICE,
      meta: {
        icon: <FaRegBell />,
        label: t("menus.notice"),
      },
    },
    {
      name: MAIN_APP,
      meta: {
        icon: <RiAppsLine />,
        label: t("menus.app"),
      },
    },
  ];
};


export const getMainResource = async (t: any) => {
  const mlist = new Map()
  const mainRoute = getMainRes(t)
  for (const mr of mainRoute) {
    const res = await accessControlProvider.can({ resource: mr.name, action: "mainnav" })
    if (res.can) {
      mlist.set(mr.name, mr)
    }
  }
  return Array.from(mlist.values())
}