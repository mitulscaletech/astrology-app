"use client";

import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState<{ refreshToken: string; token: string } | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("/api/auth/token");
      const data = await response.json();
      console.log(" data:", data);
      setAccessToken(data.accessToken);
    }
    fetchToken();
  }, []);

  return (
    <div>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      {accessToken ? <p>✅ Conncted to Calendly! Your token: {accessToken.token}</p> : <p>🔗 Not connected yet.</p>}
      Calendly
      <InlineWidget url='https://calendly.com/d/crx8-zhb-kty/my-meeting-slot-wewake/2025-04-09T14:30:00+05:30?month=2025-04&date=2025-04-09?email=mitul.vala@scaletech.xyz' />
    </div>
  );
}
