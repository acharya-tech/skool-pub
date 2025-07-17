import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    Grid2 as Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    IconButton,
    Avatar,
    Paper,
    SelectChangeEvent,
    Stack,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    useDraggable,
    useDroppable,
} from '@dnd-kit/core';
import { useList } from '@refinedev/core';
import { EMPLOYEE_STAFF_URL, EmployeeTypeEnum } from '@employee/constant';
import { IStaff } from '@employee/interface';
import { StatusEnum } from '@common/all.enum';
import { IClassSubject, IPeriod, IRoom, ISection, ISubject, ITimelineClassSection, ITimelineClassToSubject, ITimetableCreate } from '@academic/interface';
import { ACADEMIC_CLASS_SUBJECT_URL, ACADEMIC_PERIOD_URL, ACADEMIC_ROOM_URL } from '@academic/constant/server.url';
import { CustomPopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { usePopoverHover } from 'minimal-shared/hooks';
import { useTranslate } from '@hooks/useTranslate';
import { LANG_ACADEMIC } from '@common/constant';
import { BasicModal } from '@components/modal/basic.modal';
import { TeacherSchedule } from './teacher.schedule';
import { UCSSearch } from '@components/input/uc.input';

interface ITeacher {
    id: string;
    name: string;
    url: string;
    emp_type: string;
    emp_code: string
}

interface IDisabledPeriod {
    [key: string]: {
        classId: string;
        periodId: string;
    }
}


type TeacherPillProps = {
    name: string;
    onRemove: () => void;
}

interface DraggableTeacherProps {
    teacher: ITeacher;
    active?: boolean;
    onClick: (teacher: ITeacher) => void;
}

interface DroppableSlotProps {
    id: string;
    teacher: ITeacher | null;
    onRemove: () => void;
}

const TeacherPill = React.memo(({ name, onRemove }: TeacherPillProps) => (
    <Paper elevation={2} sx={{ p: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center', backgroundColor: '#e3f2fd', width: '100%' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography variant="body2" noWrap>{name}</Typography>
        <IconButton size="small" onClick={onRemove}><CloseIcon fontSize="small" /></IconButton>
    </Paper>
));

const DraggableTeacher = ({ teacher, active, onClick }: DraggableTeacherProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: teacher.id,
        data: { teacher },
    });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 99999, cursor: 'grabbing' } : undefined;
    return (
        <ListItem onDoubleClick={() => onClick(teacher)} ref={setNodeRef} style={{ ...style, backgroundColor: Boolean(active) ? '#eee' : '#fff' }} {...listeners} {...attributes} sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white', cursor: 'grab' }}>
            <ListItemAvatar sx={{ minWidth: 'auto', mr: 1.5 }}><Avatar src={teacher.url} sx={{ width: 24, height: 24, mr: 1 }} /></ListItemAvatar>
            <ListItemText primary={teacher.name} />
            <ListItemIcon sx={{ minWidth: 'auto' }}><Iconify icon="eva:info-outline" /></ListItemIcon>
        </ListItem>
    );
}

const DroppableSlot = React.memo(({ id, teacher, onRemove }: DroppableSlotProps) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <Box ref={setNodeRef} sx={{ height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1, transition: 'background-color 0.2s ease-in-out', backgroundColor: isOver ? 'action.hover' : 'transparent' }}>
            {teacher ? <TeacherPill name={teacher.name} onRemove={onRemove} /> : <Paper variant="outlined" sx={{ width: '100%', height: '100%', p: 1, textAlign: 'center', color: 'text.secondary', backgroundColor: "#eee", borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="caption">Drop Teacher</Typography></Paper>}
        </Box>
    );
});
const isPeriodAssigned = (schedule: ITimetableCreate, periodId: string, teacherId?: string): boolean => {
    if (!teacherId) {
        return false
    }
    const assignedList = Object.values(schedule)
    const flag = assignedList.find((item) => (item.periodId == periodId && item.teacherId == teacherId))
    return flag ? true : false
};

type ClassScheduleProps = {
    containerRef: any
    selectedClasses: string[],
    schedule: ITimetableCreate,
    setSchedule: React.Dispatch<React.SetStateAction<ITimetableCreate>>
}
const ClassSchedule = ({ containerRef, selectedClasses = [], schedule, setSchedule }: ClassScheduleProps) => {
    const t = useTranslate(LANG_ACADEMIC, "timeline")
    const [teachers, setTeachers] = useState<Record<string, ITeacher>>({});
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [sections, setSections] = useState<ISection[]>([]);
    const [classSubject, setClassSubject] = useState<ITimelineClassToSubject>({});
    const [classSection, setClassSection] = useState<ITimelineClassSection>({});
    const [activeTeacher, setActiveTeacher] = useState<ITeacher | null>(null);
    const [disabledPeriod, setDisabledPeriod] = useState<IDisabledPeriod>({});
    const [teacherInfo, setTeacherInfo] = useState<ITeacher | null>(null);
    const [searchTeacher, setSearchTeacher] = useState<string>("");
    const { data: teacherData } = useList<IStaff>({ resource: EMPLOYEE_STAFF_URL, pagination: { pageSize: 1000 }, meta: { customQuery: { emp_type: EmployeeTypeEnum.Teaching, status: StatusEnum.Active } } });
    const { data: classSubjectData } = useList<IClassSubject>({ resource: ACADEMIC_CLASS_SUBJECT_URL, pagination: { pageSize: 1000 }, sorters: [{ field: 'sno', order: 'asc' }], meta: { customQuery: { subject: true } }, queryOptions: { enabled: selectedClasses.length > 0 } });
    const { data: roomData } = useList<IRoom>({ resource: ACADEMIC_ROOM_URL, pagination: { pageSize: 1000 }, sorters: [{ field: 'class.sort', order: 'asc' }], meta: { customQuery: { section: true, class: true } }, queryOptions: { enabled: selectedClasses.length > 0 } });
    const { data: periodData } = useList<IPeriod>({ pagination: { pageSize: 1000 }, resource: ACADEMIC_PERIOD_URL, sorters: [{ field: 'sort', order: 'asc' }] });

    useEffect(() => { if (teacherData?.data) { const map: any = {}; teacherData.data.forEach(t => map[t.id] = { id: t.id, name: t.name, url: t.image?.url ?? '', emp_type: t.emp_type, emp_code: t.emp_code }); setTeachers(map); } }, [teacherData]);
    useEffect(() => { if (roomData?.data) { const map: ITimelineClassSection = {}; const sectionMap: Record<string, ISection> = {}; roomData.data.forEach(room => { if (map[room.class_id]) map[room.class_id].sections.push(room.section); else map[room.class_id] = { id: room.class_id, sort: room.class?.sort ?? 0, name: room.class?.name ?? '', sections: [room.section] }; sectionMap[room.section_id] = room.section; }); setClassSection(map); setSections(Object.values(sectionMap).sort((a, b) => a.name.localeCompare(b.name))); } }, [roomData]);
    useEffect(() => { if (classSubjectData?.data) { const map: ITimelineClassToSubject = {}; classSubjectData.data.forEach(cs => { if (!map[cs.class_id]) map[cs.class_id] = []; map[cs.class_id].push(cs.subject); }); setClassSubject(map); } }, [classSubjectData]);
    useEffect(() => { if (periodData?.data) setPeriods(periodData.data); }, [periodData]);
    const handleSubjectSelect = useCallback((slotId: string, subjectId: string) => {
        const [classId, periodId, sectionId] = slotId.split('-') ?? [];
        setSchedule(prev => ({
            ...prev,
            [slotId]: {
                ...prev[slotId],
                classId,
                periodId,
                sectionId,
                subjectId
            }
        }));
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { over, active } = event;
        const teacherId = active.id.toString();
        const slotId = over?.id.toString();

        if (!slotId) return;
        const [classId, periodId, sectionId] = slotId.split('-') ?? [];
        if (isPeriodAssigned(schedule, periodId, teacherId)) {
            setActiveTeacher(null);
            return;
        }

        setSchedule(prev => ({
            ...prev,
            [slotId]: {
                ...prev[slotId],
                teacherId,
                classId,
                periodId,
                sectionId
            },
        }));
        setActiveTeacher(null);
    }, [schedule]);

    const removeTeacherFromSlot = useCallback((slotId: string) => {
        setSchedule(prev => ({
            ...prev,
            [slotId]: {
                ...prev[slotId],
                teacherId: undefined
            },
        }));
    }, []);

    const toggleDisablePeriod = useCallback((classId: string, periodId: string) => {
        const id = `${classId}-${periodId}`
        if (disabledPeriod[id]) {
            const updated = {
                ...disabledPeriod
            }
            delete updated[id]
            setDisabledPeriod(updated)
            return
        }
        setDisabledPeriod(prev => ({
            ...prev,
            [id]: {
                classId,
                periodId
            }
        }))
    }, [disabledPeriod]);

    const resetClass = useCallback((classId: string) => {
        setSchedule(prev => {
            let newValue: ITimetableCreate = {}
            Object.values(prev).filter(sch => sch.classId != classId).forEach(sch => {
                newValue[`${sch.classId}-${sch.periodId}-${sch.sectionId}`] = sch
            })
            return newValue
        })
    }, [])
    const filteredTeachers = Object.values(teachers).filter(t => t.name.toLowerCase().includes(searchTeacher.toLowerCase()))
    const selectedClassIds = selectedClasses.map(classId => classId.toString())
    const classes = Object.keys(classSection).filter(classId => selectedClassIds.includes(classId)).sort((a, b) => classSection[a].sort - classSection[b].sort);
    const renderedClasses = useMemo(() => classes.map(classId => {
        const classData = classSection[classId];
        const subjects = classSubject[classId] ?? [];
        const disabledPeriodsList = Object.values(disabledPeriod).filter(item => item.classId === classId).map(item => periods.find(period => period.id === item.periodId))
        return (
            <Box width={'380px'} key={classId}>
                <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 1, backgroundColor: '#e3fded' }}>
                    <ClassHead
                        resetClass={resetClass}
                        classData={classData}
                        disabledPeriodsList={disabledPeriodsList}
                        toggleDisablePeriod={toggleDisablePeriod}
                    />
                    {periods.map(period => {
                        const isPeriodDisabled = isPeriodAssigned(schedule, period.id, activeTeacher?.id)
                        if (disabledPeriod[`${classId}-${period.id}`]) return null;
                        return (
                            <Paper elevation={1} >
                                <Box key={period.id} sx={{ borderRadius: 1, p: 1, mb: 1, backgroundColor: isPeriodDisabled ? '#ffa1a147' : 'transparent' }}>
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>{period.name}</Typography>
                                        <Box>
                                            <IconButton disabled={isPeriodDisabled} size="small" onClick={() => toggleDisablePeriod(classId, period.id)}><CloseIcon fontSize="small" /></IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ p: 1, borderRadius: 1 }}>
                                        {sections.map(section => {
                                            const slotId = `${classData.id}-${period.id}-${section.id}`;
                                            const hasSection = classData.sections.find(s => s.id === section.id);
                                            if (!hasSection) return <Box py={2.6} key={section.id} />;
                                            const assigned = schedule[slotId];
                                            return (
                                                <Grid container spacing={1} alignItems="center" key={section.id} sx={{ mb: 0.5 }}>
                                                    <Grid size={1}><Typography>{section.name}</Typography></Grid>
                                                    <Grid size={4}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel>{t("fields.subject")}</InputLabel>
                                                            <Select
                                                                MenuProps={{
                                                                    container: containerRef.current,
                                                                }}
                                                                size='small' label="Subject" value={assigned?.subjectId ?? ''} onChange={(e: SelectChangeEvent) => handleSubjectSelect(slotId, e.target.value)}>
                                                                {subjects.map(subject => <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>)}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid size={7}>
                                                        <DroppableSlot id={slotId} teacher={assigned?.teacherId ? teachers[assigned.teacherId] : null} onRemove={() => removeTeacherFromSlot(slotId)} />
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            </Paper>
                        );
                    })}
                </Paper>
            </Box>
        );
    }), [classes, classSection, classSubject, periods, sections, schedule, teachers, handleSubjectSelect, removeTeacherFromSlot, activeTeacher]);
    return (
        <DndContext onDragEnd={handleDragEnd}
            onDragStart={e => {
                setActiveTeacher(e.active.data.current?.teacher);
            }}
        >
            <Box sx={{ p: 1, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ display: 'flex', gap: 2, minWidth: 'max-content' }}>{renderedClasses}</Box>
                </Box>
            </Box>
            <Box sx={{ position: 'fixed', top: 160, right: 0, width: 260, zIndex: 1000 }}>
                <Card sx={{ height: 'calc(100vh - 160px)' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>{t("fields.teachers")}</Typography>
                        {/* <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>{t("info.dragTeacher")}</Typography> */}
                        <UCSSearch placeholder={t("@buttons.search")} onChange={setSearchTeacher} value={searchTeacher} />
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
                            {filteredTeachers.map(teacher => <DraggableTeacher onClick={setTeacherInfo} key={teacher.id} teacher={teacher} active={activeTeacher?.id === teacher.id} />)}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <DragOverlay>
                {activeTeacher ? <DraggableTeacher onClick={setTeacherInfo} key={activeTeacher.id} teacher={activeTeacher} active /> : null}
            </DragOverlay>
            {Boolean(teacherInfo) && (
                <BasicModal
                    containerRef={containerRef}
                    size={'lg'}
                    open={true}
                    onClose={() => setTeacherInfo(null)}
                    title={teacherInfo?.name}
                >
                    <TeacherSchedule teacherId={teacherInfo?.id!} classSection={classSection} classSubjects={classSubject} periods={periods} schedule={schedule} />
                </BasicModal>
            )}

        </DndContext>
    );
};


type ClassHeadProps = {
    resetClass: (classId: string) => void;
    classData: any;
    disabledPeriodsList: any;
    toggleDisablePeriod: (classId: string, periodId: string) => void;
};

const ClassHead = ({ resetClass, classData, disabledPeriodsList, toggleDisablePeriod }: ClassHeadProps) => {
    const hoverPopover = usePopoverHover<HTMLButtonElement>();
    return (<Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h6" align="center" gutterBottom>{classData.name}</Typography>
        <Box>
            <IconButton
                onClick={() => resetClass(classData.id)}
                sx={{ color: 'error.main' }}
            >
                <Iconify icon="eva:repeat-outline" />
            </IconButton>
            <IconButton
                disabled={disabledPeriodsList.length == 0}
                ref={hoverPopover.elementRef}
                color={hoverPopover.open ? 'inherit' : 'default'}
                onClick={hoverPopover.onOpen}
            >
                <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
        </Box>
        {hoverPopover.open && (
            <CustomPopover
                open={hoverPopover.open && disabledPeriodsList.length > 0}
                onClose={hoverPopover.onClose}
                anchorEl={hoverPopover.anchorEl}
                slotProps={{ arrow: { placement: 'top-center' } }}
            >
                <Stack spacing={1} sx={{ p: 2, maxWidth: 280 }}>
                    {disabledPeriodsList.map((spl: ITeacher) => {
                        return (<TeacherPill name={spl?.name!} onRemove={() => toggleDisablePeriod(classData.id, spl?.id!)} />)
                    })}
                </Stack>
            </CustomPopover>
        )}
    </Box>)
}

export default ClassSchedule;
