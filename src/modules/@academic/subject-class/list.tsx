import {
  type HttpError,
} from "@refinedev/core";

import { IClass } from "@academic/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { LANG_ACADEMIC } from "@common/constant";
import { ACADEMIC_CLASS_LIST } from "../constant/urls";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { Paper } from "@mui/material";
import { QuickViewSubject } from "./subject.list";
export const ClassSubjectListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "class");
  const columns = useMemo<GridColDef<IClass>[]>(
    () => [
      {
        field: "program.name",
        headerName: t("fields.program"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.program?.name;
        }
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
    ],
    [],
  );

  const { dataGridProps } = useDataGrid<IClass, HttpError>({
    resource: ACADEMIC_CLASS_LIST,
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "sort",
          order: "asc"
        }
      ]
    },
    meta: {
      customQuery: {
        program: true
      }
    }
  });
  // TODO: prevent parent from being rerender when child update form
  return <ExpandableTableGrid
    {...dataGridProps as any}
    columns={columns}
    expandable={true}
    renderExpandableRow={({ row }: { row: IClass }) => {
      return (
        <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
          <QuickViewSubject key={row.id} aclass={row!} />
        </Paper>
      );
    }}

  />
};
