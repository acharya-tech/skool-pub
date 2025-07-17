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
import { BillFeeClassTypeEnum, BILLING_FEE_CLASS_LIST, BILLING_FEE_CLASS_URL } from "../constant";
import { IBillFeeClass } from "../interface";

export const FeeClassListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "feeClass");
  const { edit } = useNav(BILLING_FEE_CLASS_LIST);

  const columns = useMemo<GridColDef<IBillFeeClass>[]>(
    () => [
      {
        field: "fee.name",
        headerName: t("fields.fee"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.fee?.name
        }
      },
      {
        field: "class.name",
        headerName: t("fields.class"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.class?.name
        }
      },
      {
        field: "accountYear.name",
        headerName: t("fields.year"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.accountYear?.name
        }
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 200,
      },
      {
        field: "post_type",
        headerName: t("fields.post_type"),
        sortable: true,
        width: 200,
        renderCell: function render({ row }) {
          if (row.post_type == BillFeeClassTypeEnum.Module) {
            return `${row.post_type} : ${row.module_type}`
          }
          return row.post_type
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

  const { dataGridProps, setFilters } = useDataGrid<IBillFeeClass, HttpError>({
    meta: {
      customQuery: {
        fee: true,
        class: true,
        accountYear: true,
      }
    },
    resource: BILLING_FEE_CLASS_URL,
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
