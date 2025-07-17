import { type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACADEMIC } from "@common/constant";
import { SectionListTable } from "@academic/section";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACADEMIC, "section");
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
        <SectionListTable />
      </RefineListView>
      {children}
    </>
  );
};