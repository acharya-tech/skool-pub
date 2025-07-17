import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_STUDENT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_CERTIFICATE_TYPE_LIST, STUDENT_CERTIFICATE_TYPE_URL } from "@student/constant";
import { IStudentCertificateType } from "@student/interface";
import { TableListProp } from "src/interfaces";

export const CertificateTypeListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_STUDENT, "certificateType");
  const { edit } = useNav(STUDENT_CERTIFICATE_TYPE_LIST);

  const columns = useMemo<GridColDef<IStudentCertificateType>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "prefix",
        headerName: t("fields.prefix"),
        sortable: true,
      },
      {
        field: "template.name",
        headerName: t("fields.template"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.template?.name
        }
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

  const { dataGridProps, setFilters } = useDataGrid<IStudentCertificateType, HttpError>({
    resource: STUDENT_CERTIFICATE_TYPE_URL,
    meta: {
      customQuery: {
        template: true
      }
    }
  });
  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq"
      },
    ])
  }, [search])
  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />
};
