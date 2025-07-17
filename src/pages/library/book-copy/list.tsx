import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { LIBRARY_BOOK_LIST } from "@library/constant";
import { BookCopyListTable } from "@library/book_copy/list";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const { create } = useNav(LIBRARY_BOOK_LIST)
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView

        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
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
        <BookCopyListTable search={search} />
      </RefineListView>
    </>
  );
};