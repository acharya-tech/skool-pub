import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACCOUNT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { IAccountPayrollPost } from "../interface";
import { DateLabel } from "@components/label/date.label";
import { ACCOUNT_PAYROLL_POST_URL } from "../constant/server.urls";
import { VoucherState } from "../components/common";

export const PayrollPostReleaseListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACCOUNT, "payrollRelease");
  const tv = useTranslate(LANG_ACCOUNT, "voucher");
  const columns = useMemo<GridColDef<IAccountPayrollPost>[]>(
    () => [
      {
        field: "voucher.accountYear.name",
        headerName: tv("fields.year"),
        sortable: true,
        width: 70,
        renderCell: function render({ row }) {
          return row.voucher?.accountYear?.name
        }
      },
      {
        field: "voucher.transaction_date",
        headerName: tv("fields.transaction_date"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <DateLabel date={row.voucher.transaction_date} />
        }
      },
      {
        field: "transaction_no",
        headerName: t("fields.transaction_no"),
        sortable: true,
        width: 150,
      },
      {
        field: "particular",
        headerName: t("fields.particular"),
        sortable: true,
      },
      {
        field: "type",
        headerName: t("fields.type"),
        sortable: true,
        width: 100,
      },
      {
        field: "createdBy.name",
        headerName: t("fields.createdBy"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.createdBy?.name
        }
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 120,
      },
      {
        field: "voucher.state",
        headerName: tv("fields.state"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <VoucherState state={row.voucher.state} />
        }
      },
    ],
    [t]
  );

  const { dataGridProps, setFilters } = useDataGrid<IAccountPayrollPost, HttpError>({
    resource: ACCOUNT_PAYROLL_POST_URL,
    meta: {
      customQuery: {
        postedBy: true,
        voucher: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "particular",
        value: search,
        operator: "eq",
      },
      // {
      //   field: "voucher_state",
      //   value: search,
      //   operator: "eq",
      // },
      {
        field: "transaction_no",
        value: search,
        operator: "eq",
      },
      {
        field: "created_by_name",
        value: search,
        operator: "eq",
      },
      // {
      //   field: "type",
      //   value: search,
      //   operator: "eq",
      // },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
