import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_INVENTORY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { ProductListTable } from "@inventory/products";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_PRODUCT_LIST } from "@inventory/constant";

export default () => {
  const t = useTranslate(LANG_INVENTORY, "product");
  const { create } = useNav(INVENTORY_PRODUCT_LIST)
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
        <ProductListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};