"use client";

import { Table, TableHeader, TableBody, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React, { useState, useMemo } from "react";

type DataTableProps<T> = {
  columns: string[];
  data: T[];
  children: (filteredRows: T[]) => React.ReactNode;
  enableSearch?: boolean;
  searchBy?: (item: T) => string;
  filters?: React.ReactNode;
  totalItems?: number;
  itemsPerPage?: number;
};

const DataTable = <T extends unknown>({
  columns,
  data,
  children,
  enableSearch = false,
  searchBy,
  filters,
  totalItems,
  itemsPerPage = 10
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Pagination helpers
  const total = totalItems ?? data.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  // Apply filtering and searching
  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm && searchBy) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) => searchBy(item).toLowerCase().includes(term));
    }

    return result;
  }, [searchTerm, searchBy, data]);

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      {(enableSearch || filters) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {enableSearch && (
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          )}
          {filters}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-secondary-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead key={i}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{children(filteredData)}</TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 rounded border disabled:opacity-50">
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
