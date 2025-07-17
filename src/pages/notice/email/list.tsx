import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_NOTICE } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { EmailListTable } from "@notice/email/list";
import { Button } from "@mui/material";
import { NOTICE_EMAIL_LIST } from "@notice/constant/local.urls";
import { useNav } from "@hooks/useNavlHook";

export default () => {
  const t = useTranslate(LANG_NOTICE, "email");
  const { create } = useNav(NOTICE_EMAIL_LIST)
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
        <EmailListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};