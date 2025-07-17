import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_INVENTORY } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { StockSummaryTable } from "@inventory/reports";
import { UCSDateRangePicker } from "@components/input/uc.input";

export default () => {
  const t = useTranslate(LANG_INVENTORY, "reports");
  const [search, setSearch] = useState<string>("")
  const [dateRange, setDateRange] = useState({ startDate: new Date(new Date().setDate(new Date().getDate() - 6)), endDate: new Date() });
  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <UCSDateRangePicker
            label={"Select Date Range"}
            fullWidth
            format="YYYY-MM-DD"
            sx={{ width: 280 }}
            onChange={(startDate: Date, endDate: Date) => {
              setDateRange({
                startDate,
                endDate
              })
            }}
            fromValue={dateRange.startDate}
            toValue={dateRange.endDate}
          />,
          <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        ]}
      >
        <StockSummaryTable search={search} dateRange={dateRange} />
      </RefineListView>
      <Outlet />
    </>
  );
};