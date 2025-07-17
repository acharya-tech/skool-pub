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
import { ILibPublisher } from "../interface";
import { TableListProp } from "src/interfaces";
import { LIBRARY_PUBLISHER_LIST, LIBRARY_PUBLISHER_URL } from "../constant";

export const PublisherListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "publisher");
  const { edit, show } = useNav(LIBRARY_PUBLISHER_LIST);

  const columns = useMemo<GridColDef<ILibPublisher>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "country",
        headerName: t("fields.country"),
        sortable: true,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <>
              <IconButton
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    [t, edit, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibPublisher, HttpError>({
    resource: LIBRARY_PUBLISHER_URL,
    meta: { customQuery: { image: true } },
  });

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
      {
        field: "country",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <TableGrid {...dataGridProps} columns={columns} />;
};
