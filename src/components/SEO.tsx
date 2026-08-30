import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SINGER_PROFILE } from '../data/mockData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  audio?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  audio,
  schema
}) => {
  const location = useLocation();
  const siteUrl = "https://vishaljogdeo.com";
  const siteName = "Vishal Jogdeo | Official Devotional Music Portal";
  
  // Format title cleanly
  let fullTitle = siteName;
  if (title) {
    if (title.toLowerCase().includes("vishal jogdeo") || title.includes("विशाल जोगदेव")) {
      fullTitle = title;
    } else {
      fullTitle = `${title} | Vishal Jogdeo`;
    }
  }
  
  const defaultDesc = "Official website of Vishal Jogdeo - acclaimed classical vocalist and Marathi devotional playback singer. Explore Vishal Jogdeo songs, lyrics, music, lifestyle, biography, photo gallery, upcoming live shows, and concert bookings.";
  const metaDesc = description || defaultDesc;
  
  const defaultKeywords = "Vishal Jogdeo, Vishal Jogdeo Song, Vishal Jogdeo Lifestyle, Vishal Jogdeo lyrics, Vishal Jogdeo music, Vishal Jogdeo Bhajan, Vishal Jogdeo Abhanga, Mahanubhav Panth Bhajan, Marathi Devotional Music, Vishal Jogdeo Live Show, Vishal Jogdeo Biography, Vishal Jogdeo Photos, Abhanga Sandhya, विशाल जोगदेव";
  const metaKeywords = keywords ? `${keywords}, Vishal Jogdeo, विशाल जोगदेव` : defaultKeywords;
  
  const currentPath = url || location.pathname;
  const cleanPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const fullUrl = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
  
  const ogImage = image || SINGER_PROFILE.portraitImage || "https://i.ibb.co/qMf4c75p/Picsart-26-08-05-18-05-33-103.png";

  // Generate dynamic BreadcrumbList Schema for Google Search Rich Results
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${siteUrl}/`
    }
  ];

  const pathNameMap: Record<string, string> = {
    'songs': 'Devotional Songs',
    'lyrics': 'Lyrics Library',
    'shows': 'Upcoming Live Shows',
    'about': 'Biography & Lifestyle',
    'gallery': 'Photos & Gallery',
    'contact': 'Contact & Booking',
    'terms': 'Terms & Conditions',
    'privacy': 'Privacy Policy'
  };

  pathSegments.forEach((segment, idx) => {
    const itemUrl = `${siteUrl}/${pathSegments.slice(0, idx + 1).join('/')}`;
    const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": idx + 2,
      "name": name,
      "item": itemUrl
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  const defaultPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://vishaljogdeo.com/#person",
    "name": "Vishal Jogdeo",
    "alternateName": ["विशाल जोगदेव", "भजनसम्राट विशाल जोगदेव", "Singer Vishal Jogdeo"],
    "url": siteUrl,
    "image": ogImage,
    "jobTitle": "Devotional Playback Singer & Classical Vocalist",
    "description": defaultDesc,
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Marathi Abhanga",
      "Mahanubhav Panth Bhajan",
      "Indian Classical Music",
      "Devotional Playback Singing",
      "Bhakti Sangeet"
    ],
    "sameAs": [
      SINGER_PROFILE.contact.socials.youtube || "https://youtube.com/@vishaljogdeo",
      SINGER_PROFILE.contact.socials.instagram || "https://www.instagram.com/vishaljogdeo",
      SINGER_PROFILE.contact.socials.facebook || "https://www.facebook.com/share/1AMnZnHGyd/",
      SINGER_PROFILE.contact.socials.spotify || "https://open.spotify.com/playlist/2LgZXXcDdeKV7CVa1DIQBq"
    ]
  };

  const finalSchemas: Array<Record<string, any>> = [];
  if (schema) {
    if (Array.isArray(schema)) {
      finalSchemas.push(...schema);
    } else {
      finalSchemas.push(schema);
    }
  } else {
    finalSchemas.push(defaultPersonSchema);
  }

  // Include breadcrumb schema for all non-root pages
  if (pathSegments.length > 0 && !noindex) {
    finalSchemas.push(breadcrumbSchema);
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Vishal Jogdeo" />
      <meta name="publisher" content="Vishal Jogdeo Official" />
      <link rel="canonical" href={fullUrl} />

      {/* Robots Indexing Directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow, noarchive" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Geo / Regional SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Maharashtra, India" />

      {/* Language Alternates */}
      <link rel="alternate" href={fullUrl} hrefLang="x-default" />
      <link rel="alternate" href={fullUrl} hrefLang="mr-IN" />
      <link rel="alternate" href={fullUrl} hrefLang="en-IN" />
      <link rel="alternate" href={fullUrl} hrefLang="hi-IN" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="mr_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />
      {audio && <meta property="og:audio" content={audio} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content="@vishaljogdeo" />
      <meta name="twitter:creator" content="@vishaljogdeo" />

      {/* Structured Data (JSON-LD) */}
      {finalSchemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

