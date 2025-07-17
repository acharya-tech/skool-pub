import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACADEMIC } from "@common/constant";
import { SubjectListTable } from "@academic/subject";
import { PropsWithChildren, useState } from "react";
import { CreateButton } from "@refinedev/mui";
import { CSSearch } from "@components/input";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACADEMIC, "subject");
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
        <SubjectListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};