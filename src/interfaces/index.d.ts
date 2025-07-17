import type { Dayjs } from "dayjs";
import { Gender } from "../common/all.enum";
import { SaveButtonProps } from "@refinedev/mui";
import { StatusEnum } from "@common/all.enum";
import { IStaff } from "@employee/interface";

export interface IUser {
  id: string;
  name: string;
  address: string;
  image?: IFileResponse;
  email: string;
  phone: string;
  staff?: any;
  status: StatusEnum;
  account_type: string;
  roles: any[];
}
export interface IRecord {
  id: string;
  status: StatusEnum;
  read?: YesNo;
  [key: string]: string | number | any;
}

type INakedFunction = (values: object) => void;

type IStatusHook = [IRecord, INakedFunction, boolean];

export type ATFormProps = {
  id?: BaseKey;
  open?: boolean;
  action: "create" | "edit";
  onClose?: any;
  setActionProps?: (props: SaveButtonProps) => void;
  onMutationSuccess?: any;
  defaultValues?: any;
};

export type DialogSaveButtonProps = SaveButtonProps & {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type TableListProp = {
  search?: string;
};

export interface IResourceRecord {
  resource?: string;
  record: IRecord;
}

export interface ISwitcher {
  resource?: string;
  record: IRecord;
}

interface ITextEditor {
  value?: string;
  onChange?: Function;
  plugins?: string;
  menubar?: string;
  toolbar?: string;
  options?: {};
}

export interface IUploadImage {
  reset?: boolean;
  title: string;
  validation?: string;
  avatar?: UploadFile;
  accept?: string;
  onRemove?: FunctionWithIFileArgument;
  onChange?: FunctionWithIFileArgument;
  fileList?: IFile;
}

export interface ICoordinate {
  lat: string;
  lng: string;
}

export interface IExtraAddress {
  name: string;
  placeId: string;
  coordinates?: ICoordinate;
  city?: string;
  country?: string;
  state?: string;
}

export interface IFileResponse {
  id?: string;
  uid: string;
  name: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

export interface IFile {
  lastModified?: number;
  name: string;
  percent?: number;
  size: number;
  status?: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid?: string;
  url: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type ExcelJsonType = Record<string, string>[];

export interface IAcademicYear {
  name: string;
}

export interface IDataActivityReportDto {
  name: string;
  categories: string[];
  data: {
    name: string;
    data: number[];
  }[];
}

export class IPieReportDto {
  name: string;
  data: {
    label: string;
    value: number;
  }[];
}

export interface ILanguageFlags {
  code: string;
  name: string;
  flag: string;
}
