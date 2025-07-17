import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_BILLING } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { Stack } from "@mui/material";
import { BILLING_SCHOLAR_PERCENT_LIST, BILLING_SCHOLAR_PERCENT_STUDENT_URL } from "../constant";
import { IBillScholarPostbase } from "../interface";
import { IStudentInfo } from "@student/interface";
import { Visibility } from "@mui/icons-material";

export const ScholarPercentListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_BILLING, "scholarPercent");
  const { show } = useNav(BILLING_SCHOLAR_PERCENT_LIST);

  const columns = useMemo<GridColDef<IStudentInfo>[]>(
    () => [

      {
        field: "regid",
        headerName: t("fields.regid"),
        sortable: true,
        width: 150,
      },
      {
        field: "full_name",
        headerName: t("fields.student"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.full_name
        }
      },
      {
        field: "class.name",
        headerName: t("fields.class"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return ` ${row.program?.name} | ${row.class?.name}`
        }
      },
      {
        field: "section.name",
        headerName: t("fields.section"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.section?.name
        }
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
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => show(row.id)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, show]
  );

  const { dataGridProps, setFilters } = useDataGrid<IBillScholarPostbase, HttpError>({
    meta: {
      customQuery: {
        program: true,
        class: true,
        section: true
      }
    },
    resource: BILLING_SCHOLAR_PERCENT_STUDENT_URL,
  });


  useEffect(() => {
    setFilters([
      {
        field: "regid",
        value: search,
        operator: "eq",
      },
      {
        field: "full_name",
        value: search,
        operator: "eq",
      },
      {
        field: "class.name",
        value: search,
        operator: "eq",
      },
      {
        field: "section.name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
  </>;
};
