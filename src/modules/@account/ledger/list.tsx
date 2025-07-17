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
import { ACCOUNT_LEDGER_LIST } from "../constant/urls";
import { IAccountLedger } from "../interface";
import { ACCOUNT_LEDGER_URL } from "@account/constant/server.urls";

export const LedgerListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACCOUNT, "ledger");
  const { edit } = useNav(ACCOUNT_LEDGER_LIST);

  const columns = useMemo<GridColDef<IAccountLedger>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "code",
        headerName: t("fields.code"),
        sortable: true,
        width: 200,
      },
      {
        field: "ledgerGroup",
        headerName: t("fields.ledgerGroup"),
        sortable: true,
        width: 200,
        renderCell: ({ row }) => {
          return row?.ledgerGroup?.name
        }
      },
      {
        field: "is_fixed",
        headerName: t("fields.is_fixed"),
        sortable: true,
        width: 200,
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
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IAccountLedger, HttpError>({
    resource: ACCOUNT_LEDGER_URL,
    meta: {
      customQuery: {
        ledgerGroup: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
      {
        field: "code",
        value: search,
        operator: "eq",
      },
      {
        field: "bs_head",
        value: search,
        operator: "eq",
      },
      {
        field: "bs_type",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
