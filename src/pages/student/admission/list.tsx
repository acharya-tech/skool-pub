import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_STUDENT } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { STUDENT_ADMISSION_LIST } from "@student/constant/local.urls";
import { AdmissionListTable } from "@student/admission";
import { Button, Stack } from "@mui/material";
import { CanAccess } from "@refinedev/core";

export default () => {
  const t = useTranslate(LANG_STUDENT, "admission");
  const { create, show } = useNav(STUDENT_ADMISSION_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView

        headerButtons={(props) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />
            <CanAccess>
              <Button
                variant="contained"
                color="info"
                key="export"
                LinkComponent={"a"}
                href="/assets/excel/STUDENT_IMPORT.xlsx"
              >
                {t("actions.export")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                key="import"
                onClick={() => show("0")}
              >
                {t("actions.import")}
              </Button>
              <Button
                {...props.createButtonProps}
                variant="contained"
                color="inherit"
                key="create"
                onClick={create}
              >
                {t("actions.add")}
              </Button>
            </CanAccess>
          </Stack>
        )}
      >
        <AdmissionListTable search={search} />
      </RefineListView>
      <Outlet />
    </>
  );
};