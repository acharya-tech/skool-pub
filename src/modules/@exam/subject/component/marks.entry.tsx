
import { useEffect, useRef, useState } from 'react';
import { MarksActions } from './mark.action';
import { useDataProvider } from '@refinedev/core';
import { IExamSubjectMarks, IExmSubject, MarkListItem } from '@exam/interface';
import { EXAM_SUBJECT_MARKS_ENTRY_URL } from '@exam/constant/service.urls';
import { MarksTable } from './mark.table';
import { Card, CardContent } from '@mui/material';
import { useMarkStore } from '../utils/mark.store';

type MarksEntryProps = {
    esubject: IExmSubject
}
export const MarksEntry = ({ esubject }: MarksEntryProps) => {
    const [markRef, setMarks] = useState<MarkListItem[]>([])
    const { setInputColumn, setGradingRule } = useMarkStore()
    const containerRef = useRef<HTMLDivElement>(null);
    const dataProvider = useDataProvider();
    const fetchMarkStudent = () => {
        if (!!esubject) {
            dataProvider().getOne<IExamSubjectMarks>({
                resource: EXAM_SUBJECT_MARKS_ENTRY_URL,
                id: esubject.id!
            }).then((res) => {
                if (res?.data) {
                    setMarks([...res.data.marks])
                    setInputColumn(res.data.fields);
                    setGradingRule(esubject.grading_rule!);
                }
            })
        }
    }
    useEffect(() => {
        fetchMarkStudent()
    }, []);

    const isFullscreen = useMarkStore(state => state.fullScreen)
    return (
        <Card ref={containerRef} sx={{ ...(isFullscreen && { height: "100vh", overflow: "auto" }) }}>
            <CardContent >
                <MarksActions
                    containerRef={containerRef}
                    refetch={fetchMarkStudent}
                    markList={markRef}
                    esubject={esubject} />

                <MarksTable
                    esubject={esubject}
                    marks={markRef}
                />
            </CardContent>
        </Card>
    );
};
