import { TableListProp } from "src/interfaces";
import { IBatch, IClass, ISection } from "@academic/interface";
import { IStudentFilter, IStudentSearch, IStudentSelection } from ".";

export type StepFormProps = {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  onClose?: () => void;
  admissionId: string | undefined;
  setAdmission?: (student: any) => void;
};

export type FormGridInputProps = {
  control: any;
  errors: any;
};

export type StepFormGridInputProps = FormGridInputProps & {
  index: number;
  name: string;
  field?: any;
  add?: any;
};

export interface ITransferForm {
  fromBatch?: IBatch;
  fromClass?: IClass;
  fromSection?: ISection;
  toBatch?: IBatch;
  toClass?: IClass;
  toSection?: ISection;
  students: string[];
}

export type StudentTableListProp = TableListProp & {
  advanceFilter: IStudentSearch;
  setLoading?: (loading: boolean) => void;
};

export type StudentColumnAttributes = {
  required: string[] | boolean;
  type: string;
  width?: number;
  format?: string;
  length?: number;
  options?: string[];
  transform?: (
    value: any,
    column: string,
    attribute: StudentColumnAttributes
  ) => any;
};

export type StudentImportColumnType = {
  [key: string]: StudentColumnAttributes;
};
