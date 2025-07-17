import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_APP } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { CreateButton } from "@refinedev/mui";
import { UserListTable } from "@app/users";

export default () => {
  const t = useTranslate(LANG_APP, "users");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <CreateButton
            {...props.createButtonProps}
            variant="contained"
            color="inherit"
            key="create"
          >
            {t("actions.add")}
          </CreateButton>,
        ]}
      >
        <UserListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};