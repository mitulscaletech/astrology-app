import image01 from "@/assets/images/dummy/astrologer-01.jpg";
import moment from "moment";

export const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 5,
    comment:
      "Amazing reading! The astrologer was spot on with their predictions and provided valuable insights into my career path.",
    date: "2023-04-10T14:30:00Z",
    astrologerReply:
      "Thank you for your kind words, Sarah! I'm glad I could help provide clarity for your career journey.",
    replyDate: "2023-04-11T09:15:00Z"
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 4,
    comment: "Very insightful reading about my relationship. I appreciated the honest feedback and guidance.",
    date: "2023-04-05T16:45:00Z",
    astrologerReply: null,
    replyDate: null
  },
  {
    id: 3,
    user: {
      name: "Jessica Williams",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 5,
    comment: "I've had multiple readings and they've all been incredibly accurate. Highly recommend!",
    date: "2023-04-01T11:20:00Z",
    astrologerReply: "It's always a pleasure reading for you, Jessica! Looking forward to our next session.",
    replyDate: "2023-04-02T13:40:00Z"
  },
  {
    id: 4,
    user: {
      name: "David Thompson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 3,
    comment: "The reading was good but I expected more specific details about my financial future.",
    date: "2023-03-28T15:10:00Z",
    astrologerReply: null,
    replyDate: null
  },
  {
    id: 5,
    user: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 5,
    comment: "Absolutely blown away by the accuracy! The astrologer predicted events that happened just weeks later.",
    date: "2023-03-25T09:30:00Z",
    astrologerReply: "Thank you for your feedback, Emma! I'm happy the reading resonated with you.",
    replyDate: "2023-03-26T10:15:00Z"
  },
  {
    id: 6,
    user: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 2,
    comment: "The reading felt generic and could apply to anyone. I was hoping for more personalized insights.",
    date: "2023-03-20T13:45:00Z",
    astrologerReply:
      "I'm sorry to hear you felt the reading wasn't personalized enough, James. I'd be happy to schedule a follow-up session to address your specific concerns in more detail.",
    replyDate: "2023-03-21T08:30:00Z"
  },
  {
    id: 7,
    user: {
      name: "Olivia Garcia",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 4,
    comment: "Great reading! The astrologer was very patient and answered all my questions thoroughly.",
    date: "2023-03-15T17:20:00Z",
    astrologerReply: null,
    replyDate: null
  },
  {
    id: 8,
    user: {
      name: "Daniel Lee",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 1,
    comment: "The reading didn't resonate with me at all. None of the predictions have come true so far.",
    date: "2023-03-10T10:15:00Z",
    astrologerReply:
      "I understand your frustration, Daniel. Timing in astrology can be complex, and sometimes manifestations take longer than expected. I'd be happy to revisit your chart and provide further clarification.",
    replyDate: "2023-03-11T14:30:00Z"
  },
  {
    id: 9,
    user: {
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 5,
    comment:
      "The astrologer provided such detailed insights into my personality and life path. It was like they knew me better than I know myself!",
    date: "2023-03-05T12:40:00Z",
    astrologerReply: "Thank you for your kind words, Sophia! It was a pleasure to read your chart.",
    replyDate: "2023-03-06T09:20:00Z"
  },
  {
    id: 10,
    user: {
      name: "Ethan Brown",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 4,
    comment:
      "Very professional and insightful reading. I appreciated the practical advice for navigating my current challenges.",
    date: "2023-03-01T15:30:00Z",
    astrologerReply: null,
    replyDate: null
  },
  {
    id: 11,
    user: {
      name: "Ava Taylor",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 2,
    comment: "The connection was poor during our session which made it difficult to fully engage with the reading.",
    date: "2023-02-25T11:15:00Z",
    astrologerReply:
      "I sincerely apologize for the technical difficulties, Ava. I'd like to offer you a complimentary follow-up session to make up for the inconvenience.",
    replyDate: "2023-02-26T10:00:00Z"
  },
  {
    id: 12,
    user: {
      name: "Noah Wilson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    rating: 5,
    comment:
      "This was my first astrology reading ever and it exceeded all my expectations! I'll definitely be booking another session.",
    date: "2023-02-20T14:20:00Z",
    astrologerReply:
      "I'm thrilled to hear you enjoyed your first astrology experience, Noah! Looking forward to our next session.",
    replyDate: "2023-02-21T09:45:00Z"
  }
];

export const astrologers = [
  {
    id: "1",
    name: "Acharya Vinod Kumar",
    slug: "acharya-vinod-kumar",
    specialization: "Vedic Astrology",
    languages: ["English", "Hindi", "Sanskrit"],
    rating: 4.8,
    experience: 15,
    bio: "Acharya Vinod Kumar is a renowned Vedic astrologer with expertise in horoscope reading, marriage compatibility, and career guidance.",
    price: 1200,
    availability: "Mon-Sat, 10 AM - 7 PM"
  },
  {
    id: "2",
    name: "Dr. Maya Sharma",
    slug: "dr-maya-sharma",
    specialization: "Numerology & Tarot",
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    experience: 12,
    bio: "Dr. Maya Sharma combines numerology with tarot reading to provide accurate predictions and life path guidance.",
    price: 1500,
    availability: "Tue-Sun, 11 AM - 8 PM"
  },
  {
    id: "3",
    name: "Pandit Rajesh Joshi",
    slug: "pandit-rajesh-joshi",
    specialization: "Palmistry",
    languages: ["Hindi", "Marathi"],
    rating: 4.7,
    experience: 20,
    bio: "Pandit Rajesh Joshi is a master palmist who can reveal your past, present, and future through the lines on your palm.",
    price: 1000,
    availability: "Mon-Fri, 9 AM - 6 PM"
  },
  {
    id: "4",
    name: "Astrologer Sunita Kapoor",
    slug: "astrologer-sunita-kapoor",
    specialization: "Nadi Astrology",
    languages: ["English", "Tamil", "Telugu"],
    rating: 4.6,
    experience: 18,
    bio: "Sunita Kapoor specializes in the ancient Nadi astrology system, providing detailed insights into your destiny and karma.",
    price: 1800,
    availability: "Wed-Sun, 10 AM - 9 PM"
  },
  {
    id: "5",
    name: "Guru Harish Trivedi",
    slug: "guru-harish-trivedi",
    specialization: "Vastu Shastra",
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.5,
    experience: 25,
    bio: "Guru Harish Trivedi is an expert in Vastu Shastra, helping clients harmonize their living and working spaces for prosperity.",
    price: 2000,
    availability: "Mon-Sat, 8 AM - 5 PM"
  },
  {
    id: "6",
    name: "Jyotish Priya Malhotra",
    slug: "jyotish-priya-malhotra",
    specialization: "KP Astrology",
    languages: ["English", "Hindi", "Bengali"],
    rating: 4.9,
    experience: 10,
    bio: "Priya Malhotra practices Krishnamurti Paddhati (KP) astrology, known for its precision in timing events and predictions.",
    price: 1300,
    availability: "Tue-Sun, 12 PM - 8 PM"
  },
  {
    id: "7",
    name: "Astrologist Rahul Verma",
    slug: "astrologist-rahul-verma",
    specialization: "Medical Astrology",
    languages: ["English", "Hindi"],
    rating: 4.7,
    experience: 14,
    bio: "Rahul Verma specializes in medical astrology, helping clients understand health issues through astrological analysis.",
    price: 1600,
    availability: "Mon-Fri, 11 AM - 7 PM"
  },
  {
    id: "8",
    name: "Shri Kailash Gupta",
    slug: "shri-kailash-gupta",
    specialization: "Lal Kitab",
    languages: ["Hindi", "Urdu"],
    rating: 4.8,
    experience: 30,
    bio: "Shri Kailash Gupta is a master of Lal Kitab astrology, offering powerful remedies for various life problems.",
    price: 1100,
    availability: "Mon-Sat, 9 AM - 6 PM"
  },
  {
    id: "9",
    name: "Astrologer Meera Patel",
    slug: "astrologer-meera-patel",
    specialization: "Western Astrology",
    languages: ["English", "Gujarati"],
    rating: 4.6,
    experience: 8,
    bio: "Meera Patel combines Western astrology with modern psychological insights to provide holistic guidance.",
    price: 1400,
    availability: "Wed-Sun, 10 AM - 8 PM"
  },
  {
    id: "10",
    name: "Dr. Amit Shastri",
    slug: "dr-amit-shastri",
    specialization: "Gemstone Astrology",
    languages: ["English", "Hindi", "Kannada"],
    rating: 4.9,
    experience: 16,
    bio: "Dr. Amit Shastri specializes in recommending gemstones based on your birth chart to enhance positive energies.",
    price: 1700,
    availability: "Tue-Sun, 9 AM - 7 PM"
  },
  {
    id: "11",
    name: "Yogini Ananya",
    slug: "yogini-ananya",
    specialization: "Spiritual Astrology",
    languages: ["English", "Malayalam", "Tamil"],
    rating: 5.0,
    experience: 22,
    bio: "Yogini Ananya integrates spiritual practices with astrology to guide clients on their soul's journey and purpose.",
    price: 2200,
    availability: "Thu-Mon, 7 AM - 3 PM"
  },
  {
    id: "12",
    name: "Jyotishacharya Deepak",
    slug: "jyotishacharya-deepak",
    specialization: "Prasna Kundli",
    languages: ["Hindi", "Marathi", "Sanskrit"],
    rating: 4.7,
    experience: 19,
    bio: "Jyotishacharya Deepak is an expert in Prasna Kundli, providing answers to specific questions through horary astrology.",
    price: 1250,
    availability: "Mon-Sat, 10 AM - 6 PM"
  }
];

import astrologer1 from "@/assets/images/indian-astrologer-1.jpg";
import astrologer2 from "@/assets/images/indian-astrologer-2.png";
import astrologer3 from "@/assets/images/indian-astrologer-3.webp";

export const astrologersDetails = [
  {
    id: "1",
    name: "Acharya Vinod Kumar",
    slug: "acharya-vinod-kumar",
    specialization: "Vedic Astrology",
    languages: ["English", "Hindi", "Sanskrit"],
    rating: 4.8,
    experience: 15,
    bio: "Acharya Vinod Kumar is a renowned Vedic astrologer with expertise in horoscope reading, marriage compatibility, and career guidance.",
    detailedBio:
      "With over 15 years of experience in Vedic astrology, Acharya Vinod Kumar has helped thousands of individuals navigate life's challenges through astrological insights. He comes from a family of astrologers, with knowledge passed down through seven generations. His predictions are known for their accuracy and the practical remedies he suggests have transformed many lives. He combines traditional Vedic knowledge with modern psychological understanding to provide holistic guidance.",
    price: 1200,
    availability: "Mon-Sat, 10 AM - 7 PM",
    imageUrl: astrologer1,
    email: "acharya.vinod@astroguide.com",
    phone: "+91 9876543210",
    location: "Delhi, India",
    reviewCount: 487,
    expertise: [
      "Kundli Analysis",
      "Marriage Compatibility",
      "Career Guidance",
      "Vastu Consultation",
      "Gemstone Recommendations",
      "Planetary Remedies"
    ],
    education: [
      {
        degree: "Master in Vedic Astrology",
        institution: "Banaras Hindu University",
        year: "2005"
      },
      {
        degree: "Jyotish Acharya",
        institution: "Sanskrit Vidyapeeth, Varanasi",
        year: "2003"
      },
      {
        degree: "Certification in KP Astrology",
        institution: "Institute of Astrology, Chennai",
        year: "2008"
      }
    ],
    services: [
      {
        id: "s1",
        name: "Complete Birth Chart Analysis",
        price: 2100,
        duration: "60 minutes",
        features: [
          "Detailed birth chart creation",
          "Analysis of all 12 houses",
          "Planetary positions and aspects",
          "Dasha predictions for next 5 years",
          "Personalized remedies",
          "Written report included"
        ]
      },
      {
        id: "s2",
        name: "Marriage Compatibility",
        price: 1500,
        duration: "45 minutes",
        features: [
          "Guna Milan analysis",
          "Detailed compatibility report",
          "Future challenges and solutions",
          "Best time for marriage",
          "Remedies for harmonious relationship",
          "Follow-up consultation"
        ]
      },
      {
        id: "s3",
        name: "Career Guidance",
        price: 1800,
        duration: "50 minutes",
        features: [
          "Analysis of 10th house (career)",
          "Suitable profession based on birth chart",
          "Favorable time periods for career growth",
          "Potential challenges and solutions",
          "Education and skill development guidance",
          "Written report included"
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Rajesh Sharma",
        rating: 5,
        date: "March 15, 2023",
        comment:
          "Acharya Vinod's predictions about my career change were spot on. His guidance helped me make the right decision at the right time. The remedies he suggested were simple yet effective. Highly recommended!",
        helpfulCount: 42
      },
      {
        id: "r2",
        name: "Priya Malhotra",
        rating: 5,
        date: "February 3, 2023",
        comment:
          "I consulted Acharya ji for marriage compatibility, and his insights were incredibly accurate. He pointed out potential challenges and suggested remedies that have truly helped us build a harmonious relationship. His approach is scientific and practical.",
        helpfulCount: 38
      },
      {
        id: "r3",
        name: "Amit Patel",
        rating: 4,
        date: "January 20, 2023",
        comment:
          "Very knowledgeable astrologer with deep understanding of Vedic principles. The consultation was detailed and insightful. The only reason for 4 stars is that some remedies were a bit complex to follow, but overall excellent guidance.",
        helpfulCount: 27
      },
      {
        id: "r4",
        name: "Sunita Reddy",
        rating: 5,
        date: "December 12, 2022",
        comment:
          "Acharya Vinod Kumar provided exceptional insights into my financial situation. His predictions about a property dispute were accurate, and the remedies he suggested helped resolve the issue smoothly. His calm demeanor and clear explanations make complex astrological concepts easy to understand.",
        helpfulCount: 35
      },
      {
        id: "r5",
        name: "Vikram Singh",
        rating: 5,
        date: "November 5, 2022",
        comment:
          "I've been consulting Acharya ji for over 5 years now, and his guidance has been invaluable. From career decisions to family matters, his predictions have always guided me in the right direction. What sets him apart is his ethical approach and genuine concern for his clients.",
        helpfulCount: 51
      },
      {
        id: "r6",
        name: "Meera Kapoor",
        rating: 4,
        date: "October 18, 2022",
        comment:
          "The birth chart analysis was comprehensive and insightful. Acharya ji explained everything in simple terms and was patient with all my questions. The remedies were practical and showed results within weeks. Would definitely recommend his services.",
        helpfulCount: 29
      }
    ]
  },
  {
    id: "2",
    name: "Dr. Maya Sharma",
    slug: "dr-maya-sharma",
    specialization: "Numerology & Tarot",
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    experience: 12,
    bio: "Dr. Maya Sharma combines numerology with tarot reading to provide accurate predictions and life path guidance.",
    detailedBio:
      "Dr. Maya Sharma holds a Ph.D. in Psychology and has integrated her academic knowledge with ancient numerological principles and tarot wisdom. Her unique approach combines scientific understanding of human behavior with mystical insights, offering a comprehensive guidance system. She has authored three books on numerology and regularly conducts workshops across the country. Her clientele includes celebrities, business leaders, and individuals seeking clarity in various aspects of life.",
    price: 1500,
    availability: "Tue-Sun, 11 AM - 8 PM",
    imageUrl: astrologer2,
    email: "dr.maya@astroguide.com",
    phone: "+91 9876543211",
    location: "Mumbai, India",
    reviewCount: 392,
    expertise: [
      "Life Path Number Analysis",
      "Tarot Card Reading",
      "Name Correction",
      "Business Numerology",
      "Relationship Compatibility",
      "Future Predictions"
    ],
    education: [
      {
        degree: "Ph.D. in Psychology",
        institution: "Mumbai University",
        year: "2010"
      },
      {
        degree: "Certified Tarot Master",
        institution: "International Tarot Foundation",
        year: "2008"
      },
      {
        degree: "Advanced Numerology",
        institution: "Institute of Numerological Studies, USA",
        year: "2007"
      }
    ],
    services: [
      {
        id: "s1",
        name: "Comprehensive Numerology Analysis",
        price: 2500,
        duration: "75 minutes",
        features: [
          "Complete life path number analysis",
          "Name number and destiny number calculation",
          "Personal year, month, and day numbers",
          "Career and relationship compatibility",
          "Lucky numbers, colors, and directions",
          "Detailed written report"
        ]
      },
      {
        id: "s2",
        name: "Tarot Card Reading",
        price: 1800,
        duration: "45 minutes",
        features: [
          "Celtic Cross spread",
          "Past, present, and future insights",
          "Guidance on specific questions",
          "Relationship and career insights",
          "Potential challenges and opportunities",
          "Audio recording of the session"
        ]
      },
      {
        id: "s3",
        name: "Name Correction Consultation",
        price: 3000,
        duration: "90 minutes",
        features: [
          "Analysis of current name vibration",
          "Identification of numerological imbalances",
          "Personalized name correction options",
          "Business/brand name analysis",
          "Implementation guidance",
          "Follow-up consultation included"
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Ananya Mehta",
        rating: 5,
        date: "April 2, 2023",
        comment:
          "Dr. Maya's numerology analysis was eye-opening. The insights about my life path number explained so many patterns in my life. After implementing her suggested name correction, I've noticed positive changes in my career. Her approach is scientific yet spiritual.",
        helpfulCount: 47
      },
      {
        id: "r2",
        name: "Karan Singhania",
        rating: 5,
        date: "March 18, 2023",
        comment:
          "The tarot reading with Dr. Maya was incredibly accurate. She predicted a job change within three months, which happened exactly as she described. Her calm demeanor and clear explanations make the session both enlightening and comforting.",
        helpfulCount: 39
      },
      {
        id: "r3",
        name: "Neha Agarwal",
        rating: 4,
        date: "February 25, 2023",
        comment:
          "I consulted Dr. Maya for my business name, and her numerological insights were valuable. The suggested modifications were subtle yet impactful. It's been six months, and we've seen steady growth. The only reason for 4 stars is the high consultation fee, but the value is there.",
        helpfulCount: 31
      },
      {
        id: "r4",
        name: "Rohan Kapoor",
        rating: 5,
        date: "January 30, 2023",
        comment:
          "Dr. Maya's combination of psychology and numerology offers a unique perspective. Her analysis of my personality traits and challenges was spot on. The remedies she suggested were practical and effective. I've had multiple sessions and each one has been insightful.",
        helpfulCount: 45
      },
      {
        id: "r5",
        name: "Leela Krishnan",
        rating: 5,
        date: "December 15, 2022",
        comment:
          "The name correction consultation was transformative. Dr. Maya explained the science behind numerology and how small changes can create energetic shifts. Since changing my name as per her guidance, I've experienced improved relationships and career opportunities.",
        helpfulCount: 53
      }
    ]
  },
  {
    id: "3",
    name: "Pandit Rajesh Joshi",
    slug: "pandit-rajesh-joshi",
    specialization: "Palmistry",
    languages: ["Hindi", "Marathi"],
    rating: 4.7,
    experience: 20,
    bio: "Pandit Rajesh Joshi is a master palmist who can reveal your past, present, and future through the lines on your palm.",
    detailedBio:
      "Pandit Rajesh Joshi has dedicated over two decades to the ancient art of palmistry. His journey began under the guidance of his grandfather, a renowned palmist in Maharashtra. He has studied thousands of palms across different age groups, professions, and backgrounds, developing a keen eye for the subtle nuances in palm lines and mounts. His approach combines traditional Indian palmistry with elements from Chinese and Western systems, offering a comprehensive analysis. He is known for his accurate predictions about major life events and his ability to identify inherent talents and potential health concerns.",
    price: 1000,
    availability: "Mon-Fri, 9 AM - 6 PM",
    imageUrl: astrologer3,
    email: "pandit.rajesh@astroguide.com",
    phone: "+91 9876543212",
    location: "Pune, India",
    reviewCount: 356,
    expertise: [
      "Life Line Analysis",
      "Heart Line Reading",
      "Head Line Interpretation",
      "Fate Line Prediction",
      "Mount Analysis",
      "Marriage Line Reading"
    ],
    education: [
      {
        degree: "Master in Ancient Palm Reading",
        institution: "Traditional Palmistry School, Varanasi",
        year: "2001"
      },
      {
        degree: "Advanced Course in Medical Palmistry",
        institution: "Institute of Alternative Medicine, Pune",
        year: "2005"
      },
      {
        degree: "Certification in Western Palmistry",
        institution: "International Palmistry Association",
        year: "2010"
      }
    ],
    services: [
      {
        id: "s1",
        name: "Complete Palm Reading",
        price: 1500,
        duration: "60 minutes",
        features: [
          "Analysis of all major lines",
          "Mount interpretation",
          "Character assessment",
          "Future predictions for next 5 years",
          "Health indications",
          "Photographic documentation of palms"
        ]
      },
      {
        id: "s2",
        name: "Career & Financial Analysis",
        price: 1200,
        duration: "45 minutes",
        features: [
          "Fate line analysis",
          "Career aptitude assessment",
          "Financial prosperity indications",
          "Timing of career changes",
          "Business success potential",
          "Written summary included"
        ]
      },
      {
        id: "s3",
        name: "Relationship & Marriage Reading",
        price: 1300,
        duration: "50 minutes",
        features: [
          "Heart line analysis",
          "Marriage line interpretation",
          "Relationship compatibility assessment",
          "Children indications",
          "Emotional patterns identification",
          "Remedies for relationship harmony"
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Suresh Patil",
        rating: 5,
        date: "April 10, 2023",
        comment:
          "Pandit Rajesh's palm reading was incredibly accurate. He identified health issues that were later confirmed by medical tests. His predictions about my career change came true within the timeframe he mentioned. His gentle approach and detailed explanations make the session very valuable.",
        helpfulCount: 41
      },
      {
        id: "r2",
        name: "Anjali Deshmukh",
        rating: 4,
        date: "March 22, 2023",
        comment:
          "The palm reading session was insightful and detailed. Pandit ji identified my strengths and weaknesses accurately. His career guidance aligned perfectly with my interests. The only reason for 4 stars is that some predictions were a bit vague, but overall a great experience.",
        helpfulCount: 33
      },
      {
        id: "r3",
        name: "Manoj Kulkarni",
        rating: 5,
        date: "February 18, 2023",
        comment:
          "I've consulted many palmists before, but Pandit Rajesh stands out for his depth of knowledge and accuracy. He predicted a property acquisition that happened exactly when he said it would. His remedies are practical and effective. Highly recommended for anyone seeking genuine guidance.",
        helpfulCount: 48
      },
      {
        id: "r4",
        name: "Deepa Joshi",
        rating: 5,
        date: "January 5, 2023",
        comment:
          "Pandit Rajesh's analysis of my relationship lines helped me understand patterns in my marriage. His insights were eye-opening and the suggestions he provided have improved my relationship significantly. He has a compassionate approach while delivering even difficult insights.",
        helpfulCount: 37
      },
      {
        id: "r5",
        name: "Rahul Sharma",
        rating: 4,
        date: "December 3, 2022",
        comment:
          "The career analysis was spot on. Pandit ji identified my natural talents and suggested career paths that I hadn't considered but are perfect for me. His timing predictions have been accurate so far. Would definitely recommend his services for career guidance.",
        helpfulCount: 29
      }
    ]
  }
];

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

import { CalendarEvent } from "@/shared/interface";

const today = new Date();

export const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Holistic Life Blueprint",
    start: moment(today).add(1, "days").set({ hour: 10, minute: 0 }).toDate(),
    end: moment(today).add(1, "days").set({ hour: 11, minute: 0 }).toDate(),
    name: "Richard Walters",
    pictureUrl: image01.src,
    category: "health",
    status: "upcoming",
    description: "Discussion about holistic approaches to wellness and life planning."
  },
  {
    id: "2",
    title: "Time for Success",
    start: moment(today).add(4, "days").set({ hour: 12, minute: 0 }).toDate(),
    end: moment(today).add(4, "days").set({ hour: 13, minute: 0 }).toDate(),
    name: "Derek Larson",
    pictureUrl: image01.src,
    category: "business",
    status: "upcoming",
    description: "Strategic planning session for Q2 business goals."
  },
  {
    id: "3",
    title: "P. Life Strategies",
    start: moment(today).add(1, "days").set({ hour: 16, minute: 0 }).toDate(),
    end: moment(today).add(1, "days").set({ hour: 17, minute: 0 }).toDate(),
    name: "Melissa Bradley",
    pictureUrl: image01.src,
    category: "personal",
    status: "blocked",
    description: "Personal life coaching session focusing on work-life balance."
  },
  {
    id: "4",
    title: "Out of office",
    start: moment(today).add(5, "days").set({ hour: 8, minute: 0 }).toDate(),
    end: moment(today).add(5, "days").set({ hour: 11, minute: 0 }).toDate(),
    name: "You",
    pictureUrl: image01.src,
    category: "personal",
    status: "blocked",
    description: "Not available during this time."
  },
  {
    id: "5",
    title: "Not available",
    start: moment(today).subtract(1, "days").set({ hour: 13, minute: 0 }).toDate(),
    end: moment(today).subtract(1, "days").set({ hour: 17, minute: 0 }).toDate(),
    name: "You",
    pictureUrl: image01.src,
    category: "personal",
    status: "blocked",
    description: "Blocked time for personal errands."
  },
  {
    id: "6",
    title: "Team Sync",
    start: moment(today).add(2, "days").set({ hour: 14, minute: 0 }).toDate(),
    end: moment(today).add(2, "days").set({ hour: 15, minute: 0 }).toDate(),
    name: "Team",
    pictureUrl: image01.src,
    category: "meeting",
    status: "upcoming",
    description: "Weekly team synchronization meeting to discuss progress and blockers."
  },
  {
    id: "7",
    title: "Project Review",
    start: moment(today).add(3, "days").set({ hour: 10, minute: 0 }).toDate(),
    end: moment(today).add(3, "days").set({ hour: 11, minute: 0 }).toDate(),
    name: "Sarah Johnson",
    pictureUrl: image01.src,
    category: "business",
    status: "completed",
    description: "Review of the current project milestones and achievements."
  },
  {
    id: "8",
    title: "Fitness Session",
    start: moment(today).add(2, "days").set({ hour: 7, minute: 0 }).toDate(),
    end: moment(today).add(2, "days").set({ hour: 8, minute: 0 }).toDate(),
    name: "Alex Trainer",
    pictureUrl: image01.src,
    category: "health",
    status: "upcoming",
    description: "Personal fitness training session at the gym."
  },
  {
    id: "9",
    title: "Client Meeting",
    start: moment(today).subtract(1, "days").set({ hour: 9, minute: 0 }).toDate(),
    end: moment(today).subtract(1, "days").set({ hour: 10, minute: 0 }).toDate(),
    name: "Robert Davis",
    pictureUrl: image01.src,
    category: "business",
    status: "completed",
    description: "Discussion about new project requirements with the client."
  },
  {
    id: "10",
    title: "Lunch with Friends",
    start: moment(today).add(3, "days").set({ hour: 12, minute: 0 }).toDate(),
    end: moment(today).add(3, "days").set({ hour: 13, minute: 0 }).toDate(),
    name: "Various Friends",
    pictureUrl: image01.src,
    category: "personal",
    status: "upcoming",
    description: "Casual lunch meetup with friends at the local restaurant."
  }
];

import { Review, ReviewSummary } from "@/shared/interface";

export const mockReviewSummary: ReviewSummary = {
  totalReviews: 10000,
  averageRating: 4.0,
  growthPercentage: 21,
  ratingBreakdown: {
    5: 2000,
    4: 1000,
    3: 800,
    2: 400,
    1: 200
  }
};

export const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Derek Larson",
      avatar: image01.src
    },
    rating: 4.0,
    date: "25-10-2025",
    content:
      "I felt truly seen and supported during my session with Dr. Mishra. He explained everything with clarity and compassion. I left feeling calm, aligned, and with clear next steps. Highly recommended!",
    totalSpend: 200,
    totalReviews: 14
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Melissa Bradley",
      avatar: image01.src
    },
    rating: 3.0,
    date: "25-10-2025",
    content:
      "Great insights and practical advice. I appreciated how the astrologer listened patiently and tailored the reading to my situation. Just wish we had a bit more time to go deeper into one topic.",
    totalSpend: 200,
    totalReviews: 14
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Richard Walters",
      avatar: image01.src
    },
    rating: 5.0,
    date: "25-10-2025",
    content:
      "Great insights and practical advice. I appreciated how the astrologer listened patiently and tailored the reading to my situation. Just wish we had a bit more time to go deeper into one topic.",
    totalSpend: 200,
    totalReviews: 14
  }
];
