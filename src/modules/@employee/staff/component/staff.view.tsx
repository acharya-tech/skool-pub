import {
    Typography,
    Card,
    Divider,
    Stack,
    Avatar,
    Paper,
    Box,
    CardHeader,
    IconButton
} from '@mui/material';
import { useList } from '@refinedev/core';
import { LANG_EMPLOYEE } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { Link } from 'react-router-dom';
import { getQueryParam } from '@utils/other';
import NoDataLabel from '@components/other/no.data';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { EMPLOYEE_RELATION_URL, EMPLOYEE_STAFF_SHOW } from '../../constant';
import { IEmpStaff } from '../../interface';
import { EditStudentForm } from '../edit/students';

type StaffViewProps = {
    id?: string
}
function StaffView({ id }: StaffViewProps) {
    const t = useTranslate(LANG_EMPLOYEE, "staff");

    const { data } = useList<IEmpStaff>({
        meta: { customQuery: { relatedStaff: true, staff_id: id } },
        resource: EMPLOYEE_RELATION_URL
    })
    const [isEditing, setEditing] = useState(false)
    const record = data?.data;

    return <Card sx={{ p: 2 }}>
        <CardHeader
            title={<Typography variant="h6" gutterBottom>{t('titles.list')}</Typography>}
            sx={{ p: 0 }}
            action={
                <IconButton
                    size='small'
                    sx={{
                        color: "text.secondary",
                    }}
                    onClick={() => setEditing(true)}
                >
                    <EditOutlinedIcon fontSize='small' />
                </IconButton>
            }
        />
        <Divider sx={{ mb: 2 }} />
        {record?.length == 0 && <NoDataLabel />}
        {record?.map((staff: IEmpStaff) => {
            return <StaffCard key={staff.id} staff={staff} navigate={getQueryParam(EMPLOYEE_STAFF_SHOW, { id: staff.relation_id })} />
        })}
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.studentRelation')}
        >
            <EditStudentForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

const StaffCard = ({ staff, navigate }: any) => {
    return <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: "#bfbfbf1f", m: 2 }} elevation={2}>
        <Avatar variant="square" src={staff?.relatedStaff.image?.url} sx={{ width: 50, height: 50 }} />
        <Box>
            <Typography variant="subtitle2">{staff?.relatedStaff.name}</Typography>
            <Stack direction={"row"} gap={1}>
                <Typography variant='body2' color="textSecondary">{staff?.relation}</Typography>
                {"|"}
                <Link to={`/${navigate}`}><Typography variant="body2" color={'Highlight'}>{staff?.relatedStaff.emp_code}</Typography></Link>
            </Stack>
        </Box>
    </Paper>
}
export default StaffView;
