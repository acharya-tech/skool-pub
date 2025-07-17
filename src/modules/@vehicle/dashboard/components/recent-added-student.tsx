import type { CardProps } from '@mui/material/Card';
import type { TableHeadCellProps } from 'src/components/table';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { fCurrency } from '@utils/format-number';
import { IVehicleStudent } from '@vehicle/interface';
import { HttpError, useList } from '@refinedev/core';
import { VEHICLE_STUDENT_URL } from '@vehicle/constant';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function RecentAddedStudent({
  sx,
  title,
  subheader,
  ...other
}: Props) {
  const { data: tableData } = useList<IVehicleStudent, HttpError>({
    resource: VEHICLE_STUDENT_URL,
    meta: { customQuery: { image: true, student: true, routeLocation: true, route: true } },
  });
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Table sx={{ minWidth: 720 }}>
        <TableHeadCustom headCells={[{ id: 'student', label: 'Student' }, { id: 'route', label: 'Route' }, { id: 'amount', label: 'Amount' }, { id: 'status', label: 'Status' }]} />
        <TableBody>
          {tableData?.data.map((row) => (
            <RowItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: IVehicleStudent;
};

function RowItem({ row }: RowItemProps) {

  const renderAvatar = () => (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        src={row.student.image?.url || ''}
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
            <ListItemText primary={row.student.full_name} secondary={row.student.regid} />
          </Box>
        </TableCell>
        <TableCell>{row.student.class?.name}</TableCell>
        <TableCell>
          <ListItemText
            primary={row.routeLocation.route?.name}
            secondary={row.routeLocation.location?.name}
            slotProps={{
              primary: { sx: { typography: 'body2' } },
              secondary: {
                sx: { mt: 0.5, typography: 'caption' },
              },
            }}
          />
        </TableCell>
        <TableCell>{fCurrency(row.price)}</TableCell>
      </TableRow>
    </>
  );
}
