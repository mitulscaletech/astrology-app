"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, CreditCard, Edit, MessageSquare, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";

// Mock booking data
const booking = {
  id: "BK-1002",
  user: {
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  astrologer: {
    name: "John Miller",
    specialization: "Tarot Reading",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  dateTime: "April 24, 2025, 2:30 PM",
  duration: "60 minutes",
  status: "upcoming",
  consultationType: "Tarot Reading",
  paymentStatus: "paid",
  amount: "$65.00",
  notes: "Client is interested in career guidance and relationship insights. This is their second session.",
  history: [
    {
      date: "March 15, 2025",
      action: "Booking created",
      user: "Sarah Smith"
    },
    {
      date: "March 15, 2025",
      action: "Payment received",
      user: "Sarah Smith"
    },
    {
      date: "March 20, 2025",
      action: "Rescheduled from April 20 to April 24",
      user: "Sarah Smith"
    }
  ]
};

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/booking-management">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
        <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>View and manage booking details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Booking ID</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Consultation Type</p>
                <p className="font-medium">{booking.consultationType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{booking.dateTime}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{booking.duration}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
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
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{booking.amount}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-lg font-medium">Status</h3>
              <div className="flex items-center gap-4">
                <Select defaultValue={booking.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Update Status</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-lg font-medium">Notes</h3>
              <Textarea
                className="min-h-[100px]"
                placeholder="Add booking notes here..."
                defaultValue={booking.notes}
              />
              <Button className="mt-2">Save Notes</Button>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Booking History</h3>
              <div className="space-y-4">
                {booking.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16" src={booking.user.avatar || "/placeholder.svg"} alt={booking.user.name} />
                <div>
                  <h3 className="font-medium">{booking.user.name}</h3>
                  <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                  <p className="text-sm text-muted-foreground">{booking.user.phone}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/admin/users/${booking.user.email}`}>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Astrologer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar
                  className="h-16 w-16"
                  src={booking.astrologer.avatar || "/placeholder.svg"}
                  alt={booking.astrologer.name}
                />

                <div>
                  <h3 className="font-medium">{booking.astrologer.name}</h3>
                  <p className="text-sm text-muted-foreground">{booking.astrologer.specialization}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/admin/astrologer-management/1">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Reschedule
              </Button>
              <Button className="w-full" variant="danger">
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
