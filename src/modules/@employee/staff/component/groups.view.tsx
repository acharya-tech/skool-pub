import {
    Typography,
    Card,
    Divider,
    Stack,
    CardHeader,
    IconButton,
    Chip
} from '@mui/material';
import { LANG_EMPLOYEE } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { Link } from 'react-router-dom';
import { getQueryParam } from '@utils/other';
import NoDataLabel from '@components/other/no.data';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { EMPLOYEE_GROUP_SHOW, EMPLOYEE_STAFF_URL } from '../../constant';
import { IEmpGroup, IStaff } from '../../interface';
import { EditGroupForm } from '../edit/group';
import { useRefineShow } from '@hooks/useShow';

type GroupsViewProps = {
    id?: string
}
function GroupView({ id }: GroupsViewProps) {
    const t = useTranslate(LANG_EMPLOYEE, "groups");
    const [isEditing, setEditing] = useState(false)
    const { query: { data, isLoading }, } = useRefineShow<IStaff>({
        meta: { customQuery: { groups: true } },
        resource: EMPLOYEE_STAFF_URL,
        id
    });
    const record = data?.data;

    return <Card sx={{ p: 2 }}>
        <CardHeader
            title={<Typography variant="h6" gutterBottom>{t('groups')}</Typography>}
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
        {record?.groups?.length == 0 && <NoDataLabel />}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {record?.groups.map((group: IEmpGroup) => {
                return <Link key={group.id} to={`/${getQueryParam(EMPLOYEE_GROUP_SHOW, { id: group.id })}`}><Chip label={group?.name} /></Link>
            })}
        </Stack>
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.staffDoc')}
        >
            <EditGroupForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

export default GroupView;
