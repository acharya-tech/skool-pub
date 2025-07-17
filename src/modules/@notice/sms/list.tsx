import { useDelete, useUpdate, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { TableListProp } from "src/interfaces";
import { Stack } from "@mui/material";
import { Sms, Visibility } from "@mui/icons-material";
import { NOTICE_SMS_LIST } from "../constant/local.urls";
import { INoticeSms } from "../interface";
import { NOTICE_SMS_GROUP_URL } from "../constant/server.urls";
import { FaRegMessage } from "react-icons/fa6";
import { PropertiesDialog } from "./components/properties";
import { NoticeState } from "../component/common";
import { useConfirm } from "@hooks/confirm.hook";
import { ImCancelCircle } from "react-icons/im";
import { SmsStateEnum } from "../constant/enum";
import { DateTimeLabel } from "@components/label/date.label";
export const SmsListTable = ({ search }: TableListProp) => {
    const t = useTranslate(LANG_NOTICE, "sms");
    const { show } = useNav(NOTICE_SMS_LIST);


    const { mutate } = useUpdate()
    const [confirmCancel, ConfirmCancelEle] = useConfirm({
        onConfirm: (id) => {
            mutate({
                resource: NOTICE_SMS_GROUP_URL,
                id: id,
                values: {
                    state: SmsStateEnum.Canceled
                }
            })
        },
        confirmTitle: t("info.cancel")
    })


    const [smsDetail, setSmsDetail] = useState<INoticeSms | null>(null)
    const columns = useMemo<GridColDef<INoticeSms>[]>(
        () => [
            {
                field: "title",
                headerName: t("fields.title"),
                sortable: true,
            },
            {
                field: "total_audiance",
                headerName: t("fields.audiance"),
                sortable: true,
                width: 200
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
                field: "state",
                headerName: t("fields.state"),
                sortable: true,
                width: 200,
                renderCell: function render({ row }) {
                    return <NoticeState state={row.state} />
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
                                    color: "text.secondary",
                                }}
                                onClick={() => setSmsDetail(row)}
                            >
                                <FaRegMessage fontSize="small" />
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
        [t, setSmsDetail, show, confirmCancel]
    );
    const { dataGridProps, setFilters } = useDataGrid<INoticeSms, HttpError>({
        resource: NOTICE_SMS_GROUP_URL
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
            {smsDetail && <PropertiesDialog onClose={() => setSmsDetail(null)} sms={smsDetail} />}
            {ConfirmCancelEle}
        </>
    );
};
