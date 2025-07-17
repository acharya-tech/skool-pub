import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { ReportActivityTable } from "@library/report/activity";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <ReportActivityTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};