import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import {
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { BILL_FEE_SUMMARY_ID, BILLING_FEE_REPORT_URL } from "../constant";
import { IFeeSummary, IStudentDueLedgerColumn } from "../interface";
import { IClass } from "@academic/interface";
import { useMemo } from "react";
import { TableListProp } from "src/interfaces";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { IStudentInfo } from "@student/interface";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { fNumber } from "@utils/format-number";
import { useRefineOne } from "@hooks/useOne";

type FeeDueTableProps = {
  uptoDate: string;
  aclass?: IClass;
} & TableListProp;

export const FeeSummaryTable = ({ aclass, uptoDate, search = "" }: FeeDueTableProps) => {
  const t = useTranslate(LANG_BILLING, "report");

  const { data: feeSummaryData } = useRefineOne<IFeeSummary>({
    resource: BILLING_FEE_REPORT_URL,
    id: BILL_FEE_SUMMARY_ID,
    meta: {
      customQuery: {
        class_id: aclass?.id,
        uptoDate,
      },
    },
    queryOptions: {
      enabled: Boolean(aclass && uptoDate),
    },
  });

  const { summary = [], students = [] } = feeSummaryData?.data ?? {};

  const [dueMap, totalType] = useMemo(() => {
    const totalType = {} as any
    const map = new Map<string, { [key: string]: number }>();
    summary.forEach(d => {
      const feeOld = totalType[d.type] ?? 0
      const studentOld = map.get(d.student_id) ?? {}
      map.set(d.student_id, { ...studentOld, [d.type]: Number(studentOld[d.type] ?? 0) + Number(d.amount) })
      totalType[d.type] = feeOld + Number(d.amount)
    });
    return [map, totalType];
  }, [summary]);

  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort(students, {
    search,
    searchFields: ["full_name", "regid", "class.name", "section.name", "phone"],
  });

  const columnKeys = Object.keys(totalType).map(type => {
    return {
      key: type,
      label: type,
      align: "right" as any,
      render: (s: IStudentInfo) => {
        const val = dueMap.get(s.id)?.[type] ?? 0
        return fNumber(val, { absolute: true })
      },
    }
  })

  const columns: Column<IStudentDueLedgerColumn>[] = [
    { key: "full_name", label: t("feedue.student"), sortable: true },
    { key: "regid", label: t("feedue.regid"), sortable: true },
    { key: "class", label: t("feedue.level"), sortable: true, render: (s: IStudentInfo) => s.class?.name ?? "" },
    { key: "section", label: t("feedue.section"), sortKey: "section.name", sortable: true, render: (s: IStudentInfo) => s.section?.name ?? "" },
    { key: "phone", label: t("feedue.phone"), sortable: true },
    ...columnKeys,
    {
      key: "balance",
      label: t("feedue.balance"),
      align: "right",
      sortable: true,
      render: (s: IStudentInfo) => {
        const types = dueMap.get(s.id) ?? {}
        const balance = Object.values(types).reduce((acc, val) => acc + val, 0)
        return fNumber(balance, { absolute: true })
      },
    },
  ];
  let grandTotal = 0
  const footerCol = Object.values(totalType).map((type: any) => {
    grandTotal += Number(type)
    return <TableCell align="right">
      <Typography>{fNumber(type, { absolute: true })}</Typography>
    </TableCell>
  })

  return <TableWithSearchAndSort
    data={filteredData}
    sortKey={sortKey}
    sortOrder={sortOrder}
    onSort={handleSort}
    columns={columns}
    footer={<TableRow>
      <TableCell colSpan={5} align="right">
        <Typography>{t("feedue.total_amount")}</Typography>
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
