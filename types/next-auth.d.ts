// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      mobile_number?: string | null; // 👈 Add your custom property
      dateOfBirth?: Date | null;
      placeOfBirth?: string | null;
      timeOfBirth?: string | null;
      languages?: string | null;
      currentAddress?: string | null;
      permanentAddress?: string | null;
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
    };
  }

  interface User {
    phone?: string | null;
  }
}
