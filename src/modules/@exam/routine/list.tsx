import {
  type HttpError,
} from "@refinedev/core";

import { IExmRoutine } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { ShowButton, useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_EXAM } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { EXAM_ROUTINE_LIST } from "../constant/local.urls";
import { Paper } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { SubjectViewList } from "./component/subject.view.list";
import { RoutineStatus } from "../component/common";
import { EXAM_ROUTINE_URL } from "@exam/constant/service.urls";
import { ActiveStatusChip } from "@components/label/status.label";
export const RoutineListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EXAM, "routine");
  const columns = useMemo<GridColDef<IExmRoutine>[]>(
    () => [
      {
        field: "code",
        headerName: t("fields.code"),
        sortable: true,
      },
      {
        field: "class.name",
        headerName: t("fields.class"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.class?.name
        }
      },
      {
        field: "batch.name",
        headerName: t("fields.batch"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.batch?.name
        }
      },
      {
        field: "type.name",
        headerName: t("fields.type"),
        sortable: true,
        renderCell: function render({ row }) {
          return row.type?.name
        }
      },
      {
        field: "state",
        headerName: t("fields.state"),
        sortable: true,
        renderCell: function render({ row }) {
          return <RoutineStatus status={row.state} />
        }
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        renderCell: function render({ row }) {
          return <ActiveStatusChip status={row.status} />
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <ShowButton
              hideText
              recordItemId={row.id}
              sx={{
                color: "text.secondary",
              }}
            />
          );
        },
      },
    ],
    [t],
  );

  const { dataGridProps, setFilters } = useDataGrid<IExmRoutine, HttpError>({
    resource: EXAM_ROUTINE_URL,
    meta: {
      customQuery: {
        batch: true,
        class: true,
        type: true
      }
    },
  });

  useEffect(() => {
    setFilters([
      {
        field: "code",
        value: search,
        operator: "eq"
      },
      {
        field: "class_name",
        value: search,
        operator: "eq"
      },
      {
        field: "type_name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  return <ExpandableTableGrid
    {...dataGridProps as any}
    columns={columns}
    expandable={true}
    renderExpandableRow={({ row }: { row: IExmRoutine }) => {
      return (
        <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
          <SubjectViewList routine_id={row.id} />
        </Paper>
      );
    }}

  />
};
