export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'music' | 'shows' | 'lifestyle';
  keywords: string[];
}

export const SEO_FAQS: FAQItem[] = [
  {
    id: 'who-is-vishal-jogdeo',
    question: "Vishal Jogdeo kaun hai? (Who's Vishal Jogdeo?)",
    answer: "Vishal Jogdeo Maharashtra ke prasiddh classical vocalist aur devotional playback singer hain. Pichhle 15+ se 24 varsho se ve Marathi Abhanga, Mahanubhav Panth Bhajans, Bhakti Sangeet, aur classical concerts me apni divya aawaz ke liye jaane jaate hain. Unhone 1500 se zyada bhajan aur devotional tracks record kiye hain aur sampurna Bharat me live Abhanga Sandhya prastut karte hain.",
    category: 'general',
    keywords: ["Who's Vishal Jogdeo", "Vishal Jogdeo kaun hai", "Vishal Jogdeo Ke Bare Maine", "Singer Vishal Jogdeo"]
  },
  {
    id: 'listen-vishal-jogdeo-bhajan',
    question: "Vishal Jogdeo ke bhajan kaise aur kahan sune? (How to listen to Vishal Jogdeo Bhajans?)",
    answer: "Vishal Jogdeo ke sabhi prasiddh bhajan, abhang aur devotional tracks aap unki official website vishaljogdeo.com par online streaming player dwara sun sakte hain. Iske alawa, unki discography official Spotify playlist (2LgZXXcDdeKV7CVa1DIQBq), YouTube Channel (@vishaljogdeo), Apple Music, JioSaavn aur Gaana par bhi uplabdh hai.",
    category: 'music',
    keywords: ["Vishal Jogdeo ke Bhajan", "Vishal Jogdeo Songs", "Spotify", "YouTube", "Bhakti Sangeet"]
  },
  {
    id: 'lyrics-repository',
    question: "Vishal Jogdeo ke bhajano ke lyrics kahan milenge? (Where to find Vishal Jogdeo Lyrics?)",
    answer: "Vishal Jogdeo ke sabhi lokpriya bhajano aur abhangon ki shuddh Devnagari shabd-rachna (All Lyrics) website ke dedicated '/lyrics' section par uplabdh hai. Har lyric page par Devnagari path, rachnakar (sant-sahitya) ki jankari, audio player aur website embed code bhi diya gaya hai.",
    category: 'music',
    keywords: ["Vishal Jogdeo All Lyrics", "Bhajan Lyrics", "Abhanga Shabdavli", "Devnagari Lyrics"]
  },
  {
    id: 'upcoming-shows-schedule',
    question: "Vishal Jogdeo ke upcoming programs aur live concerts kaise dekhe?",
    answer: "Vishal Jogdeo ke aagami live shows, Abhanga Sandhya, mandir mahotsav aur kirtan mahotsav ki tithi (date), sthan (venue) aur samay website ke '/shows' page par niyamit roop se update kiye jaate hain. Wahan se aap show details dekh sakte hain aur live updates prapt kar sakte hain.",
    category: 'shows',
    keywords: ["Vishal Jogdeo Live Shows", "Abhanga Sandhya", "Concerts Schedule", "Live Program"]
  },
  {
    id: 'contact-booking-inquiry',
    question: "Vishal Jogdeo ko concert ya devotional program ke liye contact aur book kaise kare?",
    answer: "Vishal Jogdeo ke live concerts, Bhajan Sandhya, corporate cultural shows ya wedding devotional sangeet ke liye aap website ke '/contact' page par jaakar booking inquiry form bhar sakte hain, ya official WhatsApp number +91 7038086864 par direct message bhej sakte hain. Unki official management team 24 ghanto me aapse sampark karti hai.",
    category: 'shows',
    keywords: ["Vishal Jogdeo Booking", "Contact Vishal Jogdeo", "WhatsApp Booking", "Bhajan Sandhya Booking"]
  },
  {
    id: 'download-mp3-songs',
    question: "Vishal Jogdeo ke songs download ya offline kaise sune?",
    answer: "Website ke '/songs' section me pratyek track ke liye high-quality MP3 download button uplabdh hai. Shrota seedhe click karke apne phone ya computer me audio save kar sakte hain aur offline devotional experience ka anand le sakte hain.",
    category: 'music',
    keywords: ["Vishal Jogdeo Songs", "MP3 Download", "Audio Stream", "Free Bhajan Download"]
  },
  {
    id: 'classical-training-background',
    question: "Vishal Jogdeo ka classical music training aur devotional background kya hai?",
    answer: "Vishal Jogdeo ne shastriya sangeet (Indian Classical Music) ki kadi shalaon aur guru-shishya parampara ke tahat barso tak talim li hai. Unka gayan Kirana aur Gwalior gharane ke swar-lagaav aur bhav-pradhan gayaki se prabhavit hai. Unka mukhya dhyan Maharashtra ke sant-kaviyon (Sant Dnyaneshwar, Sant Tukaram, Sant Eknath) aur Mahanubhav Panth ki prachin lilacharitro par aadharit bhajano par raha hai.",
    category: 'general',
    keywords: ["Classical Training", "Guru Shishya Parampara", "Indian Classical Vocalist", "Kirana Gharana"]
  },
  {
    id: 'lifestyle-daily-riyaz',
    question: "Vishal Jogdeo ki lifestyle aur daily riyaz routine kaisa hai? (Vishal Jogdeo Lifestyle)",
    answer: "Vishal Jogdeo ka lifestyle ek shuddh shastriya upasak (sadhak) jaisa hai. Unka din Brahma-muhurta me subah 4:30 baje shuru hota hai jisme pranayama, swar-sadhana aur kharaj ka riyaz shamil hai. Ve shuddh satvik shakahari aahar lete hain aur aadhunik bhag-daud bhari zindagi me bhi dhyan aur adhyatma ko prathmikta dete hain.",
    category: 'lifestyle',
    keywords: ["Vishal Jogdeo Lifestyle", "Daily Riyaz", "Swar Sadhana", "Spiritual Routine"]
  },
  {
    id: 'family-and-wife',
    question: "Vishal Jogdeo ki wife aur parivar ke baare me kya jankari hai? (Vishal Jogdeo Wife)",
    answer: "Vishal Jogdeo ki dharampatni Smt. Mayuri Jogdeo hain. Mayuri Jogdeo aur unka parivar Vishal ji ke sangeet prayas aur adhyatmik yatra me ek majboot aadhar stambh rahe hain. Parivar Maharashtra ki sanskritik paramparaon aur sangeet-prem se juda hua hai.",
    category: 'lifestyle',
    keywords: ["Vishal Jogdeo Wife", "Mayuri Jogdeo", "Vishal Jogdeo Family", "Personal Life"]
  },
  {
    id: 'mahanubhav-panth-bhajans',
    question: "Mahanubhav Panth ke bhajan kya hote hain aur Vishal Jogdeo ka isme kya yogdan hai?",
    answer: "Mahanubhav Panth 13vin sadi me Sarvadnya Shri Chakradhar Swami dwara sthapit ek prachin adhyatmik parampara hai jisme lilacharitro aur dhyanatmak padavaliyon ka sangeet me vishisht sthan hai. Vishal Jogdeo ne 500 se adhik Mahanubhav bhajan recorded kiye hain aur lupt ho rahi prachin dhuno ko aadhunik studio quality me punarjeevit kiya hai.",
    category: 'music',
    keywords: ["Mahanubhav Panth Bhajan", "Chakradhar Swami", "Marathi Lilacharitra", "Bhakti Padas"]
  },
  {
    id: 'abhanga-vs-bhajan-sandhya',
    question: "Abhanga Sandhya aur Bhajan Sandhya me kya antar hota hai?",
    answer: "Abhanga Sandhya vishesh roop se Varkari sant-sahitya jaise Sant Tukaram, Sant Namdev aur Sant Dnyaneshwar ke abhangon par aadharit hoti hai, jisme Taal, Pakhawaj aur Ektari ka mukhya prayog hota hai. Jabki Bhajan Sandhya me vibhinna devaradhana, aartiyan, bhavgeete aur shastriya rag-aadhrit bhaktigeet shamil hote hain. Vishal Jogdeo dono formats me nipun hain.",
    category: 'music',
    keywords: ["Abhanga Sandhya", "Bhajan Sandhya", "Varkari Sangeet", "Pakhawaj"]
  },
  {
    id: 'wedding-corporate-shows',
    question: "Kya Vishal Jogdeo wedding sangeet, reception ya corporate events me perform karte hain?",
    answer: "Haan, Vishal Jogdeo aur unka musical orchestra sanskritik shadiyo, Mangalagaur, Satyanarayan mahapooja, corporate anniversary cultural nights aur spiritual retreats me live performances dete hain. In shows me shastriya rag-aadhrit mangal sangeet aur bhav-geet pesh kiye jaate hain.",
    category: 'shows',
    keywords: ["Wedding Devotional Music", "Corporate Cultural Event", "Mangal Sangeet", "Live Orchestra"]
  },
  {
    id: 'most-popular-songs',
    question: "Vishal Jogdeo ke sabse hit aur lokpriya gaane kaun se hain? (Vishal Jogdeo Songs)",
    answer: "Vishal Jogdeo ke lokpriya gaano me 'Vitthal Vitthal Namachi Gajar', 'Chakradhar Swami Mahima', 'Majhe Maher Pandhari', 'Devachiye Dwari', 'Anandache Dohi' aur anek prachin aartiyan shamil hain jinhe YouTube aur Spotify par lakho shrotaon ne sunaa hai.",
    category: 'music',
    keywords: ["Vishal Jogdeo Songs", "Hit Devotional Tracks", "Marathi Abhangas", "Vitthal Vitthal"]
  },
  {
    id: 'instruments-orchestra',
    question: "Vishal Jogdeo live concerts me kaun-kaun se musical instruments ka use karte hain?",
    answer: "Vishal Jogdeo ke live concerts me Harmonium (Sanvadini), Tabla, Pakhawaj, Dholki, Side Percussion (Taal/Chimes), Flute (Bansuri), aur Acoustic Keyboard/Octapad jaise shastriya aur aadhunik vadyo ka atyant sundar sanyojan hota hai.",
    category: 'shows',
    keywords: ["Musical Instruments", "Harmonium", "Tabla", "Pakhawaj", "Live Band"]
  },
  {
    id: 'official-social-media',
    question: "Vishal Jogdeo ke official social media handles aur channels kaun se hain?",
    answer: "Vishal Jogdeo official handles hain: YouTube: youtube.com/@vishaljogdeo, Instagram: @vishaljogdeo, Facebook: facebook.com/share/1AMnZnHGyd/, Spotify Playlist: 2LgZXXcDdeKV7CVa1DIQBq, aur Official Website: vishaljogdeo.com.",
    category: 'general',
    keywords: ["Social Media", "YouTube", "Instagram", "Facebook", "Official Handles"]
  },
  {
    id: 'international-concerts',
    question: "Kya Vishal Jogdeo Bharat ke bahar (international shows) bhi perform karte hain?",
    answer: "Ji haan, Vishal Jogdeo overseas Maharashtra Mandals, spiritual organizations aur NRI devotions ke liye virtual tatha on-site international devotional shows ke liye uplabdh rehte hain. Booking inquiry management team ke dwara ki ja sakti hai.",
    category: 'shows',
    keywords: ["International Shows", "Maharashtra Mandal", "Global Concerts", "NRI Events"]
  },
  {
    id: 'music-licensing-rights',
    question: "Vishal Jogdeo ke gaano ke audio rights aur licensing kaise prapt kare?",
    answer: "Vishal Jogdeo ke recording tracks ke non-exclusive ya sync-licensing adhikar prapt karne ke liye aap contact@vishaljogdeo.com ya management helpline par sampark kar sakte hain. Vyaktigat sunne aur mandir aayojano me unke gaane shrota nisankoch baja sakte hain.",
    category: 'general',
    keywords: ["Audio Rights", "Music Licensing", "Copyright", "Sync License"]
  },
  {
    id: 'new-song-release-updates',
    question: "Vishal Jogdeo ke naye gaano ki updates sabse pehle kahan milti hain?",
    answer: "Naye album aur single release ki jankari official website ke homepage ticker par, YouTube channel par aur unke Instagram handle @vishaljogdeo par sabse pehle announce ki jaati hai. Aap website ko install (PWA) karke bhi instant notification pa sakte hain.",
    category: 'general',
    keywords: ["New Song Release", "Album Updates", "PWA Notifications", "Latest Bhajan"]
  },
  {
    id: 'concert-entry-booking',
    question: "Vishal Jogdeo ke aam public concerts me entry kaise hoti hai?",
    answer: "Adhikansh mandir mahotsav aur samajik Abhanga Sandhya sarvajanik aur nishulk (free entry) hoti hain. Ticketed auditorium programs ke liye passes aur ticket booking details website ke '/shows' section me uplabdh karwayi jaati hain.",
    category: 'shows',
    keywords: ["Concert Entry", "Passes", "Free Entry", "Auditorium Booking"]
  },
  {
    id: 'learning-guidance-tips',
    question: "Devotional singing aur bhajan sikhne ke liye Vishal Jogdeo ke mukhya sujhav kya hain?",
    answer: "Vishal Jogdeo ke anusaar, bhajan gayaki me kewal aawaz ki bulandi nahi, balki 'Bhav' (devotion) aur shastriya sur-tal ka shuddh santulan hona chahiye. Rozana 1 ghanta Kharaj (mandra saptak) sadhana, shabdo ka shuddh ucharan aur sant-sahitya ka adhyayan karna aavashyak hai.",
    category: 'lifestyle',
    keywords: ["Singing Tips", "Riyaz Guide", "Devotional Singing", "Vocal Training"]
  },
  {
    id: 'collaboration-and-recording',
    question: "Kya Vishal Jogdeo ke sath duet ya new music production collaborate kiya ja sakta hai?",
    answer: "Ji haan, sangeetkar, kavi aur music labels naye devotional projects, singles aur spiritual albums ke liye Vishal Jogdeo Management team se contact@vishaljogdeo.com ya WhatsApp par collaboration proposals discuss kar sakte hain.",
    category: 'music',
    keywords: ["Music Collaboration", "Duet Song", "Music Production", "Record Label"]
  }
];
