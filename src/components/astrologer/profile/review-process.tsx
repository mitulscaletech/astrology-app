"use client";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

export function ReviewProcess() {
  return (
    <div className="container mb-15">
      <Grid className="justify-center">
        <Grid.Col className="md:w-10/12 lg:w-8/12 2xl:w-7/12">
          <Typography variant="h3" size="base" className="text-lg font-normal text-secondary uppercase mb-3">
            Review Process
          </Typography>
          <Typography variant="h2" size="h3" className="text-7xl font-semibold text-secondary mb-8">
            Profile Submitted
          </Typography>
          <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary/70 mb-8">
            Thank you for completing your profile! Our team is now reviewing your information to ensure quality and
            trust for all WeWake users.
          </Typography>

          <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
            <Grid.Col>
              <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary mb-8">
                We're reviewing your submission carefully. Once approved, you’ll be notified by email and your profile
                will be live. You’ll then gain full access to your personal dashboard, calendar sync, and begin
                receiving consultations.
              </Typography>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
