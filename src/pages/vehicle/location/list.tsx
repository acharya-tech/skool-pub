import { LocationListTable } from "@vehicle/location";
import { VEHICLE_LOCATION_LIST } from "@vehicle/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_VEHICLE } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";

export default () => {
  const t = useTranslate(LANG_VEHICLE, "location");
  const { create } = useNav(VEHICLE_LOCATION_LIST)
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
        <LocationListTable />
      </RefineListView>
      <Outlet />
    </>
  );
};