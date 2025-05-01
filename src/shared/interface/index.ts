export interface IResponseObject<T> {
  is_error: boolean;
  message: string;
  data: T;
}

export interface ISortData {
  orderBy?: string;
  orderType?: OrderType;
}

export interface OrderType {
  ASC: "ASC";
  DESC: "DESC";
}

export interface IPage {
  pageNumber: number;
  pageSize: number;
}

export interface IDropdownOptions {
  label: string;
  value: string;
  id?: string | number;
  disabled?: boolean;
}

export interface IUserData {
  id: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  token: string;
  country_code: string;
}

export interface IAstrologer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  mobile_number: string;
  country_code: string;
  is_active: boolean;
  is_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  intake_form: IIntakeForm;
  media_files: any[];
  specializations: any[];
}

export interface IIntakeForm {
  id: string;
  additional_emails: any;
  place_of_birth: string;
  time_of_birth: string;
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
  associated_companies: any;
  short_bio: string;
  reason_for_joining: any;
  completed_steps: number;
  created_at: string;
  updated_at: string;
  languages: string[];
}

export interface AstrologerService {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: string;
  features: string[];
}

export interface AstrologerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface AstrologerDetail extends IAstrologer {
  detailedBio: string;
  email: string;
  phone?: string;
  location: string;
  expertise: string[];
  education: Education[];
  services: AstrologerService[];
  reviews: AstrologerReview[];
  reviewCount: number;
}

export interface EarningData {
  amount: number;
  date: string;
  clientName?: string;
  consultationType?: string;
  reportId?: string;
}

export interface EarningsSummary {
  total: number;
  thisMonth: number;
  lastMonth: number;
  history: EarningData[];
}

export interface Report {
  id: string;
  clientName: string;
  bookingDate: string;
  consultationType: string;
  status: "sent" | "pending" | "flagged" | "draft" | any;
  identityType: "original" | "new";
  identityMismatch: boolean;
  sentDate: string | null;
}

export interface ReportDetail extends Report {
  clientEmail: string;
  clientPhone: string;
  consultationFee: number;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  questions: string[];
  astrologerNotes: string;
  mainReading: string;
  recommendations: string;
  astrologerName: string;
}
