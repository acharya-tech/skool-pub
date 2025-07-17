import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { EBookListTable } from "@library/ebook";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "ebook");
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch
            value={search}
            onChange={setSearch}
            placeholder={t("@buttons.search")}
          />,
        ]}
      >
        <EBookListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};
