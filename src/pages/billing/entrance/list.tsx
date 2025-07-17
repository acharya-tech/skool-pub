import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { EntranceApplicationListTable } from "@billing/entrance/list";
import { BILLING_ENTRANCE_APPLICATION_LIST } from "@billing/constant";

export default () => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <EntranceApplicationListTable search={search} />
      </RefineListView>
    </>
  );
};