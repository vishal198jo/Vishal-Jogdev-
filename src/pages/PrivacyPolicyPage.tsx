import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Copyright, 
  Calendar, 
  UserCheck, 
  ExternalLink, 
  AlertTriangle, 
  Code2, 
  Instagram,
  CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy | Vishal Jogdeo Official Music Portal" 
        description="Official Privacy Policy, copyright terms, and website credits for Vishal Jogdeo's official platform, designed & developed by YK Studio." 
        keywords="Privacy Policy, Vishal Jogdeo, YK Studio, Copyright Policy, Website Credits, Devotional Music"
        url="/privacy"
      />
      <div className="pt-24 space-y-12 pb-20 bg-[#0b0b0e] text-stone-100 min-h-screen">
        {/* Header Banner */}
        <div className="bg-[#121218] border-b border-amber-500/20 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Terms & Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Privacy <span className="font-serif italic text-gold-gradient font-normal">Policy</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
              Welcome to the official website of <strong className="text-white">Vishal Jogdeo</strong>. This website has been designed and developed by{' '}
              <a 
                href="https://ykstudio.store" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 transition-colors"
              >
                YK Studio
              </a>.
            </p>
          </div>
        </div>

        {/* Main Body Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-stone-300 text-sm leading-relaxed">
          <div className="bg-[#121218] p-6 sm:p-10 rounded-3xl border border-stone-800 shadow-2xl space-y-8">
            
            {/* 1. Website Ownership */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <span>1. Website Ownership</span>
              </h2>
              <p className="text-stone-300 pl-10">
                This website is the official platform of <strong className="text-amber-300">Vishal Jogdeo</strong>.
              </p>
            </section>

            <hr className="border-stone-800/80" />

            {/* 2. Copyright Policy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Copyright className="w-4 h-4" />
                </div>
                <span>2. Copyright Policy</span>
              </h2>
              <div className="space-y-3 pl-10 text-stone-300">
                <p>
                  All songs, lyrics, images, videos, logos, and website content are protected by copyright.
                </p>
                <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Copying, downloading, or republishing website content without permission is prohibited.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>If any content is used, proper credit to <strong>Vishal Jogdeo</strong> and <strong>YK Studio</strong> is mandatory.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Unauthorized copying may result in legal action under applicable copyright laws.</span>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-stone-800/80" />

            {/* 3. Website Validity */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>3. Website Validity</span>
              </h2>
              <p className="text-stone-300 pl-10">
                This website is developed with a <strong>3-year validity period</strong> as per the development agreement. Renewal, maintenance, and hosting services are subject to separate terms after the validity period.
              </p>
            </section>

            <hr className="border-stone-800/80" />

            {/* 4. User Privacy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span>4. User Privacy</span>
              </h2>
              <p className="text-stone-300 pl-10">
                We may collect basic information such as your name, email address, or contact details only when you voluntarily submit them through forms. Your information will not be sold or shared with third parties without your consent.
              </p>
            </section>

            <hr className="border-stone-800/80" />

            {/* 5. External Links */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span>5. External Links</span>
              </h2>
              <p className="text-stone-300 pl-10">
                This website may contain links to YouTube, Instagram, Facebook, or other platforms. We are not responsible for the privacy policies or content of third-party websites.
              </p>
            </section>

            <hr className="border-stone-800/80" />

            {/* 6. Legal Notice */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span>6. Legal Notice</span>
              </h2>
              <p className="text-stone-300 pl-10">
                Any attempt to copy, modify, duplicate, or misuse this website's design, source code, or content without written permission may lead to legal action.
              </p>
            </section>

            <hr className="border-stone-800/80" />

            {/* 7. Website Credits */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <span>7. Website Credits</span>
              </h2>
              
              <div className="pl-10 space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#161622] to-[#1a1a2e] border border-blue-500/20 space-y-3">
                  <p className="text-stone-200 text-sm">
                    Website Designed &amp; Developed by{' '}
                    <a 
                      href="https://ykstudio.store" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 transition-colors"
                    >
                      YK Studio
                    </a>
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-800/80 text-xs">
                    <span className="text-stone-400 font-medium">Developer :</span>
                    <span className="text-white font-bold">Mr. Yash Waghotkar</span>
                    <a 
                      href="https://www.instagram.com/mryashwaghotkar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-950/60 hover:bg-pink-900/80 text-pink-400 hover:text-pink-300 border border-pink-500/30 transition-all font-semibold shadow-sm"
                      title="Yash Waghotkar on Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>@mryashwaghotkar</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

