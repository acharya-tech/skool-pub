import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { LedgerListTable } from "@account/ledger";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACCOUNT, "ledger");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <CreateButton
            variant="contained"
            color="inherit"
            key="create"
          >
            {t("actions.add")}
          </CreateButton>,
        ]}
      >
        <LedgerListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};