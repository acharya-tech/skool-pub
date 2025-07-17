import { useList, useOne, type HttpError } from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { LANG_INVENTORY } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Box, Paper, Stack } from "@mui/material";
import { useNav } from "@hooks/useNavlHook";
import {
  INVENTORY_BILLING_LIST,
} from "../constant";
import { IStoreBilling, IStoreProcurement } from "../interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DateLabel } from "@components/label/date.label";
import { BillUser } from "../component/common";
import { ExpandableTableGrid } from "@components/table/expandable.table.body";
import { BillingQuickView } from "./quickshow";
import { IDataValue } from "@datavalue/interface";
import { DATAVALUE_URL } from "@datavalue/constant/server.url";
import { DataKeyTemplateEnum } from "@datavalue/constant/enum";
import { ITemplateData } from "src/editor/interface";
import LoadingWrapper from "@components/other/loading";

export const BillingListTable = ({ search }: TableListProp) => {
  const t = useTranslate(LANG_INVENTORY, "billing");
  const [template, setTemplate] = useState<ITemplateData>()
  const { edit, show } = useNav(INVENTORY_BILLING_LIST);

  const columns = useMemo<GridColDef<IStoreBilling>[]>(
    () => [
      {
        field: "bill_no",
        headerName: t("fields.bill_no"),
        sortable: true,
        width: 50,
      },
      {
        field: "entry_date",
        headerName: t("fields.entry_date"),
        sortable: true,
        renderCell: ({ row }) => {
          return <DateLabel date={row.entry_date} />;
        },
      },
      {
        field: "customer_name",
        headerName: t("fields.customer_name"),
        sortable: true,
      },
      {
        field: "user_type",
        headerName: t("fields.user_type"),
        sortable: true,
        width: 150,
        renderCell: function render({ row }) {
          return <BillUser type={row?.user_type} />;
        },
      },
      {
        field: "user.name",
        headerName: t("fields.user"),
        sortable: true,
        renderCell: ({ row }) => {
          return row?.user?.name;
        },
      },
      {
        field: "total_amount",
        headerName: t("fields.total_amount"),
        sortable: true,
      },
      {
        field: "year.name",
        headerName: t("fields.year"),
        sortable: true,
        renderCell: ({ row }) => {
          return row.year?.name;
        },
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
                onClick={() => show(row.id)}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [t, edit]
  );

  const { dataGridProps, setFilters } = useDataGrid<IStoreProcurement, HttpError>({
    meta: { customQuery: { year: true, user: true, items: true } }
  });

  const { data: templateQuery } = useList<IDataValue>({
    resource: DATAVALUE_URL,
    meta: {
      customQuery: {
        data_key: DataKeyTemplateEnum.STORE_BILL_DESIGN,
        // TODO: use dynamic module id
        module_id: 1
      }
    }
  });

  useEffect(() => {
    if (templateQuery) {
      const temp = JSON.parse(templateQuery?.data[0]?.data_value as string ?? "{}")
      setTemplate(temp)
    }
  }, [templateQuery])

  useEffect(() => {
    setFilters([
      {
        field: "code",
        value: search,
        operator: "eq",
      },
      {
        field: "name",
        value: search,
        operator: "eq",
      },
    ]);
  }, [search]);

  return (
    <>
      {/* Table Grid */}
      <ExpandableTableGrid
        {...dataGridProps as any}
        columns={columns}
        expandable={true}
        renderExpandableRow={({ row }: { row: IStoreBilling }) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper sx={{ mx: 10, my: 2 }} elevation={2}>
                <LoadingWrapper value={template} >
                  <BillingQuickView key={row.id} bill={row!} template={template!} />
                </LoadingWrapper>
              </Paper>
            </Box>
          );
        }}
      />
    </>
  );
};
