/* eslint-disable no-unused-vars */
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      full_name?: string | null;
      first_name: string | null;
      last_name: string | null;
      email?: string | null;
      image?: string | null;
      mobile_number?: string | null; // 👈 Add your custom property
      date_of_birth?: Date | null;
      place_of_birth?: string | null;
      time_of_birth?: Date | null;
      languages_spoken?: IOption[];
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
      gender: IOption;
      profilePhoto: File | undefined;
      resume: string;
      institute_university_name: string;
      otherCompanies: string;
      intake_form: {
        id: string;
        additional_emails: any;
        place_of_birth: string;
        time_of_birth: string;
        languages_spoken: IOption[];
        current_address: string;
        permanent_address: string;
        years_of_experience: number;
        highest_qualification: IOption;
        institute_university_name: string;
        instagram: string;
        facebook: string;
        linkedin: string;
        twitter: string;
        tiktok: string;
        youtube: string;
        personal_website: string;
        associated_companies: string;
        short_bio: string;
        reason_for_joining: any;
        completed_steps: number;
        created_at: string;
        updated_at: string;
        specialization: string;
      };
      media_files: IMediaFile[];
    };
  }
  interface IOption {
    value: string;
    label: string;
  }

  interface IMediaFile {
    media_id: string;
    media_type: string;
    s3_path: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
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
