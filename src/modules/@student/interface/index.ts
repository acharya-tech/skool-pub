import { IFileResponse } from "src/interfaces";
import {
  IAcademicHouse,
  IBatch,
  IClass,
  IHostel,
  IProgram,
  ISection,
  ISubject,
} from "@academic/interface";
import {
  ParentRelationEnum,
  StudentAcademicTypeEnum,
  StudentDocEnum,
  StudentLogStateEnum,
  StudentRelationEnum,
  StudentStateEnum,
} from "../constant/enums";
import {
  BloodGroupEnum,
  CasteEnum,
  DisabilityTypeEnum,
  EthnicGroupEnum,
  GenderEnum,
  ReligionEnum,
  StatusEnum,
  YesNoEnum,
} from "@common/all.enum";
import { IVehicleStudent } from "@vehicle/interface";
import { IBillEntranceFormData } from "@billing/interface";
import {
  BillApplicationModeEnum,
  BillEntranceStateEnum,
} from "@billing/constant";
import { IDataValue } from "@datavalue/interface";
import { ILibPatron } from "@library/interface";
import { IUser } from 'src/interfaces';

export interface IStudentInfo {
  id: string;
  regid: string;
  uni_reg: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: string;
  admission_date_np: string;
  admission_date_en: Date;
  dob_np: string;
  dob_en: string;
  phone?: string;
  email?: string;
  blood_group: string;
  nationality: string;
  religion: string;
  caste: string;
  ethnic: string;
  disability: string;
  address1: string;
  address2: string;
  image?: IFileResponse;
  user: string;
  status: string;
  vehicle?: IVehicleStudent;
  class_id: string;
  program_id: string;
  class?: IClass;
  program?: IProgram;
  house?: IAcademicHouse;
  hostel?: IHostel;
  section?: ISection;
  batch?: IBatch;
  symbol?: string;
  roll_no?: string;
  state: StudentStateEnum;
  patron?: ILibPatron;
  createdAt: string;
}

export interface IStudentLog {
  id: string;
  student_id: string;
  class_id: string;
  program_id: string;
  student?: IStudentInfo;
  siblings: IStudentInfo[];
  parent?: IParent[];
  class?: IClass;
  program?: IProgram;
  house?: IAcademicHouse;
  hostel?: IHostel;
  section?: ISection;
  batch?: IBatch;
  symbol?: string;
  roll_no?: string;
  state: StudentLogStateEnum;
  created_at: string;
}

export interface IStudentNote {
  id: string;
  student_id: string;
  user_id: string;
  student?: IStudentInfo;
  user?: IUser;
  notes: string;
  rating: number;
  created_at: string;
}

export interface IParent {
  id: number;
  name: string;
  occupation?: string;
  phone: string;
  address1?: string;
  address2?: string;
  blood_group?: string;
  gender?: string;
  email?: string;
  image?: IFileResponse;
}

export interface IParentForm {
  name: string;
  occupation?: string;
  phone: string;
  address1?: string;
  address2?: string;
  blood_group?: string;
  relation: ParentRelationEnum;
  gender?: string;
  email?: string;
  image?: IFileResponse;
  isGuardian: YesNoEnum;
}

export interface IStudentParent {
  id: number;
  student_id: number;
  parent_id: number;
  student: IStudentInfo;
  parent: IParent;
  relation: ParentRelationEnum;
  isGuardian: YesNoEnum;
}

export interface ISibling {
  id: string;
  student: IStudentInfo;
  student_id: number;
  sibling: IStudentInfo;
  sibling_id: number;
  relation: StudentRelationEnum;
}

export interface IStudentDoc {
  id: string;
  student_id: number;
  type: StudentDocEnum;
  remark: string;
  image_id?: number;
  image?: IFileResponse;
}

export interface IStudentAcademic {
  id: string;
  student_id: number;
  type: StudentAcademicTypeEnum;
  remark: string;
  passed_year_en?: string;
  passed_year_np?: string;
  regid: string;
  symbol: string;
  institute_name: string;
  score: string;
  image_id?: number;
  image?: IFileResponse;
}

export interface IStudentFilter {
  regid?: string;
  first_name?: string;
  last_name?: string;
  program?: IProgram;
  sclass?: IClass;
  batch?: IBatch;
  phone?: string;
  house?: IAcademicHouse;
  hostel?: IHostel;
  section?: ISection;
  program_id?: string;
  class_id?: string;
  batch_id?: string;
  section_id?: string;
  house_id?: string;
  hostel_id?: string;
  gender?: GenderEnum;
  roll_no?: string;
  address1?: string;
  bloog_group?: BloodGroupEnum;
  symbol?: string;
  uni_reg?: string;
  email?: string;
  caste?: CasteEnum;
  disability?: DisabilityTypeEnum;
  religion?: ReligionEnum;
  ethnic?: EthnicGroupEnum;
  age?: number;
  dob_en?: string;
  admission_date_en?: string;
  nationality?: string;
  state?: StudentStateEnum[];
}

export interface IStudentSelection {
  add1?: boolean;
  add2?: boolean;
  fln?: boolean;
  cls?: boolean;
  sec?: boolean;
  hus?: boolean;
  hst?: boolean;
  rn?: boolean;
  sym?: boolean;
  st?: boolean;
  urg?: boolean;
  rid?: boolean;
  fn?: boolean;
  ln?: boolean;
  g?: boolean;
  dob_np?: boolean;
  dob_en?: boolean;
  ph?: boolean;
  em?: boolean;
  bg?: boolean;
  nty?: boolean;
  rlg?: boolean;
  cst?: boolean;
  eth?: boolean;
  dsty?: boolean;
  action?: boolean;
  sid?: boolean;
}

export interface IStudentSearch {
  filter: IStudentFilter;
  select: IStudentSelection;
}

export interface StudentSubjectList {
  id: number;
  student_id: number;
  student_name: string;
  student_regid: string;
  section: string;
  subject_id?: number;
  subject_name?: string;
  subject_code?: string;
  subjectList: ISubject[];
}

export interface IAdmission {
  created_by_id: number;
  student_id: number;
  name: string;
  phone: string;
  address: string;
  form_data: IBillEntranceFormData;
  form_no: string;
  prefix_form_no: string;
  form_auto_no: number;
  form_invoice_id: number;
  admission_invoice_id?: number;
  application_mode: BillApplicationModeEnum;
  batch_id: number;
  class_id: number;
  state: BillEntranceStateEnum;
  remark: string;
  aclass: IClass;
  batch: IBatch;
}

export interface IStudentCertificateType {
  id: string;
  name: string;
  template: IDataValue;
  prefix: string;
}

export interface ICertificateStudentMeta {
  certificate_no: string;
  issue_date: string;
  certificate_name: string;
  issued_by: string;
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
  student_house: string;
  student_hostel: string;
  father_name: string;
  mother_name: string;
  gurdian_name: string;
  student_address: string;
  student_gender: string;
  student_caste: string;
  student_religion: string;
  student_ethnic: string;
  student_nationality: string;
  student_dob: string;
  student_phone: string;
  student_email: string;
}
export interface IStudentCertificate {
  id: string;
  type: IStudentCertificateType;
  certificate_id: string;
  certificate_no: string;
  template: string;
  certificate_type_id: string;
  issue_date: string;
  metadata: ICertificateStudentMeta;
  created_by_id: number;
  student_id: number;
  student_log_id: number;
  remark: string;
  status: StatusEnum;
  student: IStudentInfo;
  createdBy: IUser;
}

export interface IStudentDashboardStatus {
  students: number;
  parents: number;
  pendingAdmission: number;
  certificates: number;
}
