import { useTranslate } from "@hooks/useTranslate";
import { RefineListView } from "@components/view";
import { LANG_ACCOUNT } from "@common/constant";
import { PropsWithChildren, useState } from "react";
import { CSSearch } from "@components/input";
import { Button, MenuItem } from "@mui/material";
import { useCreate, useDataProvider } from "@refinedev/core";
import { ACCOUNT_PAYROLL_POST_URL } from "@account/constant/server.urls";
import { NepaliMonthEnum } from "@common/all.enum";
import { UCSDatePicker, UCSSelect } from "@components/input/uc.input";
import { PayrollPostListTable } from "@account/payrollPost";
import { IAccountPayrollPost, IAccountPayrollPostListMap } from "@account/interface";
import { CreateButton } from "@refinedev/mui";

export default({ children }: PropsWithChildren) => {
  const dataProvider = useDataProvider()
  const t = useTranslate(LANG_ACCOUNT, "payrollPost");
  const [payrollPost, setPayrollPost] = useState<IAccountPayrollPostListMap>(new Map())
  const [search, setSearch] = useState<string>("")
  const [selectionList, setSelectedList] = useState<any[]>([])
  const [month, setMonth] = useState<NepaliMonthEnum | "">("")
  const [postDate, setPostDate] = useState<Date>(new Date)
  const { mutate: create } = useCreate({
    resource: ACCOUNT_PAYROLL_POST_URL
  })
  const handleMonthSelect = async (month: NepaliMonthEnum) => {
    const { data } = await dataProvider().getList<IAccountPayrollPost>({
      resource: ACCOUNT_PAYROLL_POST_URL,
      meta: {
        customQuery: {
          month,
        }
      }
    })
    const postList = new Map()
    data.forEach((e: IAccountPayrollPost) => {
      if (!postList.has(e.employee_id)) {
        postList.set(e.employee_id, [])
      }
      postList.get(e.employee_id)?.push(e)
    })
    setPayrollPost(postList)
  }
  const onCreate = () => {
    create({
      resource: ACCOUNT_PAYROLL_POST_URL,
      values: {
        employees: selectionList.map((e: any) => e.id),
        month,
        transaction_date: postDate
      },
      successNotification: () => {
        return {
          message: t("info.success") + " " + month,
          type: "success"
        }
      }
    })
  }
  return (
    <RefineListView
      headerButtons={(props) => [
        <CSSearch key={"search"} value={search} onChange={setSearch} placeholder={t("@buttons.search")} />,
        <UCSDatePicker
          label={t("fields.date")}
          onChange={(value: any) => setPostDate(value)}
          value={postDate}
        />,
        <UCSSelect
          label={t("fields.month")}
          onChange={(event: any) => {
            setMonth(event.target.value as NepaliMonthEnum)
            handleMonthSelect(event.target.value as NepaliMonthEnum)
          }}
          value={month}
        >
          {Object.values(NepaliMonthEnum).map((e: NepaliMonthEnum) => {
            return <MenuItem value={e} key={e}>{e}</MenuItem>
          })}
        </UCSSelect>,
        <CreateButton
          variant="contained"
          color="inherit"
          key="create"
          onClick={onCreate}
          disabled={selectionList.length == 0 || month == "" || postDate == null}
        >
          {t("actions.add")}
        </CreateButton>,
      ]}
    >
      <PayrollPostListTable setSelectedList={setSelectedList} search={search} preReleased={payrollPost} />
    </RefineListView>
  );
};