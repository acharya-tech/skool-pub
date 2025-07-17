import { useState, type PropsWithChildren } from "react";
import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_STUDENT } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_CERTIFICATE_LIST } from "@student/constant";
import { CertificateListTable } from "@student/certificate/list";
import { CSSearch } from "@components/input";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_STUDENT, "certificate");
  const { create } = useNav(STUDENT_CERTIFICATE_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
          <Button
            {...props.createButtonProps}
            variant="contained"
            color="inherit"
            key="create"
            onClick={create}
          >
            {t("actions.add")}
          </Button>,
        ]}
      >
        <CertificateListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};