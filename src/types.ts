export interface Song {
  id: string;
  title: string;
  singerName?: string;
  titleDevanagari?: string;
  album?: string;
  category?: 'Bhajan' | 'Aarti' | 'Mantra' | 'Kirtan' | 'Stotra' | 'Dhun' | 'Abhanga' | 'Mahanubhav Bhajan' | 'Mahanubhav Aarti' | 'Devotional Song' | 'Devotional Single' | string;
  language?: 'Marathi' | 'Hindi' | 'Sanskrit' | 'Marathi / Hindi' | 'Sanskrit / Marathi' | string;
  duration?: string;
  audioUrl: string;
  coverImage?: string;
  releaseDate?: string;
  plays?: number;
  downloads?: number;
  featured?: boolean;
  lyricsId?: string;
  composer?: string;
  raga?: string;
  createdAt?: string;
}

export interface Lyric {
  id: string;
  songId?: string;
  title: string;
  titleDevanagari: string;
  album: string;
  category: 'Bhajan' | 'Aarti' | 'Mantra' | 'Kirtan' | 'Stotra' | 'Dhun' | 'Abhanga' | 'Mahanubhav Bhajan' | 'Mahanubhav Aarti' | 'Devotional Song' | 'Devotional Single' | string;
  language: 'Marathi' | 'Hindi' | 'Sanskrit' | 'Marathi / Hindi' | 'Sanskrit / Marathi' | string;
  publishedDate: string;
  coverImage: string;
  raga?: string;
  taal?: string;
  composer?: string;
  meaningSummary: string;
  devanagariText: string[];
  romanText: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface GalleryFolder {
  id: string;
  name: string;
  icon?: string;
  description: string;
  coverImage: string;
  count: number;
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video' | 'event';
  folderId: string;
  folderName: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  date: string;
  location?: string;
  description: string;
}

export interface Show {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD or formatted
  time: string;
  city: string;
  venue: string;
  state?: string;
  status?: 'Upcoming' | 'Completed' | 'Sold Out' | 'Free Entry';
  bannerImage: string;
  description: string;
  ticketLink?: string;
  isOrganizedByTrust?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. Music Director, Temple Trustee, Fan, Festival Organizer
  organization?: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Award {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  category: 'Award' | 'Certificate' | 'Media Mention' | 'Magazine Cover' | 'Title Honor' | string;
  image: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'youtube' | 'facebook';
  title: string;
  likes: string;
  views?: string;
  date: string;
  mediaUrl: string;
  postUrl: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  expectedAudience: string;
  message: string;
}
