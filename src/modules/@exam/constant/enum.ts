export enum ExmResultRemarkEnum {
  Passed = "Passed",
  Failed = "Failed",
  Not_Set = "Not Set",
  Updated = "Updated",
}

export enum ExmFormulaTypeEnum {
  Grade = "Grade",
  Mark = "Mark",
}

export enum ExmTypeEnum {
  Test = "Test",
  Terminal = "Terminal",
  Final = "Final",
}

export enum ExmMarkPostStatusEnum {
  Pending = "Pending",
  Inprogress = "Inprogress",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum ExmFinalStatusEnum {
  Ready = "Ready",
  Inprogress = "Inprogress",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum ExmRoutinePostStatusEnum {
  Pending = "Pending",
  Inprogress = "Inprogress",
  Ready = "Ready",
  Completed = "Completed",
  Preparing = "Preparing",
  Published = "Published",
  Canceled = "Canceled",
}

export enum ExmOnlineQsnTypeEnum {
  Subjective = "Subjective",
  Objective = "Objective",
}

export enum ExmOnlineExamStatusEnum {
  Pending = "Pending",
  Active = "Active",
  Inprogress = "Inprogress",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum MarkImportExcelColumns {
  REGID = "REGID",
  NAME = "NAME",
  SECTION = "SECTION",
  ROLL_NO = "ROLL_NO",
  THEORY = "THEORY",
  INTERNAL = "INTERNAL",
  ENGAGE = "ENGAGE",
  PROJECT = "PROJECT",
  ABSENT = "ABSENT",
}

export enum MarkExcelFildMapColumns {
  REGID = "student_regid",
  NAME = "student_name",
  SECTION = "section",
  ROLL_NO = "roll_no",
  THEORY = "theory_obtained",
  INTERNAL = "internal_obtained",
  ENGAGE = "engage_obtained",
  PROJECT = "project_obtained",
  ABSENT = "is_absent",
}

export enum GradingFormulaTypeEnum {
  Regular = "Regular",
  Foundational_Level = "Foundational_Level",
  Basic_Level = "Basic_Level",
  Lower_Secondary = "Lower_Secondary",
  Upper_Secondary = "Upper_Secondary",
}

export enum ExmRoutineCasEnum {
  Regular = "Regular",
  Internal = "Internal",
  Full_Internal = "Full_Internal",
  Final = "Final",
}

export enum ExmResultRankByEnum {
  Class = "Class",
  Section = "Section",
}

export enum ExmResultPassByEnum {
  CASMark = "CASMark",
  PassMark = "PassMark",
}

export enum ExmResultSubjectPassByEnum {
  Indivisual = "Indivisual",
  Combined = "Combined",
}
