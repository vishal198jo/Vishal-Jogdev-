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
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schema
}) => {
  const location = useLocation();
  const siteTitle = "Vishal Jogdeo | Official Devotional Singer & Classical Vocalist";
  let fullTitle = siteTitle;
  if (title) {
    if (title.toLowerCase().includes("vishal jogdeo") || title.toLowerCase().includes("vishal jogdev") || title.includes("विशाल जोगदेव")) {
      fullTitle = title;
    } else {
      fullTitle = `${title} | Vishal Jogdeo`;
    }
  }
  
  const defaultDesc = "Official portal of Vishal Jogdeo (Vishal Jogdev) - classical vocalist and devotional singer. Listen to Vishal Jogdeo songs, read lyrics, explore lifestyle biography, photos, and book live shows.";
  const metaDesc = description || defaultDesc;
  
  const defaultKeywords = "Vishal Jogdeo, Vishal Jogdev, Vishal Jogdeo Song, Vishal Jogdeo Lifestyle, Vishal Jogdeo lyrics, Vishal Jogdeo music, Vishal Jogdeo Bhajan, Vishal Jogdeo Abhanga, Mahanubhav Panth Bhajan, Marathi Devotional Music, Vishal Jogdeo Live Show, Vishal Jogdeo Biography, Vishal Jogdeo Photos";
  const metaKeywords = keywords || defaultKeywords;
  
  const siteUrl = "https://vishaljogdeo.com";
  const currentPath = url || location.pathname;
  const cleanPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const fullUrl = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
  
  const ogImage = image || SINGER_PROFILE.portraitImage;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Vishal Jogdeo",
    "url": siteUrl,
    "image": SINGER_PROFILE.portraitImage,
    "description": defaultDesc,
    "sameAs": [
      SINGER_PROFILE.contact.socials.youtube,
      SINGER_PROFILE.contact.socials.instagram,
      SINGER_PROFILE.contact.socials.facebook,
      SINGER_PROFILE.contact.socials.spotify
    ]
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};
