import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { PatronCardTable } from "@library/labels";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "patron");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView

        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <PatronCardTable search={search} />
      </RefineListView >
      <Outlet />
    </>
  );
};