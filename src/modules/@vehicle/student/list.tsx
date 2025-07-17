import {
  type HttpError
} from "@refinedev/core";

import { VEHICLE_STUDENT_LIST } from "@vehicle/constant/local.urls";
import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { IVehicleStudent } from "../interface";
import { TableListProp } from "src/interfaces";
import { Avatar, Typography } from "@mui/material";



export const StudentListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_VEHICLE, "student");
  const { edit } = useNav(VEHICLE_STUDENT_LIST);

  const columns = useMemo<GridColDef<IVehicleStudent>[]>(
    () => [
      {
        field: "image",
        headerName: ' ',
        sortable: false,
        disableColumnMenu: true,
        width: 45,
        renderCell: function render({ row }) {
          return <Avatar sx={{ width: 30, height: 30 }} src={row.student?.image?.url} alt={row.student?.image?.name} />
        }
      },
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
        headerName: t("fields.student"),
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
        field: "routeLocation.route.name",
        headerName: t("fields.route"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.routeLocation.route?.name}</Typography>
        }
      },
      {
        field: "routeLocation.location.name",
        headerName: t("fields.location"),
        sortable: true,
        renderCell: function render({ row }) {
          return <Typography>{row.routeLocation.location?.name}</Typography>
        }
      },
      {
        field: "price",
        headerName: t("fields.price"),
        sortable: true,
      },
      // {
      //   field: "actions",
      //   headerName: t("@table.actions"),
      //   align: "center",
      //   headerAlign: "center",
      //   renderCell: function render({ row }) {
      //     return (
      //       <IconButton
      //         sx={{
      //           color: "text.secondary",
      //         }}
      //         onClick={() => edit(row.id!)}
      //       >
      //         <EditOutlinedIcon />
      //       </IconButton>
      //     );
      //   },
      // },
    ],
    [t, edit],
  );

  const { dataGridProps, setFilters } = useDataGrid<IVehicleStudent, HttpError>({
    meta: { customQuery: { image: true, student: true, routeLocation: true, route: true } },
  });

  useEffect(() => {
    setFilters([
      {
        field: "student_name",
        operator: "eq",
        value: search,
      },
      {
        field: "student_regid",
        operator: "eq",
        value: search,
      },
      {
        field: "route_name",
        operator: "eq",
        value: search,
      },
      {
        field: "student_regid",
        operator: "eq",
        value: search,
      }
    ])
  }, [search])

  return <TableGrid
    {...dataGridProps}
    columns={columns}
  />

};

