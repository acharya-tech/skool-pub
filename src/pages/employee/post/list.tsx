import { EMPLOYEE_POST_LIST } from "@employee/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_EMPLOYEE, LANG_VEHICLE } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { PostListTable } from "@employee/post";
import { useState } from "react";
import { CSSearch } from "@components/input";

export default () => {
  const t = useTranslate(LANG_EMPLOYEE, "post");
  const { create } = useNav(EMPLOYEE_POST_LIST)
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
        <PostListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};