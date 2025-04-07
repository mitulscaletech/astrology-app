"use client";

import { useEffect, useState } from "react";

export default function LoginButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`/api/auth/calendly?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("calendly_access_token", data.accessToken);
            setAccessToken(data.accessToken);
          }
        });
    }
  }, []);
  return (
    <div className="p-4">
      {/* {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-accent-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("calendly")}
          className="bg-blue-500 text-accent-white px-4 py-2 rounded"
        >
          Sign in with Calendly
        </button>
      )} */}
      <button
        onClick={() =>
          (window.location.href = `https://auth.calendly.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI}`)
        }
        className="bg-blue-500 text-accent-white px-4 py-2 rounded"
      >
        Sign in with Calendly
      </button>
    </div>
  );
}
