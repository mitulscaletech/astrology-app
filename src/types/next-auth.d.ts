/* eslint-disable no-unused-vars */
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      full_name?: string | null;
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
      access_token?: string | null;
      provider?: string | null;
      id?: string;
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
      years_of_experience: number;
      highest_qualification: string;
      certificate: string;
      specialization: string;
      resume: string;
      institute_university_name: string;
      otherCompanies: string;
      instagram: string;
      facebook: string;
      twitter: string;
      tiktok: string;
      youtube: string;
      website: string;
      linkedin: string;
      otherCompanies: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
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
    access_token?: string | null;
    provider?: string | null;
  }
}
