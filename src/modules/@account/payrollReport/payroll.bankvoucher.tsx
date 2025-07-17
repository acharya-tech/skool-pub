import { useDataProvider } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { TableListProp } from "src/interfaces";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { TableCell, TableRow, Typography } from "@mui/material";
import { IPayrollBankVoucherInput, IPayrollBankVoucherResponse, IPayrollReleaseInput, IPayrollReleaseResponse } from "../interface";
import { ACCOUNT_PAYROLL_BANKVOUCHER_ID, ACCOUNT_PAYROLL_RELEASE_SUMMARY_ID } from "../constant/constant";
import { useEffect, useMemo, useState } from "react";
import { ACCOUNT_REPORT_URL } from "../constant/server.urls";
import { IStaff } from "@employee/interface";
import { DrCrEnum } from "@common/all.enum";
import { fNumber } from "@utils/format-number";
import { NotSetLabel } from "@components/label/notset.label";

type PayrollBankVoucherTableProps = {
  input: IPayrollBankVoucherInput
} & TableListProp;

export const PayrollBankVoucherTable = ({ search = "", input }: PayrollBankVoucherTableProps) => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const dataProvider = useDataProvider();
  const [dataList, setDataList] = useState<IPayrollBankVoucherResponse>({ employees: [], reports: [] });
  const handleReportFetch = async () => {
    const { data } = await dataProvider().getOne<IPayrollBankVoucherResponse>({
      resource: ACCOUNT_REPORT_URL,
      id: ACCOUNT_PAYROLL_BANKVOUCHER_ID,
      meta: {
        customQuery: {
          month: input.month,
          ledger_id: input.ledger.id
        },
      },
    })
    setDataList(data);
  }
  useEffect(() => {
    handleReportFetch()
  }, [input])
  const ledger_id = input.ledger.id;
  const {  reports = [], employees = [] } = dataList ?? {};


  const [releaseMap, releaseTotalMap] = useMemo(() => {
    const releaseTotalMap = new Map<string, number>()
    const map = new Map<string, { [key: string]: number }>();
    reports.forEach(d => {
       const currentAmount = Number(d.amount)
      const releaseOld = Number(releaseTotalMap.get(ledger_id) ?? 0)
      const employeeOld = map.get(d.employee_id) ?? {}
      map.set(d.employee_id, { ...employeeOld, [ledger_id]: Number(employeeOld[ledger_id] ?? 0) + currentAmount })
      releaseTotalMap.set(ledger_id, releaseOld + currentAmount)
    });
    return [map, releaseTotalMap];
  }, [reports]);


  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort<any>(employees, {
    search,
    searchFields: ["name", "emp_code"],
  });


  const columns: Column<any>[] = [
    { key: "name", label: t("labels.name"), sortable: true },
    { key: "emp_code", label: t("labels.code"), sortable: true },
    { key: "post", label: t("labels.post"), sortable: true ,
      render: (s: IStaff) => {
        return s.post.name
      }
    },
    { key: "bank_name", label: t("labels.bank_name"), sortable: true ,
      render: (s: IStaff) => {
        return s.bank_detail?.bank_name ?? <NotSetLabel/>
      }
    },
        { key: "bank_no", label: t("labels.account_number"), sortable: true ,
      render: (s: IStaff) => {
        return s.bank_detail?.account_no ?? <NotSetLabel/>
      }
    },
    {
      key: "ledger",
      label: input.ledger.name,
      align: "right" as any,
      render: (s: IStaff) => {
        const val = releaseMap.get(s.id)?.[ledger_id] ?? 0
        return fNumber(val, { absolute: true })
      },
    },
  ];
  return <TableWithSearchAndSort
    data={filteredData}
    sortKey={sortKey}
    sortOrder={sortOrder}
    onSort={handleSort}
    columns={columns}
    footer={<TableRow>
      <TableCell colSpan={5} align="right">
        <Typography>{t("labels.total")}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{fNumber(Number(releaseTotalMap.get(ledger_id)??0), { absolute: true })}</Typography>
      </TableCell>
    </TableRow>}
  />

};
