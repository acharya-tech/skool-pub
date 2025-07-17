import { useList, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_BILLING } from "@common/constant";
import { TableListProp } from "src/interfaces";
import { BILLING_INVOICE_URL } from "../constant";
import { IBillInvoice } from "../interface";
import { DateTimeLabel } from "@components/label/date.label";
import { useSearchAndSort } from "@hooks/useSearchAndSort";
import { TableWithSearchAndSort } from "@components/table/table.report";
import { TableCell, TableRow, Typography } from "@mui/material";
import { fNumber } from "@utils/format-number";

type FeeCollectionTableProps = {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
} & TableListProp;

export const FeeCollectionTable = ({ search = "", dateRange }: FeeCollectionTableProps) => {
  const t = useTranslate(LANG_BILLING, "invoice");

  const { data } = useList<IBillInvoice, HttpError>({
    resource: BILLING_INVOICE_URL,
    meta: {
      customQuery: {
        items: true,
        dateRange: [dateRange.startDate.toISOString(), dateRange.endDate.toISOString()],
      },
    },
  });

  const customItemKey = "*custom*";
  const invoiceList = data?.data || [];

  const columnMap = new Map<string, { name: string; amount: number }>();
  const itemMap = new Map<string, Map<string, number>>();
  let invoiceTotal = 0;

  invoiceList.forEach((invoice) => {
    const itemAmounts = new Map<string, number>();
    invoice.items.forEach(({ fee_id, item, amount }) => {
      const key = fee_id ?? customItemKey;
      const amt = Number(amount) || 0;
      itemAmounts.set(key, (itemAmounts.get(key) || 0) + amt);

      if (!columnMap.has(key)) {
        columnMap.set(key, { name: item, amount: amt });
      } else {
        const col = columnMap.get(key)!;
        col.amount += amt;
      }
    });

    itemMap.set(invoice.id, itemAmounts);
    invoiceTotal += Number(invoice.total_amount) || 0;
  });

  if (columnMap.has(customItemKey)) {
    const custom = columnMap.get(customItemKey)!;
    custom.name = "Custom Item";
  }

  const columnList = Array.from(columnMap.entries());

  const columns = [
    {
      key: "bill_date",
      label: t("fields.bill_date"),
      sortable: true,
      render: (invoice: IBillInvoice) => <DateTimeLabel date={invoice.bill_date} />,
    },
    {
      key: "bill_no",
      label: t("fields.bill_no"),
      sortable: true,
    },
    {
      key: "customer_name",
      label: t("fields.customer_name"),
      sortable: true,
    },
    {
      key: "month",
      label: t("fields.month"),
      sortable: true,
    },
    ...columnList.map(([key, col]) => ({
      key,
      label: col.name,
      align: "right" as any,
      sortable: false,
      render: (invoice: IBillInvoice) => {
        const colMap = itemMap.get(invoice.id);
        return <>{fNumber(colMap?.get(key) ?? 0)}</>;
      },
    })),
    {
      key: "total_amount",
      label: t("fields.total_amount"),
      align: "right" as any,
      sortable: true,
    },
  ];

  const { data: filteredData, sortKey, sortOrder, handleSort } = useSearchAndSort(invoiceList, {
    search: search,
    searchFields: ["bill_no", "customer_name", "month"],
  });

  return (
    <TableWithSearchAndSort
      data={filteredData}
      sortKey={sortKey}
      sortOrder={sortOrder}
      onSort={handleSort}
      columns={columns}
      footer={<TableRow>
        <TableCell colSpan={4} align="right">
          <Typography>{t("fields.total_amount")}</Typography>
        </TableCell>
        {columnList.map(([key, col]) => (
          <TableCell key={key} align="right">
            {fNumber(col.amount)}
          </TableCell>
        ))}
        <TableCell align="right">
          <Typography>
            {invoiceTotal}
          </Typography>
        </TableCell>
      </TableRow>}
    />
  );
};
