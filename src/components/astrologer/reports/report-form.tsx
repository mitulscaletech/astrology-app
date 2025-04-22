"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { ReportDetail } from "@/shared/interface";
import IconFile from "@/shared/icons/file";
import IconSend from "@/shared/icons/send";
import IconAlertTriangle from "@/shared/icons/alertTriangle";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const reportSchema = z.object({
  clientName: z.string().min(1, { message: "Client name is required" }),
  clientEmail: z.string().email({ message: "Valid email is required" }),
  clientPhone: z.string().min(1, { message: "Phone number is required" }),
  consultationType: z.string().min(1, { message: "Consultation type is required" }),
  consultationFee: z.coerce.number().min(0, { message: "Fee must be a positive number" }),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
  birthTime: z.string(),
  birthPlace: z.string().min(1, { message: "Birth place is required" }),
  mainReading: z.string().min(1, { message: "Main reading is required" }),
  recommendations: z.string().min(1, { message: "Recommendations are required" }),
  astrologerNotes: z.string(),
  identityType: z.enum(["original", "new"]),
  identityMismatch: z.boolean().default(false)
});

interface ReportFormProps {
  report: ReportDetail;
}

export function ReportForm({ report }: ReportFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      clientName: report.clientName,
      clientEmail: report.clientEmail,
      clientPhone: report.clientPhone,
      consultationType: report.consultationType,
      consultationFee: report.consultationFee,
      birthDate: report.birthDate.split("T")[0],
      birthTime: report.birthTime,
      birthPlace: report.birthPlace,
      mainReading: report.mainReading,
      recommendations: report.recommendations,
      astrologerNotes: report.astrologerNotes,
      identityType: report.identityType as "original" | "new",
      identityMismatch: report.identityMismatch
    }
  });

  const onSubmit = async (data: z.infer<typeof reportSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Report saved: The report has been successfully saved.");
    }, 1500);
  };

  const sendReport = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Report sent: The report has been successfully sent to the client.");
      router.push("/reports");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Report {report.id}</h1>
              <p className="text-muted-foreground">View and edit consultation report details</p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="gap-1">
                <span className="h-4 w-4">
                  <IconFile />
                </span>
                <span>Download PDF</span>
              </Button>
              {report.status !== "sent" && (
                <Button
                  type="button"
                  className="gap-1 bg-[#b1142d] hover:bg-[#90102a]"
                  onClick={sendReport}
                  disabled={isSubmitting}
                >
                  <span className="h-4 w-4">
                    <IconSend />
                  </span>
                  <span>Send to Client</span>
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="report">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="report">Report Details</TabsTrigger>
              <TabsTrigger value="client">Client Information</TabsTrigger>
            </TabsList>

            <TabsContent value="report" className="space-y-6 pt-4">
              {form.watch("identityMismatch") && (
                <Alert variant="destructive">
                  <span className="h-4 w-4">
                    <IconAlertTriangle />
                  </span>

                  <AlertTitle>Identity Mismatch Detected</AlertTitle>
                  <AlertDescription>
                    The identity of this client doesn&apos;t match the original booking details. Please verify all
                    information carefully.
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Consultation Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consultation Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consultationFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consultation Fee ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="identityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identity Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-1 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="original" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">Original Booking</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="new" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">New Identity</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Select 'Original Booking' if client details match booking information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="identityMismatch"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Flag identity mismatch</FormLabel>
                          <FormDescription>
                            Check this box if there&apos;s a discrepancy between booking details and client's identity.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Astrological Reading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mainReading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Reading</FormLabel>
                        <FormControl>
                          <Textarea rows={6} className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recommendations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recommendations</FormLabel>
                        <FormControl>
                          <Textarea rows={4} className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="astrologerNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Astrologer Notes (Not shared with client)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="client" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Birth Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="birthPlace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Place</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {report.questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-muted-foreground">{question}</p>
                      {index < report.questions.length - 1 && <hr />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push("/reports")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
