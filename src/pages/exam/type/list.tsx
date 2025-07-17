import { type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_EXAM } from "@common/constant";
import { TypeListTable } from "@exam/setting/type";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_EXAM, "type");
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
        <TypeListTable />
      </RefineListView>
      {children}
    </>
  );
};