import { CourseTypeEnum, SubjectTypeEnum, YesNoEnum } from "@common/all.enum";
import { Nullable } from "src/interfaces";
import { IExmFormula } from "@exam/interface";
import { IStaff } from "@employee/interface";
import { GradingFormulaTypeEnum } from "@exam/constant/enum";

export interface ISection {
  id: string;
  name: string;
}

export interface IAcademicHouse {
  id: string;
  name: string;
  color: string;
}

export interface ISession {
  id: string;
  name: string;
  week: string[];
}

export interface IHostel {
  id: string;
  name: string;
}

export interface IPeriod {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  sort: number;
}

export interface IBatch {
  id: string;
  isCurrent: YesNoEnum;
  name: string;
  start_date: string;
  end_date: string;
}

export interface IProgram {
  id: string;
  name: string;
  type: string;
  affiliation: string;
  faculty: string;
}

export interface IRoom {
  id: string;
  name: string;
  class?: IClass;

  class_name: string;
  class_id: string;
  section_id: string;
  section: ISection;
  row: number;
  column: number;
  size: any;
}

export interface IClass {
  id: string;
  program_id: string;
  formulas?: IExmFormula[];
  name: string;
  sessions?: ISession[];
  program: IProgram;
  shift: string;
  medium: string;
  sort: number;
  regulation: GradingFormulaTypeEnum;
  subjectClasses?: IClassSubject[];
  totalSubjects: number;
}

export interface ISubject {
  id: string;
  full_name: string;
  name: string;
  code: string;
  type: SubjectTypeEnum;
  th_credit: number;
  in_credit: number;
  isLocal: YesNoEnum;
  classes?: IClass[];
}

export interface IClassSubject {
  id: string;
  sno: string;
  subject: ISubject;
  class: IClass;
  class_id: string;
  subject_id: string;
  course_type: CourseTypeEnum;
  total_student?: number;
  total_assigned?: number;
}

export interface ICreateClassSubject {
  subjects: Partial<IClassSubject>[];
}

export interface IAcademicTimeline {
  id: string;
  class_id: string;
  section_id: string;
  period_id: string;
  session_id: string;
  staff_id: Nullable<string>;
  subject_id: Nullable<string>;
  aclass: IClass;
  section: ISection;
  period: IPeriod;
  session: ISession;
  staff: IStaff;
  subject: ISubject;
}

export interface ITimetableCreate {
  [key: string]: {
    classId: string;
    periodId: string;
    sectionId: string;
    teacherId?: string;
    subjectId?: string;
  };
}

export interface ITimelineClassSection {
  [key: string]: {
    id: string;
    name: string;
    sort: number;
    sections: ISection[];
  };
}

export interface ITimelineClassToSubject {
  [key: string]: ISubject[];
}

export interface IAcademicDashboardStatus {
  subjects: number;
  teachers: number;
  assignedTeachers: number;
  activeBatch: number;
}
