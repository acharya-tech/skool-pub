import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { Button } from "@mui/material";
import { LANG_LIBRARY } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { CSSearch } from "@components/input";
import { useState } from "react";
import {
  LIBRARY_BOOK_LIST,
} from "@library/constant";
import { BookListTable } from "@library/book/list";
import { BASE_URL } from "@common/options";

export default () => {
  const t = useTranslate(LANG_LIBRARY, "book");
  const { create } = useNav(LIBRARY_BOOK_LIST);
  const [search, setSearch] = useState<string>("");

  const APP_URL = BASE_URL + "/library/reports/books";

  async function handleExport() {
    try {
      const response = await fetch(APP_URL); // Adjust the URL to match your API endpoint
      if (!response.ok) {
        throw new Error("Failed to download the report");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "book_report.xlsx"; // The name of the file to be downloaded
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  }

  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch
            value={search}
            onChange={setSearch}
            placeholder={t("@buttons.search")}
          />,
          <Button
            {...props.createButtonProps}
            variant="contained"
            color="primary"
            key="export"
            onClick={handleExport}
          >
            {t("actions.export")}
          </Button>,
          <Button
            {...props.createButtonProps}
            variant="contained"
            color="inherit"
            key="add"
            onClick={create}
          >
            {t("actions.add")}
          </Button>,
        ]}
      >
        <BookListTable search={search} />
      </RefineListView>
    </>
  );
};
