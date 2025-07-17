import {
  type HttpError
} from "@refinedev/core";

import dayjs from "dayjs";
import { IBatch } from "@academic/interface";
import { ACADEMIC_BATCH_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { TextFieldComponent, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { Chip } from "@mui/material";
import { YesNoEnum } from "@common/all.enum";


export const BatchListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "batch");
  const { edit } = useNav(ACADEMIC_BATCH_LIST);

  const columns = useMemo<GridColDef<IBatch>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "start_date",
        headerName: t("fields.start_date"),
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <TextFieldComponent value={dayjs(row.start_date).format("YYYY-MM-DD").toString()} />
          );
        }
      },
      {
        field: "end_date",
        headerName: t("fields.end_date"),
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <TextFieldComponent value={dayjs(row.end_date).format("YYYY-MM-DD").toString()} />
          );
        }
      },
      {
        field: "isCurrent",
        headerName: t("fields.isCurrent"),
        sortable: true,
        renderCell: ({ row }) => {
          return <Chip size="small" label={row.isCurrent} color={row.isCurrent == YesNoEnum.Yes ? "success" : "default"} />
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => edit(row.id)}
            >
              <EditOutlinedIcon />
            </IconButton>
          );
        },
      },
    ],
    [t, edit],
  );

  const { dataGridProps } = useDataGrid<IBatch, HttpError>();

  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />

};

