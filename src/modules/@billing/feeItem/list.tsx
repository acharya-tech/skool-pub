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
import { BILLING_FEE_ITEM_LIST, BILLING_FEE_ITEM_URL } from "../constant";
import { IBillFee } from "../interface";

export const FeeItemListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "feeItem");
  const { edit } = useNav(BILLING_FEE_ITEM_LIST);

  const columns = useMemo<GridColDef<IBillFee>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "type",
        headerName: t("fields.type"),
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

  const { dataGridProps, setFilters } = useDataGrid<IBillFee, HttpError>({
    resource: BILLING_FEE_ITEM_URL,
  });


  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
