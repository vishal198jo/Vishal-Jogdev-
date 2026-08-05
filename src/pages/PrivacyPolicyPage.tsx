import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const PrivacyPolicyPage: React.FC = () => {
  useSEO({
    title: "Privacy Policy",
    description: "Official Privacy Policy for Vishal Jogdeo Sangeet portal. Learn how we handle your data securely and respectfully.",
    keywords: "Privacy Policy, Vishal Jogdeo, Data Protection, Terms, Devotional Portal"
  });

  return (
    <div className="pt-24 space-y-12 pb-20">
      {/* Header Banner */}
      <div className="bg-[#FDFCFB] border-b border-stone-200/80 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal & Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Privacy <span className="font-serif italic text-amber-900 font-normal">Policy</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Effective Date: August 2026 | Last Updated: August 2026
          </p>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-stone-800 text-sm leading-relaxed">
        
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-stone-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-800" />
              <span>1. Introduction & Commitment</span>
            </h2>
            <p className="text-stone-600">
              At <strong>Vishal Jogdeo Sangeet</strong> ("we", "our", or "us"), accessible via our official web portal, we respect your privacy and are committed to protecting personal information shared through event booking inquiries, newsletter subscriptions, or audio streaming services.
            </p>
          </section>

          <hr className="border-stone-100" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-stone-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-800" />
              <span>2. Information We Collect</span>
            </h2>
            <p className="text-stone-600">
              We collect minimal information necessary to deliver high-quality devotional music and event scheduling:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600">
              <li><strong>Contact Information:</strong> Name, phone number, email address, and event venue location provided voluntarily through the Event Booking Form or Contact Form.</li>
              <li><strong>Technical Data:</strong> Standard browser user-agent, device type, and anonymous aggregate page view metrics used to optimize streaming performance.</li>
              <li><strong>User Preferences:</strong> Audio volume settings, preferred lyrics font size, and selected devotional categories stored locally on your device.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-800" />
              <span>3. How We Use Your Information</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Concert & Event Scheduling</span>
                </div>
                <p className="text-xs text-stone-500">To coordinate performance logistics, venue requirements, and confirm booking inquiries.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Updates & Show Alerts</span>
                </div>
                <p className="text-xs text-stone-500">To send notifications about upcoming Abhanga Sandhya concerts and new song releases if requested.</p>
              </div>
            </div>
          </section>

          <hr className="border-stone-100" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-stone-900">4. Third-Party Links & Media Services</h2>
            <p className="text-stone-600">
              Our website provides direct links to external platforms including YouTube, Spotify, Apple Music, and Instagram. Please note that clicking these links subjects you to the external provider's independent privacy policies.
            </p>
          </section>

          <hr className="border-stone-100" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-stone-900">5. Contact Our Management Team</h2>
            <p className="text-stone-600">
              If you have any questions or data requests regarding this Privacy Policy, please contact our official team at:
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 font-medium space-y-1">
              <p><strong>Vishal Jogdeo Official Management</strong></p>
              <p>Email: contact@vishaljogdev.com | Phone: +91 98220 12345</p>
              <p>Address: Shivajinagar, Pune, Maharashtra 411005, India</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
