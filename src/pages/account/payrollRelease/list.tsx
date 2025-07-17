import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { PayrollPostReleaseListTable } from "@account/payrollRelease/list";

export default({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACCOUNT, "payrollRelease");
  const [search, setSearch] = useState<string>("")
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <PayrollPostReleaseListTable search={search} />
      </RefineListView>
      {children}
    </>
  );
};