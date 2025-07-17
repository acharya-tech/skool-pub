export enum SmsTemplateEnum {
  Template = "Template",
  Default = "Default",
}

export enum SmsStateEnum {
  Pending = "Pending",
  Inprogress = "Inprogress",
  Success = "Success",
  Failed = "Failed",
  EmptyAddress = "EmptyAddress",
  Canceled = "Canceled",
}

export enum NoticeScopeEnum {
  Public = "Public",
  Student = "Student",
  Staff = "Staff",
  Parent = "Parent",
  Private = "Private",
}

export enum NoticeUserTypeEnum {
  Student = "Student",
  Staff = "Staff",
  Class = "Class",
  StaffGroup = "StaffGroup",
  Parent = "Parent",
}

export enum NoticeTypeEnum {
  Sms = "Sms",
  Notice = "Notice",
  Email = "Email",
}

export enum NoticeTemplateType {
  Email = "Email",
  Sms = "Sms",
}

const NoticeParentVaribale = ["name", "phone", "email"];

const NoticeStudentVaribale = [
  "name",
  "phone",
  "email",
  "regid",
  "class",
  "section",
  "program",
  "house",
];

const NoticeStaffVaribale = [
  "name",
  "phone",
  "email",
  "emp_code",
  "department",
  "post",
  "employment_type",
  "contract_type",
];

export const NoticeTemplateVariable: Record<NoticeUserTypeEnum, string[]> = {
  [NoticeUserTypeEnum.Class]: NoticeStudentVaribale,
  [NoticeUserTypeEnum.Student]: NoticeStudentVaribale,
  [NoticeUserTypeEnum.Parent]: NoticeParentVaribale,
  [NoticeUserTypeEnum.Staff]: NoticeStaffVaribale,
  [NoticeUserTypeEnum.StaffGroup]: NoticeStaffVaribale,
};
