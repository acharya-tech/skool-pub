import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_INVENTORY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Nullable, TableListProp } from "src/interfaces";
import { IStockSummary, IStoreBilling } from "../interface";

type StockSummaryTable = {
  dateRange: {
    startDate: Date;
    endDate: Date;
  }
} & TableListProp
export const StockSummaryTable = ({ search, dateRange }: StockSummaryTable) => {
  const t = useTranslate(LANG_INVENTORY, "reports");

  const columns = useMemo<GridColDef<IStockSummary>[]>(
    () => [
      {
        field: "product_name",
        headerName: t("labels.product"),
        sortable: true,
        renderCell: ({ row }) => {
          return (
            <span>
              {row?.product_code} - {row?.product_name}
            </span>
          );
        }
      },
      {
        field: "opening_stock",
        headerName: t("labels.opening"),
        sortable: true,
      },
      {
        field: "total_in",
        headerName: t("labels.total_in"),
        sortable: true,
      },
      {
        field: "total_out",
        headerName: t("labels.total_out"),
        sortable: true,
      },
      {
        field: "closing_stock",
        headerName: t("labels.closing"),
        sortable: true
      },
    ],
    [t]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStockSummary, HttpError, Nullable<IStockSummary>>({
    queryOptions: {
      enabled: Boolean(dateRange?.startDate && dateRange?.endDate)
    }
  });
  useEffect(() => {
    if (dateRange) {
      setFilters([
        {
          field: "from_date",
          operator: "eq",
          value: dateRange?.startDate?.toISOString(),
        },
        {
          field: "to_date",
          operator: "eq",
          value: dateRange?.endDate?.toISOString(),
        },
        {
          field: "house_id",
          operator: "eq",
          value: 1,
        },
      ]);
    }
  }, [dateRange])

  const filteredRows: IStockSummary[] = dataGridProps.rows?.filter((row) => {
    if (search) {
      return (
        row?.product_name?.toLowerCase().includes(search.toLowerCase()) ||
        row?.product_code?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true
  }) ?? [];

  return <TableGrid
    rows={filteredRows}
    rowCount={filteredRows.length}
    loading={dataGridProps.loading}
    
    columns={columns} />;
};
