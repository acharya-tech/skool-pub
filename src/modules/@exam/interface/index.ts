import {
  CourseTypeEnum,
  StatusEnum,
  SubjectTypeEnum,
  YesNoEnum,
} from "@common/all.enum";
import {
  ExmFinalStatusEnum,
  ExmFormulaTypeEnum,
  ExmMarkPostStatusEnum,
  ExmResultPassByEnum,
  ExmResultRankByEnum,
  ExmResultRemarkEnum,
  ExmResultSubjectPassByEnum,
  ExmRoutineCasEnum,
  ExmRoutinePostStatusEnum,
  ExmTypeEnum,
  GradingFormulaTypeEnum,
} from "../constant/enum";
import { IBatch, IClass, ISection, ISubject } from "@academic/interface";
import { IStudentInfo } from "@student/interface";
import { IDataValue } from "@datavalue/interface";

export interface IExamFormulaMeta {
  rank?: string;
  remark?: string;
  point?: number;
  from?: number;
  to?: number;
}

export interface IExmFormula {
  id: string;
  name: string;
  base: number;
  classes?: IClass[];
  type: ExmFormulaTypeEnum;
  status: StatusEnum;
  meta: IExamFormulaMeta[];
}

export interface IExmFinal {
  id: string;
  class_id: number;
  class: IClass;
  batch_id: number;
  batch: IBatch;
  version_no: number;
  pv_no: number;
  last_processed: string;
  template_id: number;
  template: IDataValue;
  meta: Partial<ExmFinalRoutine>[];
  state: ExmFinalStatusEnum;
}

export interface ExmFinalRoutine {
  routine_id: number;
  routine_code: string;
  exam_version: number;
  routine?: IExmRoutine;
  value: number;
  exam_type: string;
}

export interface IExmType {
  id: string;
  name: string;
  type: ExmTypeEnum;
}

export interface IExmRule {
  id: string;
  name: string;
  th_fm: number;
  th_pm: number;
  in_fm: number;
  in_pm: number;
  formula_grade_id: number;
  formula_mark_id: number;
  formula_grade?: IExmFormula;
  formula_mark?: IExmFormula;
  regulation: GradingFormulaTypeEnum;
  cas_type: ExmRoutineCasEnum;
  rank_by: ExmResultRankByEnum;
  internal_pass_by: ExmResultPassByEnum;
  subject_pass_by: ExmResultSubjectPassByEnum;
}

export interface IExmSubject {
  id?: string;
  routine_id?: number;
  subject_id?: number;
  subject?: ISubject;
  marks?: IExmMarks[];
  start_date?: string;
  duration?: string;
  routine?: IExmRoutine;
  subject_name?: string;
  subject_code?: string;
  th_credit?: number;
  in_credit?: number;
  th_fm?: number;
  th_pm?: number;
  in_fm?: number;
  in_pm?: number;
  grading_rule?: IGradingRules;
  course_type?: CourseTypeEnum;
  total_student?: number;
  mark_student?: number;
  progress?: number;
  post_status?: ExmMarkPostStatusEnum;
  post_date?: string;
  status?: StatusEnum;
  type?: SubjectTypeEnum;
}

export interface IExmRoutine {
  id: string;
  code: string;
  class?: IClass;
  batch?: IBatch;
  start_date?: string;
  type: IExmType;
  rule: IExmRule;
  rule_id: string;
  type_id: string;
  template_id: string;
  grade_ledger_template_id: string;
  mark_ledger_template_id: string;
  class_id: string;
  batch_id: string;
  esubjects: IExmSubject[];
  result_date: string;
  created_at: string;
  template?: IDataValue;
  gradeLedgerTemplate?: IDataValue;
  markLedgerTemplate?: IDataValue;
  process: number;
  last_processed: string;
  state: ExmRoutinePostStatusEnum;
  status: StatusEnum;
}

export interface ICreateExmRoutine {
  id: string;
  code: string;
  class?: IClass;
  batch?: IBatch;
  start_date?: Date;
  duration?: Date;
  type: ExmTypeEnum;
  type_id: number;
  template_id: number;
  esubjects: IExmSubject[];
  result_date: Date;
}

export interface IExmMarks {
  routine_id: number;
  subject_id: number;
  student_id: number;
  esubject_id: number;
  routine: IExmRoutine;
  subject: ISubject;
  student: IStudentInfo;
  esubject: IExmSubject;

  th_mark?: number; // Nullable
  pr_mark?: number; // Nullable
  obtain_mark?: number; // Nullable
  grade?: string; // Nullable
  remark: ExmResultRemarkEnum;
  is_absent: YesNoEnum;
  is_elective: YesNoEnum;
  type: SubjectTypeEnum;
}

export type ExamMarkCasType = {
  internal_obtained?: number;
  theory_obtained?: number;
  project_obtained?: number;
  engage_obtained?: number;
};

export interface MarkListItem {
  id: number;
  course_type: CourseTypeEnum;
  cas: ExamMarkCasType;
  student_id: number;
  student_name: string;
  student_regid: string;
  section: string;
  esubject_id: number;
  is_absent: YesNoEnum;
  is_elective: YesNoEnum;
  xesubject_id: number;
  obtain_mark?: number | null;
  remark: ExmResultRemarkEnum;
  error?: {
    internal_obtained?: boolean;
    theory_obtained?: boolean;
    project_obtained?: boolean;
    engage_obtained?: boolean;
  };
}

export interface InputMark {
  theory_mark?: number;
  practical_mark?: number;
  is_absent: YesNoEnum;
}

export interface InputMarkList {
  [key: string]: InputMark;
}

export interface ExmResultMetaData {
  grade: string;
  cgpa: number;
  grade_remarks: string;
  mark_remarks: string;
  mark_division: string;
  mark_obtain: number;
  mark_percent: number;
  full_mark: number;
  grade_rank: number;
  mark_rank: number;
  passed_failed: string;
  certificate_no: number;
  prepared_date: string;
}

export interface ExmResultStudentMeta {
  student_id: number;
  student_image: number;
  student_fullname: string;
  student_firstname: string;
  student_lastname: string;
  student_uni_reg: string;
  student_symbol: string;
  student_regid: string;
  student_section: string;
  student_rollno: string;
  student_class: string;
  student_program: string;
  student_batch: string;
  father_name: string;
  mother_name: string;
  gurdian_name: string;
  student_address: string;
}

export interface ExmResultSubjectMeta {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  subject_type: SubjectTypeEnum;
  credit_hr: number;
  th_credit: number;
  in_credit: number;
  remark: ExmResultRemarkEnum;
  is_absent: YesNoEnum;
  course_type: CourseTypeEnum;
  markResult: {
    full_mark: number;
    pass_mark: number;
    obtain_mark?: number;
    th_fm: number;
    th_pm: number;
    th_mark?: number;
    in_fm: number;
    in_pm: number;
    in_mark?: number;
  };
  gradeResult: {
    obtain_mark: number;
    obtain_gradePoint?: number;
    obtain_grade?: string;
    total_wgp?: number;
    th_gradePoint?: number;
    th_grade?: string;
    th_wgp?: number;
    in_gradePoint?: number;
    in_grade?: string;
    in_wgp?: number;
  };
}

export interface IExmVersion {
  id: string;
  version_no: number;
  routine_id: number;
  template: string;
  total_student: number;
  passed_student: number;
  status: StatusEnum;
  routine: IExmRoutine;
}

export interface ExmFinalRoutine {
  routine_id: number;
  version_id: number;
  exam_version: number;
  routine_code: string;
  value: number;
  exam_type: string;
}

export interface ExmFinalResultSubjectMeta {
  routine_id: number;
  subjectMeta: ExmResultSubjectMeta[];
  finalSubjectMeta: ExmResultSubjectMeta[];
  term_code: string;
  term: string;
  value: number;
  resultMeta: ExmResultMetaData;
  finalResultMeta: ExmResultMetaData;
}
export interface IExmResult {
  id: string;
  certificate_no: number;
  version_id: string;
  routine_id: string;
  student_detail: ExmResultStudentMeta;
  subject: ExmResultSubjectMeta[];
  metadata: ExmResultMetaData;
  student_id: string;
  student_log_id: string;
  status: StatusEnum;
  routine: IExmRoutine;
  student: IStudentInfo;
  version: IExmVersion;
}

export interface IExmFinalResult {
  id: string;
  certificate_no: number;
  version_no: number;
  student_detail: ExmResultStudentMeta;
  subject: ExmFinalResultSubjectMeta[];
  metadata: ExmResultMetaData;
  student_id: number;
  student_log_id: number;
  status: StatusEnum;
}

export interface IGradingRules {
  // does it required to pass in both theory and practical
  requiresComponentPass: boolean;
  // full mark for project work
  projectThreshold: number;
  // full mark for theory
  theoryThreshold: number;
  // mark required to pass in theory
  theoryPassThreshold: number;
  // full mark for internal
  internalThreshold: number;
  // mark required to pass in internal
  internalPassThreshold: number;
  // base mark forinternal mark to be converten into before calculating grade
  internalConversionThreshold: number;
  // full mark for engage
  engageThreshold: number;
}

export interface IExamSubjectMarks {
  fields: ExamMarkCasType;
  marks: MarkListItem[];
  gradingRule: IGradingRules;
}
