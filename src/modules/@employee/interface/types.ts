import { TableListProp } from "src/interfaces";
import { IBatch, IClass, ISection } from "@academic/interface";
// import { IStudentFilter, IStudentSearch, IStudentSelection } from ".";

export type StepFormProps = {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  onClose?: () => void;
  staffId: number | undefined;
  setStaff?: (staff: any) => void;
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
