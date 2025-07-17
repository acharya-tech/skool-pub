import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { INVENTORY_TEMPLATE_LIST } from "@inventory/constant";
import { TemplateListTable } from "@inventory/template";

export default () => {
  const t = useTranslate(LANG_INVENTORY, "template");
  const { create } = useNav(INVENTORY_TEMPLATE_LIST)
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