import { useEffect, useMemo } from "react";
import { useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Box, Button, Grid2 as Grid, } from "@mui/material";
import { ILibPatron } from "../interface";
import { TableListProp } from "src/interfaces";
import { LIBRARY_PATRON_URL } from "../constant";
import { YesNoEnum } from "@common/all.enum";
import { useNav } from "@hooks/useNavlHook";
import { TableGrid } from "@components/table/table.body";
import { LANG_LIBRARY } from "@common/constant";

export const PatronCardTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_LIBRARY, "patronCard");
  const { show } = useNav(LIBRARY_PATRON_URL);
  const { mutate } = useUpdate();
  const handleMarkCard = (row: ILibPatron) => {
    mutate({
      resource: LIBRARY_PATRON_URL,
      id: row.id,
      values: {
        mark_card: row.mark_card === YesNoEnum.Yes ? YesNoEnum.No : YesNoEnum.Yes,
      },
      successNotification: false
    });
  }

  const handleMarkCardAll = () => {
    mutate({
      resource: LIBRARY_PATRON_URL,
      id: "clearAll",
      values: {
        mark_card: YesNoEnum.No
      },
      successNotification: false
    });
  }

  const columns = useMemo<GridColDef<ILibPatron>[]>(
    () => [
      {
        field: "patron_no",
        headerName: t("fields.patron_no"),
        sortable: true,
        width: 120,
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
        width: 150,
        renderCell: ({ row }) => {
          return row?.patronType?.patron_type;
        },
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        width: 100,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <IconButton
              size="small"
              sx={{
                color: row.mark_card === YesNoEnum.Yes ? "green" : "text.secondary",
              }}
              onClick={() => handleMarkCard(row)}
            >
              <FaPlusCircle />
            </IconButton>
          );
        },
      },
    ],
    [t, show]
  );


  const selectedPatronColumns = useMemo<GridColDef<ILibPatron>[]>(
    () => [
      {
        field: "patron_no",
        headerName: t("fields.patron_no"),
        sortable: true,
        width: 120,
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        headerAlign: "center",
        width: 100,
        align: "center",
        sortable: false,
        renderCell: ({ row }) => (
          <IconButton
            size="small"
            onClick={() => handleMarkCard(row)}
            sx={{ color: "red" }}
          >
            <FaMinusCircle />
          </IconButton>
        ),
      },
    ],
    [t]
  );

  const { dataGridProps, setFilters } = useDataGrid<ILibPatron, HttpError>({
    resource: LIBRARY_PATRON_URL,
    meta: { customQuery: { mark_card: YesNoEnum.No, patronType: true } }
  });

  const { dataGridProps: selectedDataGridProps, setFilters: setSelectedFilters } = useDataGrid<ILibPatron, HttpError>({
    resource: LIBRARY_PATRON_URL,
    meta: { customQuery: { mark_card: YesNoEnum.Yes } }
  });

  useEffect(() => {
    setFilters([
      {
        field: "patron_no",
        value: search,
        operator: "eq",
      },
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  useEffect(() => {
    setSelectedFilters([
      {
        field: "patron_no",
        value: search,
        operator: "eq",
      },
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TableGrid
            {...dataGridProps}
            columns={columns}
            getRowClassName={({ row }) => {
              if (row.mark_card === YesNoEnum.Yes) {
                return "error-row"
              }
              return ""
            }}
          />
        </Grid>
        <Grid size={4}>
          <TableGrid
            {...selectedDataGridProps}
            columns={selectedPatronColumns}
          />
          <Box sx={{ display: "flex", gap: 2, p: 2,justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleMarkCardAll}
              size="small"
              color="error"
              disabled={selectedDataGridProps.rows.length === 0}
            >
              {t("actions.clearAll")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={selectedDataGridProps.rows.length === 0}
            >
              {t("actions.getCards")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
