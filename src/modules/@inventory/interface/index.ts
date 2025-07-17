import { StatusEnum } from "@common/all.enum";
import {
  ProductCategoryEnum,
  ProductTypeEnum,
  StateEnum,
  InventoryBillUserTypeEnum,
  TransactionFlowEnum,
  StoreGroupType,
} from "../constant";
import { IStudentInfo } from "@student/interface";
import { IStaff } from "@employee/interface";
import { IAccountYear } from "@account/interface";
import { IUser } from 'src/interfaces';

export interface IStoreProduct {
  id: string;
  name: string;
  code?: string | null;
  life_expn?: number | null;
  min_qty?: number | null;
  description?: string | null;
  si_units?: string | null;
  house_id: number;
  category?: ProductCategoryEnum;
  type?: ProductTypeEnum;
  items: IStoreItem[];
  status?: StatusEnum;
  created_at: string;
}

export interface IStoreItem {
  id: string;
  procument_id?: number;
  sale_id?: number;
  bill_id?: number;
  purchase_id?: number;
  vendor_id?: number;
  product_id?: number;
  product_name: string;
  product?: IStoreProduct;
  qty: number;
  amount: number;
  flow: TransactionFlowEnum;
  procument?: IStoreProcurement;
  vendor?: IStoreVendor;
  purchase?: IStorePurchase;
  sale?: InventorySales;
  bill?: InventorySales;
  status: StatusEnum;
}

interface IStorePurchase {
  title: string;
  user_id: number;
  user: IUser;
  house_id: number;
  house: IStoreHouse;
  year_id: number;
  payment_amount: number;
  amount: number;
  vat_rate?: number; // Nullable field
  vat_amt: number;
  dis_amt: number;
  total_amt: number;
  remark?: string; // Nullable field
  entry_date: Date;
  procument_id?: number; // Nullable field
  procument?: IStoreProcurement; // Optional as it's a relation
  status: StatusEnum;
  items: IStoreItem[];
}

interface InventorySales {
  user_id: number;
  user: IUser;
  title: string;
  house_id: number;
  house: IStoreHouse;
  year_id: number;
  amount: number;
  dis_amt: number;
  total_amount: number;
  remark?: string;
  date: Date;
  status: StatusEnum;
  items: IStoreItem[];
}

export interface IStoreProcurement {
  user: IUser;
  entered_by: string;
  proc_regid: string;
  id: string;
  name: string;
  entry_date: string;
  remark?: string | null;
  created_by_id: number;
  type: ProductTypeEnum;
  house_id: number;
  year_id: number;
  approved_by_id?: number | null;
  amount?: number | null;
  discount?: number | null;
  total_amount?: number | null;
  state?: StateEnum | null;
  vat_rate?: number;
  vat_amount?: number;
  status: StatusEnum;
  items: IStoreItem[];
  comments?: IStoreComment[];
}

export interface IStoreProcurementCreate {
  name: string;
  entry_date: Date;
  remark?: string | null;
  type: ProductTypeEnum;
  amount?: number | null;
  discount?: number | null;
  total_amount?: number | null;
  state?: StateEnum | null;
  vat_rate?: number;
  vat_amount?: number;
  items: IStoreItem[];
}

export interface IStoreComment {
  id: string;
  house_id: number;
  comment: string;
  procument_id: string;
  user_id: number;
  user: IUser;
  status: StatusEnum;
  created_at: string;
}

export interface IStoreInEntry {
  user: IUser;
  id: string;
  title: string;
  user_id: number;
  vendor_id: number;
  house_id: number;
  year_id: number;
  payment_amount: number;
  amount: number;
  vat_rate: number;
  vat_amt: number;
  dis_per: number;
  dis_amt: number;
  total_amount: number;
  remark: string;
  entry_date: string;
  procument_id: number | null;
  procument: IStoreProcurement;
  status: StatusEnum;
  house?: IStoreHouse;
  items?: IStoreItem[];
}

export interface IStoreInEntryCreate {
  title: string;
  user: any;
  procument: any;
  id: string;
  user_id: number;
  vendor_id: number;
  house_id: number;
  year_id: number;
  payment_amount: number;
  amount: number;
  vat_rate: number;
  dis_amt: number;
  total_amount: number;
  remark: string;
  entry_date: Date;
  items: IEntryItemCreate[];
}

export interface IEntryItemCreate {
  product?: IStoreProduct;
  qty?: number;
  amount?: number;
  vendor?: IStoreVendor;
}
export interface IStoreVendor {
  house: any;
  id: string;
  name: string;
  address: string;
  contact_number: string;
  email: string;
  house_id: number;
  status: StatusEnum;
  remark: string;
}
export interface IStoreHouse {
  id: string;
  name: string;
  code: string;
  description: string;
  incharge_id: number;
  status?: StatusEnum;
}

export interface IStoreItemCheckOut {
  id: string;
  user_id: number;
  house_id: number;
  year_id: number;
  vat_rate: number;
  vat_amt: number;
  dis_per: number;
  dis_amt: number;
  amount: number;
  total_amount: number;
  remark?: string;
  title: string;
  entry_date: string;
  user: IUser;
  status?: StatusEnum;
  items: IStoreItem[];
}

export interface IStoreProcurementItems {
  id: string;
  procument_id?: number | null;
  qty: number;
  amount: number;
  vendor_id?: number | null;
  purchase_id?: number | null;
  status: StateEnum;
  product_id?: number | null;
  product_name: string;
  product: IStoreProduct;
}

export interface IStoreVendor {
  id: string;
  type: number;
  name: string;
  tot_mem: number;
  house_id: number;
  members_id: number;
  status: StatusEnum;
}

export interface IStoreGroup {
  id: string;
  name: string;
  tot_mem: number;
  type: StoreGroupType;
  house_id: number;
  students: IStudentInfo[];
  employees: IStaff[];
}

export interface IStoreGroupMemberCreate {
  id: string;
  student?: IStudentInfo;
  employee?: IStaff;
  type: StoreGroupType;
}

export interface IStoreTemplate {
  house: any;
  id: string;
  name: string;
  house_id: number;
  template: string;
  status?: StatusEnum;
}

export interface IStockSummary {
  product_name: string;
  product_code: string;
  id: string;
  total_in: string;
  total_out: string;
  closing_stock: string;
  opening_stock: string;
}

export interface IStoreBilling {
  id: string;
  customer_name: string;
  amount: number;
  total_amount: number;
  vat_rate: number;
  vat_amt: number;
  dis_per: number;
  dis_amt: number;
  entry_date: string;
  bill_no: string;
  user_type: InventoryBillUserTypeEnum;
  remark?: string;
  house_id: number;
  year_id: number;
  year: IAccountYear;
  employee_id?: number | null;
  student_id?: number | null;
  sale_id: number;
  status?: StatusEnum;
  items: IStoreItem[];
  user: IUser;
  created_at: string;
  meta: IStoreBillMeta;
}

export interface IStoreBillMeta {
  customer_name: string;
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
  staff_name: string;
  staff_phone: string;
  staff_address: string;
  staff_department: string;
  bill_no: string;
  bill_date: string;
  amount_in_words: string;
  entered_by: string;
  bill_remark: string;
}
export interface IStoreBillingCreate {
  id: string;
  month: string;
  customer_name: string;
  amount: number;
  total_amount: number;
  vat_rate: number;
  vat_amt: number;
  dis_per: number;
  dis_amt: number;
  entry_date: Date;
  bill_no: string;
  user_type: InventoryBillUserTypeEnum;
  remark?: string;
  items: Partial<IStoreItem>[];
}

export interface IStoreRequisition {
  id: string;
  title: string;
  dep_name: string;
  user_id: number;
  house_id: number;
  year_id: number;
  vat_rate: number;
  vat_amt: number;
  dis_per: number;
  dis_amt: number;
  amount: number;
  total_amount: number;
  remark?: string;
  status?: StatusEnum;
  user: IUser;
  entry_date: string;
  items: IStoreProcurementItems[];
}

export interface IStoreRequisitionCreate {
  title: string;
  user: any;
  dep_name: any;
  id: string;
  user_id: number;
  vendor_id: number;
  house_id: number;
  year_id: number;
  amount: number;
  vat_rate: number;
  dis_amt: number;
  total_amount: number;
  remark: string;
  entry_date: Date;
  items: IEntryItemCreate[];
}

export interface IStoreDashboardReport {
  color: string | undefined;
  productCount: number;
  totalRequisition: number;
  InCount: number;
  OutCount: number;
  totalVendor: number;
  totalGroup: number;
  billAmount: number;
  billCount: number;
}

export interface IStorePurchaseSales {
  purchase: Array<any>;
  sales: Array<any>;
}
