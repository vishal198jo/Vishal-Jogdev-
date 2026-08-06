import React from 'react';
import { Youtube, Instagram, Facebook, ExternalLink, ThumbsUp, Eye, Heart } from 'lucide-react';
import { SOCIAL_POSTS, SINGER_PROFILE } from '../data/mockData';

export const SocialSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Connect & Follow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Social Media <span className="font-serif italic text-gold-gradient font-normal">Updates</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-sans">
              Stay connected with daily devotional quotes, behind-the-scenes recording clips, and upcoming show announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SINGER_PROFILE.contact.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#121218] text-stone-200 border border-stone-800 shadow-md hover:border-red-500/50 hover:text-red-400 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube Channel</span>
            </a>
            <a
              href={SINGER_PROFILE.contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#121218] text-stone-200 border border-stone-800 shadow-md hover:border-pink-500/50 hover:text-pink-400 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
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
              className="bg-[#121218] border border-stone-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-stone-800">
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-3 left-3 p-2 rounded-full bg-black/70 backdrop-blur-md shadow-sm border border-stone-800">
                  {post.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-500" />}
                  {post.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
                  {post.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-500" />}
                </span>

                <span className="absolute bottom-3 right-3 text-[10px] text-amber-300 font-medium bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-500/20 shadow-sm">
                  {post.date}
                </span>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 font-sans line-clamp-2 transition-colors">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-800">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
                    {post.likes} Likes
                  </span>
                  {post.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      {post.views} Views
                    </span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
