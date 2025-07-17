import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_BILLING } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { PropsWithChildren, useState } from "react";
import { BILLING_SCHOLAR_ITEM_LIST } from "@billing/constant";
import { CSSearch } from "@components/input";
import { ScholarItemListTable } from "@billing/scholarItem";

export default({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_BILLING, "scholarItem");
  const { create } = useNav(BILLING_SCHOLAR_ITEM_LIST)
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
        <ScholarItemListTable search={search}/>
      </RefineListView>
      {children}
    </>
  );
};