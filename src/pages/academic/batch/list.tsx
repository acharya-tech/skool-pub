import { BatchListTable } from "@academic/batch";
import { ACADEMIC_BATCH_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_ACADEMIC } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { PropsWithChildren } from "react";
import { CreateButton } from "@refinedev/mui";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACADEMIC, "batch");
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
        <BatchListTable />
      </RefineListView>
      {children}
    </>
  );
};