import { IFileResponse } from "src/interfaces";
import {
  CollectionAccess,
  CollectionType,
} from "../constant/enum";
import { FileCategoryEnum, YesNoEnum } from "@common/all.enum";
import { IUser } from 'src/interfaces';

export interface IRepoStarred {
  collection: IRepoCollection;
  user_id: string;
  collection_id: string;
}

export interface IRepoCollection {
  id: string;
  label: string;
  path: string;
  view_count?: number;
  user_id?: string;
  access_type: CollectionAccess;
  create_at?: string;
  file?: IFileResponse;
  file_count: number;
  parent_id: string;
  tags?: string[];
  type: CollectionType;
  user?: IUser;
  metadata?: Record<string, any>;
  parent?: IRepoCollection;
  shared?: IUser[];
  starred?: IRepoStarred;
  is_deleted: YesNoEnum;
  deleted_at?: string;
  updated_at?: string;
  children?: IRepoCollection[];
}

export interface IRepoFileUpload {
  files: IFileResponse[];
  type: CollectionType;
  parent: IRepoCollection;
}

export interface IRepoStorageUsed {
  file_size: number;
  file_type: FileCategoryEnum;
  file_count: number;
}

export interface IRepoStorageConfig {
  storageLimit: number;
  storageUsed: number;
  repositoryFlag: boolean;
}
