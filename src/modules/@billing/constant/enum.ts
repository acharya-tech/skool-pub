export enum BillFeeModuleEnum {
  Bus = "Bus",
  Store = "Store",
  Library = "Library",
  Academic = "Academic",
}

export enum BillFeeTypeEnum {
  Monthly = "Monthly",
  Yearly = "Yearly",
  Regular = "Regular",
}

export enum BillFeeClassTypeEnum {
  All = "All",
  Student = "Student",
  Subject = "Subject",
  Module = 'Module',
}

export enum BillFeeReleaseDuplicateEnum {
  Override = "Override",
  Skip = "Skip",
  Double = "Double",
}

export enum BillFeeReleaseTypeEnum {
  Fee = "Fee",
  Scholar = "Scholar",
  Invoice = "Invoice",
  Other = "Other",
}

export enum BillEntranceStateEnum {
  Pending = 'Pending',
  Withdraw = 'Withdraw',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Admitted = 'Admitted',
  Completed = 'Completed',
}

export enum BillApplicationModeEnum {
  Online = 'Online',
  Entrance = 'Entrance',
  Import = 'Import',
  Admission = 'Admission',
}
