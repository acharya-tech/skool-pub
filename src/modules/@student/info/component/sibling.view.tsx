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
import { ISibling } from '../../interface';
import { STUDENT_INFO_LOCATER, STUDENT_SIBLING_URL } from '../../constant';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import { Link } from 'react-router-dom';
import { getQueryParam } from '@utils/other';
import NoDataLabel from '@components/other/no.data';
import { BasicModal } from '@components/modal/basic.modal';
import { useState } from 'react';
import { EditSiblingForm } from '../edit/sibling';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type StudentViewProps = {
    id?: string
}
function SiblingView({ id }: StudentViewProps) {
    const t = useTranslate(LANG_STUDENT, "sibling");
    const { data, isLoading } = useList<ISibling>({
        meta: { customQuery: { student_id: id, sibling: true } },
        resource: STUDENT_SIBLING_URL,
    });
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
        {record?.map((sibling: ISibling) => {
            return <SiblingCard key={sibling.id} sibling={sibling} navigate={getQueryParam(STUDENT_INFO_LOCATER, { id: sibling.sibling_id })} />
        })}
        <BasicModal
            onClose={() => { setEditing(false) }}
            open={isEditing}
            title={t('titles.list')}
        >
            <EditSiblingForm action='edit' id={id} onClose={() => setEditing(false)} />
        </BasicModal>
    </Card>
}

const SiblingCard = ({ sibling, navigate }: any) => {
    return <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: "#bfbfbf1f", m: 2 }} elevation={2}>
        <Avatar variant="square" src={sibling?.sibling.image?.url} sx={{ width: 50, height: 50 }} />
        <Box>
            <Typography variant="subtitle2">{sibling?.sibling.full_name}</Typography>
            <Stack direction={"row"} gap={1}>
                <Typography variant='body2' color="textSecondary">{sibling?.relation}</Typography>
                {"|"}
                <Link to={`/${navigate}`}><Typography variant="body2" color={'Highlight'}>{sibling?.sibling.regid}</Typography></Link>
            </Stack>
        </Box>
    </Paper>
}

export default SiblingView;
