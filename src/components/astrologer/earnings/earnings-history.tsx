"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { EarningData } from "@/shared/interface";
import IconSearch from "@/shared/icons/search";
import { formatDate } from "@/lib/date";

interface EarningsHistoryProps {
  data: EarningData[];
  className?: string;
}

export function EarningsHistory({ data, className }: EarningsHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = data.filter(
      (item) =>
        (item.clientName && item.clientName.toLowerCase().includes(query)) ||
        (item.consultationType && item.consultationType.toLowerCase().includes(query)) ||
        (item.reportId && item.reportId.toLowerCase().includes(query))
    );

    setFilteredData(filtered);
  };

  return (
    <Card className={className}>
      <CardHeader className="px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Earnings History</CardTitle>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <IconSearch />
              </span>
              <Input
                type="search"
                placeholder="Search client or type..."
                className="pl-8 w-[180px] md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} size="sm">
              Search
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Consultation Type</TableHead>
                <TableHead>Report ID</TableHead>
                <TableHead className="text-end pr-6">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center p-4 text-muted-foreground">
                    No earnings data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="pl-6 font-medium">{formatDate(item.date, "PP")}</TableCell>
                    <TableCell>{item.clientName || "—"}</TableCell>
                    <TableCell>{item.consultationType || "—"}</TableCell>
                    <TableCell>{item.reportId || "—"}</TableCell>
                    <TableCell className="text-end pr-6 font-medium">${item.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
