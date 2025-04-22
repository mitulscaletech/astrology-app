"use client";

import { ReportsList } from "@/components/astrologer/reports/reports-list";
import { SAMPLE_REPORTS } from "@/shared/constants/dummy-data";

export default function ReportsPage() {
  return (
    <div className="container space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Consultation Reports</h1>
        <p className="text-muted-foreground">Manage and view all consultation reports.</p>
      </div>

      <ReportsList reports={SAMPLE_REPORTS} />
    </div>
  );
}
