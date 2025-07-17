import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { LIBRARY_AUTHOR_LIST } from "@library/constant";
import { AuthorListTable } from "@library/author/list";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "author");
  const { create } = useNav(LIBRARY_AUTHOR_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView

        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <Button
            {...props.createButtonProps}
            variant="contained"
            color="inherit"
            key="create"
            onClick={create}
          >
            {t("actions.add")}
          </Button>,
        ]}
      >
        <AuthorListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};