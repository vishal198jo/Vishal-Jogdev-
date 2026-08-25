import { Song, Lyric, GalleryFolder, GalleryItem, Show, Testimonial, Award, SocialPost } from '../types';

export const SINGER_PROFILE = {
  name: "Vishal Jogdeo",
  fullName: "विशाल अरुण जोगदेव (Vishal Arun Jogdeo)",
  title: "महानुभाव पंथ भजनसम्राट & सुप्रसिद्ध भक्तीगीत गायक",
  shortTagline: "विदर्भातील प्रसिद्ध भक्तीगीत गायक व महानुभाव पंथ भजनसम्राट",
  fullTagline: "१५००+ हून अधिक भक्तीगीते आणि ५००+ महानुभाव पंथ भजने गायलेले सुप्रसिद्ध गायक",
  dob: "२२ मार्च १९८३ (22 March 1983)",
  birthplace: "नागपूर, महाराष्ट्र (Nagpur, Maharashtra)",
  caste: "ब्राह्मण हिंदू (Brahmin Hindu)",
  wife: "मयुरी जोगदेव (Mayuri Jogdeo)",
  son: "सर्वज्ञ जोगदेव (Sarvagna Jogdeo)",
  education: "B.com, A.T.D, C.T.D.",
  experienceYears: 24,
  songsCount: 1500,
  lyricsCount: 500,
  showsCount: 1000,
  followersCount: "500K+",
  spotifyListeners: "250K+ monthly",
  portraitImage: "https://cnd.vishaljogdeo.com/IMG_4239.PNG",
  watermarkImage: "https://cnd.vishaljogdeo.com/IMG_4246.PNG",
  
  // FIXED HOME PAGE ABOUT TEXT (As requested by user)
  shortBio: `विशाल जोगदेव हे महाराष्ट्रातील सुप्रसिद्ध भक्तीगीत गायक आहेत. त्यांनी आजवर अनेक चित्रपट, मालिका आणि अल्बमसाठी अनेक अजरामर गाणी गायली आहेत .
सुमधुर व भावपूर्ण आवाज तसेच भजन सादर करण्याची एक वेगळी पद्धत हीच विशाल जोगदेव यांची विशेष ओळख आहे.
विशाल जोगदेव यांनी गायलेली दीड हजारहून अधिक भक्तीगीते सर्वच म्युझिक प्लॅटफॉर्मवर उपलब्ध आहेत. जी भक्तिगीते आज ही भक्तांच्या तनामनात सखोल घर करून आहे. तसेच महानुभाव पंथासाठी देखील त्यांनी पाचशेहून अधिक सुप्रसिद्ध भजने गायली आहेत व त्यामुळेच महानुभाव पंथात त्यांना *महानुभाव पंथ भजनसम्राट* या उपाधीने संबोधल्या जाते.`,

  bio: `विशाल जोगदेव हे महाराष्ट्रातील सुप्रसिद्ध भक्तीगीत गायक आहेत. त्यांनी आजवर अनेक चित्रपट, मालिका आणि अल्बमसाठी अनेक अजरामर गाणी गायली आहेत. सुमधुर व भावपूर्ण आवाज तसेच भजन सादर करण्याची एक वेगळी पद्धत हीच विशाल जोगदेव यांची विशेष ओळख आहे.

विशाल जोगदेव यांनी गायलेली दीड हजारहून अधिक (१५००+) भक्तीगीते सर्वच म्युझिक प्लॅटफॉर्मवर उपलब्ध आहेत. जी भक्तिगीते आज ही भक्तांच्या तनामनात सखोल घर करून आहेत. तसेच महानुभाव पंथासाठी देखील त्यांनी पाचशेहून अधिक (५००+) सुप्रसिद्ध भजने गायली आहेत व त्यामुळेच महानुभाव पंथात त्यांना "महानुभाव पंथ भजनसम्राट" या उपाधीने संबोधल्या जाते.`,

  earlyLife: `विशाल जोगदेव यांचा जन्म २२ मार्च १९८३ रोजी नागपूर, महाराष्ट्र येथे झाला. लहान वयापासूनच त्यांना संगीताची विशेष आवड होती. त्यांनी वयाच्या १५ व्या वर्षापासून सार्वजनिक मंचावर गायनास सुरुवात केली. 
त्यांनी २००१ पासून संगीत क्षेत्रात कार्य सुरू केले व त्यानंतर T-Series, कृणाल म्युझिक, HMV म्युझिक, SAREGAMA अशा विविध नामांकित संगीत कंपन्यांसाठी तसेच मराठी, हिंदी आणि धार्मिक अल्बमांसाठी अनेक भक्तिगीते गायली आहेत.`,

  musicalCareer: `२००१ मध्ये त्यांचा पहिला भक्तिगीतांचा अल्बम प्रदर्शित झाला. त्यानंतर त्यांनी महाराष्ट्रातील प्रत्येकाच मंदिरासाठी व म्युझिक कंपन्यांसाठी अनेक भक्तिगीते रेकॉर्ड केली. त्यांच्या आवाजातील १५०० हून अधिक भक्तिगीते विविध संगीत प्लॅटफॉर्मवर उपलब्ध आहेत.

महानुभाव पंथातील संगीत क्षेत्रासाठी विशाल जोगदेव यांचे सर्वात मोठे योगदान आहे. महानुभाव पंथात बऱ्याच घरची सकाळ ही विशाल जोगदेव यांच्या भजनांनीच होत असते.
महानुभाव पंथासाठी विशाल यांनी गायलेले श्लोक, पारंपरिक आरत्या, दत्तात्रेय कवच, पंचावतार मंत्र, व पाचशे हून अधिक गायलेली भक्तिगीते, जी गेल्या पंधरा वर्षापासून प्रचंड गाजत आहेत. त्यामुळेच विशाल जोगदेव यांना संपूर्ण महानुभाव पंथात "महानुभाव पंथ भजनसम्राट" या नावाने संबोधले जाते.

त्यांनी सोनू निगम, अनुराधा पौडवाल, सुरेश वाडकर, साधना सरगम, वैशाली सामंत व आदर्श शिंदे यांसारख्या प्रसिद्ध गायकांसोबत अनेक युगल भक्तीगीते (Duets) गायली आहेत.

केंद्रीय मंत्री नितीन गडकरी यांच्या हस्ते विशाल जोगदेव यांना YouTube कडून मिळणारा विदर्भातील पहिला "Silver Play Button Award" नागपूर येथे सन्मानाने प्रदान करण्यात आला.
उप मुख्यमंत्री एकनाथ शिंदे यांच्या हस्ते देखील विशाल जोगदेव यांनी गायलेले "आम्ही देवाचे पुजारी" या गीताचे अनावरण करण्यात आले.
महाराष्ट्राचे मुख्यमंत्री देवेंद्र फडणवीस यांच्या हस्ते विशाल जोगदेव यांना महानुभाव पंथात केलेल्या विशेष योगदानासाठी सन्मानित करण्यात आले असून कृष्ण भजनांचे अनावरण देखील करण्यात आले.

विशाल जोगदेव यांचे सोशल मीडियावर असंख्य फॉलोवर्स आहेत व त्यामुळेच सोशल मीडियावर सर्वात जास्त सर्च होणारे हे विदर्भातील एकमेव गायक आहेत.`,

  personalDetails: {
    fullName: "विशाल अरुण जोगदेव",
    dob: "२२ मार्च १९८३",
    birthplace: "नागपूर, महाराष्ट्र",
    caste: "ब्राह्मण हिंदू",
    wife: "मयुरी जोगदेव",
    son: "सर्वज्ञ जोगदेव",
    education: "B.com, A.T.D, C.T.D."
  },

  contact: {
    email: "vishaljogdeo22@gmail.com",
    phone: "+91 70380 86864",
    whatsapp: "https://wa.me/917038086864?text=Hello%20Vishal%20Jogdeo%20Team,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20devotional%20event.",
    officeAddress: "Nagpur, Maharashtra",
    socials: {
      youtube: "https://youtube.com/@vishaljogdeo",
      instagram: "https://www.instagram.com/vishaljogdeo",
      facebook: "https://www.facebook.com/share/1AMnZnHGyd/",
      spotify: "https://open.spotify.com/playlist/2LgZXXcDdeKV7CVa1DIQBq"
    }
  }
};

export const FEATURED_SONGS: Song[] = [
  {
    id: "song-1",
    title: "Aai Majhi Mayecha Sagar",
    titleDevanagari: "आई माझी मायेचा सागर",
    album: "Bhakti Tarang Vol. 1",
    category: "Bhajan",
    language: "Marathi",
    duration: "5:45",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
    coverImage: "https://images.unsplash.com/photo-1609102026400-3d082725832a?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2021-05-10",
    plays: 5200000,
    featured: true,
    lyricsId: "lyric-1",
    composer: "Vishal Jogdeo",
    raga: "Yaman"
  },
  {
    id: "song-2",
    title: "Jari Ki Pagadi Bandhe",
    titleDevanagari: "जरी की पगडी बांधे",
    album: "Krishna Bhakti Arpan",
    category: "Bhajan",
    language: "Marathi / Hindi",
    duration: "6:12",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2022-08-18",
    plays: 4800000,
    featured: true,
    lyricsId: "lyric-2",
    composer: "Vishal Jogdeo",
    raga: "Bhairavi"
  },
  {
    id: "song-3",
    title: "Chakradhara Tu May Mi Lekaru",
    titleDevanagari: "चक्रधरा तू माय मी लेकरू",
    album: "Mahanubhav Pantha Sangeet Seva",
    category: "Mahanubhav Bhajan",
    language: "Marathi",
    duration: "7:05",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/wind_synth.ogg",
    coverImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2020-03-25",
    plays: 6100000,
    featured: true,
    lyricsId: "lyric-3",
    composer: "Mahanubhav Pantha Traditional / Vishal Jogdeo",
    raga: "Bhupali"
  },
  {
    id: "song-4",
    title: "Dattatreya Kavach",
    titleDevanagari: "दत्तात्रेय कवच",
    album: "Datta Bhakti Stotra Mala",
    category: "Stotra",
    language: "Sanskrit / Marathi",
    duration: "8:30",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/field.ogg",
    coverImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2019-12-12",
    plays: 8900000,
    featured: true,
    lyricsId: "lyric-4",
    composer: "Traditional Datta Stotra / Vishal Jogdeo",
    raga: "Kafi"
  },
  {
    id: "song-5",
    title: "Mere Zopadi Ke Bhag Aaj Khul Jayenge",
    titleDevanagari: "मेरे झोपडी के भाग आज खुल जायेंगे",
    album: "Ram Aagaman Bhajans",
    category: "Bhajan",
    language: "Hindi",
    duration: "5:20",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
    coverImage: "https://images.unsplash.com/photo-1508672019048-805479767794?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2024-01-20",
    plays: 7300000,
    featured: true,
    lyricsId: "lyric-5",
    composer: "Traditional / Vishal Jogdeo",
    raga: "Desh"
  },
  {
    id: "song-6",
    title: "Phulwalya Dada Har De Re Gumphun",
    titleDevanagari: "फुलवाल्या दादा हार दे रे गुंफून",
    album: "Mahanubhav Bhajan Sandhya",
    category: "Mahanubhav Bhajan",
    language: "Marathi",
    duration: "6:00",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/field.ogg",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2021-10-05",
    plays: 3900000,
    featured: true,
    lyricsId: "lyric-6",
    composer: "Vishal Jogdeo",
    raga: "Pilu"
  },
  {
    id: "song-7",
    title: "Kaivalyacha Dani",
    titleDevanagari: "कैवल्याचा दानी",
    album: "Sant Dnyaneshwar Abhanga",
    category: "Abhanga",
    language: "Marathi",
    duration: "5:50",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2022-04-14",
    plays: 4100000,
    featured: false,
    lyricsId: "lyric-7",
    composer: "Sant Dnyaneshwar / Vishal Jogdeo",
    raga: "Bhairav"
  },
  {
    id: "song-8",
    title: "Bharat Ka Bacha Bacha",
    titleDevanagari: "भारत का बच्चा बच्चा जय श्री राम बोलेगा",
    album: "Desh & Bhakti Sangeet",
    category: "Devotional Song",
    language: "Hindi",
    duration: "4:45",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2023-01-26",
    plays: 9500000,
    featured: true,
    lyricsId: "lyric-8",
    composer: "Vishal Jogdeo",
    raga: "Shankara"
  },
  {
    id: "song-9",
    title: "Vida Ghya Ho Chakradhara",
    titleDevanagari: "विडा घ्या हो चक्रधरा",
    album: "Panchavatar Sangeet Seva",
    category: "Mahanubhav Aarti",
    language: "Marathi",
    duration: "6:15",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/wind_synth.ogg",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2018-09-02",
    plays: 5800000,
    featured: true,
    lyricsId: "lyric-9",
    composer: "Traditional Mahanubhav / Vishal Jogdeo",
    raga: "Khamaj"
  },
  {
    id: "song-10",
    title: "Aamhi Devache Pujari",
    titleDevanagari: "आम्ही देवाचे पुजारी",
    album: "Official Single (Unveiled by DCM Eknath Shinde)",
    category: "Devotional Single",
    language: "Marathi",
    duration: "5:30",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/field.ogg",
    coverImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    releaseDate: "2023-11-10",
    plays: 6400000,
    featured: true,
    lyricsId: "lyric-10",
    composer: "Vishal Jogdeo",
    raga: "Malkauns"
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
    year: "2023",
    title: "YouTube Silver Play Button Award",
    organization: "YouTube (Presented by Union Minister Nitin Gadkari)",
    description: "केंद्रीय मंत्री नितीन गडकरी यांच्या हस्ते नागपूर येथे सन्मानाने प्रदान करण्यात आलेला विदर्भातील पहिला सिल्वर प्ले बटण पुरस्कार.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-2",
    year: "2022",
    title: "महानुभाव पंथ भजनसम्राट",
    organization: "संपूर्ण महानुभाव पंथ",
    description: "महानुभाव पंथातील ५००+ भजने, श्लोक, दत्तात्रेय कवच व पंचावतार मंत्रांमधील अतुलनीय योगदानासाठी संपूर्ण महानुभाव पंथाने प्रदान केलेली सर्वोच्च उपाधी.",
    category: "Title Honor",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-3",
    year: "2023",
    title: "विदर्भ गौरव पुरस्कार",
    organization: "विदर्भ कला व संस्कृती मंडळ",
    description: "विदर्भाचे नाव आंतरराष्ट्रीय व राष्ट्रीय संगीत मंचावर उंचावल्याबद्दल विशेष सन्मान.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-4",
    year: "2021",
    title: "महाराष्ट्र भूषण पुरस्कार",
    organization: "महाराष्ट्र राज्य सांस्कृतिक मंच",
    description: "भक्तीसंगीतातील निरंतर सेवा आणि दीड हजाराहून अधिक गाण्यांच्या रेकॉर्डिंगसाठी पुरस्कार.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-5",
    year: "2020",
    title: "कृतज्ञता पुरस्कार",
    organization: "सांस्कृतिक व सामाजिक संस्था",
    description: "मराठी व हिंदी भक्ती संगीत परंपरेचे जतन आणि संवर्धन केल्याबद्दल कृतज्ञतापूर्वक दिलेला सन्मान.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-6",
    year: "2019",
    title: "विदर्भ आयडल",
    organization: "विदर्भ संगीत महोत्सव",
    description: "विदर्भातील तरुणांसाठी व भक्ती संगीत चाहत्यांसाठी संगीत क्षेत्रातील प्रेरणादायी व्यक्तिमत्त्व.",
    category: "Title Honor",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-7",
    year: "2018",
    title: "महाराष्ट्र कला सन्मान पुरस्कार",
    organization: "महाराष्ट्र कला अकादमी",
    description: "शास्त्रीय आणि सुगम भक्ती गायनातील उत्कृष्टतेसाठी कला क्षेत्रातील सर्वोच्च गौरव.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "award-8",
    year: "2017",
    title: "महाराष्ट्र मास्टर पुरस्कार",
    organization: "संगीत साधना परिषद",
    description: "वयाच्या १५ व्या वर्षापासून सुरू केलेल्या संगीत प्रवासाचा आणि आवाजातील वैविध्यतेचा गौरव.",
    category: "Award",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=600&auto=format&fit=crop"
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
