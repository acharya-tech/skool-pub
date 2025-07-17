import { Avatar, IconButton } from "@mui/material"
import { NotSetLabel } from "@components/label/notset.label";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";
import { getQueryParam } from "@utils/other";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { STUDENT_INFO_LOCATER, StudentLogStateEnum } from "../constant";
import { useEffect, useMemo, useState } from "react";
import { IStudentSelection } from "../interface";
import { StudentStateChip } from "@components/other/student.chip";


type StudentColumnProps = {
    selection: IStudentSelection
}

type StudentColumnReturnProps = {
    select: any,
    setSelect: (select: IStudentSelection) => void
}

export const useStudentColumn = ({ selection }: StudentColumnProps): StudentColumnReturnProps => {
    const t = useTranslate(LANG_STUDENT, "info");
    const [select, setSelect] = useState<IStudentSelection>(selection)
    const navigate = useNavigate();

    const handleSelect = (select: IStudentSelection) => {
        setSelect(select)
    }

    const columns: any = useMemo(() => ({
        simg: {
            field: "image",
            headerName: " ",
            sortable: false,
            disableColumnMenu: true,
            width: 45,
            renderCell: function render({ row }: any) {
                return (
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={row?.image?.url}
                        alt={row?.image?.name}
                    />
                );
            },
        },
        rid: {
            field: "regid",
            headerName: t("fields.regid"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.regid;
            },
        },
        fln: {
            field: "full_name",
            headerName: t("fields.full_name"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.full_name;
            },
        },
        fn: {
            field: "first_name",
            headerName: t("fields.first_name"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.first_name;
            },
        },
        ln: {
            field: "last_name",
            headerName: t("fields.last_name"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.last_name;
            },
        },
        ph: {
            field: "phone",
            headerName: t("fields.phone"),
            sortable: true,
            width: 120,
            renderCell: function render({ row }: any) {
                return row?.phone;
            },
        },
        em: {
            field: "email",
            headerName: t("fields.email"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.email;
            },
        },
        rn: {
            field: "roll_no",
            headerName: t("fields.roll_no"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row?.roll_no;
            },
        },
        sym: {
            field: "symbol",
            headerName: t("fields.symbol"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row?.symbol;
            },
        },
        urg: {
            field: "uni_reg",
            headerName: t("fields.uni_reg"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.uni_reg;
            },
        },
        g: {
            field: "gender",
            headerName: t("fields.gender"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row?.gender;
            },
        },
        bg: {
            field: "blood_group",
            headerName: t("fields.blood_group"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row?.blood_group;
            },
        },
        dob_np: {
            field: "dob_np",
            headerName: t("fields.dob_np"),
            sortable: true,
            width: 120,
            renderCell: function render({ row }: any) {
                return row?.dob_np;
            },
        },
        dob_en: {
            field: "dob_en",
            headerName: t("fields.dob_en"),
            sortable: true,
            width: 120,
            renderCell: function render({ row }: any) {
                return row?.dob_en;
            },
        },
        add1: {
            field: "address1",
            headerName: t("fields.address1"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.address1;
            },
        },
        add2: {
            field: "address2",
            headerName: t("fields.address2"),
            sortable: true,
            renderCell: function render({ row }: any) {
                return row?.address2;
            },
        },
        nty: {
            field: "nationality",
            headerName: t("fields.nationality"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.nationality;
            },
        },
        rlg: {
            field: "religion",
            headerName: t("fields.religion"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.religion;
            },
        },
        cst: {
            field: "caste",
            headerName: t("fields.caste"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.caste;
            },
        },
        eth: {
            field: "ethnic",
            headerName: t("fields.ethnic"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.ethnic;
            },
        },
        dsty: {
            field: "disability",
            headerName: t("fields.disability"),
            sortable: true,
            width: 150,
            renderCell: function render({ row }: any) {
                return row?.disability;
            },
        },
        cls: {
            field: "class.name",
            headerName: t("fields.class"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row.class?.name;
            },
        },
        bt: {
            field: "batch.name",
            headerName: t("fields.batch"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row.batch?.name;
            },
        },
        sec: {
            field: "section.name",
            headerName: t("fields.section"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row.section?.name;
            },
        },
        hus: {
            field: "house.name",
            headerName: t("fields.house"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row.house?.name;
            },
        },
        hst: {
            field: "hostel.name",
            headerName: t("fields.hostel"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return row.hostel?.name;
            },
        },
        st: {
            field: "state",
            headerName: t("fields.state"),
            sortable: true,
            width: 100,
            renderCell: function render({ row }: any) {
                return <StudentStateChip state={row.state as unknown as StudentLogStateEnum} />
            },
        },
        action: {
            field: "actions",
            headerName: t("@table.actions"),
            align: "center",
            headerAlign: "center",
            renderCell: function render({ row }: any) {
                return (
                    <IconButton
                        sx={{
                            color: "text.secondary",
                        }}
                        onClick={() => navigate(getQueryParam(STUDENT_INFO_LOCATER, { id: row.id }, true))}
                    >
                        <VisibilityIcon />
                    </IconButton>
                );
            },
        },
    }), []);

    return {
        select: Object.keys(select).filter((k) => (k in columns && select[k as keyof IStudentSelection])).map(k => (columns[k])),
        setSelect: handleSelect
    }
};
