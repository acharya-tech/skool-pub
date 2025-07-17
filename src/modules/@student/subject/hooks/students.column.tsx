import { Dispatch, SetStateAction, useMemo } from "react";
import { StudentSubjectList } from "../../interface";
import { GridColDef } from "@mui/x-data-grid";
import { IClassSubject, ISubject } from "@academic/interface";
import { MenuItem, Select } from "@mui/material";


interface IStudentColumnsHook {
    t: any,
    setStudent: Dispatch<SetStateAction<StudentSubjectList[]>>
    students: StudentSubjectList[]
}
export const useStudentColumns = ({ t, setStudent, students }: IStudentColumnsHook) => {

    return useMemo<GridColDef<StudentSubjectList>[]>(
        () => [
            {
                field: "student_regid",
                headerName: t("fields.regid"),
                sortable: true,
                renderCell: ({ row }) => {
                    return row.student_regid
                }
            },
            {
                field: "student_name",
                headerName: t("fields.student_name"),
                sortable: true,
                renderCell: ({ row }) => {
                    return row.student_name
                }
            },
            {
                field: "section",
                headerName: t("fields.section"),
                sortable: true,
                renderCell: ({ row }) => {
                    return row.section
                }
            },
            {
                field: "subject_list",
                headerName: t("fields.subject"),
                width: 200,
                sortable: true,
                renderCell: ({ row }) => {
                    return <Select
                        fullWidth
                        size="small"
                        variant="standard"
                        value={row.subject_id}
                        onChange={(e) => {
                            setStudent((prev: StudentSubjectList[]) => {
                                return prev.map((student: StudentSubjectList) => {
                                    if (student.id === row.id) {
                                        return {
                                            ...student,
                                            subject_id: Number(e.target.value)
                                        }
                                    }
                                    return student
                                })
                            })
                        }}
                    >
                        {row.subjectList.map((subject: ISubject) => (
                            <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                        ))}
                    </Select>
                }
            }
        ],
        [t, students],
    );
};

