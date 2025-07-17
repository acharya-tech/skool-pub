import {
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { useShow } from "@refinedev/core";
import { ClassSubjectView } from "./component/subject.view";
import { StudentViewList } from "./component/student.list";
import { IClassSubject } from "@academic/interface";
import { useParams } from "react-router-dom";
import LoadingWrapper from "@components/other/loading";
import { ACADEMIC_CLASS_SUBJECT_LIST } from "@academic/constant/urls";
import { useRefineShow } from "@hooks/useShow";

export const SubjectDetail = () => {
  const t = useTranslate(LANG_STUDENT, "subject");
  const { query: { data, isLoading } } = useRefineShow<IClassSubject>({
    resource: ACADEMIC_CLASS_SUBJECT_LIST,
    meta: {
      customQuery: {
        class: true,
        subject: true,
      }
    }
  })

  return (
    <>
      <Card>
        <CardHeader
          title={t("titles.subject")}
        />
        <CardContent>
          <ClassSubjectView classSubject={data?.data} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Divider sx={{ my: 2 }} />
      <LoadingWrapper value={data?.data}>
        <StudentViewList subject={data?.data!} />
      </LoadingWrapper>
    </>
  )
};
