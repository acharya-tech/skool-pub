import {
    type HttpError
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { DeleteButton, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import { LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { Stack, Typography } from "@mui/material";
import { TableListProp } from "src/interfaces";
import { IRoute, IRouteLocation, IVehicleStudent } from "../../interface";
import { VEHICLE_STUDENT_URL } from "../../constant";


type StudentLocationListTableProps = TableListProp & {
    active?: IRouteLocation
    edit: any
}
export const StudentLocationListTable = ({ edit, search, active }: StudentLocationListTableProps) => {
    const t = useTranslate(LANG_VEHICLE, "student");
    const [rowModesModel, setRowModesModel] = useState({});

    const { create } = useNav()
    const columns = useMemo<GridColDef<IVehicleStudent>[]>(
        () => [
            {
                field: "student.regid",
                headerName: t("fields.regid"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.student.regid}</Typography>
                }
            },
            {
                field: "student.full_name",
                headerName: t("fields.name"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.student.full_name}</Typography>
                }
            },
            {
                field: "student.current.class.name",
                headerName: t("fields.class"),
                sortable: true,
                renderCell: function render({ row }) {
                    return <Typography>{row.student?.class?.name}</Typography>
                }
            },
            {
                field: "price",
                headerName: t("fields.price"),
                sortable: true,
            },
            {
                field: "actions",
                headerName: t("@table.actions"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <Stack direction={"row"}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                }}
                                onClick={() => edit(row.student_id!)}
                            >
                                <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <DeleteButton
                                resource={VEHICLE_STUDENT_URL}
                                recordItemId={row.id}
                                hideText
                                size="small"
                            />
                        </Stack>
                    );
                },
            },
        ],
        [t],
    );

    const { dataGridProps, setFilters } = useDataGrid<IVehicleStudent, HttpError>({
        meta: { customQuery: { route_location_id: active?.id, student: true } },
        resource: VEHICLE_STUDENT_URL,
        filters: {
            initial: [
                {
                    field: "student_name",
                    operator: "eq",
                    value: "",
                }
            ],
        },
    });

    useEffect(() => {
        setFilters([
            {
                field: "student_name",
                value: search,
                operator: "eq"
            }
        ])
    }, [search])

    return <TableGrid
        {...dataGridProps}
        loading={!Boolean(active) && dataGridProps.loading}
        columns={columns}
        editMode="row"
    />

};