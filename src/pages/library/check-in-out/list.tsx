import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CheckInOutView } from "@library/check_in_out/list";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "checkInOut");
  return (
    <>
      <RefineListView>
        <CheckInOutView />
      </RefineListView>
      <Outlet />
    </>
  );
};
