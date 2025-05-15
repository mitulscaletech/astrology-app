"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import AstrologerHeader from "@/components/header/astrologer-header";
import { Footer } from "@/components/footer";

export default function AstrologerLayout({ children }: { children: React.ReactNode }) {
  const { update, data: session } = useSession();

  useEffect(() => {
    HttpService.get(API_CONFIG.me).then((response) => {
      if (!response.is_error) {
        update({ ...session?.user, ...response.data });
      }
    });
  }, []);

  return (
    <div className="">
      <AstrologerHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
