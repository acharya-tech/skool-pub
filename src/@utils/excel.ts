import { ExcelJsonType } from "src/interfaces";
import * as XLSX from "xlsx";

export const exportToExcel = (
  fileName: string,
  rows: any[],
  columns: any[]
) => {
  // Create worksheet data
  const rowData = [columns, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(rowData);

  // Style the first row
  const range = XLSX.utils.decode_range(ws["!ref"]!); // Get the range of the sheet

  for (let C = range.s.c; C <= range.e.c; C++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C }); // Get cell address in first row
    if (!ws[cellAddress]) continue; // Skip if no cell exists
    ws[cellAddress].s = {
      fill: {
        fgColor: { rgb: "90EE90" }, // Light green background
      },
      font: {
        color: { rgb: "FFFFFF" }, // White text color
        bold: true, // Optional: Make it bold
      },
    };
  }

  ws["!freeze"] = {
    xSplit: 0, // No columns frozen
    ySplit: 1, // Freeze the first row
    topLeftCell: "A2", // Top-left cell to start scrolling
    activePane: "bottomLeft",
    state: "frozen",
  };
  // Enable styles in the workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Export to Excel with styles
  XLSX.writeFile(wb, `${fileName}.xlsx`, {
    bookType: "xlsx",
    cellStyles: true,
  });
};

export const excelToJson = (file: any): Promise<(string | number)[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(
        worksheet,
        {
          header: 1,
        }
      );
      resolve(jsonData);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
};
