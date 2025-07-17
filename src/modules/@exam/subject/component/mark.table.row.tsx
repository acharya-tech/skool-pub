import { useEffect, useState } from 'react';
import { TextField, TableRow, TableCell, Checkbox } from '@mui/material';
import { ExamMarkCasType, MarkListItem } from '@exam/interface';
import { getMarkRemark, MarkRemarkLabel, setValidMark } from '../utils/mark.list';
import { GridColDef } from '@mui/x-data-grid';
import { YesNoEnum } from '@common/all.enum';
import { useMarkStore } from '../utils/mark.store';
import { isEqual } from 'lodash';


type MarkRowProps = {
    inputColumn: ExamMarkCasType
    mark: MarkListItem
    columns: GridColDef<MarkListItem>[]
}
export const MarkEditableRow = ({ inputColumn, mark, columns }: MarkRowProps) => {
    const [rowData, setRowData] = useState(mark);
    const newMark = useMarkStore(state => state.markList)
    const grading_rule = useMarkStore(state => state.gradingRules)
    const { addMark, removeMark } = useMarkStore()
    useEffect(() => {
        if (!(mark.id in newMark)) {
            setRowData({ ...mark })
        } else if (!isEqual(rowData.cas, newMark[mark.id].cas) || rowData.is_absent != newMark[mark.id].is_absent) {
            setRowData({ ...newMark[mark.id] })
        }
    }, [newMark])
    const handleUpdate = () => {
        setTimeout(() => {
            if (rowData.id in newMark) {
                if (isEqual(rowData.cas, newMark[rowData.id].cas) && rowData.is_absent == newMark[rowData.id].is_absent) {
                    return
                } else {
                    addMark(rowData)
                }
            }
            if (!isEqual(rowData.cas, mark.cas) || rowData.is_absent == mark.is_absent) {
                addMark(rowData)
            } else {
                removeMark(rowData.id)
            }
        }, 100)
    }
    const handleChange = (key: string, value: string) => {
        const updated = setValidMark(rowData, value, key, grading_rule!);
        setRowData(updated);
    };
    const handleAbsentChange = (id: number, value: YesNoEnum) => {
        if (value == YesNoEnum.No) {
            setRowData({ ...rowData, cas: {}, error: {}, is_absent: YesNoEnum.Yes });
        } else {
            setRowData({ ...rowData, cas: {}, error: {}, is_absent: YesNoEnum.No });
        }
    }
    return (
        <TableRow>
            {columns.map(col => {
                if (col.field == "remark") {
                    return <TableCell key={col.field}><MarkRemarkLabel remark={getMarkRemark(rowData)} /></TableCell>
                }
                if (col.field == "is_absent") {
                    return <TableCell key={col.field}><Checkbox
                        checked={rowData.is_absent === YesNoEnum.Yes}
                        value={rowData.is_absent}
                        onClick={(e) => handleAbsentChange(rowData.id, rowData.is_absent as YesNoEnum)}
                        onBlur={handleUpdate}
                    />
                    </TableCell>
                }
                /* @ts-ignore */
                if (mark[col.field]) {
                    /* @ts-ignore */
                    return <TableCell key={col.field}>{rowData[col.field]}</TableCell>
                }
                if (col.field in inputColumn) {
                    const [markName] = col.field.split("_");
                    return <TableCell key={col.field}><TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        disabled={rowData.is_absent === YesNoEnum.Yes}
                        /* @ts-ignore */
                        value={rowData.cas?.[col.field] ?? ""}
                        /* @ts-ignore */
                        error={Boolean(rowData.error?.[col.field])}
                        inputProps={{
                            min: 0,
                            /* @ts-ignore */
                            max: grading_rule[`${markName}Threshold`]
                        }}
                        onChange={(e) => handleChange(col.field, e.target.value)}
                        onBlur={handleUpdate}
                    /></TableCell>
                }
                return <TableCell key={col.field}></TableCell>
            })}
        </TableRow>
    );
};


type MarkStaticRowProps = {
    mark: MarkListItem
    columns: GridColDef<MarkListItem>[]
    inputColumn: ExamMarkCasType
}

export const MarkStaticRow = ({ columns, mark, inputColumn }: MarkStaticRowProps) => {
    return (
        <TableRow>
            {columns.map(col => {
                if (col.field == "remark") {
                    return <TableCell><MarkRemarkLabel remark={getMarkRemark(mark)} /></TableCell>
                }
                /* @ts-ignore */
                if (mark[col.field]) {
                    /* @ts-ignore */
                    return <TableCell>{mark[col.field]}</TableCell>
                }
                if (col.field in inputColumn) {
                    /* @ts-ignore */
                    return <TableCell>{mark.cas?.[col.field]}</TableCell>
                }
                return <TableCell></TableCell>
            })}
        </TableRow>
    );
}