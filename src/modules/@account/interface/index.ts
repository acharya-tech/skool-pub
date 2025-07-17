import {
  AccounPayrollTypeEnum,
  AccountBsHeadsEnum,
  AccountBsTypeEnum,
  AccountLedgerDefinedEnum,
  AccountLedgerGroupTypeEnum,
  AccountVoucherStatusEnum,
  AccountVoucherTypeEnum,
} from "../constant/enum";
import {
  DrCrEnum,
  NepaliMonthEnum,
  StatusEnum,
  YesNoEnum,
} from "@common/all.enum";
import { IStaff } from "@employee/interface";
import { IUser } from "src/interfaces";

export interface IAccountYear {
  id: string;
  name: string;
}

export interface IAccountLedgerGroup {
  id: string;
  name: string;
  is_fixed: AccountLedgerDefinedEnum;
  user_id: number;
  bs_head: AccountBsHeadsEnum;
  bs_type: AccountBsTypeEnum;
  group_type: AccountLedgerGroupTypeEnum;
  dr_cr: DrCrEnum;
  status: StatusEnum;
  user: IUser;
}

export interface IAccountLedger {
  id: string;
  name: string;
  code: string;
  ledger_group_id: string;
  user_id: string;
  is_fixed: AccountLedgerDefinedEnum;
  status: StatusEnum;
  ledgerGroup: IAccountLedgerGroup;
  user: IUser;
}

export interface IAccountPayrollReleaseForm {
  type: AccounPayrollTypeEnum;
  amount: number;
  ledger: IAccountLedger;
  month: NepaliMonthEnum;
  date: string;
  auto_amount: YesNoEnum;
}

export interface IAccountPayrollRelease {
  type: AccounPayrollTypeEnum;
  ledger: IAccountLedger;
  month: NepaliMonthEnum;
  date: string;
  employees: Record<number, number>;
}

export interface IAccountPayrollPreRelease {
  id: string;
  employee: IStaff;
  amount: number;
  previous_amount: number;
}

export interface IAccountPayrollAnnualDeduction {
  id: string;
  ledger_id: string;
  employee_id: string;
  amount: number;
  max_amount: number;
  ledger: IAccountLedger;
  deduction: IAccountPayrollAnnualDeduction;
}

export interface IAccountPayroll {
  id: string;
  employee_id: string;
  ledger_id: string;
  type: AccounPayrollTypeEnum;
  amount: number;
  status: StatusEnum;
  ledger: IAccountLedger;
  employee: IStaff;
}

export interface IAccountPayrollPost {
  id: string;
  employee_id: string;
  voucher_id: string;
  particular: string;
  type: AccounPayrollTypeEnum;
  amount: number;
  month: NepaliMonthEnum;
  voucher: IAccountVoucher;
  status: StatusEnum;
  employee: IStaff;
  createdBy: IUser;
  created_by_id: string;
}

export type IAccountPayrollPostListMap = Map<string, IAccountPayrollPost[]>;

export interface IPayrollSetting {
  id: string;
  ledger_id: string;
  max_amount: number;
  ledger: IAccountLedger;
}

export interface IVoucherItem {
  ledger: IAccountLedger;
  amount: number;
}

export interface IVoucherCreate {
  transaction_date: string;
  drEntry: IVoucherItem[];
  crEntry: IVoucherItem[];
}

export interface IVoucherItemMeta {
  cheque_no?: string;
  cheque_date?: string;
  ledger_name: string;
  ledger_code: string;
  voucher_no: string;
}

export interface IAccountVoucher {
  id: string;
  amount: number;
  transaction_date: string;
  voucher_no: number;
  approved_by_id?: string;
  discarded_by_id?: string;
  posted_by_id: string;
  year_id: string;
  approved_date: Date;
  narration: string;
  meta: IAccountVoucherMeta;
  transaction_no: string;
  state: AccountVoucherStatusEnum;
  type: AccountVoucherTypeEnum;
  accountYear: IAccountYear;
  postedBy: IUser;
  approvedBy?: IUser;
  discardedBy?: IUser;
  items: IAccountVoucherItem[];
  discard_reason: string;
}

export interface IAccountVoucherItem {
  serial_no: number;
  dr_cr: DrCrEnum;
  voucher_id: number;
  ledger_id: number;
  amount: number;
  narration: string;
  meta: IVoucherItemMeta;
  voucher: IAccountVoucher;
  ledger: IAccountLedger;
}

export interface IAccountVoucherMeta {
  year: string;
  amount_in_words: string;
  posted_by: string;
  approved_by: string;
  discarded_by: string;
}

export interface ILedgerReport {
  ledger: IAccountLedger;
  report: ILedgerReportColumn[];
}

export interface ILedgerReportColumn {
  meta: IVoucherItemMeta;
  amount: number;
  dr_cr: DrCrEnum;
  narration: string;
  voucher_narration: string;
  voucher_no: number;
  voucher_id: string;
  transaction_date: string;
  balance: number;
}

export interface ILedgerSummaryRes {
  ledger_name: string;
  ledger_code: string;
  dr: number;
  cr: number;
}

export interface IGroupSummaryRes {
  group_name: string;
  total: number;
  ledgers: ILedgerSummaryRes[];
}

export interface IAccountHeadRes {
  bs_type: string;
  total: number;
  groups: IGroupSummaryRes[];
}

export interface IFinalReportRes {
  report: IAccountHeadRes[];
  total: {
    dr: number;
    cr: number;
  };
}

export type IFinalReportType = "balancesheet" | "pl" | "trial";

export interface IPayrollPostTable {
  date: string;
  particular: string;
  voucher_no: string;
  dr_amount: number;
  cr_amount: number;
  balance: number;
  month: NepaliMonthEnum;
}

export interface IPayrollReleaseInput {
  type: AccounPayrollTypeEnum[];
  month: NepaliMonthEnum[];
}

export interface IPayrollBankVoucherInput {
  month: NepaliMonthEnum[];
  ledger: IAccountLedger;
}

export interface IPayrollReleaseResponse {
  employees: IStaff[];
  ledgers: IAccountLedger[];
  reports: {
    ledger_id: string;
    employee_id: string;
    amount: number;
    dr_cr: DrCrEnum;
  }[];
}

export interface IPayrollBankVoucherResponse {
  employees: IStaff[];
  reports: {
    employee_id: string;
    amount: number;
  }[];
}

export interface IAfterPayrollReleaseResponse {
  narration: string;
  voucher_no: string;
  amount: number;
  dr_cr: DrCrEnum;
  transaction_date: string;
}
