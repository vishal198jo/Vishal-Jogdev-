import React from 'react';
import { Youtube, Instagram, Facebook, ExternalLink, ThumbsUp, Eye, Heart } from 'lucide-react';
import { SOCIAL_POSTS, SINGER_PROFILE } from '../data/mockData';

export const SocialSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F7F4F0] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Connect & Follow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-stone-900">
              Social Media <span className="font-serif italic font-normal text-amber-900">Updates</span>
            </h2>
            <p className="text-stone-600 text-base max-w-xl font-sans">
              Stay connected with daily devotional quotes, behind-the-scenes recording clips, and upcoming show announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SINGER_PROFILE.contact.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white text-stone-800 border border-stone-200/80 shadow-sm hover:border-red-300 hover:text-red-600 text-xs font-medium flex items-center gap-2 transition-all"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>YouTube Channel</span>
            </a>
            <a
              href={SINGER_PROFILE.contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white text-stone-800 border border-stone-200/80 shadow-sm hover:border-pink-300 hover:text-pink-600 text-xs font-medium flex items-center gap-2 transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Social Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOCIAL_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-stone-200/80 hover:border-stone-400 rounded-3xl p-5 shadow-sm group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-3 left-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                  {post.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-600" />}
                  {post.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-600" />}
                  {post.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                </span>

                <span className="absolute bottom-3 right-3 text-[10px] text-stone-700 font-medium bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm">
                  {post.date}
                </span>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-amber-900 font-sans line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600/20" />
                    {post.likes} Likes
                  </span>
                  {post.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-amber-800" />
                      {post.views} Views
                    </span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
