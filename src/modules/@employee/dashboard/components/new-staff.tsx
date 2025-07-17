import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import { Iconify } from 'src/components/iconify';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { HttpError, useList } from '@refinedev/core';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_EMPLOYEE } from '@common/constant';
import dayjs from "dayjs"
import LinkButton from '@components/buttons/link.button';
import { IStaff } from '@employee/interface';
import { EMPLOYEE_STAFF_URL } from '@employee/constant';
// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function NewStaff({
  sx,
  title,
  subheader,
  ...other
}: Props) {
  const t = useTranslate(LANG_EMPLOYEE, "dashboard")
  const { data: tableData } = useList<IStaff, HttpError>({
    resource: EMPLOYEE_STAFF_URL,
    pagination: {
      pageSize: 5
    },
    meta: {
      customQuery: {
        post: true,
        department: true,
        date_of_join: [
          dayjs().add(-7, "day").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ]
      }
    }
  });
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title ?? t("labels.newStaff")} subheader={subheader} sx={{ mb: 3 }} />
      <Table sx={{ minWidth: 720 }}>
        <TableHeadCustom headCells={[{ id: 'staff', label: 'Employee' }, { id: 'post', label: 'Post' }, { id: 'department', label: 'Department' }]} />
        <TableBody>
          {tableData?.data.map((row) => (
            <RowItem key={row.id} row={row} />
          ))}
          {tableData?.data.length == 0 && (
            <TableNoData notFound />
          )}
        </TableBody>
      </Table>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <LinkButton
          to={EMPLOYEE_STAFF_URL}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          {t("@buttons.viewAll")}
        </LinkButton>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: IStaff;
};

function RowItem({ row }: RowItemProps) {

  const renderAvatar = () => (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        src={row.image?.url || ''}
        sx={{
          width: 48,
          height: 48,
          color: 'text.secondary',
          bgcolor: 'background.neutral',
        }}
      >
        <Iconify icon="ic:baseline-person" width={24} />
      </Avatar>
    </Box>
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            {renderAvatar()}
            <ListItemText primary={row.name} secondary={`${row.emp_code} | ${row.emp_type}`} />
          </Box>
        </TableCell>
        <TableCell>
          <ListItemText
            primary={row.post?.name}
            slotProps={{
              primary: { sx: { typography: 'body2' } },
              secondary: {
                sx: { mt: 0.5, typography: 'caption' },
              },
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={row.department?.name}
            secondary={dayjs(row.date_of_join).format("YYYY-MM-DD h:m A").toString()}
            slotProps={{
              primary: { sx: { typography: 'body2' } },
              secondary: {
                sx: { mt: 0.5, typography: 'caption' },
              },
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
