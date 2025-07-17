import { ATFormProps, IFileResponse } from "src/interfaces";
import { DataKeyType, DataTypeEnum, ModuleNameEnum } from "../constant/enum";
import { IItem, ITemplateData } from "src/editor/interface";
import { YesNoEnum } from "@common/all.enum";

export interface IDataValue {
  id: string;
  name: string;
  module: ModuleNameEnum;
  module_id?: number;
  data_key?: DataKeyType;
  data_type: DataTypeEnum;
  can_clone: YesNoEnum;
  data_value?:
    | string
    | number
    | boolean
    | object
    | Array<any>
    | null
    | ITemplateData;
  constrants?: object;
  file?: IFileResponse;
}

export type IDataValueFormProps = {
  refineCore: { onFinish: any; query: any };
  setData: (data: string) => void;
  handleSubmit: any;
  control: any;
  formState: { errors: any };
  saveButtonProps: any;
  onFinish: any;
} & Partial<ATFormProps>;

export type IDataValueCreateFormProps = {
  clone?: IDataValue;
} & Partial<ATFormProps>;
