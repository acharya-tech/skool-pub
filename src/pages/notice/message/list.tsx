import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_NOTICE } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { NoticeListTable } from "@notice/message/list";
import { Button } from "@mui/material";
import { NOTICE_NOTICE_LIST } from "@notice/constant";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const t = useTranslate(LANG_NOTICE, "notice");
  const { create } = useNav(NOTICE_NOTICE_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
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
        <NoticeListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};