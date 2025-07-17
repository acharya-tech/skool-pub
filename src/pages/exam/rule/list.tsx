import { type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_EXAM } from "@common/constant";
import { CreateButton } from "@refinedev/mui";
import { RuleListTable } from "@exam/setting/rule";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_EXAM, "rule");
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CreateButton
            variant="contained"
            color="inherit"
            key="create"
          >
            {t("actions.add")}
          </CreateButton>,
        ]}
      >
        <RuleListTable />
      </RefineListView>
      {children}
    </>
  );
};