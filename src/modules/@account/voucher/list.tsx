import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACCOUNT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
import { ACCOUNT_VOUCHER_LIST } from "../constant/urls";
import { IAccountLedger, IAccountVoucher } from "../interface";
import { DateLabel } from "@components/label/date.label";
import { ACCOUNT_VOUCHER_URL } from "../constant/server.urls";
import { VoucherState } from "../components/common";
import { Visibility } from "@mui/icons-material";

export const VoucherListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACCOUNT, "voucher");
  const { show } = useNav(ACCOUNT_VOUCHER_LIST);

  const columns = useMemo<GridColDef<IAccountVoucher>[]>(
    () => [
      {
        field: "accountYear.name",
        headerName: t("fields.year"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return row.accountYear?.name
        }
      },
      {
        field: "transaction_date",
        headerName: t("fields.transaction_date"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return <DateLabel date={row.transaction_date} />
        }
      },
      {
        field: "voucher_no",
        headerName: t("fields.voucher_no"),
        sortable: true,
        width: 150,
      },
      {
        field: "type",
        headerName: t("fields.type"),
        sortable: true,
        width: 150,
      },
      {
        field: "postedBy.name",
        headerName: t("fields.postedBy"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.postedBy?.name
        }
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 150,
      },
      {
        field: "state",
        headerName: t("fields.state"),
        sortable: true,
        width: 100,
        renderCell: function render({ row }) {
          return <VoucherState state={row.state} />
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Stack direction={"row"}>
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<IAccountLedger, HttpError>({
    resource: ACCOUNT_VOUCHER_URL,
    meta: {
      customQuery: {
        postedBy: true,
        accountYear: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "voucher_no",
        value: search,
        operator: "eq",
      },
      {
        field: "transaction_no",
        value: search,
        operator: "eq",
      },
      {
        field: "posted_by_name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
