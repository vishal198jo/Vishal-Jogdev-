import React, { useState } from 'react';
import { X, Copy, Check, Code2, ExternalLink, Sparkles, Monitor } from 'lucide-react';

interface EmbedLyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lyricId: string;
  title: string;
  titleDevanagari: string;
  composer?: string;
}

export const EmbedLyricsModal: React.FC<EmbedLyricsModalProps> = ({
  isOpen,
  onClose,
  lyricId,
  title,
  titleDevanagari,
  composer = 'Vishal Jogdeo'
}) => {
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedEmbedUrl, setCopiedEmbedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'iframe' | 'script'>('iframe');

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://vishaljogdeo.com';
  const embedUrl = `${origin}/embed/lyrics/${lyricId}`;

  const iframeEmbedCode = `<iframe src="${embedUrl}" width="100%" height="600" style="border:none; border-radius:16px; width:100%; min-height:550px; overflow:hidden;" title="${titleDevanagari || title} - ${composer} Lyrics" loading="lazy"></iframe>`;

  const scriptEmbedCode = `<!-- Vishal Jogdeo Lyrics Embed Code -->
<div id="vj-lyrics-${lyricId}" style="width:100%; max-width:800px; margin:0 auto;">
  <iframe src="${embedUrl}" width="100%" height="600" style="border:1px solid rgba(245,158,11,0.3); border-radius:16px; width:100%; min-height:550px; overflow:hidden;" title="${titleDevanagari || title} - ${composer} Lyrics" loading="lazy"></iframe>
</div>`;

  const currentEmbedCode = activeTab === 'iframe' ? iframeEmbedCode : scriptEmbedCode;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(currentEmbedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const handleCopyEmbedUrl = () => {
    navigator.clipboard.writeText(embedUrl);
    setCopiedEmbedUrl(true);
    setTimeout(() => setCopiedEmbedUrl(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#121218] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative space-y-6 text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-stone-700/50"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs tracking-wider uppercase">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Lyrics Embed Code & Direct URL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            {titleDevanagari}
          </h2>
          <p className="text-xs text-stone-400">
            Embed this devotional lyric on your website, blog, or share direct link with listeners.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* 1) EMBED CODE (HTML / JS) */}
          <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-[#0b0b0e] border border-amber-500/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">
                  1
                </span>
                <h3 className="text-sm font-bold text-white">
                  Embed Code (HTML / JS)
                </h3>
              </div>

              {/* Format Toggle */}
              <div className="flex items-center bg-stone-900 p-1 rounded-lg border border-stone-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('iframe')}
                  className={`px-2.5 py-1 rounded font-semibold transition-all ${
                    activeTab === 'iframe' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  HTML iFrame
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('script')}
                  className={`px-2.5 py-1 rounded font-semibold transition-all ${
                    activeTab === 'script' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Responsive Code
                </button>
              </div>
            </div>

            {/* Code snippet block */}
            <div className="relative">
              <pre className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 text-[11px] sm:text-xs text-amber-300/90 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all max-h-32">
                {currentEmbedCode}
              </pre>
            </div>

            {/* Copy Button */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-stone-400">
                Paste this code anywhere inside your HTML page to display the lyrics widget.
              </p>
              <button
                type="button"
                onClick={handleCopyEmbed}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0 ${
                  copiedEmbed 
                    ? 'bg-emerald-600 text-white shadow-emerald-900/50' 
                    : 'bg-gold-gradient text-black hover:opacity-95'
                }`}
              >
                {copiedEmbed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Embed Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2) EMBED DIRECT URL */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0b0b0e] border border-amber-500/20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">
                  2
                </span>
                <h3 className="text-sm font-bold text-white">
                  Embed Direct URL (Standalone Widget)
                </h3>
              </div>
              
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline transition-colors shrink-0"
                title="Preview standalone embed page"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Display Full URL without truncation / dots */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/90 space-y-3">
              <div className="text-amber-300/95 font-mono text-xs sm:text-sm break-all select-all leading-relaxed bg-[#111116] p-2.5 rounded-lg border border-amber-500/15">
                {embedUrl}
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-amber-400" />
                  Direct URL to embed anywhere
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyEmbedUrl}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                      copiedEmbedUrl 
                        ? 'bg-emerald-600 text-white shadow-emerald-900/50' 
                        : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700'
                    }`}
                  >
                    {copiedEmbedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copy Embed URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-stone-800 transition-colors shrink-0"
                    title="Open Embed in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
