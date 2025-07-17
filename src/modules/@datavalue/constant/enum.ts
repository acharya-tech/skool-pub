export enum ModuleNameEnum {
  Academic = "Academic",
  Store = "Store",
  Library = "Library",
  Exam = "Exam",
  Employee = "Employee",
  Student = "Student",
  Vehicle = "Vehicle",
  Repo = "Repo",
  Notice = "Notice",
  Billing = "Billing",
  Account = "Account",
}

export enum DataTypeEnum {
  String = "String",
  Number = "Number",
  Date = "Date",
  Time = "Time",
  Datetime = "Datetime",
  Json = "Json",
  Array = "Array",
  Boolean = "Boolean",
  Template = "Template",
  Select = "Select",
  Resource = "Resource",
}

export enum DataKeyTemplateEnum {
  EXAM_SHEET = "EXAM_SHEET",
  EXAM_MARK_LEDGER = "EXAM_MARK_LEDGER",
  EXAM_GRADE_LEDGER = "EXAM_GRADE_LEDGER",
  EXAM_TRANSCRIPT = "EXAM_TRANSCRIPT",
  EXAM_ENTRANCE = "EXAM_ENTRANCE",
  LIBRARY_CARD = "LIBRARY_CARD",
  STORE_BILL_DESIGN = "STORE_BILL_DESIGN",
  BILLING_INVOICE_DESIGN = "BILLING_INVOICE_DESIGN",
  ACCOUNT_VOUCHER = "ACCOUNT_VOUCHER",
  ACCOUNT_LEDGER = "ACCOUNT_LEDGER",
  ACCOUNT_TRIAL_BALANCE = "ACCOUNT_TRIAL_BALANCE",
  ACCOUNT_PROFIT_LOSS = "ACCOUNT_PROFIT_LOSS",
  ACCOUNT_BALANCE_SHEET = "ACCOUNT_BALANCE_SHEET",
  STUDENT_CERTIFICATE = "STUDENT_CERTIFICATE",
}

export enum DataKeyRegularEnum {
  STORE_BILL_NO = "STORE_BILL_NO",
  LIBRARY_ACCESSION_PREFIX = "LIBRARY_ACCESSION_PREFIX",
}

export type DataKeyType = DataKeyRegularEnum | DataKeyTemplateEnum;
