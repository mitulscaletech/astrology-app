import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";

import AuthProvider from "@/components/auth-provider";
import { LoaderProvider } from "@/context/LoaderContext";

import "./globals.css";
import "@/assets/scss/phone-input.scss";
import "react-phone-input-2/lib/style.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--inter"
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--playfair_display"
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
      <body className={`${inter.className} ${inter.variable} ${playfairDisplay.variable} antialiased`}>
        <LoaderProvider>
          <AuthProvider>
            {children}
            <Toaster position="bottom-center" reverseOrder={false} />
          </AuthProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
