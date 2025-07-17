import { useOne, useUpdate, type HttpError } from "@refinedev/core";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_NOTICE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { Box, Card, CardContent, Divider, Stack } from "@mui/material";
import { INoticeMessage, INoticeMessageMeta } from "../interface";
import { NOTICE_NOTICE_GROUP_URL, NOTICE_NOTICE_META_URL } from "../constant/server.urls";
import { StatusEnum } from "@common/all.enum";
import { useConfirm } from "@hooks/confirm.hook";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { CardHeader } from "@mui/material";
import { CSSearch } from "@components/input";
import { useParams } from "react-router-dom";
import { ActiveStatusChip } from "@components/label/status.label";
import { NoticeGroupView } from "./components/notice.view";
export const NoticeMetaView = () => {
    const t = useTranslate(LANG_NOTICE, "noticeMeta");
    const { id } = useParams()
    const { data, isLoading } = useOne<INoticeMessage>({
        resource: NOTICE_NOTICE_GROUP_URL,
        id: id,
        meta: {
            customQuery: {
                user: true
            }
        }
    })
    const noticeGroup = data?.data
    const [search, setSearch] = useState<string>("")
    const { mutate } = useUpdate()
    const [confirmInactive, ConfirmInactiveEle] = useConfirm({
        onConfirm: (smsMeta: INoticeMessageMeta) => {
            mutate({
                resource: NOTICE_NOTICE_META_URL,
                id: smsMeta.id,
                values: {
                    status: smsMeta.status == StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
                }
            })
        },
        confirmTitle: t("info.toggleState"),
    })


    const columns = useMemo<GridColDef<INoticeMessageMeta>[]>(
        () => [
            {
                field: "name",
                headerName: t("fields.name"),
                sortable: true,
                width: 300
            },
            {
                field: "message",
                headerName: t("fields.message"),
                sortable: true
            },
            {
                field: "scope",
                headerName: t("fields.scope"),
                sortable: true,
                width: 100
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
                        </Stack>
                    );
                },
            },
        ],
        [t, confirmInactive]
    );

    const { dataGridProps, setFilters } = useDataGrid<INoticeMessageMeta, HttpError>({
        meta: {
            customQuery: { group_id: noticeGroup?.id }
        },
        resource: NOTICE_NOTICE_META_URL,
        queryOptions: {
            enabled: !!noticeGroup
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
                    <NoticeGroupView noticeGroup={noticeGroup} isLoading={isLoading} />
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
            {ConfirmInactiveEle}
        </Box>
    );
};
