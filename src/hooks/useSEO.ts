import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function useSEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    // Dynamic Page Title
    const siteTitle = "Vishal Jogdeo | Official Devotional Singer & Classical Vocalist";
    document.title = title ? `${title} | Vishal Jogdeo Sangeet` : siteTitle;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      description || "Official portal of Vishal Jogdeo, classical vocalist and devotional singer specializing in authentic Marathi Abhangas, Bhajans, and live spiritual concerts globally."
    );

    // Dynamic Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      keywords || "Vishal Jogdeo, Abhanga, Devotional Singer, Marathi Bhajan, Sant Sahitya, Classical Vocalist, Kirtan, Devotional Lyrics"
    );

    // Dynamic OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title ? `${title} | Vishal Jogdeo` : siteTitle);

    // Dynamic OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description || "Official portal of Vishal Jogdeo - Devotional Classical Vocalist.");

  }, [title, description, keywords]);
}
