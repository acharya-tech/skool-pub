import { useOne, useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { INoticeEmail, INoticeEmailMeta, INoticeMessageMeta } from "../interface";
import { NOTICE_EMAIL_GROUP_URL, NOTICE_EMAIL_META_URL } from "../constant/server.urls";
import { StatusEnum } from "@common/all.enum";
import { useConfirm } from "@hooks/confirm.hook";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { CardHeader } from "@mui/material";
import { CSSearch } from "@components/input";
import { useParams } from "react-router-dom";
import { ActiveStatusChip } from "@components/label/status.label";
import { EmailGroupView } from "./components/email.view";
import { NoticeState } from "../component/common";
import { BasicModal } from "@components/modal/basic.modal";
import { Visibility } from "@mui/icons-material";
export const EmailMetaView = () => {
    const t = useTranslate(LANG_NOTICE, "emailMeta");
    const { id } = useParams()
    const { data, isLoading } = useOne<INoticeEmail>({
        resource: NOTICE_EMAIL_GROUP_URL,
        id: id,
        meta: {
            customQuery: {
                user: true
            }
        }
    })
    const emailGroup = data?.data
    const [emailMessage, setEmailMessage] = useState<INoticeEmailMeta | null>(null)
    const [search, setSearch] = useState<string>("")
    const { mutate } = useUpdate()
    const [confirmInactive, ConfirmInactiveEle] = useConfirm({
        onConfirm: (smsMeta: INoticeMessageMeta) => {
            mutate({
                resource: NOTICE_EMAIL_META_URL,
                id: smsMeta.id,
                values: {
                    status: smsMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
                }
            })
        },
        confirmTitle: t("info.toggleState"),
    })




    const columns = useMemo<GridColDef<INoticeEmailMeta>[]>(
        () => [
            {
                field: "name",
                headerName: t("fields.name"),
                sortable: true,
                width: 300
            },
            {
                field: "email",
                headerName: t("fields.email"),
                sortable: true
            },
            {
                field: "state",
                headerName: t("fields.state"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return <NoticeState state={row.state} />
                }
            },
            {
                field: "status",
                headerName: t("fields.status"),
                sortable: true,
                width: 100,
                renderCell: function render({ row }) {
                    return <ActiveStatusChip status={row.status} key={row.id} />
                }
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row" >
                            <IconButton
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => setEmailMessage(row)}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: row.status == StatusEnum.Active ? "red" : "green",
                                }}
                                onClick={() => confirmInactive(row)}
                            >
                                {row.status == StatusEnum.Active ? <ImCancelCircle fontSize="small" /> : <FaRegCheckCircle fontSize={"small"} />}
                            </IconButton>
                        </Stack>
                    );
                },
            },
        ],
        [t, confirmInactive]
    );

    const { dataGridProps, setFilters } = useDataGrid<INoticeEmailMeta, HttpError>({
        meta: {
            customQuery: { group_id: emailGroup?.id }
        },
        resource: NOTICE_EMAIL_META_URL,
        queryOptions: {
            enabled: !!emailGroup
        }
    });

    useEffect(() => {
        setFilters([
            {
                field: "name",
                value: search,
                operator: "eq",
            }
        ]);
    }, [search]);

    return (
        <Box>
            <Card>
                <CardHeader
                    title={t("titles.show")}
                />
                <CardContent>
                    <EmailGroupView emailGroup={emailGroup} isLoading={isLoading} />
                </CardContent>
            </Card>
            <Divider sx={{ my: 2 }} />
            <Card>
                <CardHeader
                    title={t("titles.list")}
                    action={
                        <CSSearch value={search} onChange={setSearch} placeholder={t("@buttons.search")} />
                    }
                />
                <CardContent>
                    <TableGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowClassName={({ row }) => {
                            if (row.status === StatusEnum.Inactive) {
                                return "error-row"
                            }
                            return ""
                        }}
                    />
                </CardContent>
            </Card>
            {Boolean(emailMessage) &&
                <BasicModal
                    open={true}
                    title={emailMessage?.name}
                    onClose={() => setEmailMessage(null)}
                    footer={<>
                        <Box justifyContent={"flex-end"}>
                            <Button color="error" onClick={() => setEmailMessage(null)}>
                                {t("@buttons.close")}
                            </Button>
                        </Box>
                    </>}
                >
                    <Box>
                        <div dangerouslySetInnerHTML={{ __html: emailMessage?.message ?? "" }} />
                    </Box>
                </BasicModal>
            }
            {ConfirmInactiveEle}
        </Box>
    );
};
