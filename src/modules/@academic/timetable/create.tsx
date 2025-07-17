import {
    useCreate,
    useDataProvider,
} from "@refinedev/core";
import { ATFormProps } from "src/interfaces";
import { Box, Button, Stack } from "@mui/material";

import { ACADEMIC_SESSION_URL, ACADEMIC_TIMELINE_URL } from "@academic/constant/server.url";
import { HeaderMenu } from "./component/HeaderMenu";
import { IAcademicTimeline, IClass, ISession, ITimetableCreate } from "@academic/interface";
import { useEffect, useRef, useState } from "react";
import ClassSchedule from "./component/editor";
import { EmptyContent } from "src/components/empty-content";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACADEMIC } from "@common/constant";
import { BasicModal } from "@components/modal/basic.modal";
import { UCSAutoComplete } from "@components/input/uc.input";
import { useAutocomplete } from "@refinedev/mui";

export const TeacherTimetable = (props: ATFormProps) => {
    const t = useTranslate(LANG_ACADEMIC, "timeline")
    const [schedule, setSchedule] = useState<ITimetableCreate>({});
    const [session, setSession] = useState<ISession | null>(null)
    const [classes, setClasses] = useState<IClass[]>([])
    const [openClone, setOpenClone] = useState(false)
    const [cloneSession, setCloneSession] = useState<ISession | null>(null)
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const dataProvider = useDataProvider()
    const { mutate } = useCreate({
        resource: ACADEMIC_TIMELINE_URL
    });

    const { autocompleteProps: sessionAutoProps } = useAutocomplete<ISession>({
        resource: ACADEMIC_SESSION_URL,
        onSearch: (value: string) => {
            return [
                {
                    field: "name",
                    operator: "eq",
                    value
                }
            ]
        }
    });


    useEffect(() => {
        if (session) {
            dataProvider().getList<IAcademicTimeline>({
                resource: ACADEMIC_TIMELINE_URL,
                pagination: {
                    pageSize: 10000
                },
                meta: {
                    customQuery: {
                        session_id: session.id
                    }
                }
            }).then(res => {
                const scheduleData: ITimetableCreate = {}
                res.data.forEach((item) => {
                    scheduleData[`${item.class_id}-${item.period_id}-${item.section_id}`] = {
                        classId: item.class_id,
                        periodId: item.period_id,
                        sectionId: item.section_id,
                        teacherId: item.staff_id,
                        subjectId: item.subject_id
                    }
                })
                setSchedule(scheduleData)
            })
        }
    }, [session])

    const handleClone = () => {
        dataProvider().getList<IAcademicTimeline>({
            resource: ACADEMIC_TIMELINE_URL,
            pagination: {
                pageSize: 10000
            },
            meta: {
                customQuery: {
                    session_id: cloneSession?.id
                }
            }
        }).then(res => {
            const scheduleData: ITimetableCreate = {}
            res.data.forEach((item) => {
                scheduleData[`${item.class_id}-${item.period_id}-${item.section_id}`] = {
                    classId: item.class_id,
                    periodId: item.period_id,
                    sectionId: item.section_id,
                    teacherId: item.staff_id,
                    subjectId: item.subject_id
                }
            })
            setSchedule(scheduleData)
            console.log(scheduleData, "scheduleData")
            setOpenClone(false)
        })

    }

    const onSave = () => {
        const data: any = []
        Object.values(schedule).filter(item => Boolean(item.subjectId)).forEach((item) => {
            data.push(item)
        });
        if (data.length == 0) {
            return
        }
        mutate({
            values: {
                data,
                sessionId: session?.id,
            }
        });
    }
    return <Box ref={containerRef} sx={{ overflowX: "auto" }}>
        <HeaderMenu containerRef={containerRef} setOpenClone={setOpenClone} setSession={setSession} canSave={Object.values(schedule).length > 0} session={session} setClasses={setClasses} classes={classes} onSave={onSave} onClose={props.onClose} />
        <Box sx={{ overflowX: "auto" }}>
            {(session && classes.length > 0) ? (
                <ClassSchedule containerRef={containerRef} selectedClasses={classes.map(e => e.id)} schedule={schedule} setSchedule={setSchedule} />
            ) : (<EmptyContent title={t("info.selectClassSession")} filled sx={{ py: 10 }} />)}
        </Box>
        {openClone && (
            <BasicModal
                containerRef={containerRef}
                open={true}
                size="sm"
                onClose={() => setOpenClone(false)}
                title={t("actions.clone")}
                footer={<Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="warning" onClick={() => setOpenClone(false)}>{t("@buttons.cancel")}</Button>
                    <Button disabled={!cloneSession} variant="contained" color="success" onClick={handleClone}>{t("@buttons.clone")}</Button>
                </Stack>}
            >
                <UCSAutoComplete
                    fullWidth
                    containerRef={containerRef}
                    key={"session"}
                    value={cloneSession}
                    width={200}
                    autocompleteProps={sessionAutoProps}
                    label={t("fields.session")}
                    getOptionLabel={(session: ISession) => session.name}
                    onChange={(session: ISession) => {
                        setCloneSession(session)
                    }}
                />
            </BasicModal>
        )}

    </Box>

};
