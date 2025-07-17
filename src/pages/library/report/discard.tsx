import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { ReportDiscardTable } from "@library/report/discard";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "bookCopy");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={() => [
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <ReportDiscardTable search={search} />
      </RefineListView>
    </>
  );
};