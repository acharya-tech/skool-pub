import { BloodGroupEnum, CasteEnum, EthnicGroupEnum, GenderEnum, NationalityEnum, ReligionEnum } from "@common/all.enum";
import { GridColDef } from "@mui/x-data-grid";
import { EditImportStudentField } from "@student/admission/components/editStudentField";
import { ParentRelationEnum, StudentAcademicTypeEnum } from "@student/constant";
import { StudentColumnAttributes, StudentImportColumnType } from "@student/interface/types";
import NepaliDate from 'nepali-date-converter'

const genderList = Object.keys(GenderEnum)
const bloodGroupList = Object.keys(BloodGroupEnum)
const casteList = Object.keys(CasteEnum)
const religionList = Object.keys(ReligionEnum)
const ethnicList = Object.keys(EthnicGroupEnum)
const nationalityList = Object.keys(NationalityEnum)
const academicList = Object.keys(StudentAcademicTypeEnum)
const studentParentRelation = Object.keys(ParentRelationEnum)

function transferEnum(value: string, column: string, attributes: StudentColumnAttributes) {
  let trimmed = value.trim().toLocaleLowerCase()
  let defaultValue = column === "select" ? "Select" : "";
  const matched = (attributes.options ?? []).find((value) => value.toLowerCase() === trimmed)
  if (matched) {
    return matched
  }
  return defaultValue
}
function transformGender(value: string) {
  let trimmed = value.trim().toLocaleLowerCase()
  if (trimmed === "m") {
    trimmed = GenderEnum.Male.toLocaleLowerCase()
  } else if (trimmed === "f") {
    trimmed = GenderEnum.Female.toLocaleLowerCase()
  } else if (trimmed === "o") {
    trimmed = GenderEnum.Other.toLocaleLowerCase()
  }
  const matched = genderList.find((gender) => gender.toLowerCase() === trimmed)
  if (matched) {
    return matched
  }
  return GenderEnum.Unknown
}

function transformDate(value: string | number): string {
  if (!value) return "";

  // Try parsing as number (Excel serial date)
  const serial = Number(value);
  if (!isNaN(serial) && serial > 59 && serial < 60000) {
    // Excel bug: skips 1900 leap year (Feb 29, 1900 doesn't exist)
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Dec 30, 1899
    const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
  }

  // Fallback to parsing as ISO or normal date string
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
}


function transformDateBS(value: string | number): string {
  if (!value) return "";

  // Try parsing as number (Excel serial date)
  const serial = Number(value);
  if (!isNaN(serial) && serial > 59 && serial < 60000) {
    // Excel bug: skips 1900 leap year (Feb 29, 1900 doesn't exist)
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Dec 30, 1899
    const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
  }
  const dates = value.toString().split("-")
  console.log(dates, value, 'dates')
  if (dates.length == 3) {
    if (+dates[0] > 2025) {
      const nepaliDate = new NepaliDate(value).getAD();
      return `${nepaliDate.year}-${(nepaliDate.month + 1).toString().padStart(2, "0")}-${nepaliDate.date.toString().padStart(2, "0")}`
    }

  }
  // Fallback to parsing as ISO or normal date string
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
}


function transformRegid(value: string | number) {
  if (!value) return ""
  if (typeof value === "number") return value
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}


export const STUDENT_IMPORT_REQUIRED_COLUMN = [
  "STUDENT_NAME",
  // "STUDENT_DOB",
  "FATHER_NAME",
  // "FATHER_PHONE",
  // "MOTHER_NAME",
  // "MOTHER_PHONE"
]

export const STUDENT_IMPORT_COLUMN: StudentImportColumnType = {
  STUDENT_REGID: { required: false, type: "number", transform: transformRegid },
  STUDENT_UID: { required: false, type: "text" },
  STUDENT_ROLL: { required: false, type: "text" },
  STUDENT_SECTION: { required: false, type: "text" },
  STUDENT_NAME: { required: true, type: "text", width: 250 },
  STUDENT_GENDER: { required: false, type: "select", options: genderList, transform: transformGender },
  STUDENT_PHONE: { required: false, type: "text", length: 10 },
  STUDENT_DOB: { required: true, type: "date", format: "YYYY-MM-DD", transform: transformDateBS },
  // STUDENT_DOB_BS: { required: true, type: "date", format: "YYYY-MM-DD", transform: transformDateBS },
  STUDENT_ADMIT: { required: false, type: "date", format: "YYYY-MM-DD", transform: transformDate },
  FATHER_NAME: { required: ["GUARDINA_NAME", "MOTHER_NAME"], type: "text", width: 250 },
  FATHER_PHONE: { required: ["GUARDINA_PHONE", "MOTHER_PHONE"], type: "text", length: 10 },
  MOTHER_NAME: { required: ["GUARDINA_NAME", "FATHER_NAME"], type: "text", width: 250 },
  MOTHER_PHONE: { required: ["GUARDINA_PHONE", "FATHER_PHONE"], type: "text", length: 10 },
  GUARDINA_RELATION: { required: ["FATHER_NAME", "MOTHER_NAME"], type: "select", options: studentParentRelation, transform: transferEnum },
  GUARDINA_NAME: { required: ["FATHER_NAME", "MOTHER_NAME"], type: "text", width: 250 },
  GUARDINA_PHONE: { required: ["FATHER_PHONE", "MOTHER_PHONE"], type: "text", length: 10 },
  STUDENT_ADDRESS: { required: true, type: "text", width: 250 },
  STUDENT_HOUSE: { required: false, type: "select", options: [], transform: transferEnum },
  STUDENT_BLOOD: { required: false, type: "select", options: bloodGroupList, transform: transferEnum },
  STUDENT_CASTE: { required: false, type: "select", options: casteList, transform: transferEnum },
  STUDENT_RELIGION: { required: false, type: "select", options: religionList, transform: transferEnum },
  STUDENT_ETHNIC: { required: false, type: "select", options: ethnicList, transform: transferEnum },
  STUDENT_NATION: { required: false, type: "select", options: nationalityList, transform: transferEnum },
  ACADEMIC_TYPE: { required: false, type: "select", options: academicList, transform: transferEnum },
  ACADEMIC_FROM: { required: false, type: "text", width: 250 },
  ACADEMIC_DATE: { required: false, type: "date", format: "YYYY-MM-DD", transform: transformDate },
  ACADEMIC_SYMBOL: { required: false, type: "text" },
  ACADEMIC_SCORE: { required: false, type: "number" },
};

export const validateStudentRow = (row: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [key, config] of Object.entries(STUDENT_IMPORT_COLUMN)) {
    const value = row[key];

    if (config.required === true) {
      if (!value || value.toString().trim() === "") {
        errors[key] = "Required";
      }
    } else if (Array.isArray(config.required)) {
      const allFallbackEmpty = config.required.every(
        (k) => !row[k] || row[k].toString().trim() === ""
      );
      if (allFallbackEmpty && (!value || value.toString().trim() === "")) {
        errors[key] = `Required if ${config.required.join(" or ")} are missing`;
      }
    }
  }

  return errors;
};

export const validateStudentCell = (column: string, value: string, row: Record<string, any>): string => {
  let error: string = ""

  const config = STUDENT_IMPORT_COLUMN[column as keyof typeof STUDENT_IMPORT_COLUMN];
  if (!config) return ""
  if (config.required === true) {
    if (!value || value.toString().trim() === "") {
      error = "Required";
    }
  } else if (Array.isArray(config.required)) {
    const allFallbackEmpty = config.required.every(
      (k) => !row[k] || row[k].toString().trim() === ""
    );
    if (allFallbackEmpty && (!value || value.toString().trim() === "")) {
      error = `Required if ${config.required.join(" or ")} are missing`;
    }
  } else if (config.length) {
    if (value.length !== config.length) {
      error = `Length should be ${config.length}`
    }
  }

  return error;
};



export const generateStudentColumns = (presentFields: string[]): GridColDef[] => {
  return presentFields.map((field) => {
    const config = STUDENT_IMPORT_COLUMN[field as keyof typeof STUDENT_IMPORT_COLUMN];

    const col: GridColDef = {
      field,
      headerName: field.replace(/_/g, " "),
      editable: true,
      minWidth: config.width ?? 150,
      renderEditCell: (params) => {
        return <EditImportStudentField {...params} config={config} />
      },
    };

    if (config.type === "select") col.type = "singleSelect";
    else if (config.type === "number") col.type = "number";
    else col.type = "string";

    return col;
  });
};



