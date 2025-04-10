"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function AstrologerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/astrologer/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className='min-h-screen bg-primary-100 flex items-center justify-center'>
        <p className='text-lg text-primary'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-primary-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <Card className='p-6'>
          <h1 className='text-2xl font-bold text-primary mb-4'>Astrologer Dashboard</h1>
          <p className='text-gray-600'>Welcome to your dashboard!</p>
          {session?.user && (
            <div className='mt-4 p-4 bg-primary-200 rounded-lg'>
              <h2 className='font-semibold text-primary'>Session Info</h2>
              <pre className='mt-2 p-2 bg-accent-white rounded overflow-auto'>{JSON.stringify(session, null, 2)}</pre>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
