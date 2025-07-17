import { StatusEnum, YesNoEnum } from "@common/all.enum";
import {
  NoticeScopeEnum,
  NoticeTemplateType,
  NoticeTypeEnum,
  NoticeUserTypeEnum,
  SmsStateEnum,
} from "../constant/enum";
import { IParent, IStudentInfo } from "@student/interface";
import { IStaff } from "@employee/interface";
import { NoticePreconditionTypes } from "./types";
import { IUser } from "src/interfaces";

export interface INoticeSms {
  id: string;
  title: string;
  message: string;
  schedule: string;
  total_audiance: number;
  state: SmsStateEnum;
  meta: INoticeSmsMeta[];
  countByState?: Record<SmsStateEnum, number>;
  created_at: string;
  user: IUser;
}
export interface INoticeSmsMeta {
  id: string;
  name: string;
  phone: string;
  message: string;
  meta: Record<string, string>;
  response: string;
  credit: number;
  staff_id: string;
  student_id: string;
  parent_id: string;
  group_id: string;
  student: IStudentInfo;
  parent: IParent;
  staff: IStaff;
  group: INoticeSms;
  state: SmsStateEnum;
  status: StatusEnum;
}
export interface INoticeEmail {
  id: string;
  title: string;
  message: string;
  schedule: string;
  total_audiance: number;
  state: SmsStateEnum;
  status: StatusEnum;
  meta: INoticeEmailMeta[];
  countByState?: Record<SmsStateEnum, number>;
  created_at: string;
  user: IUser;
}
export interface INoticeEmailMeta {
  id: string;
  name: string;
  email: string;
  message: string;
  meta: Record<string, string>;
  scope: NoticeScopeEnum;
  staff_id: string;
  student_id: string;
  parent_id: string;
  group_id: string;
  student: IStudentInfo;
  parent: IParent;
  staff: IStaff;
  group: INoticeEmail;
  state: SmsStateEnum;
  status: StatusEnum;
}

export interface INoticeMessage {
  id: string;
  title: string;
  message: string;
  schedule: string;
  total_audiance: number;
  state: SmsStateEnum;
  status: StatusEnum;
  meta: INoticeMessageMeta[];
  countByState?: Record<SmsStateEnum, number>;
  created_at: string;
  user: IUser;
}
export interface INoticeMessageMeta {
  id: string;
  name: string;
  message: string;
  meta: Record<string, string>;
  staff_id: string;
  student_id: string;
  parent_id: string;
  group_id: string;
  scope: NoticeScopeEnum;
  student: IStudentInfo;
  parent: IParent;
  staff: IStaff;
  group: INoticeMessage;
  status: StatusEnum;
}

export interface INoticeCreate {
  title: string;
  message: string;
  schedule: string;
  noticeTypes: NoticeTypeEnum[];
  audiances: INoticeAudience[];
  is_public: YesNoEnum;
}

export interface INoticeAudience {
  group: NoticeUserTypeEnum;
  precondition: NoticePreconditionTypes;
  message?: string;
  ids: string[];
}

export interface INoticeAudienceTemp {
  group: NoticeUserTypeEnum;
  name: string;
  uid: string;
  id: string;
  audiance: any;
}

export interface INoticeTemplate {
  id: string;
  name: string;
  template: string;
  type: NoticeTemplateType;
  status: StatusEnum;
}
