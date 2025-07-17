import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACCOUNT } from "@common/constant";
import { IAccountLedger, IAccountVoucher, ILedgerReport, ILedgerReportColumn } from "../interface";
import { TableListProp } from "src/interfaces";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { Column, TableWithSearchAndSort } from "@components/table/table.report";
import { ACCOUNT_REPORT_URL } from "../constant/server.urls";
import { ACCOUNT_REPORT_LEDGER_ID } from "../constant/constant";
import { DrCrEnum } from "@common/all.enum";
import { DateLabel } from "@components/label/date.label";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { BasicModal } from "@components/modal/basic.modal";
import { VoucherView } from "../voucher/show";
import { useRefineOne } from "@hooks/useOne";

type LedgerReportTableProps = {
  dateRange: {
    startDate: Date;
    endDate: Date;
  }
  ledger?: IAccountLedger;
} & TableListProp;

export const LedgerReportTable = ({ ledger, dateRange, search = "" }: LedgerReportTableProps) => {
  const t = useTranslate(LANG_ACCOUNT, "report");
  const [openVoucher, setVoucher] = useState<Partial<IAccountVoucher> | null>(null)
  const { data: ledgerReportData } = useRefineOne<ILedgerReport>({
    resource: ACCOUNT_REPORT_URL,
    id: ACCOUNT_REPORT_LEDGER_ID,
    meta: {
      customQuery: {
        ledger_id: ledger?.id,
        from_date: dateRange.startDate.toISOString(),
        to_date: dateRange.endDate.toISOString()
      },
    },
    queryOptions: {
      enabled: Boolean(ledger && dateRange.startDate && dateRange.endDate),
    },
  });

  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort(ledgerReportData?.data?.report ?? [], {
    search,
    searchFields: ["narration", "voucher_no"],
  });
  let totalDr = 0
  let totalCr = 0

  const processedData = filteredData.reduce((acc: ILedgerReportColumn[], curr) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance || 0 : 0;
    const amount = Number(curr.amount);

    const balance = curr.dr_cr === DrCrEnum.Dr
      ? lastBalance + amount
      : lastBalance - amount;

    acc.push({ ...curr, balance });

    if (curr.dr_cr == DrCrEnum.Dr) {
      totalDr += Number(curr.amount)
    } else {
      totalCr += Number(curr.amount)
    }
    return acc;
  }, []);


  const columns: Column<ILedgerReportColumn>[] = [
    {
      key: "transaction_date", label: t("labels.transaction_date"), sortable: true,
      render: (s) => {
        return <DateLabel date={s.transaction_date} />
      }
    },
    {
      key: "narration", label: t("labels.narration"), sortable: true,
      render: (s) => {
        return <Typography>{s.narration} - <Typography color={"#666"} variant="caption">{s.voucher_narration}</Typography></Typography>
      }
    },
    {
      key: "voucher_no",
      label: t("labels.voucher_no"),
      sortable: true,
      width: 120,
      align: "right",
      render: (s) => {
        return <a href="javascript:void(0)" onClick={() => setVoucher({
          id: s.voucher_id,
          voucher_no: s.voucher_no,
          narration: s.voucher_narration,
        })}>{s.voucher_no}</a>
      }
    },
    {
      key: "dr",
      label: t("labels.dr_amount"),
      align: "right",
      render: (s) => {
        return s.dr_cr == DrCrEnum.Dr ? s.amount : ""
      }
    },
    {
      key: "cr",
      label: t("labels.cr_amount"),
      align: "right",
      render: (s) => {
        return s.dr_cr == DrCrEnum.Cr ? s.amount : ""
      }
    },
    {
      key: "balance",
      label: t("labels.balance"),
      align: "right",
      render: (s) => {
        const balance = Number(s.balance || 0);
        return balance >= 0 ? balance : `(${Math.abs(balance)})`;
      }
    },
  ];

  const finalBalance = processedData.length > 0
    ? processedData[processedData.length - 1].balance || 0
    : 0;

  return <Box>
    <TableWithSearchAndSort
      data={processedData}
      sortKey={sortKey}
      sortOrder={sortOrder}
      onSort={handleSort}
      columns={columns}
      footer={<TableRow>
        <TableCell colSpan={3} align="right">
          <Typography>{t("labels.total")}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{totalDr}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{totalCr}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>
            {finalBalance >= 0 ? finalBalance : `(${Math.abs(finalBalance)})`}
          </Typography>
        </TableCell>
      </TableRow>}
    />
    {Boolean(openVoucher) && (
      <BasicModal
        onClose={() => setVoucher(null)}
        open={true}
        title={`${openVoucher?.voucher_no} | ${openVoucher?.narration}`}
      >
        <VoucherView onClose={() => setVoucher(null)} id={openVoucher?.id!} />
      </BasicModal>
    )}
  </Box>
};

