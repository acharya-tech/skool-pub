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
import { BILLING_SCHOLAR_ITEM_LIST, BILLING_SCHOLAR_ITEM_URL } from "../constant";
import { IBillFee, IBillScholar } from "../interface";

export const ScholarItemListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "scholarItem");
  const { edit } = useNav(BILLING_SCHOLAR_ITEM_LIST);

  const columns = useMemo<GridColDef<IBillScholar>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "fee.name",
        headerName: t("fields.fee"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.fee?.name
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
    meta: {
      customQuery: {
        fee: true
      }
    },
    resource: BILLING_SCHOLAR_ITEM_URL,
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
