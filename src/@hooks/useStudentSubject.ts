import { HttpError, useList } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { IClassSubject, IProgram, ISubject } from "@academic/interface";
import { ACADEMIC_CLASS_SUBJECT_LIST, ACADEMIC_PROGRAM_LIST } from "@academic/constant/urls";
import { IExmSubject } from "@exam/interface";
import { EXAM_SUBJECT_URL } from "@exam/constant/service.urls";

type StudentSubjectRes = {
  current: IClassSubject | undefined;
  subjects: IClassSubject[] | undefined;
};

export function useStudentSubject(): StudentSubjectRes | undefined {
  const { id, classid } = useParams();
  const { data, isLoading, isError } = useList<IClassSubject, HttpError>({
    resource: ACADEMIC_CLASS_SUBJECT_LIST,
    meta: {
      customQuery: {
        class_id: classid,
        program: true,
        subject: true,
      },
    },
    pagination: {
      pageSize: 100,
    },
  });
  const subject = data?.data.find((e) => e.id == id);
  return {
    current: subject,
    subjects: data?.data,
  };
}
