import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibPatron } from "../interface";
import { TableListProp } from "src/interfaces";
import { LIBRARY_PATRON_LIST } from "../constant";
import { DateLabel } from "@components/label/date.label";
import { FaEye } from "react-icons/fa6";
import { Stack } from "@mui/material";

export const PatronListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "patron");
  const { edit, show } = useNav(LIBRARY_PATRON_LIST);

  const columns = useMemo<GridColDef<ILibPatron>[]>(
    () => [
      {
        field: "patron_no",
        headerName: t("fields.patron_no"),
        width: 120,
        sortable: true,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "p_type",
        headerName: t("fields.p_type"),
        sortable: true,
        width:150,
        renderCell: ({ row }) => {
          return row?.patronType?.patron_type;
        },
      },
      {
        field: "valid_from",
        headerName: t("fields.valid_from"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return <DateLabel date={row.valid_from} />;
        },
      },
      {
        field: "valid_till",
        headerName: t("fields.valid_till"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return <DateLabel date={row.valid_till} />;
        },
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <>
              <Stack direction={"row"}>
                <IconButton
                  size="small"
                  sx={{
                    color: "text.secondary",
                  }}
                  onClick={() => show(row.id)}
                >
                  <FaEye />
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    color: "text.secondary",
                  }}
                  onClick={() => edit(row.id)}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Stack>
            </>
          );
        },
      },
    ],
    [t, edit, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibPatron, HttpError>({
    meta: { customQuery: { patronType: true } },
  });

  useEffect(() => {
    setFilters([
      {
        field: "title",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
