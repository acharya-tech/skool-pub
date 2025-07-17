import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";

import { GridColDef } from "@mui/x-data-grid";
import { Fragment, useEffect, useMemo } from "react";
import { LANG_ACADEMIC, LANG_STUDENT } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { Paper } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { ACADEMIC_CLASS_LIST } from "@academic/constant/urls";
import { IClass } from "@academic/interface";
import { SubjectViewList } from "./component/subject.list";
import { useParams } from "react-router-dom";
import { ACADEMIC_CLASS_URL } from "@academic/constant/server.url";
export const ClassListTable = ({ search }: TableListProp) => {
  const { programid } = useParams()
  const t = useTranslate(LANG_ACADEMIC, "class");
  const { show } = useNav(ACADEMIC_CLASS_LIST);

  const columns = useMemo<GridColDef<IClass>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.name
        }
      },
      {
        field: "shift",
        headerName: t("fields.shift"),
        sortable: false,
      },
      {
        field: "medium",
        headerName: t("fields.medium"),
        sortable: false,
      },
    ],
    [t, show],
  );

  const { dataGridProps, setFilters } = useDataGrid<IClass, HttpError>({
    resource: ACADEMIC_CLASS_URL,
    meta: {
      customQuery: {
        // subjectClasses: true,
        program_id: programid == 'all' ? undefined : programid,
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
          <SubjectViewList classes={row} />
        </Paper>
      );
    }}

  />
};
