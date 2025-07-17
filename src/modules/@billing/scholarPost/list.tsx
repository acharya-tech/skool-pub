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
import { BILLING_SCHOLAR_POST_LIST, BILLING_SCHOLAR_POST_URL } from "../constant";
import { IBillFee, IBillScholarPostbase } from "../interface";

export const ScholarPostListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "scholarPost");
  const { edit } = useNav(BILLING_SCHOLAR_POST_LIST);

  const columns = useMemo<GridColDef<IBillScholarPostbase>[]>(
    () => [
      {
        field: "student.class.name",
        headerName: t("fields.class"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return row.student?.class?.name
        }
      },
      {
        field: "student.regid",
        headerName: t("fields.regid"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return row.student?.regid
        }
      },
      {
        field: "student.full_name",
        headerName: t("fields.student"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.student?.full_name
        }
      },
      {
        field: "scholar.name",
        headerName: t("fields.scholar"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.scholar?.name
        }
      },
      {
        field: "amount",
        headerName: t("fields.amount"),
        sortable: true,
        width: 100,
      },
      {
        field: "post_over",
        headerName: t("fields.post_over"),
        sortable: true,
        width: 100,
      },
      {
        field: "post_count",
        headerName: t("fields.post_count"),
        sortable: true,
        width: 100,
      },
      {
        field: "alloted",
        headerName: t("fields.alloted"),
        sortable: false,
        width: 100,
        renderCell: function render({ row }) {
          return row.amount * row.post_over
        },
        disableColumnMenu: true,
        filterable: false
      },
      {
        field: "given",
        headerName: t("fields.given"),
        sortable: false,
        width: 100,
        renderCell: function render({ row }) {
          return row.amount * row.post_count
        },
        disableColumnMenu: true,
        filterable: false
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

  const { dataGridProps, setFilters } = useDataGrid<IBillScholarPostbase, HttpError>({
    meta: {
      customQuery: {
        scholar: true,
        student: true
      }
    },
    resource: BILLING_SCHOLAR_POST_URL,
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
