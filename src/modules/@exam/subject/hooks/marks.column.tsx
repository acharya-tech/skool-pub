import { useMemo, useCallback, useState } from "react";
import { ExamMarkCasType, IExmSubject, IGradingRules, MarkListItem } from "../../interface";
import { GridColDef } from "@mui/x-data-grid";
import { ExmMarkPostStatusEnum } from "../../constant/enum";
import { Checkbox, TextField, Typography } from "@mui/material";
import { getMarkRemark, MarkRemarkLabel, setValidMark } from "../utils/mark.list";
import { useDebouncedCallback } from "use-debounce";
import { YesNoEnum } from "@common/all.enum";

export const useMarkColumns = ({ t, esubject }: { t: any; esubject: IExmSubject }) => {
    const [marks, setMarks] = useState<MarkListItem[]>([]);
    const [inputColumn, setInputColumn] = useState<ExamMarkCasType>({});
    const [gradingRule, setGradingRule] = useState<IGradingRules | null>(null);
    const debouncedSetMarks = useDebouncedCallback((id: number, key: string, value: string, rule: IGradingRules) => {
        setMarks((prev) =>
            prev.map((m) =>
                m.id === id ? setValidMark(m, value, key, rule) : m
            )
        );
    }, 300);

    const handleAbsentChange = useDebouncedCallback((id: number, value: YesNoEnum) => {
        if (value == YesNoEnum.No) {
            setMarks((prev) =>
                prev.map((m) => (m.id === id ? { ...m, cas: {}, is_absent: YesNoEnum.Yes } : m))
            );
        } else {
            setMarks((prev) =>
                prev.map((m) => (m.id === id ? { ...m, is_absent: YesNoEnum.No } : m))
            );
        }
    }, 30);

    const markKeys = useMemo(() => {
        return Object.keys(inputColumn) ?? [];
    }, [inputColumn]);

    const markColumns = useMemo(() => {
        const colList = markKeys.map((key) => {
            const [markName] = key.split("_");
            return {
                field: key,
                headerName: t("fields." + markName),
                width: 160,
                sortable: true,
                renderCell: ({ row }: any) => {
                    if (esubject.post_status === ExmMarkPostStatusEnum.Completed) {
                        return <Typography variant="body2">{row.cas?.[key]}</Typography>;
                    }
                    return (
                        <TextField
                            fullWidth
                            type="number"
                            variant="standard"
                            value={row.cas?.[key] ?? ""}
                            error={Boolean(row.error?.[key])}
                            inputProps={{
                                min: 0,
                                max: row?.gradingRule?.[`${markName}Threshold`]
                            }}
                            onChange={(e) => debouncedSetMarks(row.id, key, e.target.value, row.gradingRule)}
                        />
                    );
                },
            };
        });

        colList.push({
            field: "is_absent",
            headerName: t("fields.absent"),
            width: 70,
            sortable: true,
            renderCell: ({ row }: any) => {
                if (esubject.post_status === ExmMarkPostStatusEnum.Completed) {
                    return <Typography variant="body2">{row.is_absent}</Typography>;
                }
                return (
                    <Checkbox
                        checked={row.is_absent === YesNoEnum.Yes}
                        value={row.is_absent}
                        onClick={(e) => handleAbsentChange(row.id, row.is_absent as YesNoEnum)}
                    />
                );
            },
        })

        return colList
    }, [markKeys, t, esubject.post_status]);

    const staticColumns: GridColDef<MarkListItem>[] = useMemo(() => [
        { field: "student_regid", headerName: t("fields.regid"), sortable: true },
        { field: "student_name", headerName: t("fields.student_name"), sortable: true },
        { field: "section", headerName: t("fields.section"), sortable: true },
        {
            field: "remark",
            headerName: t("fields.remark"),
            sortable: true,
            renderCell: ({ row }) => <MarkRemarkLabel remark={getMarkRemark(row)} />,
        },
    ], [t]);

    const columns = useMemo(() => [...staticColumns.slice(0, 3), ...markColumns, staticColumns[3]], [staticColumns, markColumns]);

    return {
        marks, setMarks, columns, inputColumn, setInputColumn, gradingRule, setGradingRule
    };
};
