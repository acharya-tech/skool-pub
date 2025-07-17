import { useState, type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_EXAM } from "@common/constant";
import { FormulaListTable } from "@exam/setting/formula";
import { CSSearch } from "@components/input";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_EXAM, "formula");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <CreateButton
            variant="contained"
            color="inherit"
            key="create"
          >
            {t("actions.add")}
          </CreateButton>,
        ]}
      >
        <FormulaListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};