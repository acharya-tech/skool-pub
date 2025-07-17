import { useShow, useUpdate } from "@refinedev/core";
import {
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import {
  IStoreGroup,
  IStoreGroupMemberCreate,
} from "@inventory/interface";
import TransferList from "./transfer";
import { useEffect, useState } from "react";
import { INVENTORY_GROUP_URL, StoreGroupType } from "../constant";
import { FilterStudent } from "./component/filter.student";
import { LabelData } from "@components/other/label.data";
import { FilterEmployee } from "./component/filter.employee";
import { useRefineShow } from "@hooks/useShow";

export const GroupView = () => {
  const t = useTranslate(LANG_INVENTORY, "groups");
  const [memberSavedList, setSavedMembers] = useState<IStoreGroupMemberCreate[]>([]);
  const [memberList, setMembers] = useState<IStoreGroupMemberCreate[]>([]);
  const {
    query: { data, isLoading },
  } = useRefineShow<IStoreGroup>({
    resource: INVENTORY_GROUP_URL,
    meta: { customQuery: { students: true, employees: true } },
  });

  const record = data?.data;
  useEffect(() => {
    if (data?.data) {
      const studentMembers = data?.data?.students?.map(std => {
        return {
          student: std,
          id: std.id,
          type: StoreGroupType.Student
        } as IStoreGroupMemberCreate
      }) || []
      const employeeMembers = data?.data?.employees?.map(emp => {
        return {
          id: emp.id,
          employee: emp,
          type: StoreGroupType.Employee
        } as IStoreGroupMemberCreate
      }) || []
      setSavedMembers([...employeeMembers, ...studentMembers])
    }
  }, [data?.data])

  const { mutate } = useUpdate();

  const handleUpdate = (newMemberList: IStoreGroupMemberCreate[]) => {
    mutate({
      resource: INVENTORY_GROUP_URL,
      id: record?.id,
      values: {
        members: newMemberList
      }
    })
  }
  const defaultStudent = memberSavedList.filter(std => std.type == StoreGroupType.Student).map(std => std.id)
  const defaultEmployee = memberSavedList.filter(std => std.type == StoreGroupType.Employee).map(std => std.id)
  const memberListTemp = memberList.filter((member) => !(defaultStudent.includes(member.id) && member.type == StoreGroupType.Student))
    .filter((member) => !(defaultEmployee.includes(member.id) && member.type == StoreGroupType.Employee))

  return (
    <Box p={2}>
      <Stack direction={"row"} gap={2}>
        <LabelData label={t("fields.name")} value={record?.name} />
        <LabelData label={t("fields.type")} value={record?.type} />
      </Stack>
      <Divider sx={{ my: 2 }} />
      {record?.type == StoreGroupType.Student && (
        <FilterStudent setMembers={setMembers} />
      )}
      {record?.type == StoreGroupType.Employee && (
        <FilterEmployee setMembers={setMembers} />
      )}
      <Divider sx={{ my: 2 }} />
      <TransferList
        disabled={isLoading}
        memberList={memberListTemp}
        defaultList={memberSavedList}
        onSave={(members: IStoreGroupMemberCreate[]) => {
          handleUpdate(members)
        }} />
    </Box>
  );
};
