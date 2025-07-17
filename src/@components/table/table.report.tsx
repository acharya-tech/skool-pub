import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  sortKey?: string;
  width?: number;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

interface TableWithSearchAndSortProps<T> {
  data: T[];
  columns: Column<T>[];
  sortKey?: string | null;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string) => void;
  footer?: React.ReactNode;
}

export function TableWithSearchAndSort<T>({
  data,
  columns,
  sortKey,
  sortOrder,
  onSort,
  footer,
}: TableWithSearchAndSortProps<T>) {
  return (
    <TableContainer>
      <Table size="small" className="borderedTable miniTable">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align ?? "left"} width={col.width}>
                {col.sortable ? (
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortOrder : "asc"}
                    onClick={() => onSort?.(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  <Typography>{col.label}</Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align ?? "left"}>
                  {col.render ? col.render(item) : getNestedValue(item, col.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {footer && <TableFooter>{footer}</TableFooter>}
      </Table>
    </TableContainer>
  );
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}
