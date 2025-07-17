import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

interface UseSearchAndSortOptions<T> {
  search: string;
  searchFields: (keyof T | string)[];
}

export function useSearchAndSort<T>(
  data: T[],
  options: UseSearchAndSortOptions<T>
) {
  const { search, searchFields } = options;
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredSortedData = useMemo(() => {
    const lowerSearch = search?.toLowerCase() ?? "";

    let filtered = data;
    if (lowerSearch && searchFields.length) {
      filtered = data.filter((item) =>
        searchFields.some((field) => {
          const value = getNestedValue(item, field as string);
          return (
            value?.toString?.().toLowerCase().includes(lowerSearch) ?? false
          );
        })
      );
    }

    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = getNestedValue(a, sortKey);
      const bVal = getNestedValue(b, sortKey);

      const aIsNum = typeof aVal === "number";
      const bIsNum = typeof bVal === "number";

      if (aIsNum && bIsNum) {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, search, searchFields, sortKey, sortOrder]);

  return {
    data: filteredSortedData,
    sortKey,
    sortOrder,
    handleSort,
  };
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}
