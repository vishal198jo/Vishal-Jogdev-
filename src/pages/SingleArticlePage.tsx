import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ARTICLES_DATA } from '../data/articlesData';

export const SingleArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES_DATA.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const articleSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `https://vishaljogdeo.com/articles/${article.slug}#article`,
      "headline": article.h1Title,
      "description": article.metaDescription,
      "image": [
        article.featuredImage,
        ...(article.secondaryImage ? [article.secondaryImage] : [])
      ],
      "datePublished": article.publishedDate,
      "dateModified": article.updatedDate,
      "author": {
        "@type": "Person",
        "name": "Vishal Jogdeo",
        "url": "https://vishaljogdeo.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vishal Jogdeo Official",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cnd.vishaljogdeo.com/IMG_4239-removebg-preview.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://vishaljogdeo.com/articles/${article.slug}`
      }
    },
    ...(article.faqs && article.faqs.length > 0 ? [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ] : [])
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.h1Title,
          text: article.metaDescription,
          url: window.location.href
        });
      } catch (e) {
        // Silently ignore share cancel
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={article.seoTitle}
        description={article.metaDescription}
        keywords={article.keywords}
        image={article.featuredImage}
        url={`/articles/${article.slug}`}
        type="article"
        schema={articleSchema}
      />

      <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-[#0b0b0e] text-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Breadcrumb / Back Link */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-400/40 text-stone-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Share Article</span>
            </button>
          </div>

          {/* Article Header */}
          <header className="space-y-4 border-b border-amber-500/20 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-amber-300/80 font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <Calendar className="w-3 h-3 text-amber-400" />
                {article.publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <Clock className="w-3 h-3 text-amber-400" />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                <User className="w-3 h-3 text-amber-400" />
                {article.author}
              </span>
            </div>

            {/* Exactly 1 H1 Tag for this page */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
              {article.h1Title}
            </h1>

            <p className="text-base sm:text-lg text-amber-200/90 font-sans leading-relaxed">
              {article.subtitle}
            </p>
          </header>

          {/* Primary Featured Image with Alt & SEO Caption */}
          <figure className="rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-[#121218] p-3 sm:p-4 shadow-2xl">
            <div className="w-full max-h-[520px] overflow-hidden rounded-2xl flex items-center justify-center bg-black/50">
              <img
                src={article.featuredImage}
                alt={article.featuredImageAlt}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
            <figcaption className="pt-3 px-2 text-center sm:text-left">
              <span className="block text-xs sm:text-sm font-bold text-amber-300 font-sans">
                {article.featuredImageAlt}
              </span>
              <span className="block text-xs text-stone-400 font-sans mt-0.5">
                {article.featuredImageCaption}
              </span>
            </figcaption>
          </figure>

          {/* Article Summary Box */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-stone-200 font-sans text-sm sm:text-base leading-relaxed">
            <strong className="text-amber-300 font-bold block mb-1">Article Overview:</strong>
            {article.summary}
          </div>

          {/* Article Body Content */}
          <div 
            className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-amber-200 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-2 prose-h2:mt-8 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:text-amber-300 prose-p:text-stone-300 prose-p:leading-relaxed prose-li:text-stone-300"
            dangerouslySetTargetContent={undefined}
          >
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </div>

          {/* Secondary Image if provided */}
          {article.secondaryImage && (
            <figure className="my-8 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-[#121218] p-3 sm:p-4 shadow-2xl">
              <div className="w-full max-h-[520px] overflow-hidden rounded-2xl flex items-center justify-center bg-black/50">
                <img
                  src={article.secondaryImage}
                  alt={article.secondaryImageAlt || "Vishal Jogdeo"}
                  className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="pt-3 px-2 text-center sm:text-left">
                <span className="block text-xs sm:text-sm font-bold text-amber-300 font-sans">
                  {article.secondaryImageAlt}
                </span>
                <span className="block text-xs text-stone-400 font-sans mt-0.5">
                  {article.secondaryImageCaption}
                </span>
              </figcaption>
            </figure>
          )}

          {/* Article Specific FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="py-8 border-t border-amber-500/20 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Frequently Asked Questions Regarding This Topic
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#121218] border border-amber-500/20 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-amber-300">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Internal Links Navigation Card */}
          {article.internalLinks && article.internalLinks.length > 0 && (
            <section className="p-6 rounded-3xl bg-gradient-to-r from-[#14141d] to-[#1a1712] border border-amber-500/30 space-y-4">
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Recommended Next Steps & Internal Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.internalLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.url}
                    className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-400 text-left space-y-1 group transition-all"
                  >
                    <div className="text-xs font-bold text-amber-300 group-hover:text-white flex items-center justify-between">
                      <span>{link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <p className="text-[11px] text-stone-400 font-sans">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to All Articles Navigation */}
          <div className="pt-6 border-t border-amber-500/20 flex items-center justify-between">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-xs font-bold text-amber-300 border border-stone-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Articles</span>
            </Link>

            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              Book Vishal Jogdeo
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};
