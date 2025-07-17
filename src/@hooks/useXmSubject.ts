import { HttpError, useList } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { IProgram, ISubject } from "@academic/interface";
import { ACADEMIC_PROGRAM_LIST } from "@academic/constant/urls";
import { IExmSubject } from "@exam/interface";
import { EXAM_SUBJECT_URL } from "@exam/constant/service.urls";

type XmSubjectRes = {
  current: IExmSubject | undefined;
  subjects: IExmSubject[] | undefined;
};

export function useXmSubject(): XmSubjectRes | undefined {
  const { subjectid, id } = useParams();
  const { data, isLoading, isError } = useList<IExmSubject, HttpError>({
    resource: EXAM_SUBJECT_URL,
    meta: {
      customQuery: {
        routine_id: id,
        routine: true,
      },
    },
    pagination: {
      pageSize: 100,
    },
  });
  const subject = data?.data.find((e) => e.id == subjectid);
  return {
    current: subject,
    subjects: data?.data,
  };
}
