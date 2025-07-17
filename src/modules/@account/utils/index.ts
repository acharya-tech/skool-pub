import { exportToExcel } from "@utils/excel";
import { IAccountHeadRes, IGroupSummaryRes } from "../interface";

interface ILedgerRow {
  bs_type: string;
  group_name: string;
  ledger_name: string;
  dr_total: number;
  cr_total: number;
  includeGroupTotal: boolean;
}

export function chunkAccountHead(
  data: IAccountHeadRes[],
  chunkSize: number
): IAccountHeadRes[] {
  const flat: ILedgerRow[] = [];
  const seenGroupKey = new Set<string>();

  // Flatten the data into rows, tagging first instance of group with total
  for (const bs of data) {
    for (const group of bs.groups) {
      const groupKey = `${bs.bs_type}__${group.group_name}`;
      group.ledgers.forEach((ledger, i) => {
        flat.push({
          bs_type: bs.bs_type,
          group_name: group.group_name,
          ledger_name: ledger.ledger_name,
          dr_total: ledger.dr,
          cr_total: ledger.cr,
          includeGroupTotal: i === 0 && !seenGroupKey.has(groupKey),
        });
      });
      seenGroupKey.add(groupKey);
    }
  }

  // Now chunk the flat array
  const chunks: ILedgerRow[][] = [];
  for (let i = 0; i < flat.length; i += chunkSize) {
    chunks.push(flat.slice(i, i + chunkSize));
  }

  // Rebuild the nested grouped structure
  const groupedChunks: IAccountHeadRes[] = chunks.map((chunk) => {
    const groupMap = new Map<string, IGroupSummaryRes>();

    let bs_type = "";
    let bs_total = 0;

    for (const row of chunk) {
      bs_type = row.bs_type;
      const key = row.group_name;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          group_name: key,
          total: row.includeGroupTotal ? row.dr_total + row.cr_total : 0,
          ledgers: [],
        });
      }

      groupMap.get(key)!.ledgers.push({
        ledger_name: row.ledger_name,
        ledger_code: row.ledger_name,
        dr: row.dr_total,
        cr: row.cr_total,
      });

      if (row.includeGroupTotal) {
        bs_total += row.dr_total + row.cr_total;
      }
    }

    return {
      bs_type,
      total: bs_total,
      groups: Array.from(groupMap.values()),
    };
  });

  return groupedChunks;
}

export function countAllItems(data: IAccountHeadRes[]): number {
  let count = 0;

  for (const bs of data) {
    count += 1; // count bs_type
    for (const group of bs.groups) {
      count += 1; // count group
      count += group.ledgers.length; // count each ledger
    }
  }

  return count;
}

export const FinalReportToExcel = (
  fineName: string,
  data: IAccountHeadRes[],
  total: any
) => {
  const column = ["Particular", "LFNO", "DR Amount", "CR Amount"];
  const rows = [];
  for (const bs of data) {
    for (const group of bs.groups) {
      for (const ledger of group.ledgers) {
        rows.push([
          ledger.ledger_name,
          ledger.ledger_code,
          ledger.dr,
          ledger.cr,
        ]);
      }
    }
  }
  rows.push(["TOTAL", "", total.dr, total.cr]);
  return exportToExcel(fineName, rows, column);
};
