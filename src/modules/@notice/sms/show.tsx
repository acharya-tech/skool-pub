import { useOne, useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Box, Button, Card, CardContent, Divider, Stack } from "@mui/material";
import { INoticeEmailMeta, INoticeSms, INoticeSmsMeta } from "../interface";
import { NOTICE_SMS_GROUP_URL, NOTICE_SMS_META_URL } from "../constant/server.urls";
import { NoticeState } from "../component/common";
import { StatusEnum } from "@common/all.enum";
import { useConfirm } from "@hooks/confirm.hook";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { SmsGroupView } from "./components/sms.view";
import { CardHeader } from "@mui/material";
import { FaRepeat } from "react-icons/fa6";
import { CSSearch } from "@components/input";
import { SmsStateEnum } from "../constant/enum";
import { useParams } from "react-router-dom";
import { ActiveStatusChip } from "@components/label/status.label";
import { BasicModal } from "@components/modal/basic.modal";
import { Visibility } from "@mui/icons-material";
export const SmsMetaView = () => {
    const t = useTranslate(LANG_NOTICE, "smsMeta");
    const { id } = useParams()
    const { data, isLoading } = useOne<INoticeSms>({
        resource: NOTICE_SMS_GROUP_URL,
        id: id,
        meta: {
            customQuery: {
                user: true
            }
        }
    })
    const smsGroup = data?.data
    const [search, setSearch] = useState<string>("")
    const { mutate } = useUpdate()
    const [confirmInactive, ConfirmInactiveEle] = useConfirm({
        onConfirm: (smsMeta: INoticeSmsMeta) => {
            mutate({
                resource: NOTICE_SMS_META_URL,
                id: smsMeta.id,
                values: {
                    status: smsMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
                }
            })
        },
        confirmTitle: t("info.toggleState"),
    })

    const [confirmResend, ConfirmResendEle] = useConfirm({
        onConfirm: (id) => {
            mutate({
                resource: NOTICE_SMS_META_URL,
                id: id,
                values: {
                    state: SmsStateEnum.Pending,
                    status: StatusEnum.Active
                }
            })
        },
        confirmTitle: t("info.resend")
    })

    const columns = useMemo<GridColDef<INoticeSmsMeta>[]>(
        () => [
            {
                field: "name",
                headerName: t("fields.name"),
                sortable: true,
                width: 300
            },
            {
                field: "phone",
                headerName: t("fields.phone"),
                sortable: true,
            },
            {
                field: "credit",
                headerName: t("fields.credit"),
                sortable: true,
                width: 100
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
                                    color: row.status == StatusEnum.Active ? "red" : "green",
                                }}
                                onClick={() => confirmInactive(row)}
                            >
                                {row.status == StatusEnum.Active ? <ImCancelCircle fontSize="small" /> : <FaRegCheckCircle fontSize={"small"} />}
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => setSmsMessage(row)}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                            {![SmsStateEnum.Pending, SmsStateEnum.Inprogress].includes(row.state)
                                &&
                                <IconButton
                                    sx={{
                                        color: "green",
                                    }}
                                    onClick={() => confirmResend(row)}
                                >
                                    <FaRepeat />
                                </IconButton>
                            }
                        </Stack>
                    );
                },
            },
        ],
        [t, confirmInactive, confirmResend]
    );

    const { dataGridProps, setFilters } = useDataGrid<INoticeSms, HttpError>({
        meta: {
            customQuery: { group_id: smsGroup?.id }
        },
        resource: NOTICE_SMS_META_URL,
        queryOptions: {
            enabled: !!smsGroup
        }
    });

    useEffect(() => {
        setFilters([
            {
                field: "name",
                value: search,
                operator: "eq",
            },
            {
                field: "phone",
                value: search,
                operator: "eq",
            }
        ]);
    }, [search]);

    const [smsMessage, setSmsMessage] = useState<INoticeSmsMeta | null>(null)

    return (
        <Box>
            <Card>
                <CardHeader
                    title={t("titles.show")}
                />
                <CardContent>
                    <SmsGroupView smsGroup={smsGroup} isLoading={isLoading} />
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
            {Boolean(smsMessage) &&
                <BasicModal
                    open={true}
                    title={smsMessage?.name}
                    onClose={() => setSmsMessage(null)}
                    footer={<>
                        <Box justifyContent={"flex-end"}>
                            <Button color="error" onClick={() => setSmsMessage(null)}>
                                {t("@buttons.close")}
                            </Button>
                        </Box>
                    </>}
                >
                    <Box>
                        <div dangerouslySetInnerHTML={{ __html: smsMessage?.message ?? "" }} />
                    </Box>
                </BasicModal>
            }
            {ConfirmResendEle}
            {ConfirmInactiveEle}
        </Box>
    );
};
