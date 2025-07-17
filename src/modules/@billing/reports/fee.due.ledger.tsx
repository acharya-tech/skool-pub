import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { BILLING_FEE_REPORT_URL, BILL_FEE_DUE_LEDGER_ID } from "../constant";
import { IStudentDueLedger, IStudentDueLedgerColumn } from "../interface";
import { IClass } from "@academic/interface";
import { useMemo } from "react";
import { TableListProp } from "src/interfaces";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { IStudentInfo } from "@student/interface";
import { fNumber } from "@utils/format-number";
import { useRefineOne } from "@hooks/useOne";

type FeeDueLedgerTableProps = {
  uptoDate: string;
  aclass?: IClass;
} & TableListProp;

export const FeeDueLedgerTable = ({ aclass, uptoDate, search = "" }: FeeDueLedgerTableProps) => {
  const t = useTranslate(LANG_BILLING, "report");

  const { data: dueByFeeHeadData } = useRefineOne<IStudentDueLedger>({
    resource: BILLING_FEE_REPORT_URL,
    id: BILL_FEE_DUE_LEDGER_ID,
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

  const { students = [], due = [] } = dueByFeeHeadData?.data ?? {};

  const dueLedgerMap = useMemo(() => {
    const map = new Map<string, { dr: number; cr: number }>();
    due.forEach(d => map.set(d.student_id, { dr: Number(d.dr), cr: Number(d.cr) }));
    return map;
  }, [due]);

  const dr_total = useMemo(() => due.reduce((acc, d) => acc + Number(d.dr), 0), [due]);
  const cr_total = useMemo(() => due.reduce((acc, d) => acc + Number(d.cr), 0), [due]);

  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort(students, {
    search,
    searchFields: ["full_name", "regid", "class.name", "section.name", "phone"],
  });

  const columns: Column<IStudentDueLedgerColumn>[] = [
    { key: "full_name", label: t("feedue.student"), sortable: true },
    { key: "regid", label: t("feedue.regid"), sortable: true },
    { key: "class", label: t("feedue.level"), sortable: true, render: (s: IStudentInfo) => s.class?.name ?? "" },
    { key: "section", label: t("feedue.section"), sortKey: "section.name", sortable: true, render: (s: IStudentInfo) => s.section?.name ?? "" },
    { key: "phone", label: t("feedue.phone"), sortable: true },
    {
      key: "dr",
      label: t("feedue.dr_amount"),
      align: "right",
      render: (s: IStudentInfo) => {
        const val = dueLedgerMap.get(s.id)?.dr ?? 0
        return fNumber(val, { absolute: true })
      }
    },
    {
      key: "cr",
      label: t("feedue.cr_amount"),
      align: "right",
      render: (s: IStudentInfo) => {
        const val = dueLedgerMap.get(s.id)?.cr ?? 0
        return fNumber(val, { absolute: true })
      }
    },
    {
      key: "balance",
      label: t("feedue.balance"),
      align: "right",
      sortable: true,
      render: (s: IStudentInfo) => {
        const dr = dueLedgerMap.get(s.id)?.dr ?? 0;
        const cr = dueLedgerMap.get(s.id)?.cr ?? 0;
        const balance = dr - cr;
        return fNumber(balance, { absolute: true })
      },
    },
  ];
  const balance = dr_total - cr_total;

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
      <TableCell align="right">
        <Typography>{dr_total}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{cr_total}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>
          {fNumber(balance, { absolute: true })}
        </Typography>
      </TableCell>
    </TableRow>}
  />
};

