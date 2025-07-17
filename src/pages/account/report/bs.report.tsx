import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { useState } from "react";
import { UCSDateRangePicker } from "@components/input/uc.input";
import { BSReportView } from "@account/reports/bs.report";

export default () => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const [dateRange, setDateRange] = useState({ startDate: new Date(new Date().setDate(new Date().getDate() - 6)), endDate: new Date() });
  return (
    <RefineListView
      noCard
      headerButtons={(props) => [
        <UCSDateRangePicker
          label={t("labels.dateRange")}
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
        />]}
    >
      <BSReportView dateRange={dateRange} />
    </RefineListView>
  );
};