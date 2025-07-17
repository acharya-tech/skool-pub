import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";
import { IExmSubject } from "../interface";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BasicModal } from "@components/modal/basic.modal";
import { useState } from "react";
import { SubjectRoutineCard } from "./component/subject.routine.card";
import { useParams } from "react-router-dom";
import { EXAM_SUBJECT_URL } from "../constant/service.urls";
import LoadingWrapper from "@components/other/loading";
import { SubjectEditForm } from "./edit";
import { ExmMarkPostStatusEnum } from "../constant/enum";
import { useRefineShow } from "@hooks/useShow";
import { MarksEntry } from "./component/marks.entry";
import { CanAccess } from "@refinedev/core";
import { EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";
import { EXAM_ROUTINE_SUBJECT_AC } from "@exam/constant/access.url";
export const SubjectDetail = () => {
    const t = useTranslate(LANG_EXAM, "esubjects");
    const { subjectid } = useParams()
    const [isEditing, setEditing] = useState(false)
    const { query: { data, isLoading } } = useRefineShow<IExmSubject>({
        resource: EXAM_SUBJECT_URL,
        id: subjectid,
        meta: {
            customQuery: {
                class: true,
                batch: true,
                routine_type: true,
                marks: true
            }
        }
    })

    return (
        <>
            <Card>
                <CardHeader
                    title={t("titles.show")}
                    action={
                        <CanAccess resource={EXAM_ROUTINE_SUBJECT_AC} action="update">
                            {[ExmMarkPostStatusEnum.Pending, ExmMarkPostStatusEnum.Inprogress].includes(data?.data?.post_status as ExmMarkPostStatusEnum) &&
                                <IconButton
                                    size='small'
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                    onClick={() => setEditing(true)}
                                >
                                    <EditOutlinedIcon fontSize='small' />
                                </IconButton>}
                        </CanAccess>
                    }
                />
                <CardContent>
                    <SubjectRoutineCard subject={data?.data} isLoading={isLoading} />
                </CardContent>
            </Card>
            <Divider sx={{ my: 2 }} />
            <LoadingWrapper value={data?.data}>
                <MarksEntry esubject={data?.data!} />
            </LoadingWrapper>
            <BasicModal
                onClose={() => setEditing(false)}
                open={isEditing}
            >
                <SubjectEditForm action="edit" id={data?.data?.id} onClose={() => setEditing(false)} />
            </BasicModal >
        </>
    )
};
