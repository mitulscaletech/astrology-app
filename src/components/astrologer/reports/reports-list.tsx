/* eslint-disable indent */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { formatDate, formatDateTime, isReportDelayed } from "@/lib/date";
import { REPORT_STATUS } from "@/shared/constants/dummy-data";
import IconCalender from "@/shared/icons/calender";
import IconFilter from "@/shared/icons/filter";
import IconAlertTriangle from "@/shared/icons/alertTriangle";
import IconEye from "@/shared/icons/eye";
import IconSend from "@/shared/icons/send";
import IconFile from "@/shared/icons/file";
import { Report } from "@/shared/interface";
import Link from "next/link";

interface ReportsListProps {
  reports: Report[] | any;
}

export function ReportsList({ reports }: ReportsListProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((report) => report.bookingDate.startsWith(dateString));
    }

    if (statusFilter) {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    return filtered;
  }, [reports, selectedDate, statusFilter]);

  const getStatusBadge = (status: string, bookingDate: string) => {
    const isDelayed = status === REPORT_STATUS.PENDING && isReportDelayed(bookingDate);

    switch (status) {
      case REPORT_STATUS.SENT:
        return <Badge className="bg-green-50 text-green-700 border-green-200">Sent</Badge>;
      case REPORT_STATUS.PENDING:
        return (
          <Badge
            className={`${isDelayed ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}
          >
            {isDelayed ? "Delayed" : "Pending"}
          </Badge>
        );
      case REPORT_STATUS.FLAGGED:
        return <Badge className="bg-red-50 text-red-700 border-red-200">Flagged</Badge>;
      case REPORT_STATUS.DRAFT:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const resetFilters = () => {
    setSelectedDate(undefined);
    setStatusFilter(null);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-secondary-200">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <span className="h-3.5 w-3.5">
                    <IconCalender />
                  </span>
                  <span>{selectedDate ? formatDate(selectedDate, "PP") : "Filter by date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <span className="h-3.5 w-3.5">
                    <IconFilter />
                  </span>
                  <span>
                    {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : "Filter by status"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter(REPORT_STATUS.SENT)}
                  >
                    Sent
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter(REPORT_STATUS.PENDING)}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter(REPORT_STATUS.FLAGGED)}
                  >
                    Flagged
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter(REPORT_STATUS.DRAFT)}
                  >
                    Draft
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {(selectedDate || statusFilter) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8">
                Reset filters
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Report ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Identity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No reports found
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.clientName}</TableCell>
                    <TableCell>{formatDateTime(report.bookingDate)}</TableCell>
                    <TableCell>{report.consultationType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status, report.bookingDate)}
                        {report.identityMismatch && (
                          <div className="text-red-500 h-3.5 w-3.5">
                            <IconAlertTriangle />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{report.identityType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="View" asChild>
                          <Link href="http://localhost:3000/astrologer/reports/123">
                            <IconEye />
                          </Link>
                        </Button>
                        {report.status !== REPORT_STATUS.SENT && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Send Report"
                            className="text-[#b1142d] hover:text-[#b1142d] hover:bg-red-50"
                          >
                            <IconSend />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Download PDF">
                          <IconFile />
                        </Button>
                      </div>
                    </TableCell>
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
