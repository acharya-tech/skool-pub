import { NoticeTemplateVariable, NoticeUserTypeEnum } from "../constant/enum";

export function getNoticeTemplateVariables(
  types: NoticeUserTypeEnum[]
): string[] {
  const allValues = types.flatMap((type) => NoticeTemplateVariable[type] || []);
  return Array.from(new Set(allValues));
}
