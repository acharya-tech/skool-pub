import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { SmsListTable } from "@notice/sms/list";
import { NOTICE_SMS_LIST } from "@notice/constant/local.urls";

export default () => {
  const t = useTranslate(LANG_NOTICE, "sms");
  const { create } = useNav(NOTICE_SMS_LIST)
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
        <SmsListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};