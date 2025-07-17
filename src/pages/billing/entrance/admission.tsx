import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_BILLING } from "@common/constant";
import { useState } from "react";
import { CSSearch } from "@components/input";
import { EntranceAdmissionListTable } from "@billing/entrance/admission";

export default () => {
  const t = useTranslate(LANG_BILLING, "entrance");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <EntranceAdmissionListTable search={search} />
      </RefineListView>
    </>
  );
};