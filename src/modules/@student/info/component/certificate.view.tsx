import {
  type HttpError,
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_STUDENT } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { STUDENT_CERTIFICATE_URL } from "@student/constant";
import { IStudentCertificate, IStudentCertificateType } from "@student/interface";
import { DateLabel } from "@components/label/date.label";
import { Visibility } from "@mui/icons-material";
import { Box, Divider, Paper } from "@mui/material";
import { CSSearch } from "@components/input";
import { StatusEnum } from "@common/all.enum";
import { BasicModal } from "@components/modal/basic.modal";
import { CertificateQuickView } from "@student/certificate/quickshow";
import { ITemplateData } from "src/editor/interface";

type StudentCertificateListProps = {
  student_id?: string
}
export const StudentCertificateList = ({ student_id }: StudentCertificateListProps) => {
  const t = useTranslate(LANG_STUDENT, "certificate");
  const [search, setSearch] = useState<string>("")
  const [openView, setOpenView] = useState<IStudentCertificate | null>(null)
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
        field: "createdBy.name",
        headerName: t("fields.issuedBy"),
        sortable: true,
        renderCell: function render({ row }) {
          return row?.createdBy?.name
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
              onClick={() => setOpenView(row)}
            >
              <Visibility />
            </IconButton>
          );
        },
      },
    ],
    [t, setOpenView],
  );

  const { dataGridProps, setFilters } = useDataGrid<IStudentCertificateType, HttpError>({
    resource: STUDENT_CERTIFICATE_URL,
    meta: {
      customQuery: {
        createdBy: true,
        type: true,
        student_id: student_id,
        status: StatusEnum.Active
      }
    },
    queryOptions: {
      enabled: Boolean(student_id)
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
  const template = JSON.parse(openView?.template ?? "{}") as unknown as ITemplateData
  return <>
    <TableGrid
      {...dataGridProps}
      columns={columns}
      slots={{ toolbar: () => QuickSearchToolbar({ search, setSearch }) }}
    />
    {Boolean(openView) && (
      <BasicModal
        open={true}
        onClose={() => setOpenView(null)}
        title={`${openView?.certificate_no} | ${openView?.type?.name}`}
      >
        <Paper sx={{ width: template.paperWidth, mx: 16, my: 2, backgroundColor: "#ffffff" }} elevation={5}>
          <CertificateQuickView close={() => setOpenView(null)} certificate={openView!} template={template} />
        </Paper>
      </BasicModal>
    )}

  </>
};

function QuickSearchToolbar({ search, setSearch }: any) {
  return (
    <>
      <Box py={2} justifyItems={"end"}>
        <CSSearch onChange={(e: any) => setSearch(e.target.value)} value={search} />
      </Box>
      <Divider />
    </>
  );
}
