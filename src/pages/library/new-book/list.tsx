import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_LIBRARY } from "@common/constant";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { NewBookListTable } from "@library/new_book";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <NewBookListTable search={search} />
      </RefineListView>
    </>
  );
};