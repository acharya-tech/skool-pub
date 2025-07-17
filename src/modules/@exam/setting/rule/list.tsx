import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { EditButton, useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { IExmRule } from "../../interface";
import { Typography } from "@mui/material";

export const RuleListTable = () => {
  const t = useTranslate(LANG_EXAM, "rule");
  const columns = useMemo<GridColDef<IExmRule>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,

      },
      {
        field: "regulation",
        headerName: t("fields.regulation"),
        sortable: false,
      },
      {
        field: "cas_type",
        headerName: t("fields.cas_type"),
        sortable: false,
      },
      {
        field: "rank_by",
        headerName: t("fields.rank_by"),
        sortable: false,
      },
      {
        field: "internal_pass_by",
        headerName: t("fields.internal_pass_by"),
        sortable: false,
      },
      {
        field: "subject_pass_by",
        headerName: t("fields.subject_pass_by"),
        sortable: false,
      },
      {
        field: "theory",
        headerName: t("fields.theory"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <Typography>{row.th_pm}/{row.th_fm}</Typography>
          )
        }
      },
      {
        field: "internal",
        headerName: t("fields.internal"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <Typography>{row.in_pm}/{row.in_fm}</Typography>
          )
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <EditButton
              sx={{
                color: "text.secondary",
              }}
              hideText
              size="small"
              recordItemId={row.id}
            />
          );
        },
      },
    ],
    [t],
  );

  const { dataGridProps } = useDataGrid<IExmRule, HttpError>();
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
