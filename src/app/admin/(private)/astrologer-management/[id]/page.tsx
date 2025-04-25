"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Edit, Mail, Phone, Trash, Check, FileText, DollarSign, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

// Mock astrologer data
const astrologer = {
  id: "1",
  name: "Dr. Aisha Sharma",
  email: "aisha.sharma@example.com",
  phone: "+1 (555) 123-4567",
  specializations: [
    { name: "Vedic", active: true },
    { name: "Tarot", active: true },
    { name: "Numerology", active: false }
  ],
  pricing: {
    base: "$75/hour",
    services: [
      { name: "Vedic", price: "$85/hour" },
      { name: "Tarot", price: "$75/hour" },
      { name: "Numerology", price: "$65/hour" }
    ],
    durations: ["30 min", "60 min", "90 min"]
  },
  status: "active",
  joinedDate: "Jan 15, 2025",
  bio: "Dr. Aisha Sharma is a renowned astrologer with over 15 years of experience in Vedic astrology, Tarot reading, and Numerology. She has helped thousands of clients find clarity and direction in their lives through her accurate predictions and compassionate guidance.",
  avatar: "/placeholder.svg?height=128&width=128",
  documents: [
    { name: "ID Proof.pdf", date: "Jan 15, 2025", verified: true },
    { name: "Certification.pdf", date: "Jan 15, 2025", verified: true },
    { name: "Experience Letter.pdf", date: "Jan 15, 2025", verified: false }
  ],
  sessions: [
    { client: "John Doe", date: "Apr 22, 2025", duration: "60 min", amount: "$75" },
    { client: "Sarah Smith", date: "Apr 20, 2025", duration: "30 min", amount: "$40" },
    { client: "Michael Brown", date: "Apr 18, 2025", duration: "60 min", amount: "$75" },
    { client: "Emily Johnson", date: "Apr 15, 2025", duration: "90 min", amount: "$110" }
  ]
};

export default function AstrologerDetailsPage({ params }: { params: { id: string } }) {
  const [specializationStatuses, setSpecializationStatuses] = useState(
    astrologer.specializations.map((spec) => ({ name: spec.name, active: spec.active }))
  );

  const toggleSpecialization = (name: string) => {
    setSpecializationStatuses((prev) =>
      prev.map((spec) => (spec.name === name ? { ...spec, active: !spec.active } : spec))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/astrologer-management">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Astrologer Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/astrologer-management/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">
                <Trash className="mr-2 h-4 w-4" />
                Delete Profile
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the astrologer&apos;s profile and remove
                  all associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32" src={astrologer.avatar || "/placeholder.svg"} alt={astrologer.name} />

              <CardTitle className="mt-4">{astrologer.name}</CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                <Button variant="outline" size="sm">
                  {astrologer.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{astrologer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{astrologer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {astrologer.joinedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Base Rate: {astrologer.pricing.base}</span>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Specializations</h4>
              <div className="flex flex-wrap gap-1">
                {astrologer.specializations.map((spec) => (
                  <Badge key={spec.name} variant={spec.active ? "default" : "outline"}>
                    {spec.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="overview">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Astrologer Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="specializations">Specializations</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Bio</h3>
                  <p className="mt-2 text-muted-foreground">{astrologer.bio}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Stats</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">Total Sessions</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">4.8</div>
                        <p className="text-xs text-muted-foreground">Average Rating</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">$3,150</div>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Repeat Clients</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="rounded-md border border-secondary-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {astrologer.documents.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              {doc.name}
                            </div>
                          </TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>
                            {doc.verified ? (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <Check className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                Pending Verification
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              {!doc.verified && (
                                <Button variant="outline" size="sm">
                                  Verify
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Additional Documents
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="specializations">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Manage the astrologer&apos;s specializations. Activate specializations that have been verified.
                  </p>
                  <div className="rounded-md border border-secondary-100">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {specializationStatuses.map((spec, index) => (
                          <TableRow key={index}>
                            <TableCell>{spec.name}</TableCell>
                            <TableCell>
                              {spec.active ? (
                                <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                              ) : (
                                <Badge variant="outline">Inactive</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {spec.active ? "Deactivate" : "Activate"}
                                </span>
                                <Switch checked={spec.active} onCheckedChange={() => toggleSpecialization(spec.name)} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Pricing Information</h3>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Pricing
                    </Button>
                  </div>
                  <div className="rounded-md border border-secondary-100">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Base Rate</TableCell>
                          <TableCell className="text-right">{astrologer.pricing.base}</TableCell>
                        </TableRow>
                        {astrologer.pricing.services.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell>{service.name}</TableCell>
                            <TableCell className="text-right">{service.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Available Session Durations</h4>
                    <div className="flex flex-wrap gap-2">
                      {astrologer.pricing.durations.map((duration, index) => (
                        <Badge key={index} variant="outline">
                          {duration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sessions">
                <div className="rounded-md border border-secondary-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {astrologer.sessions.map((session, index) => (
                        <TableRow key={index}>
                          <TableCell>{session.client}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.duration}</TableCell>
                          <TableCell className="text-right">{session.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
