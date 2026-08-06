import React from 'react';
import { Scale, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  

  return (
    <>
      <SEO title="Terms & Conditions" description="Official Terms and Conditions for using Vishal Jogdeo Sangeet portal, music licensing, and event bookings." keywords="Terms and Conditions, Vishal Jogdeo, Music Licensing, Event Booking Terms, Abhanga Sandhya" />
      <div className="pt-24 space-y-12 pb-20 bg-[#0b0b0e] text-stone-100 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#121218] border-b border-amber-500/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Terms & <span className="font-serif italic text-gold-gradient font-normal">Conditions</span>
          </h1>
          <p className="text-stone-400 text-sm sm:text-base font-sans">
            Effective Date: August 2026 | Applicable to all visitors and concert organizers
          </p>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-stone-300 text-sm leading-relaxed">
        
        <div className="bg-[#121218] p-6 sm:p-10 rounded-3xl border border-stone-800 shadow-xl space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>1. Agreement Overview</span>
            </h2>
            <p className="text-stone-300">
              Welcome to the official website of <strong className="text-amber-300">Vishal Jogdeo Sangeet</strong>. By accessing this portal, reading devotional lyrics, streaming audio previews, or submitting concert booking requests, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <hr className="border-stone-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>2. Intellectual Property & Copyright</span>
            </h2>
            <p className="text-stone-300">
              All music compositions, vocal recordings, Marathi Devanagari transliterations, high-definition gallery photographs, and design elements featured on this website are protected under Indian and International Copyright laws.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-300">
              <li><strong className="text-amber-200">Personal Use:</strong> Users are granted a limited license to stream audio and copy lyrics for personal, non-commercial devotional study.</li>
              <li><strong className="text-amber-200">Prohibited Actions:</strong> Commercial rebroadcast, unauthorized remixing, or re-selling of audio recordings without written authorization from Vishal Jogdeo Sangeet is strictly prohibited.</li>
            </ul>
          </section>

          <hr className="border-stone-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>3. Live Event & Concert Bookings</span>
            </h2>
            <p className="text-stone-300">
              Submission of the "Book Event" form does not constitute a confirmed performance booking. Performance dates, acoustic setups, travel logistics, and honorarium details are confirmed only after execution of an official booking agreement with management.
            </p>
          </section>

          <hr className="border-stone-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-white">4. Disclaimer of Warranties</h2>
            <p className="text-stone-300">
              While we strive to maintain accurate concert schedules, lyrics transliterations, and audio streaming, content is provided "as is". Schedule changes due to unforeseen weather or temple administration decisions will be updated as promptly as possible.
            </p>
          </section>

          <hr className="border-stone-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-white">5. Governance & Jurisdiction</h2>
            <p className="text-stone-300">
              These terms are governed by the laws of India. Any disputes arising from the use of this portal or booking contracts shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>
          </section>

        </div>

      </div>
    </div>
  </>
  );
};
