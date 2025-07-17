import { useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { NOTICE_NOTICE_LIST, NOTICE_SMS_LIST } from "../constant/local.urls";
import { INoticeMessage, INoticeSms } from "../interface";
import { NOTICE_NOTICE_GROUP_URL, NOTICE_SMS_GROUP_URL } from "../constant/server.urls";
import { FaRegMessage } from "react-icons/fa6";
import { NoticeState } from "../component/common";
import { useConfirm } from "@hooks/confirm.hook";
import { ImCancelCircle } from "react-icons/im";
import { SmsStateEnum } from "../constant/enum";
import { DateTimeLabel } from "@components/label/date.label";
import { ActiveStatusChip } from "@components/label/status.label";
export const NoticeListTable = ({ search }: TableListProp) => {
    const t = useTranslate(LANG_NOTICE, "notice");
    const { show } = useNav(NOTICE_NOTICE_LIST);

    const { mutate } = useUpdate()
    const [confirmCancel, ConfirmCancelEle] = useConfirm({
        onConfirm: (id) => {
            mutate({
                resource: NOTICE_NOTICE_GROUP_URL,
                id: id,
                values: {
                    state: SmsStateEnum.Canceled
                }
            })
        },
        confirmTitle: t("info.cancel")
    })

    const columns = useMemo<GridColDef<INoticeMessage>[]>(
        () => [
            {
                field: "title",
                headerName: t("fields.title"),
                sortable: true,
            },
            {
                field: "created_at",
                headerName: t("fields.created_at"),
                sortable: true,
                width: 200,
                renderCell: function render({ row }) {
                    return <DateTimeLabel date={row.created_at} />
                }
            },
            {
                field: "status",
                headerName: t("fields.status"),
                sortable: true,
                width: 200,
                renderCell: function render({ row }) {
                    return <ActiveStatusChip status={row.status} />
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
                                onClick={() => show(row.id)}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "red",
                                }}
                                onClick={() => confirmCancel(row.id)}
                            >
                                <ImCancelCircle fontSize="small" />
                            </IconButton>
                        </Stack>
                    );
                },
            },
        ],
        [t, show, confirmCancel]
    );
    const { dataGridProps, setFilters } = useDataGrid<INoticeMessage, HttpError>({
        resource: NOTICE_NOTICE_GROUP_URL
    });

    useEffect(() => {
        setFilters([
            {
                field: "title",
                value: search,
                operator: "eq",
            }
        ]);
    }, [search]);

    return (
        <>
            <TableGrid {...dataGridProps} columns={columns} />
            {ConfirmCancelEle}
        </>
    );
};
