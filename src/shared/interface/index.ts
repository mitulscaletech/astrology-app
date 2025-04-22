export interface IResponseObject<T> {
  isError: boolean;
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

export interface Astrologer {
  id: string;
  name: string;
  slug: string;
  specialization: string;
  languages: string[];
  rating: number;
  experience: number;
  bio: string;
  price: number;
  availability: string;
  imageUrl?: any;
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

export interface AstrologerDetail extends Astrologer {
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
