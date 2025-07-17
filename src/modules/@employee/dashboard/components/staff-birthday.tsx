import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';
import { IStudentInfo } from '@student/interface';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_EMPLOYEE, LANG_STUDENT } from '@common/constant';
import { useList } from '@refinedev/core';
import { STUDENT_INFO_URL } from '@student/constant';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import { TableNoData } from 'src/components/table';
import dayjs from "dayjs"
import { IStaff } from '@employee/interface';
import { EMPLOYEE_STAFF_URL } from '@employee/constant';
import { StatusEnum } from '@common/all.enum';
// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: (count: number) => string;
};

export function StaffBirthday({ title, subheader, sx, ...other }: Props) {
  const t = useTranslate(LANG_EMPLOYEE, "dashboard");
  const [viewAll, setViewAll] = useState(false)
  const { data: list } = useList<IStaff>({
    resource: EMPLOYEE_STAFF_URL,
    pagination: {
      pageSize: 1000
    },
    meta: {
      customQuery: {
        post: true,
        department: true,
        image: true,
        birthday: true,
        status: StatusEnum.Active
      }
    }
  })
  const currentBirthdayList = [...list?.data ?? []]
  return (
    <>
      <Card sx={sx} {...other}>
        <CardHeader
          title={title ?? t("labels.todayBirthday")}
          subheader={subheader?.(list?.data?.length ?? 0) ?? t("info.totalBirthday", { count: list?.data?.length ?? 0 })}
          action={
            (list?.data?.length ?? 0) > 5 &&
            <Button
              size="small"
              color="inherit"
              onClick={() => setViewAll(true)}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
            >{t("actions.viewAll")}</Button>
          }
        />
        <Box
          sx={{
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 360,
          }}
        >
          {currentBirthdayList && currentBirthdayList.splice(0, 5).map((item) => (
            <Item key={item.id} item={item} />
          ))}
          {/* {list?.data?.length === 0 && (
            <TableNoData notFound />
          )} */}
        </Box>
      </Card>
      <BasicModal
        title={t("labels.allBirthday")}
        open={viewAll}
        onClose={() => setViewAll(false)}
      >
        {list?.data && list?.data?.map((item) => (
          <Item sx={{ my: 1 }} key={item.id} item={item} />
        ))}
      </BasicModal>
    </>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: IStaff;
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[{ gap: 2, display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Avatar src={item.image?.url} />
      <ListItemText primary={item.name} secondary={`${item.post?.name} | ${item.department?.name}`} />
    </Box>
  );
}
