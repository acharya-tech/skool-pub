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
import { ACCOUNT_LEDGER_GROUP_LIST } from "../constant/urls";
import { IAccountLedgerGroup } from "../interface";
import { ACCOUNT_LEDGER_GROUP_URL } from "@account/constant/server.urls";

export const LedgerGroupListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACCOUNT, "ledgerGroup");
  const { edit } = useNav(ACCOUNT_LEDGER_GROUP_LIST);

  const columns = useMemo<GridColDef<IAccountLedgerGroup>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "bs_head",
        headerName: t("fields.bs_head"),
        sortable: true,
        width: 200,
      },
      {
        field: "bs_type",
        headerName: t("fields.bs_type"),
        sortable: true,
        width: 200,
      },
      {
        field: "group_type",
        headerName: t("fields.group_type"),
        sortable: true,
        width: 200,
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

  const { dataGridProps, setFilters } = useDataGrid<IAccountLedgerGroup, HttpError>({
    resource: ACCOUNT_LEDGER_GROUP_URL,
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
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
