import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
import { BILLING_LEDGER_LIST, BILLING_LEDGER_URL } from "../constant";
import { IBillLedger } from "../interface";

export const LedgerListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "ledger");
  const { edit } = useNav(BILLING_LEDGER_LIST);

  const columns = useMemo<GridColDef<IBillLedger>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 200,
      },
      {
        field: "ledger_id",
        headerName: t("fields.ledger_id"),
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

  const { dataGridProps, setFilters } = useDataGrid<IBillLedger, HttpError>({
    resource: BILLING_LEDGER_URL,
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
      {
        field: "ledger_id",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
