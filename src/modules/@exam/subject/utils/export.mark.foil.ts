import { exportToExcel } from "@utils/excel";
import { MarkExcelFildMapColumns } from "../../constant/enum";
import { ExamMarkCasType, IExmSubject, MarkListItem } from "../../interface";
import dayjs from "dayjs";
import { YesNoEnum } from "@common/all.enum";
import { GridColDef } from "@mui/x-data-grid";

export const handleExportMarkFoil = (
  inputColumn: ExamMarkCasType,
  esubject: IExmSubject,
  marks: MarkListItem[]
) => {
  const columnIncluded = ["student_regid", "student_name", "section"];

  Object.keys(inputColumn ?? {}).forEach((key) => {
    columnIncluded.push(key as MarkExcelFildMapColumns);
  });
  columnIncluded.push("is_absent");
  const markFoilColumns = Object.keys(MarkExcelFildMapColumns).reduce(
    (acc, key) => {
      const value =
        MarkExcelFildMapColumns[key as keyof typeof MarkExcelFildMapColumns];
      acc[value as MarkExcelFildMapColumns] = key;
      return acc;
    },
    {} as Record<MarkExcelFildMapColumns, string>
  );


  const column = [...columnIncluded]
    .filter((col, i) =>
      columnIncluded.includes(col as MarkExcelFildMapColumns)
    )
    .map((col) => {
      return {
        field: col,
        headerName: markFoilColumns[col as keyof typeof markFoilColumns],
      };
    });

  const columnNames: string[] = [];
  column.forEach((col) => columnNames.push(col.headerName!));
  const rows =
    marks?.map((mark) => {
      return column.map((col) => {
        if (col.field === "is_absent") {
          return mark.is_absent === YesNoEnum.Yes ? 1 : 0;
        }
        return (
          mark[col.field as keyof MarkListItem] ??
          // @ts-ignore
          mark.cas?.[col.field] ??
          ""
        );
      });
    }) ?? [];

  exportToExcel(
    `Mark-Foil-${esubject?.routine?.code}-${esubject?.subject_name}-${
      esubject?.routine?.class?.name
    }-${dayjs().format("YYYY-MM-DD")}`.replace(/\s+/g, "-"),
    rows,
    columnNames
  );
};
