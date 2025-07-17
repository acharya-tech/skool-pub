import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_STUDENT } from "@common/constant";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { ClassBreadcrumbs } from "@components/other";
import { ClassListTable } from "@student/subject";

export default () => {
  const t = useTranslate(LANG_STUDENT, "subject");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        breadcrumb={<ClassBreadcrumbs />}
        headerButtons={(props) => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <ClassListTable search={search} />
      </RefineListView>
    </>
  );
};