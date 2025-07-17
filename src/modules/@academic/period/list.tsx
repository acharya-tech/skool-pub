import {
  type HttpError,
} from "@refinedev/core";

import { IPeriod, ISection } from "@academic/interface";
import { ACADEMIC_PERIOD_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { TimeLabel } from "@components/label/date.label";
export const PeriodListTable = () => {
  const t = useTranslate(LANG_ACADEMIC, "period");
  const { edit } = useNav(ACADEMIC_PERIOD_LIST);

  const columns = useMemo<GridColDef<IPeriod>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "start_time",
        headerName: t("fields.start_time"),
        sortable: true,
        renderCell: ({ row }) => {
          return <TimeLabel date={row.start_time} />
        }
      },
      {
        field: "end_time",
        headerName: t("fields.end_time"),
        sortable: true,
        renderCell: ({ row }) => {
          return <TimeLabel date={row.end_time} />
        }
      },
      {
        field: "sort",
        headerName: t("fields.sort"),
        sortable: true,
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

  const { dataGridProps } = useDataGrid<ISection, HttpError>({
    sorters: {
      initial: [
        {
          field: "sort",
          order: "asc",
        },
      ],
    }
  });
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};

