import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { MenuItem } from "@mui/material";
import { NepaliMonthEnum } from "@common/all.enum";
import { UCSAutoComplete, UCSMultiSelect } from "@components/input/uc.input";
import {  AccountLedgerGroupTypeEnum } from "@account/constant/enum";
import NoDataLabel from "@components/other/no.data";
import { ACCOUNT_LEDGER_URL } from "@account/constant/server.urls";
import { useAutocomplete } from "@refinedev/mui";
import { IAccountLedger } from "@account/interface";
import { PayrollBankVoucherTable } from "@account/payrollReport/payroll.bankvoucher";

export default({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const [search, setSearch] = useState<string>("")
  const [ledger, setLedger] = useState<IAccountLedger|null>(null); 
  const [month, setMonth] = useState<NepaliMonthEnum[]>([])

  const { autocompleteProps: ledgerAutoProps } = useAutocomplete<IAccountLedger>({
    resource: ACCOUNT_LEDGER_URL,
    meta: {
      customQuery: {
        group_type: AccountLedgerGroupTypeEnum.Bank
      }
    },
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value,
        },
        {
          field: "code",
          operator: "eq",
          value,
        }
      ];
    },
  });
  return (
    <RefineListView
      headerButtons={(props) => [
        <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
              <UCSAutoComplete
                onChange={(e: any) => {
                  setLedger(e)
                }}
                value={ledger}
                fullWidth
                width={300}
                getOptionLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
                renderLabel={(r: IAccountLedger) => `${r.name} | ${r.code}`}
                autocompleteProps={ledgerAutoProps}
                label={t("labels.ledger")}
              />,
        <UCSMultiSelect
          label={t("labels.month")}
          onChange={(value: any) => {
            setMonth(value)
          }}
          value={month}
        >
          {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
            return <MenuItem value={e} key={e}>{e}</MenuItem>
          })}
        </UCSMultiSelect>,
      ]}
    >
      {(month.length > 0 && ledger!=null) ? (
        <PayrollBankVoucherTable search={search} input={{ ledger, month }} />
      ) : (
        <NoDataLabel height={300} message={t("info.payrollBankvoucher")} />
      )}
    </RefineListView>
  );
};