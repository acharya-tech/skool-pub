import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_NOTICE } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { TemplateListTable } from "@notice/template";
import { NOTICE_TEMPLATE_LIST } from "@notice/constant/local.urls";

export default () => {
  const t = useTranslate(LANG_NOTICE, "template");
  const { create } = useNav(NOTICE_TEMPLATE_LIST)
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
        <TemplateListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};