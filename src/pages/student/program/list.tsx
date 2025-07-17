import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { Outlet } from "react-router-dom";
import { ProgramListTable } from "@student/program";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { SimpleList } from "@components/view/simple.list";

export default () => {
  const t = useTranslate(LANG_STUDENT, "program");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <SimpleList

        title={t('program')}
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <ProgramListTable search={search} />
      </SimpleList>
      <Outlet />
    </>
  );
};