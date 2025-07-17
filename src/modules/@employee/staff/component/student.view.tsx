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
import { EMPLOYEE_STUDENT_URL } from '../../constant';
import { IEmpStudent } from '../../interface';
import { STUDENT_INFO_LOCATER } from '@student/constant';
import { EditStudentForm } from '../edit/students';

type StudentViewProps = {
    id?: string
}
function StudentView({ id }: StudentViewProps) {
    const t = useTranslate(LANG_EMPLOYEE, "student");

    const { data } = useList<IEmpStudent>({
        meta: { customQuery: { student: true, staff_id: id } },
        resource: EMPLOYEE_STUDENT_URL
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
        {record?.map((student: IEmpStudent) => {
            return <StudentCard key={student.id} student={student} navigate={getQueryParam(STUDENT_INFO_LOCATER, { id: student.student_id })} />
        })}
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.list')}
        >
            <EditStudentForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

const StudentCard = ({ student, navigate }: any) => {
    return <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: "#bfbfbf1f", m: 2 }} elevation={2}>
        <Avatar variant="square" src={student?.student.image?.url} sx={{ width: 50, height: 50 }} />
        <Box>
            <Typography variant="subtitle2">{student?.student.full_name}</Typography>
            <Stack direction={"row"} gap={1}>
                <Typography variant='body2' color="textSecondary">{student?.relation}</Typography>
                {"|"}
                <Link to={`/${navigate}`}><Typography variant="body2" color={'Highlight'}>{student?.student.regid}</Typography></Link>
            </Stack>
        </Box>
    </Paper>
}
export default StudentView;
