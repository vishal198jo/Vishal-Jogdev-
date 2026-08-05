import { Song, Lyric, GalleryFolder, GalleryItem, Show, Testimonial, Award, SocialPost } from '../types';

export const SINGER_PROFILE = {
  name: "Vishal Jogdeo",
  title: "Devotional Playback Singer & Music Composer",
  shortTagline: "Elevating Souls Through Divine Melodies & Bhakti Sangeet",
  fullTagline: "Bringing divine tranquility and spiritual ecstasy through classical Marathi & Hindi devotional renditions",
  experienceYears: 15,
  songsCount: 120,
  lyricsCount: 85,
  showsCount: 450,
  followersCount: "250K+",
  spotifyListeners: "100K+ monthly",
  portraitImage: "https://i.ibb.co/qMf4c75p/Picsart-26-08-05-18-05-33-103.png",
  watermarkImage: "https://i.ibb.co/qMf4c75p/Picsart-26-08-05-18-05-33-103.png",
  bio: `Vishal Jogdeo is one of modern India's most cherished devotional playback singers, revered for his soul-stirring renditions of Abhangas, Bhajans, Aartis, and Kirtans. Trained in Hindustani Classical Music under legendary maestros, Vishal seamlessly fuses timeless spiritual poetry with contemporary melodic arrangements.

With over 15 years of dedicated music journey, Vishal has performed at grand spiritual gatherings, sacred temple festivals, and international cultural events. His iconic tracks like "Majhe Vithu Mauli" and "Shree Ram Chandra Kripalu" resonate in millions of homes daily across Maharashtra and globally.`,
  journey: `Born into a family immersed in devotional culture, Vishal's affinity for music started at the tender age of five. Guided by his guru, he mastered Raga-based sangeet and classical voice modulation. Over the past decade, he has collaborated with top music directors, recorded for devotional music albums, and performed live across 12 countries.`,
  contact: {
    email: "booking@vishaljogdev.com",
    phone: "+91 70380 86864",
    whatsapp: "https://wa.me/917038086864?text=Hello%20Vishal%20Jogdeo%20Team,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20devotional%20event.",
    officeAddress: "Jogdeo Sangeet Studio, Dadar West, Mumbai, Maharashtra 400028",
    socials: {
      youtube: "https://youtube.com/@vishaljogdeo",
      instagram: "https://www.instagram.com/vishaljogdeo",
      facebook: "https://www.facebook.com/share/1BzgF5bs76/",
      spotify: "https://open.spotify.com/artist/vishaljogdev"
    }
  }
};

export const FEATURED_SONGS: Song[] = [
  {
    id: "song-1",
    title: "Majhe Vithu Mauli",
    titleDevanagari: "माझे विठू माऊली",
    album: "Pandharpur Wari Vol. 1",
    category: "Bhajan",
    language: "Marathi",
    duration: "6:42",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg", // standard sample audio stream
    coverImage: "https://images.unsplash.com/photo-1609102026400-3d082725832a?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2024-06-12",
    plays: 1420000,
    featured: true,
    lyricsId: "lyric-1",
    composer: "Vishal Jogdeo & Team",
    raga: "Yaman"
  },
  {
    id: "song-2",
    title: "Shree Ram Chandra Kripalu",
    titleDevanagari: "श्री रामचन्द्र कृपालु भजु मन",
    album: "Ram Bhakti Arpan",
    category: "Stotra",
    language: "Sanskrit",
    duration: "5:18",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2024-01-22",
    plays: 2890000,
    featured: true,
    lyricsId: "lyric-2",
    composer: "Traditional / Arr. Vishal Jogdeo",
    raga: "Bhairavi"
  },
  {
    id: "song-3",
    title: "Ganesh Aarti - Sukhkarta Dukhharta",
    titleDevanagari: "सुखकर्ता दुखहर्ता - श्री गणेश आरती",
    album: "Ganeshotsav Swar Tarang",
    category: "Aarti",
    language: "Marathi",
    duration: "4:35",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/wind_synth.ogg",
    coverImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2023-09-18",
    plays: 3100000,
    featured: true,
    lyricsId: "lyric-3",
    composer: "Sant Ramdas / Vishal Jogdeo",
    raga: "Kafi"
  },
  {
    id: "song-4",
    title: "Om Namah Shivaya Kirtan",
    titleDevanagari: "ॐ नमः शिवाय अखंड संकीर्तन",
    album: "Mahashivratri Divine Chants",
    category: "Kirtan",
    language: "Sanskrit",
    duration: "8:15",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/field.ogg",
    coverImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2024-03-08",
    plays: 980000,
    featured: true,
    lyricsId: "lyric-4",
    composer: "Traditional",
    raga: "Bhupali"
  },
  {
    id: "song-5",
    title: "Anandache Dohi Anand Tarang",
    titleDevanagari: "आनंदाचे डोही आनंद तरंग",
    album: "Sant Tukaram Abhangamrut",
    category: "Bhajan",
    language: "Marathi",
    duration: "5:50",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
    coverImage: "https://images.unsplash.com/photo-1508672019048-805479767794?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2023-11-05",
    plays: 750000,
    featured: false,
    lyricsId: "lyric-5",
    composer: "Sant Tukaram Maharaj",
    raga: "Malkauns"
  },
  {
    id: "song-6",
    title: "Hanuman Chalisa - Classical Melody",
    titleDevanagari: "श्री हनुमान चालीसा (राग आधारित)",
    album: "Sankat Mochan Stuti",
    category: "Stotra",
    language: "Hindi",
    duration: "9:10",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/field.ogg",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2023-04-10",
    plays: 4200000,
    featured: true,
    lyricsId: "lyric-6",
    composer: "Goswami Tulsidas",
    raga: "Bhairav"
  }
];

export const LATEST_LYRICS: Lyric[] = [
  {
    id: "lyric-1",
    songId: "song-1",
    title: "Majhe Vithu Mauli",
    titleDevanagari: "माझे विठू माऊली - अभंग",
    album: "Pandharpur Wari Vol. 1",
    category: "Bhajan",
    language: "Marathi",
    publishedDate: "2024-06-12",
    coverImage: "https://images.unsplash.com/photo-1609102026400-3d082725832a?q=80&w=800&auto=format&fit=crop",
    raga: "Yaman",
    taal: "Kerwa (8 Beats)",
    composer: "Sant Dnyaneshwar / Vishal Jogdeo",
    meaningSummary: "A deeply emotional abhang celebrating Lord Vitthal as the loving mother (Mauli) who nurtures and protects all devotees on their spiritual journey.",
    devanagariText: [
      "माझे विठू माऊली, प्रेमळ सावली ।",
      "पांडुरंगा तुझी, भक्ती हीच सावली ॥",
      "",
      "चंद्रभागेच्या वाळवंटी, टाळ मृदंगाचा गजर ।",
      "धाव घेई भक्तासाठी, रुक्मिणीचा वर ॥",
      "",
      "विठ्ठल विठ्ठल जय हरी विठ्ठल ।",
      "भक्तीच्या भावात, मन हे झाले तल्लीन ॥"
    ],
    romanText: [
      "Majhe Vithu Mauli, Premal Savali |",
      "Panduranga Tujhi, Bhakti Hich Savali ||",
      "",
      "Chandrbhagechya Valvanti, Taal Mrudangacha Gajar |",
      "Dhav Ghei Bhaktasathi, Rukminicha Var ||",
      "",
      "Vitthal Vitthal Jai Hari Vitthal |",
      "Bhaktichya Bhavat, Man He Jhale Tallin ||"
    ]
  },
  {
    id: "lyric-2",
    songId: "song-2",
    title: "Shree Ram Chandra Kripalu",
    titleDevanagari: "श्री रामचन्द्र कृपालु भजु मन",
    album: "Ram Bhakti Arpan",
    category: "Stotra",
    language: "Sanskrit",
    publishedDate: "2024-01-22",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    raga: "Bhairavi",
    taal: "Teental (16 Beats)",
    composer: "Goswami Tulsidas",
    meaningSummary: "O my mind, adore the compassionate Lord Ramachandra, who removes the fears of worldly existence and shines with unmatched divine radiance.",
    devanagariText: [
      "श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणम्।",
      "नवकञ्जलोचन कञ्जमुख करकञ्ज पद कञ्जारुणम्॥",
      "",
      "कन्दर्प अगणित अमित छवि नवनीलनीरदसुन्दरम्।",
      "पटपीत मानहु तडित रुचि शुचि नौमि जनकसुतावरम्॥",
      "",
      "भजु दीनबन्धु दिनेश दानवदैत्यवंशनिकन्दनम्।",
      "रघुनन्द आनन्दकन्द कोशलचन्द दशरथनन्दनम्॥"
    ],
    romanText: [
      "Shree Ramchandra Kripalu Bhaju Man Haran Bhavbhaya Darunam |",
      "Navkanj Lochan Kanjmukh Karkanj Pada Kanjarunam ||",
      "",
      "Kandarp Aganit Amit Chhavi Navneelneerad Sundaram |",
      "Pateet Manahu Tadit Ruchi Shuchi Naumi Janak Suta Varam ||",
      "",
      "Bhaju Deenbandhu Dinesh Danav Daitya Vansh Nikandanam |",
      "Raghunand Anandkand Koshaldand Dashrathnandanam ||"
    ]
  },
  {
    id: "lyric-3",
    songId: "song-3",
    title: "Sukhkarta Dukhharta Ganesh Aarti",
    titleDevanagari: "सुखकर्ता दुखहर्ता वार्ता विघ्नाची",
    album: "Ganeshotsav Swar Tarang",
    category: "Aarti",
    language: "Marathi",
    publishedDate: "2023-09-18",
    coverImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
    raga: "Kafi",
    taal: "Dadra (6 Beats)",
    composer: "Sant Samarth Ramdas",
    meaningSummary: "The classic revered Ganpati Aarti written by Samarth Ramdas Swami, invoking Lord Ganesha to bestow joy and dispel all sorrow.",
    devanagariText: [
      "सुखकर्ता दुखहर्ता वार्ता विघ्नाची ।",
      "नुरवी पुरवी प्रेम कृपा जयाची ॥",
      "सर्वांगी सुंदर उटी शेंदुराची ।",
      "कंठी झळके माळ मुक्ताफळांची ॥ १ ॥",
      "",
      "जय देव जय देव जय मंगलमूर्ती ।",
      "दर्शनमात्रे मनकामना पुरती ॥ जय देव जय देव ॥"
    ],
    romanText: [
      "Sukhkarta Dukhharta Varta Vighnachi |",
      "Nuravi Puravi Prem Kripa Jayachi ||",
      "Sarvangi Sundar Uti Shendurachi |",
      "Kanthi Jhalake Maal Muktaphalanchi || 1 ||",
      "",
      "Jai Deva Jai Deva Jai Mangal Murti |",
      "Darshanmatre Mankamana Purti || Jai Deva Jai Deva ||"
    ]
  },
  {
    id: "lyric-4",
    songId: "song-4",
    title: "Om Namah Shivaya Kirtan",
    titleDevanagari: "ॐ नमः शिवाय - शिव धुनी",
    album: "Mahashivratri Divine Chants",
    category: "Kirtan",
    language: "Sanskrit",
    publishedDate: "2024-03-08",
    coverImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    raga: "Bhupali",
    taal: "Kaherva",
    composer: "Traditional Sangeet",
    meaningSummary: "Eternal Panchakshari Mantra invoking Lord Shiva, the transcendent source of peace, liberation, and supreme cosmic consciousness.",
    devanagariText: [
      "ॐ नमः शिवाय, ॐ नमः शिवाय ।",
      "हर हर भोले नमः शिवाय ॥",
      "",
      "गङ्गाधराय शिव गङ्गाधराय ।",
      "हर हर भोले नमः शिवाय ॥",
      "",
      "कैलासवासिनाय नमः शिवाय ।",
      "सच्चिदानंद रूपाय नमः शिवाय ॥"
    ],
    romanText: [
      "Om Namah Shivaya, Om Namah Shivaya |",
      "Har Har Bhole Namah Shivaya ||",
      "",
      "Gangadharaya Shiva Gangadharaya |",
      "Har Har Bhole Namah Shivaya ||",
      "",
      "Kailasvasinaya Namah Shivaya |",
      "Satchidananda Rupaya Namah Shivaya ||"
    ]
  }
];

export const GALLERY_FOLDERS: GalleryFolder[] = [
  {
    id: "folder-lifestyle",
    name: "Lifestyle & Behind The Scenes",
    description: "Candid personal moments, daily riyaz routines, studio sessions & travels.",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    count: 4
  },
  {
    id: "folder-concerts",
    name: "Live Concerts & Stage Shows",
    description: "High-energy live performances, orchestral arrangements & audience ecstasy.",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    count: 4
  },
  {
    id: "folder-spiritual",
    name: "Spiritual Tours & Temples",
    description: "Pandharpur Wari, temple sangeet seva, Kirtans & holy riverbank performances.",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    count: 3
  },
  {
    id: "folder-media",
    name: "Media, Awards & Recognitions",
    description: "Felicitation ceremonies, magazine covers, TV broadcasts & press meets.",
    coverImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    count: 3
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Folder: Lifestyle
  {
    id: "gal-ls-1",
    type: "photo",
    folderId: "folder-lifestyle",
    folderName: "Lifestyle & Behind The Scenes",
    title: "Morning Classical Riyaz Session",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    date: "August 2024",
    location: "Home Riyaz Room, Mumbai",
    description: "Vishal Jogdeo practicing morning Raga Bhairav with Tanpura and Harmonium."
  },
  {
    id: "gal-ls-2",
    type: "photo",
    folderId: "folder-lifestyle",
    folderName: "Lifestyle & Behind The Scenes",
    title: "Jogdeo Sangeet Studio Workstation",
    category: "Studio Life",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    date: "July 2024",
    location: "Dadar, Mumbai",
    description: "Composing acoustic melodies and vocal tracks for upcoming devotional album."
  },
  {
    id: "gal-ls-3",
    type: "photo",
    folderId: "folder-lifestyle",
    folderName: "Lifestyle & Behind The Scenes",
    title: "Spiritual Reading & Inspiration Time",
    category: "Personal Life",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    date: "June 2024",
    location: "Pune",
    description: "Studying Sant Tukaram's original Gatha manuscripts for deeper musical interpretation."
  },
  {
    id: "gal-ls-4",
    type: "photo",
    folderId: "folder-lifestyle",
    folderName: "Lifestyle & Behind The Scenes",
    title: "Backstage Preparation with Instrumentalists",
    category: "Backstage",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    date: "May 2024",
    location: "Shanmukhananda Hall Greenroom",
    description: "Harmonizing scales with Tabla and Flute masters minutes before going live on stage."
  },

  // Folder: Concerts
  {
    id: "gal-con-1",
    type: "photo",
    folderId: "folder-concerts",
    folderName: "Live Concerts & Stage Shows",
    title: "Grand Mahashivratri Kirtan Night",
    category: "Stage Live",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    date: "March 2024",
    location: "Iskcon Temple Ground, Juhu, Mumbai",
    description: "Vishal Jogdeo performing live Shiv Bhajans in front of 15,000+ devotees during Mahashivratri celebrations."
  },
  {
    id: "gal-con-2",
    type: "video",
    folderId: "folder-concerts",
    folderName: "Live Concerts & Stage Shows",
    title: "Majhe Vithu Mauli - Live Orchestra Pune",
    category: "Live Video",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "May 2024",
    location: "Ganesh Kala Krida Rangamanch, Pune",
    description: "Full HD live rendition featuring 20 classical acoustic musicians."
  },
  {
    id: "gal-con-3",
    type: "event",
    folderId: "folder-concerts",
    folderName: "Live Concerts & Stage Shows",
    title: "International Diwali Concert UAE",
    category: "International Tour",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    date: "November 2023",
    location: "Sheikh Rashid Auditorium, Dubai",
    description: "Special Diwali devotional musical evening for the Indian diaspora in UAE."
  },
  {
    id: "gal-con-4",
    type: "photo",
    folderId: "folder-concerts",
    folderName: "Live Concerts & Stage Shows",
    title: "Ganeshotsav Evening Swar Tarang",
    category: "Stage Live",
    imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
    date: "September 2023",
    location: "Dagdusheth Halwai Pandal, Pune",
    description: "Traditional Aarti & Stotra singing evening honoring Lord Ganesha."
  },

  // Folder: Spiritual
  {
    id: "gal-sp-1",
    type: "photo",
    folderId: "folder-spiritual",
    folderName: "Spiritual Tours & Temples",
    title: "Pandharpur Wari Sangeet Seva",
    category: "Spiritual Tour",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    date: "July 2024",
    location: "Pandharpur, Maharashtra",
    description: "Divine Abhanga performance at the sacred Banks of Chandrabhaga River during Ashadhi Ekadashi."
  },
  {
    id: "gal-sp-2",
    type: "photo",
    folderId: "folder-spiritual",
    folderName: "Spiritual Tours & Temples",
    title: "Kashi Vishwanath Mandir Bhajan Seva",
    category: "Temple Seva",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    date: "February 2024",
    location: "Varanasi, Uttar Pradesh",
    description: "Early morning classical Shiv Stuti rendition inside the sacred temple complex."
  },
  {
    id: "gal-sp-3",
    type: "photo",
    folderId: "folder-spiritual",
    folderName: "Spiritual Tours & Temples",
    title: "Riverbank Aarti & Bhajan Sandhya",
    category: "Holy River Seva",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805479767794?q=80&w=800&auto=format&fit=crop",
    date: "January 2024",
    location: "Nashik Godavari Ghat",
    description: "Atmospheric evening bhajan singing under oil lamps along the Godavari riverbanks."
  },

  // Folder: Media & Awards
  {
    id: "gal-md-1",
    type: "photo",
    folderId: "folder-media",
    folderName: "Media, Awards & Recognitions",
    title: "Felicitation by Sangeet Natak Trust",
    category: "Award Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    date: "December 2023",
    location: "Ravindra Natya Mandir, Mumbai",
    description: "Honored with the Sangeet Ratna Puraskar for contributions to Bhakti Sangeet."
  },
  {
    id: "gal-md-2",
    type: "photo",
    folderId: "folder-media",
    folderName: "Media, Awards & Recognitions",
    title: "YouTube Creator Award Ceremony",
    category: "Digital Recognition",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    date: "October 2023",
    location: "Mumbai",
    description: "Receiving official creator award for devotional music broadcasts."
  },
  {
    id: "gal-md-3",
    type: "photo",
    folderId: "folder-media",
    folderName: "Media, Awards & Recognitions",
    title: "Press Conference for Pandharpur Wari Vol. 1",
    category: "Press Release",
    imageUrl: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=800&auto=format&fit=crop",
    date: "June 2023",
    location: "Press Club, Mumbai",
    description: "Media interaction announcing the 10-track spiritual album."
  }
];

export const UPCOMING_SHOWS: Show[] = [
  {
    id: "show-1",
    title: "Ashadhi Ekadashi Abhang Sandhya 2026",
    date: "2026-08-15",
    time: "06:30 PM Onwards",
    city: "Mumbai",
    venue: "Shanmukhananda Hall, Sion",
    state: "Maharashtra",
    status: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    description: "A mesmerizing 3-hour journey into classic Maharashtrian Sant Sahitya and Abhangas with live chorus and acoustic instruments.",
    ticketLink: "#book-modal",
    isOrganizedByTrust: true
  },
  {
    id: "show-2",
    title: "Ganeshutsav Swar Sandhya Live",
    date: "2026-09-02",
    time: "07:00 PM Onwards",
    city: "Pune",
    venue: "Shreemant Dagdusheth Halwai Ganpati Pandal, Pune",
    state: "Maharashtra",
    status: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
    description: "Special devotional musical tribute to Lord Ganesha live at the historic pandal.",
    ticketLink: "#book-modal",
    isOrganizedByTrust: false
  },
  {
    id: "show-3",
    title: "Navratri Garba & Devi Stuti Sangeet",
    date: "2026-10-12",
    time: "08:00 PM Onwards",
    city: "Nashik",
    venue: "Saptashrungi Nivasini Trust Grounds",
    state: "Maharashtra",
    status: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    description: "Electrifying devotional Goddess praise hymns, Garba tunes, and spiritual folk compositions.",
    ticketLink: "#book-modal"
  },
  {
    id: "show-4",
    title: "US Spiritual Tour 2026 - San Jose Concert",
    date: "2026-11-20",
    time: "06:00 PM PST",
    city: "San Jose, CA",
    venue: "San Jose Center for the Performing Arts",
    state: "California, USA",
    status: "Upcoming",
    bannerImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    description: "Exclusive North American tour presentation bringing traditional Indian devotional heritage to global listeners.",
    ticketLink: "#book-modal"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Pandit Ashok Deshmukh",
    role: "Senior Music Composer",
    organization: "Sangeet Kala Academy",
    quote: "Vishal's voice carries a rare purity and emotional resonance that moves listeners to tears. His mastery over Raga-based Bhajans is truly remarkable in this era.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "test-2",
    name: "Dr. Sharad Kulkarni",
    role: "President",
    organization: "Shree Vitthal Temple Trust, Pandharpur",
    quote: "During Ashadhi Ekadashi, Vishal Jogdeo's Abhanga presentation captivated over 50,000 pilgrims. He sings not just with voice, but with deep devotion.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "test-3",
    name: "Sunita More",
    role: "Cultural Event Chair",
    organization: "Maharashtra Cultural Society Dubai",
    quote: "Booking Vishal for our annual Diwali Sangeet Sandhya was the best decision. The audience gave him three standing ovations!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5
  }
];

export const AWARDS: Award[] = [
  {
    id: "award-1",
    year: "2024",
    title: "Best Devotional Singer of the Year",
    organization: "Maharashtra Sangeet Puraskar",
    description: "Awarded for exceptional vocal performance in the album 'Pandharpur Wari Vol. 1'.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-2",
    year: "2023",
    title: "Sangeet Ratna Puraskar",
    organization: "All India Bhakti Sahitya Parishad",
    description: "Honored for preserving and promoting traditional Sant Dnyaneshwar & Tukaram literature through vocal arts.",
    category: "Certificate",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-3",
    year: "2022",
    title: "Cover Story: The Golden Voice of Devotion",
    organization: "Sangeet Prabha Magazine",
    description: "Featured on the front page as one of India's top 10 youth icons in spiritual music.",
    category: "Magazine Cover",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-4",
    year: "2021",
    title: "Gold Play Creator Award",
    organization: "YouTube India",
    description: "Recognized for surpassing 100,000 subscribers and millions of views on official devotional channels.",
    category: "Media Mention",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop"
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "soc-1",
    platform: "youtube",
    title: "LIVE Abhanga Evening - Pandharpur Special 2024",
    likes: "45K",
    views: "1.2M",
    date: "2 days ago",
    mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    postUrl: "https://youtube.com/@vishaljogdevsangeet"
  },
  {
    id: "soc-2",
    platform: "instagram",
    title: "Moments from yesterday's divine Shivaratri Kirtan in Mumbai 🙏",
    likes: "28.4K",
    date: "1 week ago",
    mediaUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    postUrl: "https://instagram.com/vishaljogdevofficial"
  },
  {
    id: "soc-3",
    platform: "facebook",
    title: "Grateful for the love received at Shanmukhananda Hall! Next stop Pune.",
    likes: "14.2K",
    date: "2 weeks ago",
    mediaUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    postUrl: "https://facebook.com/vishaljogdevmusic"
  }
];
