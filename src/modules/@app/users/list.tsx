import { useEffect, useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { EditButton, ShowButton, useDataGrid } from '@refinedev/mui';
import { HttpError } from '@refinedev/core';
import { APP_USER_URL } from '../constant';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_APP } from '@common/constant';
import { Avatar, Stack } from '@mui/material';
import { TableGrid } from '@components/table/table.body';
import { IUser, TableListProp } from 'src/interfaces';
import { ActiveStatusChip } from '@components/label/status.label';
import { SYSTEM_ADMIN_USER_ID } from '@common/options';


export const UserListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_APP, "users");

  const columns = useMemo<GridColDef<IUser>[]>(
    () => [
      {
        field: "image",
        headerName: ' ',
        sortable: false,
        disableColumnMenu: true,
        width: 45,
        renderCell: function render({ row }) {
          return <Avatar sx={{ width: 30, height: 30 }} src={row.image?.url} alt={row.image?.name} />
        }
      },
      {
        field: "name",
        headerName: t("fields.name"),
        sortable: true,
      },
      {
        field: "phone",
        headerName: t("fields.phone"),
        sortable: true,
      },
      {
        field: "account_type",
        headerName: t("fields.account_type"),
        sortable: true,
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
            <Stack direction={"row"}>
              <ShowButton hideText size="small" recordItemId={row.id} />
              {SYSTEM_ADMIN_USER_ID != row.id && <EditButton hideText size="small" recordItemId={row.id} />}
            </Stack>
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    setFilters([
      {
        field: "name",
        value: search,
        operator: "eq"
      }
    ])
  }, [search])

  const { dataGridProps, setFilters } = useDataGrid<IUser, HttpError>({
    meta: { customQuery: { image: true } },
    resource: APP_USER_URL
  });

  return (
    <TableGrid
      {...dataGridProps}
      columns={columns}
    />
  );
}
