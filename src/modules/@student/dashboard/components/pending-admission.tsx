import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
import { LANG_STUDENT } from '@common/constant';
import { IStudentCertificate } from '@student/interface';
import { STUDENT_ADMISSION_LIST, STUDENT_CERTIFICATE_LIST, STUDENT_CERTIFICATE_URL } from '@student/constant';
import dayjs from "dayjs"
import LinkButton from '@components/buttons/link.button';
import { BillEntranceStateEnum, BILLING_ENTRANCE_URL } from '@billing/constant';
import { IBillEntrance } from '@billing/interface';
// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function PendingAdmission({
  sx,
  title,
  subheader,
  ...other
}: Props) {
  const t = useTranslate(LANG_STUDENT, "dashboard")
  const { data: tableData } = useList<IBillEntrance, HttpError>({
    resource: BILLING_ENTRANCE_URL,
    pagination: {
      pageSize: 5
    },
    meta: {
      customQuery: {
        aclass: true,
        batch: true,
        state: [BillEntranceStateEnum.Admitted, BillEntranceStateEnum.Accepted],
      }
    }
  });
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title ?? t("labels.pendingAdmission")} subheader={subheader} sx={{ mb: 3 }} />
      <Table sx={{ minWidth: 720 }}>
        <TableHeadCustom headCells={[{ id: 'student', label: 'Student' }, { id: 'class', label: 'Class' }, { id: 'contact', label: 'Contact' }, { id: 'source', label: 'Source' }]} />
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
          to={STUDENT_ADMISSION_LIST}
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
  row: IBillEntrance;
};

function RowItem({ row }: RowItemProps) {

  const renderAvatar = () => (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        // src={''}
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
            <ListItemText primary={row.name} secondary={row.form_no} />
          </Box>
        </TableCell>
        <TableCell>
          <ListItemText
            primary={row.aclass?.name}
            secondary={row.batch?.name}
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
            primary={row.phone}
            secondary={row.address}
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
            primary={row?.application_mode}
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
