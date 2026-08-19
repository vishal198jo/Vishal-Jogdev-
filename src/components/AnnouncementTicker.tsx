import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';

interface AnnouncementTickerProps {
  notifications?: Array<{ id: string; text: string; link?: string; active?: boolean }>;
  shows?: Array<{ 
    id: string; 
    title: string; 
    city: string; 
    venue: string; 
    date: string; 
    time: string; 
    showInNotification?: boolean | string;
    showInTicker?: boolean | string;
    ticketLink?: string;
  }>;
  onOpenBooking?: () => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ 
  notifications = [], 
  shows = [], 
  onOpenBooking 
}) => {
  const navigate = useNavigate();

  // Date formatter for upcoming shows
  const formatShowDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // 1. Custom Notification Texts: get max 10 active custom notifications
  const activeNotifications = notifications.filter(n => n.active !== false).slice(0, 10);

  // 2. Upcoming Shows: get ONLY shows that are explicitly checked/flagged for ticker display
  const flaggedShows = shows.filter(s => 
    s.showInNotification === true || 
    (s as any).showInNotification === 'true' ||
    s.showInTicker === true ||
    (s as any).showInTicker === 'true'
  ).slice(0, 10);

  const tickerItems: Array<{
    id: string;
    text: string;
    badge: string;
    isCustom: boolean;
    link?: string;
  }> = [];

  // Add custom notifications (up to 10)
  activeNotifications.forEach(n => {
    tickerItems.push({
      id: n.id,
      text: n.text,
      badge: 'ALERT',
      isCustom: true,
      link: n.link
    });
  });

  // Add upcoming shows that were explicitly checked (up to 10)
  flaggedShows.forEach(show => {
    const showText = `${show.title} - ${formatShowDate(show.date)} - ${show.city} - ${show.venue || show.time}`;
    tickerItems.push({
      id: show.id,
      text: showText,
      badge: 'UPCOMING SHOW',
      isCustom: false
    });
  });

  // Fallback if absolutely nothing is active
  if (tickerItems.length === 0) {
    tickerItems.push({
      id: 'welcome',
      text: 'Official Portal of Vishal Jogdeo - Devotional Classical Vocalist & Devotional Singer',
      badge: 'WELCOME',
      isCustom: false
    });
  }

  // Duplicate ticker items array for seamless -50% CSS translate infinite loop
  const displayItems = tickerItems.length < 3 ? [...tickerItems, ...tickerItems, ...tickerItems] : tickerItems;

  const handleItemClick = (item: typeof tickerItems[0]) => {
    if (item.isCustom && item.link && item.link.trim() !== '') {
      let url = item.link.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
        url = 'https://' + url;
      }
      if (url.startsWith('/')) {
        navigate(url);
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else if (!item.isCustom && item.id !== 'welcome') {
      // Direct click on upcoming show notification: navigate to /shows or scroll to upcoming shows
      navigate('/shows');
    } else {
      onOpenBooking?.();
    }
  };

  const renderItemSet = (prefixKey: string) => (
    <div className="flex items-center space-x-8 shrink-0">
      {displayItems.map((item, idx) => (
        <div 
          key={`${prefixKey}-${item.id}-${idx}`}
          onClick={() => handleItemClick(item)}
          className="inline-flex items-center gap-2.5 text-stone-200 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[11px] border shadow-sm ${
            item.badge === 'ALERT'
              ? 'text-red-400 bg-red-950/90 border-red-500/40'
              : 'text-amber-300 bg-amber-950/90 border-amber-500/40'
          }`}>
            {item.badge === 'ALERT' ? (
              <AlertCircle className="w-3 h-3 text-red-400" />
            ) : (
              <Calendar className="w-3 h-3 text-amber-400" />
            )}
            {item.badge}
          </span>
          <span className="font-extrabold text-white tracking-wide">{item.text}</span>
          <span className="text-amber-500/80 text-xs px-2">•</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-r from-[#140b0b] via-[#200e0e] to-[#140b0b] text-stone-100 overflow-hidden shadow-xl border-b border-amber-500/30 relative z-30 font-sans">
      <div className="flex items-center max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Marquee Ticker Container with dual sets for 100% infinite smooth scrolling */}
        <div className="relative overflow-hidden w-full flex items-center py-2.5 text-xs sm:text-sm font-medium">
          <div className="flex items-center animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {renderItemSet('set1')}
            {renderItemSet('set2')}
          </div>
        </div>

      </div>
    </div>
  );
};
