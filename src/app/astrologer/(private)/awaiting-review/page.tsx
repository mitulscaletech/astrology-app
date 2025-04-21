"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import IconChevronRight from "@/shared/icons/chevronRight";
import IconClock from "@/shared/icons/clock";
import IconMail from "@/shared/icons/mail";
import IconSetting from "@/shared/icons/setting";
import IconUser from "@/shared/icons/user";
import { useSession } from "next-auth/react";

export default function AwaitingReview() {
  const { data } = useSession();
  return (
    <div className="container">
      {/* Header with status bar */}
      <div className="bg-white border-b border-secondary-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium">Awaiting Review</span>
          </div>
          <div className="text-sm text-secondary-400">User Name: {data?.user?.full_name} </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Main content area */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
                <span className="h-10 w-10 text-primary">
                  <IconSetting />
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile Under Process</h1>
              <p className="text-xl text-secondary-400">Your account is currently being reviewed by our team</p>
            </div>

            {/* Status card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="h-2 bg-primary"></div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="w-6 h-6 text-primary">
                      <IconUser />
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Account Verification</h2>
                    <p className="text-secondary-400">Admin approval pending</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant={"pending"}>In Progress</Badge>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-2/3 animate-[progress_3s_ease-in-out_infinite]"></div>
                  </div>
                </div>

                {/* Status timeline */}
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Account Created</h3>
                      <p className="text-xs text-secondary-400">Your account has been successfully created</p>
                    </div>
                    <div className="ml-auto text-xs text-success">Completed</div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Admin Review</h3>
                      <p className="text-xs text-secondary-400">An administrator is reviewing your profile</p>
                    </div>
                    <div className="ml-auto text-xs text-secondary-400">In Progress</div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary-400">Account Activation</h3>
                      <p className="text-xs text-secondary-400">Your account will be activated after approval</p>
                    </div>
                    <div className="ml-auto text-xs text-secondary-400">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information box */}
            <div className="bg-accent-white rounded-lg border border-primary-100 p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                  <span className="h-6 w-6 text-primary">
                    <IconMail />
                  </span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Admin will contact you shortly</h3>
                  <p className="text-secondary-400 mb-3">
                    Our team is currently reviewing your profile information. You will receive an email notification
                    once the process is complete.
                  </p>
                  <div className="flex items-center text-sm text-secondary font-medium">
                    <span>Estimated time: 24-48 hours</span>
                    <span className="w-4 h-4 ml-1">
                      <IconClock />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-8 text-center">
              <Button className="items-center">
                Check Status Later
                <span className="ml-2 h-4 w-4">
                  <IconChevronRight />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-secondary-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-secondary-400">
          <p>If you have any questions, please contact support at support@example.com</p>
        </div>
      </div>
    </div>
  );
}
