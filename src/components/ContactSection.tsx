import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Youtube, Instagram, Facebook } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state clear after 5s or reset form
    }, 5000);
  };

  return (
    <section id="contact" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3 border-b border-stone-800 pb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Event Inquiry & Bookings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Get in <span className="font-serif italic text-gold-gradient font-normal">Touch</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Book Vishal Jogdeo for private kirtans, temple festivals, corporate cultural evenings, or international tours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8 bg-[#121218] p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl"
          >
            <div className="space-y-6 text-xs sm:text-sm text-stone-300">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Official Email</p>
                  <a href={`mailto:${SINGER_PROFILE.contact.email}`} className="text-white font-bold hover:text-amber-300 transition-colors">
                    {SINGER_PROFILE.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Management Helpline</p>
                  <a href={`tel:${SINGER_PROFILE.contact.phone}`} className="text-white font-bold hover:text-amber-300 transition-colors">
                    {SINGER_PROFILE.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Studio & Office Address</p>
                  <p className="text-stone-300 font-sans">
                    {SINGER_PROFILE.contact.officeAddress}
                  </p>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Follow on Social Media
              </p>
              <div className="flex items-center gap-4">
                <a href={SINGER_PROFILE.contact.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-white/10 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href={SINGER_PROFILE.contact.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-pink-400 hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={SINGER_PROFILE.contact.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-blue-400 hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#121218] p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl"
          >
            {submitted ? (
              <div className="p-8 text-center space-y-4 my-4 animate-in zoom-in duration-300">
                <div className="w-12 h-12 mx-auto bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Inquiry Sent Successfully!</h3>
                <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-md mx-auto">
                  Thank you for reaching out. Vishal Jogdeo's official management team will review your details and contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Pune / Mumbai"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the occasion, estimated audience, sound setup..."
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Booking Message</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

