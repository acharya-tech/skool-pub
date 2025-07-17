import {
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { LANG_STUDENT } from '@common/constant';
import { useTranslate } from '@hooks/useTranslate';
import NoDataLabel from '@components/other/no.data';
import { TimeLabel } from '@components/label/date.label';
import { IVehicleStudent } from '@vehicle/interface';
import { VEHICLE_STUDENT_URL } from '@vehicle/constant';
import { useRefineShow } from '@hooks/useShow';
type StudentViewProps = {
    id?: string
}
function VehicleView({ id }: StudentViewProps) {
    const t = useTranslate(LANG_STUDENT, "vehicle");
    const { query: { data, isError } } = useRefineShow<IVehicleStudent>({
        meta: { customQuery: { routeLocation: true } },
        resource: VEHICLE_STUDENT_URL,
        id
    });
    const record = data?.data;

    if (isError || !record) {
        return <NoDataLabel />
    }

    return <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }} elevation={2}>
        {/* <Avatar src={record?.image?.url} variant="square" sx={{ width: 50, height: 50 }} /> */}
        <Box>
            <Typography variant='subtitle2'>{t('fields.location')}</Typography>
            <Typography variant='body2' color="textSecondary">{record?.routeLocation?.location?.name}</Typography>
        </Box>
        <Box>
            <Typography variant='subtitle2'>{t('fields.price')}</Typography>
            <Typography variant='body2' color="textSecondary">{record?.price}</Typography>
        </Box>
        <Box>
            <Typography variant='subtitle2'>{t('fields.departTime')}</Typography>
            <TimeLabel date={record?.routeLocation?.depart_time} />
        </Box>
        <Box>
            <Typography variant='subtitle2'>{t('fields.arrivalTime')}</Typography>
            <TimeLabel date={record?.routeLocation?.arrival_time} />
        </Box>
    </Paper>
}


export default VehicleView;
