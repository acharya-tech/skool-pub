import {
  useUpdate,
  type HttpError,
} from "@refinedev/core";

import { IExmFinal } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { Fragment, useEffect, useMemo } from "react";
import { LANG_EXAM } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { EXAM_FINAL_LIST } from "../constant/local.urls";
import { Refresh, Visibility } from "@mui/icons-material";
import { EXAM_FINAL_PROCESS_URL } from "../constant/service.urls";
import { FinalStatus } from "../component/common";
import { DateTimeLabel } from "@components/label/date.label";
export const FinalListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EXAM, "final");
  const { edit, show } = useNav(EXAM_FINAL_LIST);

  const { mutate } = useUpdate<IExmFinal>({
    resource: EXAM_FINAL_PROCESS_URL
  })

  const handleProcess = (id: string) => {
    mutate({ id, values: {} }, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const columns = useMemo<GridColDef<IExmFinal>[]>(
    () => [
      {
        field: "batch.name",
        headerName: t("fields.batch"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.batch?.name
        }
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
        field: "version_no",
        headerName: t("fields.version"),
        sortable: false,
      },
      {
        field: "last_processed",
        headerName: t("fields.updated_at"),
        sortable: false,
        renderCell: ({ row }) => {
          return <DateTimeLabel date={row.last_processed} />
        }
      },
      {
        field: "state",
        headerName: t("fields.state"),
        sortable: false,
        renderCell: ({ row }) => {
          return <FinalStatus status={row.state} />
        }
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return [
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => show(row.id)}
            >
              <Visibility fontSize="small" />
            </IconButton>,
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => edit(row.id)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>,
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => handleProcess(row.id)}
            >
              <Refresh fontSize="small" />
            </IconButton>
          ]
        },
      },
    ],
    [t, edit],
  );

  const { dataGridProps, setFilters, tableQuery: { refetch } } = useDataGrid<IExmFinal, HttpError>({
    meta: { customQuery: { class: true, batch: true } },
  });



  useEffect(() => {
    setFilters([
      {
        field: "class_name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  return <ExpandableTableGrid
    {...dataGridProps as any}
    columns={columns}
    expandable={true}
    renderExpandableRow={({ row }: { row: IExmFinal }) => {
      return (
        <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
          <TableContainer >
            <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('fields.code')}</TableCell>
                  <TableCell>{t('fields.type')}</TableCell>
                  <TableCell align="right">{t('fields.value')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.meta.map((row, index) => (
                  <TableRow key={row.routine_code}>
                    <TableCell component="th" scope="row">
                      {row.routine_code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.exam_type}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
    }}

  />
};
