import {
  type HttpError,
} from "@refinedev/core";

import { IExmFormula } from "@exam/interface";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { Fragment, useEffect, useMemo } from "react";
import { LANG_EXAM } from "@common/constant";
import { useNav } from "@hooks/useNavlHook";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { EXAM_FORMULA_LIST } from "../../constant/local.urls";
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TableListProp } from "src/interfaces";
import NoDataLabel from "@components/other/no.data";
import { NotSetLabel } from "@components/label/notset.label";
export const FormulaListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_EXAM, "formula");
  const { edit } = useNav(EXAM_FORMULA_LIST);

  const columns = useMemo<GridColDef<IExmFormula>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "base",
        headerName: t("fields.base"),
        sortable: false,
      },
      {
        field: "type",
        headerName: t("fields.type"),
        sortable: false,
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
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          );
        },
      },
    ],
    [t, edit],
  );
  const { dataGridProps, setFilters } = useDataGrid<IExmFormula, HttpError>({
    meta: { customQuery: { classes: true } }
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
    renderExpandableRow={({ row }: { row: IExmFormula }) => {
      return (
        <Box>
          <Paper sx={{ mx: 10, my: 2, p: 2 }} elevation={2}>
            <Typography>{t("fields.classes")}:</Typography>
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {row.classes?.length === 0 && <NotSetLabel />}
              {(row.classes?.length || 0) > 0 && row.classes?.sort((a, b) => a.sort - b.sort).map((classItem) => <Chip label={classItem.name} />)}
            </Box>
          </Paper>
          <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
            <TableContainer >
              <Table style={{ minWidth: "650" }} aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={80}>{t('fields.rank')}</TableCell>
                    <TableCell align="right">{t('fields.from')}</TableCell>
                    <TableCell align="right">{t('fields.to')}</TableCell>
                    <TableCell align="right">{t('fields.point')}</TableCell>
                    <TableCell>{t('fields.remark')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.meta.map((row, index) => (
                    <TableRow key={row.rank}>
                      <TableCell component="th" scope="row">
                        {row.rank}
                      </TableCell>
                      <TableCell align="right">{row.from}</TableCell>
                      <TableCell align="right">{row.to}</TableCell>
                      <TableCell align="right">{row.point}</TableCell>
                      <TableCell>{row.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      );
    }}

  />
};
