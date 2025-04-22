// Status types for reports
export const REPORT_STATUS = {
  SENT: "sent",
  PENDING: "pending",
  FLAGGED: "flagged",
  DRAFT: "draft"
};

// Identity types
export const IDENTITY_TYPES = {
  ORIGINAL: "original",
  NEW: "new"
};

// Sample data for UI demonstration
export const SAMPLE_EARNINGS_DATA = [
  { month: "Jan", amount: 4500 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 5200 },
  { month: "Apr", amount: 4900 },
  { month: "May", amount: 5800 },
  { month: "Jun", amount: 6200 },
  { month: "Jul", amount: 5900 },
  { month: "Aug", amount: 6500 },
  { month: "Sep", amount: 7200 },
  { month: "Oct", amount: 7800 },
  { month: "Nov", amount: 8500 },
  { month: "Dec", amount: 9200 }
];

export const SAMPLE_REPORTS = [
  {
    id: "REP-001",
    clientName: "Sophia Chen",
    bookingDate: "2023-06-15T10:30:00",
    consultationType: "Birth Chart Reading",
    status: REPORT_STATUS.SENT,
    identityType: IDENTITY_TYPES.ORIGINAL,
    identityMismatch: false,
    sentDate: "2023-06-15T18:45:00"
  },
  {
    id: "REP-002",
    clientName: "Michael Johnson",
    bookingDate: "2023-06-16T14:00:00",
    consultationType: "Career Guidance",
    status: REPORT_STATUS.PENDING,
    identityType: IDENTITY_TYPES.ORIGINAL,
    identityMismatch: false,
    sentDate: null
  },
  {
    id: "REP-003",
    clientName: "Emma Wilson",
    bookingDate: "2023-06-17T11:00:00",
    consultationType: "Relationship Compatibility",
    status: REPORT_STATUS.FLAGGED,
    identityType: IDENTITY_TYPES.NEW,
    identityMismatch: true,
    sentDate: null
  },
  {
    id: "REP-004",
    clientName: "James Brown",
    bookingDate: "2023-06-18T16:30:00",
    consultationType: "Annual Forecast",
    status: REPORT_STATUS.DRAFT,
    identityType: IDENTITY_TYPES.ORIGINAL,
    identityMismatch: false,
    sentDate: null
  },
  {
    id: "REP-005",
    clientName: "Olivia Smith",
    bookingDate: "2023-06-19T09:00:00",
    consultationType: "Spiritual Guidance",
    status: REPORT_STATUS.SENT,
    identityType: IDENTITY_TYPES.ORIGINAL,
    identityMismatch: false,
    sentDate: "2023-06-19T19:15:00"
  },
  {
    id: "REP-006",
    clientName: "Noah Garcia",
    bookingDate: "2023-06-20T13:00:00",
    consultationType: "Birth Chart Reading",
    status: REPORT_STATUS.PENDING,
    identityType: IDENTITY_TYPES.NEW,
    identityMismatch: false,
    sentDate: null
  },
  {
    id: "REP-007",
    clientName: "Ava Martinez",
    bookingDate: "2023-06-21T10:00:00",
    consultationType: "Career Guidance",
    status: REPORT_STATUS.FLAGGED,
    identityType: IDENTITY_TYPES.ORIGINAL,
    identityMismatch: true,
    sentDate: null
  },
  {
    id: "REP-008",
    clientName: "Ethan Robinson",
    bookingDate: "2023-06-22T15:30:00",
    consultationType: "Relationship Compatibility",
    status: REPORT_STATUS.DRAFT,
    identityType: IDENTITY_TYPES.NEW,
    identityMismatch: false,
    sentDate: null
  }
];

export const SAMPLE_REPORT_DETAIL = {
  id: "REP-001",
  clientName: "Sophia Chen",
  clientEmail: "sophia.chen@example.com",
  clientPhone: "+1 (555) 123-4567",
  bookingDate: "2023-06-15T10:30:00",
  consultationType: "Birth Chart Reading",
  consultationFee: 150,
  birthDate: "1990-03-15T00:00:00",
  birthTime: "08:30:00",
  birthPlace: "San Francisco, CA",
  questions: [
    "How does my birth chart affect my career path?",
    "What can I expect in my relationships based on my chart?",
    "Are there any significant life changes coming in the next year?"
  ],
  astrologerNotes:
    "Client was very receptive and had deep questions about career transitions. Advised on favorable periods for job changes and relationship developments.",
  mainReading:
    "The client's birth chart shows a strong Saturn in the 10th house, indicating a structured and disciplined approach to career. Venus in the 7th house suggests harmony in partnerships after some initial challenges. A Neptune transit to the natal Sun indicates a period of spiritual awakening and possible confusion about identity in the coming months.",
  recommendations:
    "Meditation practices would be beneficial during the Neptune transit. Career moves are favored after August when Jupiter moves into a favorable position. Relationship work should focus on clear communication during Mercury retrograde periods.",
  status: "sent",
  identityType: "original",
  identityMismatch: false,
  sentDate: "2023-06-15T18:45:00",
  astrologerName: "Dr. Raj Sharma"
};
