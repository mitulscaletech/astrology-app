import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import "react-phone-input-2/lib/style.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    template: "%s | WeWake",
    default: "WeWake - Your Personal Astrology Platform"
  },
  description: "Connect with professional astrologers for personalized consultations"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
