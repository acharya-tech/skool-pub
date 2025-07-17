import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_EMPLOYEE } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { StaffListTable } from "@employee/staff/list";
import { Button } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import { EMPLOYEE_STAFF_LIST } from "@employee/constant";

export default () => {
  const t = useTranslate(LANG_EMPLOYEE, "staff");
  const { create } = useNav(EMPLOYEE_STAFF_LIST)
  const [search, setSearch] = useState<string>("");
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
        <StaffListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};
