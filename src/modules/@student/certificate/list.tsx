import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_STUDENT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_CERTIFICATE_LIST, STUDENT_CERTIFICATE_URL } from "@student/constant";
import { IStudentCertificate, IStudentCertificateType } from "@student/interface";
import { DateLabel } from "@components/label/date.label";
import { TableListProp } from "src/interfaces";
import { ActiveStatusChip } from "@components/label/status.label";
import { Visibility } from "@mui/icons-material";

export const CertificateListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_STUDENT, "certificate");
  const { show } = useNav(STUDENT_CERTIFICATE_LIST);

  const columns = useMemo<GridColDef<IStudentCertificate>[]>(
    () => [
      {
        field: "certificate_no",
        headerName: t("fields.certificate_no"),
        sortable: true,
      },
      {
        field: "issue_date",
        headerName: t("fields.issue_date"),
        sortable: true,
        renderCell: function render({ row }) {
          return <DateLabel date={row.issue_date} />
        }
      },
      {
        field: "type.name",
        headerName: t("fields.type"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.type?.name
        }
      },
      {
        field: "student.full_name",
        headerName: t("fields.student"),
        sortable: true,
        renderCell: function render({ row }) {
          return `${row?.student?.regid} | ${row?.student?.full_name}`
        }
      },
      {
        field: "createdBy.name",
        headerName: t("fields.issuedBy"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.createdBy?.name
        }
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        renderCell: function render({ row }) {
          return <ActiveStatusChip status={row.status} />
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
              onClick={() => show(row.id)}
            >
              <Visibility />
            </IconButton>
          );
        },
      },
    ],
    [t, show],
  );

  const { dataGridProps, setFilters } = useDataGrid<IStudentCertificateType, HttpError>({
    resource: STUDENT_CERTIFICATE_URL,
    meta: {
      customQuery: {
        createdBy: true,
        student: true,
        type: true
      }
    }
  });

  useEffect(() => {
    setFilters([
      {
        field: "type_name",
        value: search,
        operator: "eq"
      },
      {
        field: "student_name",
        value: search,
        operator: "eq"
      },
      {
        field: "student_regid",
        value: search,
        operator: "eq"
      },
      {
        field: "created_by_name",
        value: search,
        operator: "eq"
      },
      {
        field: "certificate_no",
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
