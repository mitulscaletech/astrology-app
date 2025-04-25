"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Edit, Eye, Plus, Star, Trash, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const columns = ["Astrologer", "Specializations", "Pricing", "Status", "Joined", "Actions"];

const astrologers = [
  {
    id: "1",
    name: "Dr. Aisha Sharma",
    email: "aisha.sharma@example.com",
    specializations: ["Vedic", "Tarot"],
    pricing: "$75/hour",
    status: "active",
    joinedDate: "Jan 15, 2025",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "John Miller",
    email: "john.miller@example.com",
    specializations: ["Western", "Numerology"],
    pricing: "$65/hour",
    status: "active",
    joinedDate: "Feb 3, 2025",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    specializations: ["Palmistry", "Tarot"],
    pricing: "$80/hour",
    status: "pending",
    joinedDate: "Mar 21, 2025",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    name: "David Chen",
    email: "david.chen@example.com",
    specializations: ["Chinese", "Feng Shui"],
    pricing: "$90/hour",
    status: "inactive",
    joinedDate: "Dec 10, 2024",
    avatar: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    specializations: ["Vedic", "Gemology"],
    pricing: "$70/hour",
    status: "active",
    joinedDate: "Apr 5, 2025",
    avatar: "/placeholder.svg"
  }
];

export default function AstrologersPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Astrologers</h1>
          <p className="text-muted-foreground">Manage your astrologer profiles</p>
        </div>
        <Button asChild>
          <Link href="/admin/astrologer-management/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Astrologer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Astrologer Management</CardTitle>
          <CardDescription>View, edit, and manage all astrologers on your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={astrologers}
            enableSearch
            searchBy={(astro) => `${astro.name} ${astro.email} ${astro.specializations.join(" ")} ${astro.status}`}
            filters={
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            {(filtered) => {
              const filteredAstrologers =
                statusFilter === "all" ? filtered : filtered.filter((astro) => astro.status === statusFilter);

              return filteredAstrologers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No astrologers found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAstrologers.map((astrologer) => (
                  <TableRow key={astrologer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={astrologer.avatar} alt={astrologer.name} fallback="AB" size="lg" />
                        <div>
                          <div className="font-medium">{astrologer.name}</div>
                          <div className="text-sm text-muted-foreground">{astrologer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {astrologer.specializations.map((spec) => (
                          <Badge key={spec}>{spec}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{astrologer.pricing}</TableCell>
                    <TableCell>
                      {astrologer.status === "active" ? (
                        <Badge variant="success">
                          <Check className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : astrologer.status === "pending" ? (
                        <Badge variant="pending">
                          <Star className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="danger">
                          <X className="mr-1 h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{astrologer.joinedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/astrologer-management/${astrologer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/astrologer-management/${astrologer.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              );
            }}
          </DataTable>
        </CardContent>
      </Card>
    </div>
  );
}
