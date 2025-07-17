import {
  useNavigation,
  type HttpError,
} from "@refinedev/core";

import { ISubject } from "@academic/interface";
import { ACADEMIC_SUBJECT_LIST } from "@academic/constant/urls";
import { useTranslate } from "@hooks/useTranslate";
import { EditButton, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_ACADEMIC } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Chip, Stack } from "@mui/material";
import { TableListProp } from "src/interfaces";
export const SubjectListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_ACADEMIC, "subject");
  const { show } = useNavigation();
  const columns = useMemo<GridColDef<ISubject>[]>(
    () => [
      {
        field: "full_name",
        headerName: t("fields.full_name"),
        sortable: true,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "code",
        headerName: t("fields.code"),
        sortable: true,
        width: 100,
      },
      {
        field: "th_credit",
        headerName: t("fields.th_credit"),
        sortable: true,
        width: 100
      },
      {
        field: "in_credit",
        headerName: t("fields.in_credit"),
        sortable: true,
        width: 100
      },
      {
        field: "type",
        headerName: t("fields.type"),
        sortable: true,
        width: 100
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
                sx={{
                  color: "text.secondary",
                }}
                size="small"
                onClick={() => show(ACADEMIC_SUBJECT_LIST, row.id)}
              >
                <VisibilityIcon />
              </IconButton>
              <EditButton
                sx={{
                  color: "text.secondary",
                }}
                recordItemId={row.id}
                hideText
                size="small" />
            </Stack>
          );
        },
      },
    ],
    [t],
  );

  const { dataGridProps, setFilters } = useDataGrid<ISubject, HttpError>();

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
