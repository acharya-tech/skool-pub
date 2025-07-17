export enum AccountLedgerGroupTypeEnum {
  Cash = "Cash",
  Salary = "Salary",
  Vendor = "Vendor",
  Employee = "Employee",
  Bank = "Bank",
  Sales = "Sales",
  Payroll_annual_deduction = "Payroll annual deduction",
  Invome_tax = "Income tax",
  Bonus = "Bonus",
  Interest = "Interest",
  Deprecation = "Deprecation",
  Creditors = "Creditors",
  Other = "Other",
}

export enum AccountBsTypeEnum {
  Capital = "Capital",
  Assets = "Assets",
  Liabilities = "Liabilities",
  Expenses = "Expenses",
  Income = "Income",
}

export enum AccountBsHeadsEnum {
  RESERVE_AND_SURPLUS = "RESERVE AND SURPLUS",
  CURRENT_ASSETS = "CURRENT ASSETS",
  FIXED_ASSETS = "FIXED ASSETS",
  CURRENT_LIABILITIES = "CURRENT LIABILITIES",
  LOAN_PAYABLE = "LOAN PAYABLE",
  DIRECT_INCOME = "DIRECT INCOME",
  INDIRECT_INCOME = "INDIRECT INCOME",
  DIRECT_EXPENSES = "DIRECT EXPENSES",
  INDIRECT_EXPENSES = "INDIRECT EXPENSES",
}

export enum AccountLedgerDefinedEnum {
  FIXED = "Fixed",
  NOT_FIXED = "Not Fixed",
}

export enum AccounPayrollTypeEnum {
  Plus = "Plus",
  Minus = "Minus",
  Payment = "Payment",
}

export enum AccountIncomeTaxRuleEnum {
  Y7879 = "78_79",
  Y7980 = "79_80",
}

export enum AccountVoucherTypeEnum {
  Opening = "Opening",
  Closing = "Closing",
  Journal = "Journal",
  Purchase = "Purchase",
  Receive = "Receive",
  Sales = "Sales",
  Payment = "Payment",
  Contra = "Contra",
  Payroll = "Payroll",
}

export enum AccountVoucherStatusEnum {
  Pending = "Pending",
  Approved = "Approved",
  Discarded = "Discarded",
}
