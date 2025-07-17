import { useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { useNav } from "@hooks/useNavlHook";
import { ActiveStatusChip } from "@components/label/status.label";
import { Stack } from "@mui/material";
import { NOTICE_TEMPLATE_LIST } from "../constant/local.urls";
import { INoticeTemplate } from "../interface";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";
import { StatusEnum } from "@common/all.enum";
import { useConfirm } from "@hooks/confirm.hook";
import { NOTICE_TEMPLATE_URL } from "../constant/server.urls";

export const TemplateListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_NOTICE, "template");
  const { edit } = useNav(NOTICE_TEMPLATE_LIST);
  const { mutate } = useUpdate()
  const [confirmInactive, ConfirmInactiveEle] = useConfirm({
    onConfirm: (templateMeta: INoticeTemplate) => {
      mutate({
        resource: NOTICE_TEMPLATE_URL,
        id: templateMeta.id,
        values: {
          status: templateMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
        }
      })
    },
    confirmTitle: t("info.toggleState"),
  })
  const columns = useMemo<GridColDef<INoticeTemplate>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "type",
        headerName: t("fields.type"),
        sortable: true,
        width: 100,
      },
      {
        field: "status",
        headerName: t("fields.status"),
        sortable: true,
        width: 100,
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
            <Stack direction={"row"}>
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                }}
                onClick={() => edit(row.id)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  color: row.status == StatusEnum.Active ? "red" : "green",
                }}
                onClick={() => confirmInactive(row)}
              >
                {row.status == StatusEnum.Active ? <ImCancelCircle fontSize="small" /> : <FaRegCheckCircle fontSize={"small"} />}
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<INoticeTemplate, HttpError>({
    resource: NOTICE_TEMPLATE_URL,
  });


  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return <>
    <TableGrid {...dataGridProps} columns={columns} />
    {ConfirmInactiveEle}
  </>;
};
