import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { UCSAutoComplete, UCSDateRangePicker } from "@components/input/uc.input";
import { useAutocomplete } from "@refinedev/mui";
import { IAccountLedger } from "@account/interface";
import { ACCOUNT_LEDGER_URL } from "@account/constant/server.urls";
import { LedgerReportTable } from "@account/reports/ledgers.report";

export default () => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const [search, setSearch] = useState<string>("")
  const [ledger, setLedger] = useState<IAccountLedger>()
  const [dateRange, setDateRange] = useState({ startDate: new Date(new Date().setDate(new Date().getDate() - 6)), endDate: new Date() });
  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
    resource: ACCOUNT_LEDGER_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        },
        {
          field: "code",
          operator: "eq",
          value
        }
      ]
    }
  });
  return (
    <RefineListView
      headerButtons={(props) => [
        <UCSAutoComplete
          key={"ledger"}
          value={ledger}
          width={200}
          autocompleteProps={ledgerAutoProps}
          label={t("labels.ledger")}
          getOptionLabel={(ledger: IAccountLedger) => `${ledger.code} | ${ledger.name}`}
          onChange={(ledger: IAccountLedger) => {
            setLedger(ledger)
          }}
        />,
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
        />,
        <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
      ]}
    >
      <LedgerReportTable search={search} dateRange={dateRange} ledger={ledger} />
    </RefineListView>
  );
};