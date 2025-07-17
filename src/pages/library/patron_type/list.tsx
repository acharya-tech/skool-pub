import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { PatronTypeListTable } from "@library/patron_type/list";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "patronType");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView

        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          // <Button
          //   {...props.createButtonProps}
          //   variant="contained"
          //   color="inherit"
          //   key="create"
          //   onClick={create}
          // >
          //   {t("actions.add")}
          // </Button>,
        ]}
      >
        <PatronTypeListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};