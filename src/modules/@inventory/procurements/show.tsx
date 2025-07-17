import { HttpError, useDelete, useList, useShow } from "@refinedev/core";
import {
  Button,
  Grid2 as Grid,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Avatar,
} from "@mui/material";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_INVENTORY } from "@common/constant";
import { IStoreComment, IStoreProcurement } from "@inventory/interface";
import { DateLabel, DateTimeLabel } from "@components/label/date.label";
import { FaPaperPlane } from "react-icons/fa6";
import { Nullable } from "src/interfaces";
import {
  INVENTORY_COMMENT_LIST,
  INVENTORY_PROCUREMENT_URL,
} from "@inventory/constant";
import { CSHiddenInput, CSInput } from "@components/input";
import { ActiveStatusChip } from "@components/label/status.label";
import { CsLabel } from "@components/label";
import { TextLabel } from "@components/other/text.label";
import { Stack } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useConfirm } from "@hooks/confirm.hook";
import { useRefineForm } from "@hooks/useForm";
import { useRefineShow } from "@hooks/useShow";

const CommentBox = styled(Paper)(({ theme }) => ({
  padding: "16px",
  marginTop: "16px",
  borderRadius: "8px",
  backgroundColor: "#F9F9F9",
}));

const CommentInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "16px",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: "#FFFFFF",
}));

export const ProcurementView = () => {
  const t = useTranslate(LANG_INVENTORY, "procurement");
  const {
    query: { data, isLoading },
  } = useRefineShow<IStoreProcurement>({
    resource: INVENTORY_PROCUREMENT_URL,
    meta: { customQuery: { user: true } },
  });
  const record = data?.data;
  const { data: commentData, refetch } = useList<IStoreComment>({
    resource: INVENTORY_COMMENT_LIST,
    pagination: {
      pageSize: 1000,
    },
    meta: { customQuery: { procurement_id: record?.id, user: true } },
    queryOptions: {
      enabled: !!record,
    },
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading: isFormLoading },
    refineCore: { onFinish, query },
    reset,
    saveButtonProps,
  } = useRefineForm<IStoreComment, HttpError, Nullable<IStoreComment>>({
    defaultValues: {
      procument_id: record?.id
    },
    refineCoreProps: {
      resource: INVENTORY_COMMENT_LIST,
      redirect: false,
      action: "create",
      onMutationSuccess: () => {
        refetch()
        reset({ comment: "", procument_id: record?.id })
      },
      queryOptions: {
        enabled: !!record
      }
    },

  });

  const { mutate } = useDelete()
  const [confirmDelete, confirmEle] = useConfirm({
    confirmTitle: t("info.deleteComment"),
    onConfirm: (comment) => {
      mutate({
        resource: INVENTORY_COMMENT_LIST,
        id: comment.id
      }, {
        onSuccess: () => {
          refetch()
        }
      })
    }
  })

  return (
    <>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.proc_regid")} /></TableCell>
                  <TableCell><TextLabel text={record?.proc_regid} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.name")} /></TableCell>
                  <TableCell><TextLabel text={record?.name} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.entry_date")} /></TableCell>
                  <TableCell><TextLabel text={<DateTimeLabel date={record?.entry_date} />} isLoading={isLoading} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.type")} /></TableCell>
                  <TableCell><TextLabel text={record?.type} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.user")} /></TableCell>
                  <TableCell><TextLabel text={record?.user?.name} isLoading={isLoading} /></TableCell>
                  <TableCell><CsLabel text={t("fields.status")} /></TableCell>
                  <TableCell><ActiveStatusChip status={record?.status} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><CsLabel text={t("fields.remark")} /></TableCell>
                  <TableCell colSpan={9}><TextLabel text={record?.remark} isLoading={isLoading} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Paper elevation={4} sx={{ mt: 5 }}>
        <Grid container spacing={2} p={2}>
          <Grid size={12}>
            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
              {t("titles.comments")}
            </Typography>
            <form
              onSubmit={handleSubmit((data) => {
                onFinish(data);
              })}
            >
              <CommentInputBox>
                <Grid container spacing={2}>
                  <Grid size={12} >
                    <CSInput
                      name="comment"
                      label={t("fields.comment")}
                      required
                      fullWidth
                      control={control}
                      errors={errors}
                    />
                    <CSHiddenInput
                      name="procument_id"
                      // defaultValue={record?.id}
                      control={control}
                    />
                  </Grid>
                </Grid>
                <IconButton {...saveButtonProps} color="primary">
                  <FaPaperPlane />
                </IconButton>
              </CommentInputBox>
            </form>
            {commentData?.data?.map((comment) => (
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginTop: 2,
                  p: 2,
                  borderRadius: '16px',
                  boxShadow: 3,
                  backgroundColor: '#f0f4f8',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 20,
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '10px 10px 0 0',
                    borderColor: '#f0f4f8 transparent transparent transparent',
                  },
                }}
              >
                <Avatar src={comment.user?.image?.url} alt={comment.user.name} sx={{ width: 48, height: 48, mr: 2 }} />
                <Box width={'100%'}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {comment.user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, mb: 1.5, wordWrap: 'break-word', color: 'text.secondary' }}
                  >
                    {comment.comment}
                  </Typography>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
                    <div>
                      <Typography fontSize={'small'} sx={{ color: 'text.disabled' }} display={'flex'}>
                        <DateLabel date={comment.created_at} />
                      </Typography>
                    </div>
                    <IconButton disabled={isFormLoading || isLoading} onClick={() => confirmDelete(comment)} size='small'><DeleteOutline color='error' fontSize='small' /></IconButton>
                  </Stack>
                </Box>
              </Card>
            ))}
          </Grid>
        </Grid>
        {confirmEle}
      </Paper>
    </>
  );
};
