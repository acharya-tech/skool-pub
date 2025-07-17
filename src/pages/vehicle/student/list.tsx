import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_VEHICLE } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { StudentListTable } from "@vehicle/student";

export default () => {
  const t = useTranslate(LANG_VEHICLE, "student");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <StudentListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};