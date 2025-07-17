import { type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { ProgramListTable } from "@academic/program";
import { LANG_ACADEMIC } from "@common/constant";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACADEMIC, "program");
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
        <ProgramListTable />
      </RefineListView>
      {children}
    </>
  );
};