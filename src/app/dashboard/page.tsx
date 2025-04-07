"use client";

import { useEffect, useState } from "react";

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
      {accessToken ? <p>✅ Connected to Calendly! Your token: {accessToken.token}</p> : <p>🔗 Not connected yet.</p>}
    </div>
  );
}
