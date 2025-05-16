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
      mobile_number?: string | null;
      date_of_birth?: Date | null;
      role?: string | null;
      access_token?: string | null;
      id?: string;
      country_code?: string;
      gender: string | IOption;
      profilePhoto: File | undefined;
      status: string;
      is_active: boolean;
      is_verified: boolean;
      specializations: ISpecialization[];
      intake_form: {
        id: string;
        additional_emails: any;
        place_of_birth: string;
        time_of_birth?: string;
        languages_spoken: string;
        current_address: string;
        permanent_address: string;
        years_of_experience: number;
        highest_qualification: string;
        institute_university_name: string;
        instagram: string;
        facebook: string;
        linkedin: string;
        twitter: string;
        tiktok: string;
        youtube: string;
        personal_website: string;
        associated_companies: IAssociatedCompany[];
        short_bio: string;
        reason_for_joining: any;
        completed_steps: number;
        created_at: string;
        updated_at: string;
        current_address?: string | null;
        permanent_address?: string | null;
      };
      specializations: ISpecialization[];
      media_files: IMediaFile[];
      custom_specialization: ICustomSpecialization[];
    };
  }
  interface IAssociatedCompany {
    name: string;
  }
  interface ISpecialization {
    specialization_id: string;
    specialization_name: string;
    description: string;
  }
  interface ICustomSpecialization {
    specialization_name: string;
    specialization_desc: string;
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
    status: string;
  }
}
