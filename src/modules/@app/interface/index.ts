import { StatusEnum } from "@common/all.enum";
import { RoleAccessEnum } from "../constant/enums";
import { IUser } from "src/interfaces";

export interface IRoles {
  id: string;
  name: string;
  description: string;
  users?: IUser[];
  permissions: IPermission[];
  status: StatusEnum;
}

export interface IPermission {
  title: string;
  path: string;
  access: RoleAccessEnum[];
}

export interface IResourceRoute {
  title: string;
  path: string;
  can?: RoleAccessEnum[];
  children: IResourceRoute[];
}

export interface IApplicationResources {
  [key: string]: IResourceRoute;
}
