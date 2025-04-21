import type { AstrologerDetail } from "@/shared/interface/index.ts";
import astrologer1 from "@/assets/images/indian-astrologer-1.jpg";
import astrologer2 from "@/assets/images/indian-astrologer-2.png";
import astrologer3 from "@/assets/images/indian-astrologer-3.webp";

export const astrologersDetails: AstrologerDetail[] = [
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
