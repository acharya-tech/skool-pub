import { YesNoEnum } from "@common/all.enum";
import { NoticeUserTypeEnum } from "../constant/enum";
import { StudentStateEnum } from "@student/constant";

export type NoticeVariableTypes = {
  userType: NoticeUserTypeEnum;
  full_name: string;
  phone: string;
  email: string;
};

export type NoticeVariableStudentTypes = {
  userType: NoticeUserTypeEnum.Class | NoticeUserTypeEnum.Student;
  class_name: string;
  section_name: string;
  regid: string;
  fee_due: string;
};

export type NoticeVariableEmployeeTypes = {
  userType: NoticeUserTypeEnum.Staff | NoticeUserTypeEnum.StaffGroup;
  department_name: string;
  post_name: string;
  emp_code: string;
};

export type NoticeVariableParentTypes = {
  userType: NoticeUserTypeEnum.Parent;
};

export type NoticePreconditionTypes = {
  parents: YesNoEnum;
  students: YesNoEnum;
  studentState: StudentStateEnum[];
  markAll: YesNoEnum;
};
export type NoticePreconditionListTypes = {
  [key in NoticeUserTypeEnum]: NoticePreconditionTypes;
};
