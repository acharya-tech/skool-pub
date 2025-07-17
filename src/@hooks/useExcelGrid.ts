import { GridColDef } from "@mui/x-data-grid";
import { excelToJson } from "@utils/excel";
import { ExcelJsonType } from "src/interfaces";
import { useEffect, useState } from "react";

export const useExcelGrid = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState<ExcelJsonType>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const reset = () => {
    setFile(null);
    setRows([]);
    setColumns([]);
  };
  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    setIsLoading(true);
    setFile(file);
  };
  useEffect(() => {
    if (!file) {
      return;
    }
    excelToJson(file)
      .then((excelRows) => {
        const [headers, ...rowData] = excelRows;
        const columns: any[] = headers.map((header, index) => ({
          field: header.toString().replace(/\s+/g, "_"), // Sanitize field names
          headerName: header,
          type: "string",
        }));
        const rows = rowData
          .map(
            (row) =>
              row.reduce((acc: any, value, index) => {
                const key = columns[index]?.field as string; // Get the key from columns
                if (key) {
                  acc[key] = value; // Assign key-value pair
                }
                return acc;
              }, {} as object) // Initialize with an empty object
          )
          .map((row) => {
            return {
              ...row,
              id: Math.random(),
            };
          });

        setRows(rows);
        setColumns(columns);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [file]);

  return { rows, columns, onFileChange, isLoading, reset, setRows, setColumns };
};
