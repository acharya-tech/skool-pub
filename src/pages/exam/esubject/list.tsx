import { type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_EXAM } from "@common/constant";
import { ESubjectListTable } from "@exam/setting/esubject";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_EXAM, "esubject");
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
        <ESubjectListTable />
      </RefineListView>
      {children}
    </>
  );
};