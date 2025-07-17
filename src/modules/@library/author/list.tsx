import {
	type HttpError
} from "@refinedev/core";

import { useTranslate } from "@hooks/useTranslate";
import { TextFieldComponent, useDataGrid } from "@refinedev/mui";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

import { LANG_LIBRARY, LANG_VEHICLE } from "@common/constant";
import { TableGrid } from "@components/table/table.body";
import { useNav } from "@hooks/useNavlHook";
import { ILibAuthor, ILibBook } from "../interface";
import { TableListProp } from "src/interfaces";
import { LIBRARY_AUTHOR_LIST, LIBRARY_AUTHOR_URL } from "../constant";
import { DateLabel } from "@components/label/date.label";



export const AuthorListTable = ({ search }: TableListProp) => {
	const t = useTranslate(LANG_LIBRARY, "author");
	const { edit } = useNav(LIBRARY_AUTHOR_LIST);

	const columns = useMemo<GridColDef<ILibAuthor>[]>(
		() => [
			{
				field: "name",
				headerName: t("fields.name"),
				sortable: true,
			},
			{
				field: "country",
				headerName: t("fields.country"),
				sortable: true,
			},
			{
				field: "dob",
				headerName: t("fields.dob"),
				sortable: true,
				renderCell: function render({ row }) {
					return <DateLabel date={row.dob} />
				},
			},
			{
				field: "actions",
				headerName: t("@table.actions"),
				align: "center",
				headerAlign: "center",
				renderCell: function render({ row }) {
					return (
						<IconButton
							sx={{
								color: "text.secondary",
							}}
							onClick={() => edit(row.id)}
						>
							<EditOutlinedIcon />
						</IconButton>
					);
				},
			},
		],
		[t, edit],
	);

	const { dataGridProps, setFilters } = useDataGrid<ILibBook, HttpError>({
		meta: { customQuery: { image: true } },
		resource: LIBRARY_AUTHOR_URL,
		filters: {
			initial: [
				{
					field: "name",
					operator: "eq",
					value: "",
				},
				{
					field: "country",
					operator: "eq",
					value: "",
				},

			],
		},
	});

	useEffect(() => {
		setFilters([
			{
				field: "name",
				value: search,
				operator: "eq"
			},
			{
				field: "country",
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

