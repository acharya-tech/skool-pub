import { useList, useUpdate } from "@refinedev/core";
import {
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import TransferList from "./transfer";
import { EMPLOYEE_GROUP_URL, EMPLOYEE_STAFF_URL } from "../constant";
import { LabelData } from "@components/other/label.data";
import { IEmpGroup, IStaff } from "../interface";
import { useRefineShow } from "@hooks/useShow";
import { StatusEnum } from "@common/all.enum";

export const GroupView = () => {
  const t = useTranslate(LANG_INVENTORY, "groups");
  const {
    query: { data, isLoading },
  } = useRefineShow<IEmpGroup>({
    meta: { customQuery: { staffs: true } },
  });
  const record = data?.data;

  const {
    data: memberData } = useList<IStaff>({
      resource: EMPLOYEE_STAFF_URL,
      meta: { customQuery: { post: true, status: StatusEnum.Active } },
      queryOptions: {
        enabled: Boolean(record?.id)
      }
    });
  const defaultList = record?.staffs?.map(staff => {
    return staff.id
  }) ?? []
  const memberListTemp = memberData?.data.filter((member) => !(defaultList?.includes(member.id)))
  const { mutate } = useUpdate();

  const handleUpdate = (newMemberList: IStaff[]) => {
    mutate({
      resource: EMPLOYEE_GROUP_URL,
      id: record?.id,
      values: {
        staffs: newMemberList
      }
    })
  }

  return (
    <Box p={2}>
      <Stack direction={"row"} gap={2}>
        <LabelData label={t("fields.name")} value={record?.name} />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <TransferList
        disabled={isLoading}
        memberList={memberListTemp ?? []}
        defaultList={record?.staffs ?? []}
        onSave={(members: IStaff[]) => {
          handleUpdate(members)
        }} />
    </Box>
  );
};
