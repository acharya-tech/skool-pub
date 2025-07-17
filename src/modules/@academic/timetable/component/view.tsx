import React, { useMemo, useRef } from 'react';
import {
    Box,
    Typography,
    Button
} from '@mui/material';
import { useList } from '@refinedev/core';
import { ACADEMIC_TIMELINE_URL } from '@academic/constant/server.url';
import { IAcademicTimeline, IClass, IPeriod, ISection, ISubject, ITimetableCreate } from '@academic/interface';
import { IStaff } from '@employee/interface';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_ACADEMIC } from '@common/constant';
import { SectionTimetable } from './section.timetable.view';
import { EmptyContent } from 'src/components/empty-content';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from "@mui/icons-material/Print";
import dayjs from 'dayjs';
import { getScheduleConverted } from '@academic/utils';
type TimeTableViewProps = {
    aclass: IClass
};

export const TimeTableView = ({ aclass }: TimeTableViewProps) => {
    const t = useTranslate(LANG_ACADEMIC, "timeline");
    const { data: timelineRaw } = useList<IAcademicTimeline>({
        resource: ACADEMIC_TIMELINE_URL,
        pagination: { pageSize: 1000 },
        meta: {
            customQuery: {
                class_id: aclass.id,
                session_enabled: true
            }
        }
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: `Timetable_for_class_${aclass.name}`,
        pageStyle: `
    @page {
      size: A4 portrait;
      margin: 10mm;
    }

    @media print {
      html, body {
        zoom: 0.75;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      .no-print {
        display: none !important;
      }
    }
  `
    });
    const { sections, periods, teachers, subjects, schedules } = useMemo(() => {
        return getScheduleConverted(timelineRaw?.data ?? []);
    }, [timelineRaw]);

    return (
        <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '30vh' }}>
            {sections.length === 0 && <EmptyContent />}
            {sections.length > 0 && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            color="inherit"
                            size="small"
                            onClick={reactToPrintFn}
                            aria-label="print"
                        >
                            <PrintIcon />
                        </Button>
                    </Box>
                    <Box ref={contentRef}>
                        <Box textAlign={"center"}>
                            <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
                                {t("titles.printSchednule", { class: aclass.name, date: dayjs().format("YYYY-MM-DD") })}
                            </Typography>
                        </Box>
                        {sections.map(section => (
                            <Box key={section.id} sx={{ mb: 6 }}>
                                <Typography variant="h5" gutterBottom align="left" color="primary" sx={{ mb: 2 }}>
                                    {t("titles.section", { section: section.name })}
                                </Typography>
                                <SectionTimetable
                                    headTitle={t("titles.head")}
                                    section={section}
                                    periods={periods}
                                    subjects={subjects}
                                    teachers={teachers}
                                    schedule={schedules}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

        </Box>
    );
};
