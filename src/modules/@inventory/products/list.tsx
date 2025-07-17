import {
	type HttpError
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef, GridVisibilityOffIcon } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_INVENTORY, LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { TableListProp } from "src/interfaces";
import { Avatar, Stack } from "@mui/material";
import { IInfo } from "@vehicle/interface";
import { useNav } from "@hooks/useNavlHook";
import { INVENTORY_PRODUCT_LIST, INVENTORY_PRODUCT_URL } from "../constant";
import { IStoreProduct } from "../interface";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const ProductListTable = ({ search }: TableListProp) => {
	const t = useTranslate(LANG_INVENTORY, "product");
	const { edit, show } = useNav(INVENTORY_PRODUCT_LIST);

	const columns = useMemo<GridColDef<IStoreProduct>[]>(
		() => [
			{
				field: "code",
				headerName: t("fields.code"),
				sortable: true,
			},
			{
				field: "name",
				headerName: t("fields.name"),
				sortable: true,
			},
			{
				field: "life_expn",
				headerName: t("fields.life_expn"),
				sortable: true,
			},
			{
				field: "min_qty",
				headerName: t("fields.min_qty"),
				sortable: true,
			},
			{
				field: "category",
				headerName: t("fields.category"),
				sortable: true,
			},
			{
				field: "type",
				headerName: t("fields.type"),
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
								onClick={() => show(row.id)}
							>
								<VisibilityIcon fontSize="small" />
							</IconButton>
							<IconButton
								size="small"
								sx={{
									color: "text.secondary",
								}}
								onClick={() => edit(row.id)}
							>
								<EditOutlinedIcon fontSize="small" />
							</IconButton>
						</Stack>
					);
				},
			},
		],
		[t, edit],
	);

	const { dataGridProps, setFilters } = useDataGrid<IStoreProduct, HttpError>({
		resource: INVENTORY_PRODUCT_URL,
		filters: {
			initial: [
				{
					field: "code",
					operator: "eq",
					value: "",
				},
				{
					field: "name",
					operator: "eq",
					value: "",
				}
			],
		},
	});

	useEffect(() => {
		setFilters([
			{
				field: "code",
				value: search,
				operator: "eq"
			},
			{
				field: "name",
				value: search,
				operator: "eq"
			}
		])
	}, [search])

	return <TableGrid
		{...dataGridProps}
		columns={columns}
	/>

};

