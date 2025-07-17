import * as XLSX from "xlsx";
import { STUDENT_IMPORT_COLUMN } from "./index";
import { generateStudentColumns } from "./index";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const VALID_FIELDS = Object.keys(STUDENT_IMPORT_COLUMN);

export const useExcelGrid = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setFile(null);
    setRows([]);
    setColumns([]);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setTimeout(() => setFile(file), 100);
    }
  };

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        raw: false,
        defval: "",
      });

      const filteredHeaders = Object.keys(rawRows[0]).filter((k) =>
        VALID_FIELDS.includes(k)
      );

      const columns = generateStudentColumns(filteredHeaders);

      const withId = rawRows.map((row, idx) => {
        const validRow: Record<string, any> = { id: idx };
        filteredHeaders.forEach((k) => {
          const attributes = STUDENT_IMPORT_COLUMN[k];
          if (attributes.transform) {
            validRow[k] = attributes.transform(row[k], k, attributes);
            return;
          }
          validRow[k] = row[k]?.trim() ?? "";
        });
        return validRow;
      });

      setRows(withId);
      setColumns(columns);
      setIsLoading(false);
    };

    reader.onerror = () => setIsLoading(false);
    reader.readAsArrayBuffer(file);
  }, [file]);

  return {
    rows,
    columns,
    onFileChange,
    isLoading,
    reset,
    setRows,
  };
};
