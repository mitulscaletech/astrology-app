// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      mobile_number?: string | null; // 👈 Add your custom property
      date_of_birth?: Date | null;
      place_of_birth?: string | null;
      time_of_birth?: string | null;
      languages_spoken?: string | null;
      current_address?: string | null;
      permanent_address?: string | null;
      sameAsCurrentAddress?: boolean;
      isNewUser?: boolean;
      role?: string | null;
      accessToken?: string | null;
      provider?: string | null;
      id?: string | null;
      isAstrologer?: boolean;
      isAdmin?: boolean;
      isUser?: boolean;
      isLoggedIn?: boolean;
      isVerified?: boolean;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      country_code?: string;
      gender: string;
      profilePhoto: File | undefined;
    };
  }

  interface User {
    phone?: string | null;
  }
}
