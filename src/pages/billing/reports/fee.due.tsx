import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_BILLING } from "@common/constant";
import { Outlet } from "react-router-dom";
import { CSSearch } from "@components/input";
import { useState } from "react";
import { UCSAutoComplete, UCSDatePicker, UCSDateRangePicker } from "@components/input/uc.input";
import { FeeDueTable } from "@billing/reports/fee.due";
import { ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { useAutocomplete } from "@refinedev/mui";
import { IClass } from "@academic/interface";

export default () => {
  const t = useTranslate(LANG_BILLING, "report");
  const [search, setSearch] = useState<string>("")
  const [aclass, setAClass] = useState<IClass>()
  const [uptoDate, setUptoDate] = useState(new Date().toISOString());
  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_LIST,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
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
          key={"aclass"}
          value={aclass}
          width={200}
          autocompleteProps={classAutoProps}
          label={t("feedue.class")}
          getOptionLabel={(aclass: IClass) => aclass.name}
          onChange={(aclas: IClass) => {
            setAClass(aclas)
          }}
        />,
        <UCSDatePicker
          key={"uptoDate"}
          label={t("feedue.uptoDate")}
          fullWidth
          format="YYYY-MM-DD"
          sx={{ width: 280 }}
          onChange={(date: string) => {
            setUptoDate(date)
          }}
          value={uptoDate}
        />,
        <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
      ]}
    >
      <FeeDueTable search={search} uptoDate={uptoDate} aclass={aclass} />
    </RefineListView>
  );
};