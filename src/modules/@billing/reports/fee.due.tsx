import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import {
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { BILL_FEE_DUE_BY_FEE_HEAD_ID, BillFeeReleaseTypeEnum, BILLING_FEE_REPORT_URL } from "../constant";
import { IStudentDueByFeeHead, IStudentDueColumn } from "../interface";
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

export const FeeDueTable = ({ aclass, uptoDate, search = "" }: FeeDueTableProps) => {
  const t = useTranslate(LANG_BILLING, "report");

  const { data: dueByFeeHeadData } = useRefineOne<IStudentDueByFeeHead>({
    resource: BILLING_FEE_REPORT_URL,
    id: BILL_FEE_DUE_BY_FEE_HEAD_ID,
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

  const { feeHeads = [], dues = [], students = [] } = dueByFeeHeadData?.data ?? {};


  const [dueMap, feeTotalMap] = useMemo(() => {
    const feeTotalMap = new Map<string, number>()
    const map = new Map<string, { [key: string]: number }>();
    dues.forEach(d => {
      const feeOld = Number(feeTotalMap.get(d.fee_id) ?? 0)
      const studentOld = map.get(d.student_id) ?? {}
      if (d.type === BillFeeReleaseTypeEnum.Fee) {
        map.set(d.student_id, { ...studentOld, [d.fee_id]: Number(studentOld[d.fee_id] ?? 0) + Number(d.amount) })
        feeTotalMap.set(d.fee_id, feeOld + Number(d.amount))
      } else {
        map.set(d.student_id, { ...studentOld, [d.fee_id]: Number(studentOld[d.fee_id] ?? 0) - Number(d.amount) })
        feeTotalMap.set(d.fee_id, feeOld - Number(d.amount))
      }
    });
    return [map, feeTotalMap];
  }, [dues]);


  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort<IStudentDueColumn>(students, {
    search,
    searchFields: ["full_name", "regid", "class.name", "section.name", "phone"],
  });

  const columnKeys = feeHeads.map(fh => {
    return {
      key: "fh" + fh.id,
      label: fh.name,
      align: "right" as any,
      render: (s: IStudentInfo) => {
        const val = dueMap.get(s.id)?.[fh.id] ?? 0
        return fNumber(val, { absolute: true })
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
        const types = dueMap.get(s.id) ?? {}
        const balance = Object.values(types).reduce((acc, val) => acc + val, 0)
        return fNumber(balance, { absolute: true })
      },
    },
  ];
  let grandTotal = 0
  const footerCol = feeHeads.map((fh: any) => {
    const val = Number(feeTotalMap.get(fh.id))
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
