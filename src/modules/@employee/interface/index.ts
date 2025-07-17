import { IExtraAddress, IFileResponse } from "src/interfaces";
import {
  ContractTypeEnum,
  EmployeeDocEnum,
  EmployeeNoteUserTypeEnum,
  EmployeeRelationEnum,
  EmployeeToStudentEnum,
  EmployeeTypeEnum,
  EmployeeWorkShiftEnum,
} from "../constant/enums";
import {
  BloodGroupEnum,
  GenderEnum,
  MaritalStatusEnum,
  StatusEnum,
} from "@common/all.enum";
import { IParent, IStudentInfo } from "@student/interface";
import { ILibPatron } from "@library/interface";
import { IAccountLedger } from "@account/interface";
import { IUser } from 'src/interfaces';

export interface IStaffPost {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  level: string;
  description: string;
  status: string;
}

export interface IEmployeeSalaryMeta {
  plus_amount: number;
  minus_amount: number;
}

export interface IStaff {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  emp_code: string;
  date_of_birth: string;
  date_of_join: string;
  gender: GenderEnum;
  phone: string;
  email?: string | null;
  pf_no?: string;
  cit_no?: string;
  ssf_no?: string;
  pan_no?: string;
  blood_group?: BloodGroupEnum | null;
  qualification?: string | null;
  address_id: number;
  address1: string;
  address2?: string | null;
  image_id?: string | null;
  emp_type: EmployeeTypeEnum;
  post_id: string;
  ledger_id: string;
  married: MaritalStatusEnum;
  bank_detail?: EmpBankDetail;
  licenses_no?: string | null;
  department_id: string;
  status: StatusEnum;
  post: IStaffPost;
  department: IDepartment;
  address: IExtraAddress;
  image?: IFileResponse | null;
  contract_type: ContractTypeEnum;
  work_shift: EmployeeWorkShiftEnum;
  salaryMeta: IEmployeeSalaryMeta | null;
  groups: IEmpGroup[];
  patron?: ILibPatron;
  ledger?: IAccountLedger;
}

export interface EmpBankDetail {
  account_name: string;
  account_no: string;
  bank_name: string;
}

export interface IDepartment {
  id: string;
  name: string;
  description: string;
  status: StatusEnum;
  created_at: string;
  updated_at: string;
}

export interface IPost {
  id: string;
  name: string;
  level: string;
  description: string;
  status: StatusEnum;
  created_at: string;
  updated_at: string;
}

export interface IEmpStudent {
  id: string;
  student: IStudentInfo;
  student_id: number;
  relation: EmployeeToStudentEnum;
}

export interface IEmpStaff {
  id: string;
  staff: IStaff;
  staff_id: string;
  relation_id: string;
  relatedStaff: IStaff;
  relation: EmployeeRelationEnum;
}

export interface IStaffDoc {
  id: string;
  staff_id: number;
  type: EmployeeDocEnum;
  remark: string;
  image_id?: number;
  image?: IFileResponse;
}

export interface IEmpGroup {
  id: string;
  name: string;
  tot_mem: number;
  staffs: IStaff[];
}

export interface IEmpGroupMemberCreate {
  id: string;
  staff: IStaff;
}

export interface IEmployeeNote {
  id: string;
  student_id: string;
  user_id: string;
  student?: IStudentInfo;
  employee?: IParent;
  staff?: IStaff;
  userStaff?: IStaff;
  user?: IUser;
  notes: string;
  rating: number;
  staff_id: string;
  user_staff_id: string;
  parent_id: string;
  created_at: string;
  type: EmployeeNoteUserTypeEnum;
}


export interface IEmployeeDashboardStatus {
  staffs: number;
  groups: number;
  posts: number;
  departments: number;
}