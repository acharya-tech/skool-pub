import { useDataProvider } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { TableListProp } from "src/interfaces";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { TableCell, TableRow, Typography } from "@mui/material";
import { IPayrollReleaseInput, IPayrollReleaseResponse } from "../interface";
import { ACCOUNT_PAYROLL_RELEASE_SUMMARY_ID } from "../constant/constant";
import { useEffect, useMemo, useState } from "react";
import { ACCOUNT_REPORT_URL } from "../constant/server.urls";
import { IStaff } from "@employee/interface";
import { DrCrEnum } from "@common/all.enum";
import { fNumber } from "@utils/format-number";

type PayrollReleaseTableProps = {
  input: IPayrollReleaseInput
} & TableListProp;

export const PayrollReleaseTable = ({ search = "", input }: PayrollReleaseTableProps) => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const dataProvider = useDataProvider();
  const [dataList, setDataList] = useState<IPayrollReleaseResponse>({ employees: [], ledgers: [], reports: [] });
  const handleReportFetch = async () => {
    const { data } = await dataProvider().getOne<IPayrollReleaseResponse>({
      resource: ACCOUNT_REPORT_URL,
      id: ACCOUNT_PAYROLL_RELEASE_SUMMARY_ID,
      meta: {
        customQuery: {
          month: input.month,
          type: input.type
        },
      },
    })
    setDataList(data);
  }
  useEffect(() => {
    handleReportFetch()
  }, [input])

  const { ledgers = [], reports = [], employees = [] } = dataList ?? {};


  const [releaseMap, releaseTotalMap] = useMemo(() => {
    const releaseTotalMap = new Map<string, number>()
    const map = new Map<string, { [key: string]: number }>();
    reports.forEach(d => {
      const currentAmount = Number(d.dr_cr === DrCrEnum.Dr ? d.amount : -d.amount)
      const releaseOld = Number(releaseTotalMap.get(d.ledger_id) ?? 0)
      const employeeOld = map.get(d.employee_id) ?? {}
      map.set(d.employee_id, { ...employeeOld, [d.ledger_id]: Number(employeeOld[d.ledger_id] ?? 0) + currentAmount })
      releaseTotalMap.set(d.ledger_id, releaseOld + currentAmount)
    });
    return [map, releaseTotalMap];
  }, [reports]);


  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort<any>(employees, {
    search,
    searchFields: ["name", "emp_code"],
  });

  const columnKeys = ledgers.map(fh => {
    return {
      key: "fh" + fh.id,
      label: fh.name,
      align: "right" as any,
      render: (s: IStaff) => {
        const val = releaseMap.get(s.id)?.[fh.id] ?? 0
        return fNumber(val, { absolute: true })
      },
    } as any
  })

  const columns: Column<any>[] = [
    { key: "name", label: t("labels.name"), sortable: true },
    { key: "emp_code", label: t("labels.code"), sortable: true },
    ...columnKeys,
    {
      key: "balance",
      label: t("labels.balance"),
      align: "right",
      sortable: true,
      render: (s: IStaff) => {
        const types = releaseMap.get(s.id) ?? {}
        const balance = Object.values(types).reduce((acc, val) => acc + val, 0)
        return fNumber(balance, { absolute: true })
      },
    },
  ];
  let grandTotal = 0
  const footerCol = ledgers.map((fh: any) => {
    const val = Number(releaseTotalMap.get(fh.id))
    grandTotal += val
    return <TableCell align="right">
      <Typography>{fNumber(val, { absolute: true })}</Typography>
    </TableCell>
  })
  return <TableWithSearchAndSort
    data={filteredData}
    sortKey={sortKey}
    sortOrder={sortOrder}
    onSort={handleSort}
    columns={columns}
    footer={<TableRow>
      <TableCell colSpan={2} align="right">
        <Typography>{t("labels.total")}</Typography>
      </TableCell>
      {footerCol}
      <TableCell align="right">
        <Typography>
          {fNumber(grandTotal, { absolute: true })}
        </Typography>
      </TableCell>
    </TableRow>}
  />

};
