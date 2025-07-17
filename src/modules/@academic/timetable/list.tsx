import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";

import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNav } from "@hooks/useNavlHook";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { Box, Chip, IconButton, Paper } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { ACADEMIC_TIMELINE_LIST } from "@academic/constant/urls";
import { IClass } from "@academic/interface";
import { ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
import { TimeTableView } from "./component/view";
import { NotSetLabel } from "@components/label/notset.label";
export const ClassListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACADEMIC, "class");
  const { edit } = useNav(ACADEMIC_TIMELINE_LIST);

  const columns = useMemo<GridColDef<IClass>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.program"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.program?.name
        }
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.name
        }
      },
      {
        field: "sessions.name",
        headerName: t("fields.sessions"),
        sortable: false,
        renderCell: ({ row }) => {
          if (row.sessions?.length === 0) return <NotSetLabel />
          return <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {row.sessions?.map(e => (<Chip key={e.id} label={e.name} />))}
          </Box>
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

  const { dataGridProps, setFilters } = useDataGrid<IClass, HttpError>({
    resource: ACADEMIC_CLASS_URL,
    pagination: {
      pageSize: 10000
    },
    meta: {
      customQuery: {
        program: true,
        sessions: true
      }
    },
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  return <ExpandableTableGrid
    {...dataGridProps as any}
    columns={columns}
    expandable={true}
    renderExpandableRow={({ row }: { row: IClass }) => {
      return (
        <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
          <TimeTableView aclass={row} />
        </Paper>
      );
    }}

  />
};
