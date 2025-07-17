import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_ITEM_CHECKOUT_LIST } from "@inventory/constant";
import { ItemCheckoutListTable } from "@inventory/itemCheckout";

export default () => {
  const t = useTranslate(LANG_INVENTORY, "itemCheckout");
  const { create } = useNav(INVENTORY_ITEM_CHECKOUT_LIST)
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
        <ItemCheckoutListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};