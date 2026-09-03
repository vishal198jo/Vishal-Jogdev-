import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Instagram, Facebook, Youtube, Phone } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { db, COLLECTIONS, isFirestoreAvailable } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SpotifyIcon } from './SpotifyIcon';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.name.trim().slice(0, 100);
    // Ensure 10 digits
    const trimmedPhone = formData.phone.trim().replace(/\D/g, '').slice(0, 10);
    const trimmedCity = formData.city.trim().slice(0, 100);
    const trimmedMessage = formData.message.trim().slice(0, 500);

    if (trimmedName.length < 2) {
      alert('Please enter your full name.');
      return;
    }
    if (trimmedPhone.length !== 10) {
      alert('Please enter a valid 10-digit contact number.');
      return;
    }
    if (trimmedCity.length < 2) {
      alert('Please enter your location.');
      return;
    }
    if (trimmedMessage.length < 2 || trimmedMessage.length > 500) {
      alert('Message must be between 2 and 500 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Prepare clean data payload for Admin Panel (Firestore)
      const inquiryPayload = {
        name: trimmedName,
        phone: trimmedPhone,
        email: 'direct-contact-inquiry@vishaljogdeo.com',
        city: trimmedCity,
        eventType: 'Website Contact Page Inquiry',
        eventDate: '',
        budgetRange: '',
        message: trimmedMessage,
        notes: trimmedMessage,
        createdAt: new Date().toISOString(),
        status: 'new'
      };

      // Save directly to Admin Panel database (Firestore inquiries collection)
      if (isFirestoreAvailable && db) {
        try {
          await addDoc(collection(db, COLLECTIONS.INQUIRIES), inquiryPayload);
        } catch (dbErr) {
          console.warn('Could not save contact inquiry to database:', dbErr);
        }
      }

      // 2. Prepare beautifully formatted WhatsApp message with Emojis & Official Website Link
      const whatsappText = [
        `🚩 *जय श्रीकृष्ण! नवीन बुकिंग / चौकशी संदेश* 🚩`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `👤 *Name:* ${trimmedName}`,
        `📍 *Location:* ${trimmedCity}`,
        `📞 *Contact Number:* ${trimmedPhone}`,
        `💬 *Message:*`,
        `${trimmedMessage}`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `🌐 *Official Website:* https://vishaljogdeo.com`,
        `🙏 *Vishal Jogdeo Management Desk*`
      ].join('\n');
      
      const whatsappUrl = `https://wa.me/917038086864?text=${encodeURIComponent(whatsappText)}`;

      // 3. Open WhatsApp in new tab or app smoothly
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 500);

      setSubmitted(true);
      setFormData({ name: '', phone: '', city: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry to Firestore:', error);
      
      // Fallback: Open WhatsApp directly so inquiry is never missed
      const fallbackText = [
        `🚩 *नवीन बुकिंग / चौकशी संदेश* 🚩`,
        `👤 *Name:* ${trimmedName}`,
        `📍 *Location:* ${trimmedCity}`,
        `📞 *Contact:* ${trimmedPhone}`,
        `💬 *Message:* ${trimmedMessage}`,
        `🌐 https://vishaljogdeo.com`
      ].join('\n');
      
      const fallbackUrl = `https://wa.me/917038086864?text=${encodeURIComponent(fallbackText)}`;
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-[#0b0b0e] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 border-b border-stone-800 pb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>भजनसंध्या व शो बुकिंग - थेट संपर्क</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Contact & Book <span className="font-serif italic text-gold-gradient font-normal">Vishal Jogdeo</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            लाईव्ह शो, महानुभाव पंथीय भजनसंध्या व स्टुडिओ रेकॉर्डिंगसाठी खालील फॉर्म भरून थेट संपर्क साधा.
          </p>
        </motion.div>

        {/* 1. SUBSE PAHLE: INQUIRY FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-[#121218] p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="p-8 text-center space-y-4 my-4 animate-in zoom-in duration-300">
              <div className="w-14 h-14 mx-auto bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">Inquiry Sent Successfully!</h3>
              <p className="text-stone-300 text-sm sm:text-base font-sans max-w-md mx-auto leading-relaxed">
                आपली चौकशी यशस्वीरित्या पाठवली गेली आहे. विशाल जोगदेव यांची मॅनेजमेंट टीम लवकरच आपल्याशी संपर्क साधेल.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 shadow-md transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Form Title & Description as requested */}
              <div className="border-b border-stone-800 pb-4 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-wide">
                  Send Booking & Inquiry Message to Vishal Jogdeo
                </h3>
                <p className="text-xs text-stone-300 font-sans mt-1">
                  तुमची माहिती भरा आणि तुमचा Booking किंवा Inquiry संदेश थेट Vishal Jogdeo यांच्यापर्यंत पाठवा.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Contact Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city / location"
                  className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Message *
                  </label>
                  <span className={`text-[11px] font-mono ${formData.message.length > 450 ? 'text-amber-400' : 'text-stone-400'}`}>
                    {formData.message.length}/500 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 500) })}
                  placeholder="Enter your booking details or inquiry message (max 500 characters)..."
                  className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-gradient text-black font-extrabold text-sm rounded-full hover:opacity-95 disabled:opacity-50 shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-black animate-pulse" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Now'}</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* 2. FIR: BHAJAN SANDHYA & SHOW BOOKING SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#121218] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-stone-800 pb-4 mb-6 gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                <span className="text-amber-400">🚩</span> भजनसंध्या व शो बुकिंग सर्व्हिसेस
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                खालीलपैकी कोणत्याही सेवा आणि कार्यक्रमांसाठी थेट संपर्क करा
              </p>
            </div>
            <a 
              href="https://wa.me/917038086864?text=नमस्कार,%20मला%20भजनसंध्या%20आणि%20शो%20बुकिंगबद्दल%20माहिती%20हवी%20आहे."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Direct Message</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-stone-200 text-xs sm:text-sm">
            {/* Point 1 */}
            <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-xs shrink-0">१</span>
                  <h4>भजन रेकॉर्डिंग (विशाल जोगदेव यांच्या आवाजात)</h4>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  तुम्हाला अशा प्रकारचे तुमचे कुठले भजन विशाल जोगदेव यांच्या आवाजात रेकॉर्ड करायचे असल्यास तुम्ही खालील नंबरवर थेट संपर्क करू शकता.
                </p>
              </div>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20विशाल%20जोगदेव%20यांच्या%20आवाजात%20भजन%20रेकॉर्डिंगबद्दल%20संपर्क%20करायचा%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-2"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>रेकॉर्डिंगसाठी WhatsApp करा</span>
              </a>
            </div>

            {/* Point 2 */}
            <div className="bg-stone-900/80 border border-amber-500/30 p-5 rounded-2xl space-y-3 hover:border-amber-400 transition-colors relative flex flex-col justify-between">
              <span className="absolute -top-2.5 right-4 bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full">
                Popular
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-900 border border-amber-400 flex items-center justify-center text-xs text-amber-300 shrink-0">२</span>
                  <h4>महानुभाव पंथीय भजनसंध्या (लाइव्ह शो व कार्यक्रम)</h4>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  महानुभाव पंथीय भजनसंध्या हेतू संपर्क.. विशाल जोगदेव यांचा सुमधुर आवाज सोबतच असंख्य नयनरम्य झाक्या व नामवंत कलाकारांचा एक मात्र महानुभाव पंथीय संच.
                </p>
              </div>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20महानुभाव%20पंथीय%20भजनसंध्या%20लाइव्ह%20शो%20बुकिंगबद्दल%20माहिती%20हवी%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-2"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>लाइव्ह शोसाठी WhatsApp करा</span>
              </a>
            </div>

            {/* Point 3 */}
            <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-xs shrink-0">३</span>
                  <h4>देवी जागरण व धार्मिक कार्यक्रम</h4>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  भव्य देवी जागरण, गोंधळ, तुळजापूर व कोल्हापूर आई भवानी जागरण, अखंड नामसप्ताह आणि कौटुंबिक धार्मिक उत्सवांसाठी सुमधुर भजनांच्या कार्यक्रमाकरिता संपर्क करा.
                </p>
              </div>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20देवी%20जागरण%20व%20धार्मिक%20कार्यक्रमासाठी%20संपर्क%20करायचा%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-2"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>जागरण कार्यक्रमासाठी WhatsApp करा</span>
              </a>
            </div>

            {/* Point 4 */}
            <div className="bg-stone-900/80 border border-rose-500/30 p-5 rounded-2xl space-y-3 hover:border-rose-400 transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm">
                  <span className="w-6 h-6 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center text-xs text-rose-300 shrink-0">४</span>
                  <h4>लग्नसोहळा सुगम संगीत</h4>
                </div>
                <p className="text-amber-300 text-[11px] font-semibold italic">
                  🎶 विशाल जोगदेव यांच्या आवाजाची सुरेल मैफल 🎶
                </p>
                <p className="text-stone-300 text-xs leading-relaxed">
                  आपल्या लग्नसोहळ्यासाठी विशाल जोगदेव यांचा मधुर आवाज आणि सुगम संगीताचा खास कार्यक्रम बुक करा.
                </p>
              </div>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20लग्नसोहळा%20सुगम%20संगीत%20कार्यक्रमाच्या%20बुकिंगबद्दल%20माहिती%20हवी%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-2"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>लग्नसोहळा संगीतासाठी WhatsApp करा</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* 3. USKE NICHE: E-MAIL, WHATSAPP, PHONE & SOCIAL MEDIA PLATFORMS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#121218] p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300 pb-8 border-b border-stone-800">
            
            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors">
              <div className="w-11 h-11 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Official Email</p>
                <a href={`mailto:${SINGER_PROFILE.contact.email}`} className="text-white font-bold text-sm hover:text-amber-300 transition-colors break-all">
                  {SINGER_PROFILE.contact.email}
                </a>
              </div>
            </div>

            {/* Helpline / WhatsApp */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <a 
                href="https://wa.me/917038086864" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-stone-900 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition-colors shrink-0"
              >
                <WhatsAppIcon className="w-6 h-6 text-emerald-400" />
              </a>
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Management & WhatsApp</p>
                <a 
                  href="https://wa.me/917038086864" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white font-bold text-sm hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  {SINGER_PROFILE.contact.phone}
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Studio / Office Address */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors">
              <div className="w-11 h-11 bg-stone-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Studio & Office Address</p>
                <p className="text-white font-bold text-sm font-sans">
                  {SINGER_PROFILE.contact.officeAddress}
                </p>
              </div>
            </div>

          </div>

          {/* Social Media Platform Icons Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
            <div>
              <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <span>Follow & Connect on Official Social Media</span>
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                विशाल जोगदेव यांच्या अधिकृत सोशल मीडिया प्लॅटफॉर्म्सवर नवीन भजने व लाईव्ह अपडेट्ससाठी कनेक्ट व्हा:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/917038086864" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 text-xs font-bold shadow-md"
                title="WhatsApp Direct Contact"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* YouTube */}
              <a 
                href={SINGER_PROFILE.contact.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 hover:text-white hover:bg-red-600 transition-all duration-300 text-xs font-bold shadow-md"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </a>

              {/* Instagram */}
              <a 
                href={SINGER_PROFILE.contact.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-pink-400 hover:text-white hover:bg-pink-600 transition-all duration-300 text-xs font-bold shadow-md"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              {/* Facebook */}
              <a 
                href={SINGER_PROFILE.contact.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-blue-400 hover:text-white hover:bg-blue-600 transition-all duration-300 text-xs font-bold shadow-md"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              {/* Spotify */}
              <a 
                href={SINGER_PROFILE.contact.socials.spotify} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 text-xs font-bold shadow-md"
                title="Spotify Artist Profile"
              >
                <SpotifyIcon className="w-4 h-4" />
                <span>Spotify</span>
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
