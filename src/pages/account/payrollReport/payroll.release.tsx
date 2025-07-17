import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { MenuItem } from "@mui/material";
import { NepaliMonthEnum } from "@common/all.enum";
import { UCSMultiSelect } from "@components/input/uc.input";
import { AccounPayrollTypeEnum } from "@account/constant/enum";
import { PayrollReleaseTable } from "@account/payrollReport/payroll.release";
import NoDataLabel from "@components/other/no.data";

export default ({ children }: PropsWithChildren) => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const [search, setSearch] = useState<string>("")
  const [month, setMonth] = useState<NepaliMonthEnum[]>([])
  const [types, setTypes] = useState<AccounPayrollTypeEnum[]>([])
  return (
    <RefineListView
      headerButtons={(props) => [
        <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        <UCSMultiSelect
          label={t("labels.month")}
          onChange={(value: any) => {
            console.log(value, "value month")
            setMonth(value)
          }}
          value={month}
        >
          {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
            return <MenuItem value={e} key={e}>{e}</MenuItem>
          })}
        </UCSMultiSelect>,
        <UCSMultiSelect
          label={t("labels.type")}
          onChange={(value: any) => {
            setTypes(value)
          }}
          value={types}
        >
          {Object.values(AccounPayrollTypeEnum).map((e: AccounPayrollTypeEnum) => {
            return <MenuItem value={e} key={e}>{e}</MenuItem>
          })}
        </UCSMultiSelect>,
      ]}
    >
      {(month.length > 0 && types.length > 0) ? (
        <PayrollReleaseTable search={search} input={{ month, type: types }} />
      ) : (
        <NoDataLabel height={300} message={t("info.payrollRelease")} />
      )}
    </RefineListView>
  );
};