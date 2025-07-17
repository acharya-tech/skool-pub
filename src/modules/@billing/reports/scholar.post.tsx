import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import {
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { BILL_FEE_SCHOLAR_ID, BILLING_FEE_REPORT_URL } from "../constant";
import { IStudentDueColumn, IStudentScholarByHead } from "../interface";
import { IClass } from "@academic/interface";
import { useMemo } from "react";
import { TableListProp } from "src/interfaces";
import { IStudentInfo } from "@student/interface";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { fNumber } from "@utils/format-number";
import { useRefineOne } from "@hooks/useOne";

type FeeDueTableProps = {
  uptoDate: string;
  aclass?: IClass;
} & TableListProp;

export const ScholarPostTable = ({ aclass, uptoDate, search = "" }: FeeDueTableProps) => {
  const t = useTranslate(LANG_BILLING, "report");

  const { data: dueByFeeHeadData } = useRefineOne<IStudentScholarByHead>({
    resource: BILLING_FEE_REPORT_URL,
    id: BILL_FEE_SCHOLAR_ID,
    meta: {
      customQuery: {
        class_id: aclass?.id,
        uptoDate: uptoDate,
      },
    },
    queryOptions: {
      enabled: Boolean(aclass && uptoDate),
    },
  });

  const { scholarHeads = [], dues = [], students = [] } = dueByFeeHeadData?.data ?? {};


  const [dueMap, scholarTotalMap] = useMemo(() => {
    const scholarTotalMap = new Map<string, number>()
    const map = new Map<string, Map<string, number>>();
    dues.forEach(d => {
      const studentOld = map.get(d.student_id) ?? new Map<string, number>()
      studentOld.set(d.scholar_id, Number(d.amount))
      map.set(d.student_id, studentOld)
      scholarTotalMap.set(d.scholar_id, (scholarTotalMap.get(d.scholar_id) ?? 0) + Number(d.amount))
    });
    return [map, scholarTotalMap];
  }, [dues]);

  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort<any>(students, {
    search,
    searchFields: ["full_name", "regid", "class.name", "section.name", "phone"],
  });

  const columnKeys = scholarHeads.map(fh => {
    return {
      key: "fh" + fh.id,
      label: fh.name,
      align: "right" as any,
      render: (s: IStudentInfo) => {
        return fNumber(dueMap.get(s.id)?.get(fh.id) ?? 0)
      },
    } as any
  })

  const columns: Column<IStudentDueColumn>[] = [
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
        let balance = 0
        const scholar = dueMap.get(s.id) ?? new Map<string, number>()
        scholar.forEach((scholarAmount) => {
          balance += scholarAmount
        })
        return fNumber(balance, { absolute: true })
      },
    },
  ];
  let grandTotal = 0
  const footerCol = scholarHeads.map((fh: any) => {
    const val = Number(scholarTotalMap.get(fh.id))
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
