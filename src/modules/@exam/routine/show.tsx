import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_EXAM } from "@common/constant";
import { IExmRoutine } from "../interface";
import { CanAccess, useUpdate } from "@refinedev/core";
import { RoutineView } from "./component/routine.view";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SubjectViewList } from "./component/subject.view.list";
import { BasicModal } from "@components/modal/basic.modal";
import { RoutineEditForm } from "./_edit";
import { useState } from "react";
import { ExmRoutinePostStatusEnum } from "../constant/enum";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { EXAM_ROUTINE_URL } from "../constant/service.urls";
import LoadingWrapper from "@components/other/loading";
import { useRefineShow } from "@hooks/useShow";
import { EXAM_RESULT_LIST, EXAM_ROUTINE_LIST } from "@exam/constant/local.urls";

export const RoutineDetail = () => {
  const t = useTranslate(LANG_EXAM, "routine");
  const [isEditing, setEditing] = useState(false)
  const { query: { data, isLoading } } = useRefineShow<IExmRoutine>({
    resource: EXAM_ROUTINE_URL,
    meta: {
      customQuery: {
        class: true,
        batch: true,
        type: true,
        esubjects: true,
        template: true,
        markLedgerTemplate: true,
        gradeLedgerTemplate: true,
        rule: true,
      }
    }
  })

  const { mutate } = useUpdate()

  const handleGenerate = () => {

    mutate({
      resource: EXAM_ROUTINE_URL,
      id: data?.data?.id,
      values: {
        state: ExmRoutinePostStatusEnum.Preparing
      }
    })
  }

  return (
    <LoadingWrapper value={data?.data}>
      <Card>
        <CardHeader
          title={t("titles.show")}
          action={
            <Stack direction={"row"} spacing={1}>
              <CanAccess resource={EXAM_RESULT_LIST} action="create">
                <IconButton
                  key={"publish"}
                  size='small'
                  sx={{
                    color: "green",
                  }}
                  disabled={![ExmRoutinePostStatusEnum.Ready, ExmRoutinePostStatusEnum.Completed, ExmRoutinePostStatusEnum.Preparing].includes(data?.data?.state!)}
                  onClick={handleGenerate}
                >
                  <MdOutlinePublishedWithChanges />
                </IconButton>
              </CanAccess>
              <CanAccess resource={EXAM_ROUTINE_LIST} action="update">
                <IconButton
                  key={"edit"}
                  size='small'
                  sx={{
                    color: "text.secondary",
                  }}
                  onClick={() => setEditing(true)}
                  disabled={[ExmRoutinePostStatusEnum.Completed, ExmRoutinePostStatusEnum.Published, ExmRoutinePostStatusEnum.Preparing].includes(data?.data?.state!)}
                >
                  <EditOutlinedIcon fontSize='small' />
                </IconButton>
              </CanAccess>
            </Stack>
          }
        />
        <CardContent>
          <RoutineView routine={data?.data} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Divider sx={{ my: 2 }} />
      <Card>
        <CardHeader
          title={t("titles.subjects")}
        />
        <CardContent>
          <SubjectViewList routine_id={data?.data?.id} />
        </CardContent>
      </Card>
      <BasicModal
        onClose={() => setEditing(false)}
        open={isEditing}
      >
        <RoutineEditForm action="edit" id={data?.data?.id} onClose={() => setEditing(false)} />
      </BasicModal >
    </LoadingWrapper>
  )
};
