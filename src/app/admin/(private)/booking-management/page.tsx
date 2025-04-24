"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Eye, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for bookings
const bookings = [
  {
    id: "BK-1001",
    user: "John Doe",
    userEmail: "john.doe@example.com",
    astrologer: "Dr. Aisha Sharma",
    dateTime: "Apr 24, 2025, 10:00 AM",
    status: "completed",
    consultationType: "Vedic Reading",
    paymentStatus: "paid",
    amount: "$75.00"
  },
  {
    id: "BK-1002",
    user: "Sarah Smith",
    userEmail: "sarah.smith@example.com",
    astrologer: "John Miller",
    dateTime: "Apr 24, 2025, 2:30 PM",
    status: "upcoming",
    consultationType: "Tarot Reading",
    paymentStatus: "paid",
    amount: "$65.00"
  },
  {
    id: "BK-1003",
    user: "Michael Brown",
    userEmail: "michael.brown@example.com",
    astrologer: "Maria Rodriguez",
    dateTime: "Apr 25, 2025, 11:15 AM",
    status: "upcoming",
    consultationType: "Palmistry",
    paymentStatus: "pending",
    amount: "$80.00"
  },
  {
    id: "BK-1004",
    user: "Emily Johnson",
    userEmail: "emily.johnson@example.com",
    astrologer: "David Chen",
    dateTime: "Apr 23, 2025, 4:00 PM",
    status: "cancelled",
    consultationType: "Feng Shui Consultation",
    paymentStatus: "refunded",
    amount: "$90.00"
  },
  {
    id: "BK-1005",
    user: "Jessica Lee",
    userEmail: "jessica.lee@example.com",
    astrologer: "Dr. Aisha Sharma",
    dateTime: "Apr 26, 2025, 1:00 PM",
    status: "upcoming",
    consultationType: "Numerology",
    paymentStatus: "paid",
    amount: "$75.00"
  }
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  const filteredBookings = bookings.filter((booking) => {
    // Apply search filter
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.astrologer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.consultationType.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    // Apply payment filter
    const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground">View and manage all bookings on your platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>View booking details, status, and payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Astrologer</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.user}</div>
                          <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.astrologer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.dateTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.status === "completed" ? (
                          <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                        ) : booking.status === "upcoming" ? (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                        ) : (
                          <Badge variant="danger">Cancelled</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {booking.paymentStatus === "paid" ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Paid
                          </Badge>
                        ) : booking.paymentStatus === "pending" ? (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Refunded
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/booking-management/${booking.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
