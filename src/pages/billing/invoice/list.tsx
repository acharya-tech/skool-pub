import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_BILLING } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { InvoiceListTable } from "@billing/Invoice";

export default({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_BILLING, "Invoice");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <InvoiceListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};