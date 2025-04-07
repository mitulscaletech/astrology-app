"use client";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("/api/auth/token");
      const data = await response.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
    }
    fetchToken();
  }, []);

  const handleCalendlyLogin = () => {
    window.location.href = `https://auth.calendly.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Booking Page</h1>

      {accessToken ? (
        <p>✅ You are logged in with Calendly!</p>
      ) : (
        <button
          onClick={handleCalendlyLogin}
          className="bg-blue-500 text-accent-white px-4 py-2 rounded"
        >
          Login with Calendly
        </button>
      )}
    </div>
  );
}
