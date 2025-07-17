import { type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { LANG_DATAVALUE, LANG_EXAM } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { DataTypeEnum, ModuleNameEnum } from "./constant/enum";
import { IDataValue } from "./interface";
import { Stack, Typography } from "@mui/material";
import { FaRegClone } from "react-icons/fa";
import { BasicModal } from "@components/modal/basic.modal";
import { DataValueCloneForm } from "./create";
import { DATAVALUE_URL } from "./constant/server.url";
import { YesNoEnum } from "@common/all.enum";

type DataValueListTableProps = {
  module: ModuleNameEnum
  nav: string,
  customQuery?: Record<string, string | number | boolean>
}
export const DataValueListTable = ({ module, nav, customQuery }: DataValueListTableProps) => {
  const t = useTranslate(LANG_DATAVALUE, "datavalue");
  const { edit } = useNav(nav);
  const viewableList = [DataTypeEnum.Date, DataTypeEnum.Time, DataTypeEnum.Boolean, DataTypeEnum.Select, DataTypeEnum.Number, DataTypeEnum.String]
  const [clone, setClone] = useState<IDataValue | undefined>()
  const columns = useMemo<GridColDef<IDataValue>[]>(
    () => [
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "data_value",
        headerName: t("fields.data_value"),
        sortable: false,
        renderCell: function render({ row }) {
          if (viewableList.includes(row.data_type)) return <Typography>{row.data_value as string}</Typography>
          return <Typography>{t("info.editToView")}</Typography>
        }
      },
      {
        field: "data_type",
        headerName: t("fields.data_type"),
        sortable: true,
      },
      {
        field: "actions",
        headerName: t("@table.actions"),
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          const template = row.data_type === DataTypeEnum.Template ? "template" : undefined
          return <Stack direction={"row"}>
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => edit(row.id, { query: { template } })}
            >
              <EditOutlinedIcon />
            </IconButton>
            {row.can_clone === YesNoEnum.Yes && <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => { setClone(row) }}
            >
              <FaRegClone />
            </IconButton>}
          </Stack>
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps } = useDataGrid<IDataValue, HttpError>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        module,
        ...(customQuery ?? {})
      }
    }
  });
  return <>
    <TableGrid {...dataGridProps} columns={columns} />
    <BasicModal open={Boolean(clone)} onClose={() => { setClone(undefined) }}>
      <DataValueCloneForm clone={clone} onClose={() => { setClone(undefined) }} />
    </BasicModal>
  </>;
};
