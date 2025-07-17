import { type PropsWithChildren } from "react";
import { EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_EXAM } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { RoutineListTable } from "@exam/routine";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_EXAM, "routine");
  const { create } = useNav(EXAM_ROUTINE_LIST)
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
        <RoutineListTable />
      </RefineListView>
      {children}
    </>
  );
};