import {
  BloodGroupEnum,
  DrCrEnum,
  GenderEnum,
  NepaliMonthEnum,
  StatusEnum,
  YesNoEnum,
} from "@common/all.enum";
import { IBatch, IClass, ISubject } from "@academic/interface";
import { ModuleNameEnum } from "@datavalue/constant/enum";
import {
  IParent,
  ISibling,
  IStudentAcademic,
  IStudentDoc,
  IStudentInfo,
  IStudentParent,
} from "@student/interface";
import {
  BillApplicationModeEnum,
  BillEntranceStateEnum,
  BillFeeClassTypeEnum,
  BillFeeModuleEnum,
  BillFeeReleaseTypeEnum,
  BillFeeTypeEnum,
} from "../constant";
import { IAccountYear } from "@account/interface";
import { IUser } from 'src/interfaces';

export interface IBillFee {
  id: string;
  name: string;
  module: BillFeeModuleEnum;
  module_id: number | null;
  ledger_id?: string | null;
  type: BillFeeTypeEnum;
  sort: number;
  is_deposit: YesNoEnum;
}

export interface IBillLedger {
  id: string;
  name: string;
  amount: number;
  ledger_id?: string | null;
}

export interface IBillFeeClass {
  id: string;
  fee_id: string;
  class_id: string;
  account_year_id: string;
  subject_id?: string | null;
  amount: number;
  post_type: BillFeeClassTypeEnum;
  module_type: BillFeeModuleEnum;
  status: StatusEnum;
  fee: IBillFee;
  class: IClass;
  accountYear: IAccountYear;
  subject?: ISubject | null;
}

export interface IBillFeeStudent {
  id: string;
  fee_id: string;
  student_id: string;
  student: IStudentInfo;
  fee: IBillFee;
}

export interface IBillFeeDeposit {
  id: string;
  student_id: string;
  student: IStudentInfo;
  amount: number;
  created_by: string;
  fee_id: string;
  fee: IBillFee;
  ledger_id: string | null;
  post_date: Date;
  return_date: Date | null;
  is_returned: YesNoEnum;
}

export interface IBillModulePost {
  id: string;
  student_id: string;
  student: IStudentInfo;
  module: ModuleNameEnum;
  module_id?: string;
  fee_id: string;
  fee: IBillFee;
  month: NepaliMonthEnum;
  batch_id: string;
  batch: IBatch;
  amount: number;
  is_approved: YesNoEnum;
}

export interface IBillFeeRelease {
  id: string;
  name: string;
  type: BillFeeReleaseTypeEnum;
  fee_id?: string;
  invoice_id?: string;
  scholar_id?: string;
  batch_id: string;
  class_id: string;
  created_by_id: string;
  accountYear: IAccountYear;
  createdBy: IUser;
  class: IClass;
  total_amount: number;
  avg_amount: number;
  total_post: number;
  release_date: string;
  created_at: string;
  closed_at?: string;
  month: NepaliMonthEnum;
  remark?: string;
  bill_fc_id?: IBillFeeClass;
  ledger_id?: string;
  dr_cr: DrCrEnum;
  status: StatusEnum;
  meta: IBillFeeReleaseMeta[];
}

export interface IBillFeeReleaseMeta {
  id: string;
  release_id: string;
  student_id: string;
  release: IBillFeeRelease;
  student: IStudentInfo;
  remark: string;
  amount: number;
  dr_cr: DrCrEnum;
  status: StatusEnum;
}

export interface IBillScholar {
  id: string;
  name: string;
  fee_id?: number;
  fee?: IBillFee;
  ledger_id?: string;
}

export interface IBillScholarCreate {
  month: NepaliMonthEnum;
  release_date: string;
  class: IClass;
  studentMeta: {
    student: IStudentInfo[];
    amount: number;
  };
  scholar: IBillScholar;
}

export interface IBillScholarPercentbase {
  id: string;
  student_id: string;
  student: IStudentInfo;
  scholar_id: string;
  scholar: IBillScholar;
  created_by_id: string;
  percent: number;
  end_date: string;
  status: StatusEnum;
  createdBy: IUser;
  created_at: string;
}

export interface IBillScholarPostbase {
  id: string;
  student_id: string;
  student: IStudentInfo;
  scholar_id: string;
  scholar: IBillScholar;
  user_id: string;
  amount: number;
  post_over: number;
  post_count: number;
  status: StatusEnum;
  created_at: Date;
  updated_at: Date;
}

interface IBillPreviousRelease {
  id: number;
  amount: number;
}
export interface IBillPrePostStudentList {
  student: IStudentInfo;
  amount: number;
  previous: IBillPreviousRelease[];
}

export interface IBillTabPrePostStudentList {
  [key: string]: IBillPrePostStudentList[];
}

export interface IBillInvoice {
  id: string;
  bill_no: number;
  student_id?: string;
  student?: IStudentInfo;
  customer_name: string;
  customer_address: string;
  customer_pan: string;
  created_by_id: string;
  account_year_id: string;
  amount: number;
  discount: number;
  taxable_amount: number;
  tax_amount: number;
  total_amount: number;
  bill_date: string;
  is_sync: number;
  is_active: number;
  is_printed: number;
  printed_by: number;
  bill_detail: string | null;
  remark: string | null;
  status: StatusEnum;
  month: NepaliMonthEnum;
  createdBy: IUser;
  release: IBillFeeRelease;
  items: IBillInvoiceItem[];
  meta: IBillInvoiceMeta;
}
export interface IBillInvoiceItem {
  id: string;
  invoice_id: string;
  item_qty: number;
  amount: number;
  rate: number;
  fee: IBillFee;
  fee_id: string;
  item: string;
}

export interface IBillFeeReceive {
  customer_name: string;
  customer_address: string;
  month: NepaliMonthEnum;
  release_date: Date;
  items: IBillInvoiceItem[];
  student: IStudentInfo;
  remark?: string;
  discount?: number;
}

export interface IStudentDueByList {
  [key: string]: { student: IStudentInfo; due: Record<string, number> };
}

export interface IFeeReleaseReportData {
  student_id: string;
  fee_id: string;
  type: string;
  amount: number;
}
export interface IStudentDueByFeeHead {
  feeHeads: IBillFee[];
  dues: IFeeReleaseReportData[];
  students: IStudentDueColumn[];
}

export interface IStudentScholarByHead {
  scholarHeads: IBillScholar[];
  students: IStudentInfo[];
  dues: any[];
}

export interface IStudentDueLedger {
  students: IStudentInfo[];
  due: {
    student_id: string;
    dr: number;
    cr: number;
  }[];
}

export interface IStudentDueLedgerColumn extends IStudentInfo {
  dr?: number;
  cr?: number;
  student_id?: string;
}

export interface IStudentDueColumn extends IStudentInfo {
  student_id: string;
  fee_id: string;
  type: string;
  amount: number;
}

export interface IFeeSummary {
  students: IStudentInfo[];
  summary: {
    student_id: string;
    amount: number;
    type: BillFeeReleaseTypeEnum;
  }[];
}

export interface IBillInvoiceMeta {
  student_fullname: string;
  student_firstname: string;
  student_lastname: string;
  student_class: string;
  student_section: string;
  student_regid: string;
  student_program: string;
  student_rollno: string;
  student_phone: string;
  student_address: string;
  bill_year: string;
  amount_in_words: string;
  entered_by: string;
}

export interface IBillEntranceFormData {
  first_name: string;
  last_name: string;
  class: IClass;
  batch: IBatch;
  form_number: string;
  phone?: string;
  address?: string;
  email?: string;
  gender?: GenderEnum;
  dob_en?: string;
  dob_np?: string;
  blood_group?: BloodGroupEnum;
  address1?: string;
  address2?: string;
  district?: string;
  caste?: string;
  religion?: string;
  nationality?: string;
  ethnic?: string;
  disability?: string;
  parents?: Partial<IStudentParent>[];
  siblings?: Partial<ISibling>[];
  docs?: Partial<IStudentDoc>[];
  academics?: Partial<IStudentAcademic>[];
}

export interface IBillEntrance {
  id: string;
  student_id: string;
  form_invoice_id: string;
  admission_invoice_id: string;
  name: string;
  phone?: string;
  address?: string;
  class_id: string;
  aclass: IClass;
  batch: IBatch;
  ledger: IBillLedger;
  amount: number;
  form_data?: IBillEntranceFormData;
  form_no: string;
  form_auto_no: number;
  prefix_form_no: string;
  remark?: string;
  application_mode: BillApplicationModeEnum;
  state: BillEntranceStateEnum;
  created_at: string;
  updated_at: string;
}
