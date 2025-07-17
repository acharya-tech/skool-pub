import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_STUDENT } from '@common/constant';
import { useList } from '@refinedev/core';
import { IStudentLog, IStudentNote } from '../../interface';
import { STUDENT_LOG_URL, StudentLogStateEnum, StudentStateEnum } from '../../constant';
import NoDataLabel from '@components/other/no.data';
import { DateLabel } from '@components/label/date.label';
import { PiStudent } from "react-icons/pi";
import { Card, Paper } from '@mui/material';

type StudentViewProps = {
    id?: string
}
export default function ClassTimeline({ id }: StudentViewProps) {
    const t = useTranslate(LANG_STUDENT, "log");
    const { data, isLoading } = useList<IStudentLog>({
        meta: { customQuery: { student_id: id, class: true } },
        resource: STUDENT_LOG_URL,
    });
    const record = data?.data;
    if (record?.length == 0) {
        return <NoDataLabel />
    }

    return (
        <Paper sx={{ minHeight: '50vh' }}>
            <Timeline position="alternate">
                {record?.map(timeline => {
                    const [icon, comp] = getComponentByState(t, timeline)
                    return (
                        <TimelineItem key={timeline.id}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                <DateLabel date={timeline.created_at} />
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot>
                                    {icon}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                {comp}
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}

            </Timeline>
        </Paper>
    );
}

function getComponentByState(t: any, timeline: IStudentLog) {
    switch (timeline.state) {
        case StudentLogStateEnum.Current:
            return [
                <PiStudent color='secondary' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.current')}
                    </Typography>
                    <Typography>{t('labels.current') + timeline.class?.name}</Typography>
                </>
            ];
        case StudentLogStateEnum.Alumni:
            return [
                <PiStudent color='primary' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.almuni')}
                    </Typography>
                    <Typography>{t('labels.almuni') + timeline.class?.name}</Typography>
                </>
            ];
        case StudentLogStateEnum.Dropout:
            return [
                <PiStudent color='danger' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.dropout')}
                    </Typography>
                    <Typography>{t('labels.dropout') + timeline.class?.name}</Typography>
                </>
            ];

        case StudentLogStateEnum.Repeated:
            return [
                <PiStudent color='warning' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.repeated')}
                    </Typography>
                    <Typography>{t('labels.repeated') + timeline.class?.name}</Typography>
                </>
            ];
        case StudentLogStateEnum.Escalation:
            return [
                <PiStudent color='success' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.escalation')}
                    </Typography>
                    <Typography>{t('labels.escalation') + timeline.class?.name}</Typography>
                </>
            ];
        case StudentLogStateEnum.Rejoined:
            return [
                <PiStudent color='info' />,
                <>
                    <Typography variant="h6" component="span">
                        {t('titles.rejoined')}
                    </Typography>
                    <Typography>{t('labels.rejoined') + timeline.class?.name}</Typography>
                </>
            ];

    }
}