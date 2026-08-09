import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { SINGER_PROFILE } from '../data/mockData';
import { db, COLLECTIONS } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, COLLECTIONS.INQUIRIES), {
        name: formData.name,
        email: '', // Not required as per request, keep empty string to match admin expectations safely
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
        eventType: 'Website Contact Page Inquiry',
        createdAt: new Date().toISOString(),
        status: 'new'
      });
      setSubmitted(true);
      setFormData({ name: '', phone: '', city: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Error submitting inquiry. Please try again or contact via WhatsApp/Call.');
    } finally {
      setIsSubmitting(false);
    }
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
          className="text-center max-w-3xl mx-auto mb-10 space-y-3 border-b border-stone-800 pb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>भजनसंध्या व शो बुकिंग - थेट संपर्क</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Get in <span className="font-serif italic text-gold-gradient font-normal">Touch</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            लाइव्ह शो, महानुभाव पंथीय भजनसंध्या व स्टुडिओ रेकॉर्डिंगसाठी खालील माहितीनुसार थेट संपर्क साधा.
          </p>
        </motion.div>

        {/* POINT-TO-POINT BOOKING SERVICES HIGHLIGHT BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 bg-[#121218] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Direct Message</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-200 text-xs sm:text-sm">
            {/* Point 1 */}
            <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-xs">१</span>
                <h4>भजन रेकॉर्डिंग (विशाल जोगदेव यांच्या आवाजात)</h4>
              </div>
              <p className="text-stone-300 leading-relaxed">
                तुम्हाला अशा प्रकारचे तुमचे कुठले भजन विशाल जोगदेव यांच्या आवाजात रेकॉर्ड करायचे असल्यास तुम्ही खालील नंबरवर थेट संपर्क करू शकता.
              </p>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20विशाल%20जोगदेव%20यांच्या%20आवाजात%20भजन%20रेकॉर्डिंगबद्दल%20संपर्क%20करायचा%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>रेकॉर्डिंगसाठी WhatsApp करा</span>
              </a>
            </div>

            {/* Point 2 */}
            <div className="bg-stone-900/80 border border-amber-500/30 p-5 rounded-2xl space-y-3 hover:border-amber-400 transition-colors relative">
              <span className="absolute -top-2.5 right-4 bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full">
                Popular
              </span>
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-900 border border-amber-400 flex items-center justify-center text-xs text-amber-300">२</span>
                <h4>महानुभाव पंथीय भजनसंध्या (लाइव्ह शो व कार्यक्रम)</h4>
              </div>
              <p className="text-stone-300 leading-relaxed">
                महानुभाव पंथीय भजनसंध्या हेतू संपर्क.. विशाल जोगदेव यांचा सुमधुर आवाज सोबतच असंख्य नयनरम्य झाक्या व नामवंत कलाकारांचा एक मात्र महानुभाव पंथीय संच.
              </p>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20महानुभाव%20पंथीय%20भजनसंध्या%20लाइव्ह%20शो%20बुकिंगबद्दल%20माहिती%20हवी%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>लाइव्ह शोसाठी WhatsApp करा</span>
              </a>
            </div>

            {/* Point 3 */}
            <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-xs">३</span>
                <h4>देवी जागरण व धार्मिक कार्यक्रम</h4>
              </div>
              <p className="text-stone-300 leading-relaxed">
                भव्य देवी जागरण, गोंधळ, तुळजापूर व कोल्हापूर आई भवानी जागरण, अखंड नामसप्ताह आणि कौटुंबिक धार्मिक उत्सवांसाठी सुमधुर भजनांच्या कार्यक्रमाकरिता संपर्क करा.
              </p>
              <a 
                href="https://wa.me/917038086864?text=नमस्कार,%20मला%20देवी%20जागरण%20व%20धार्मिक%20कार्यक्रमासाठी%20संपर्क%20करायचा%20आहे."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>जागरण कार्यक्रमासाठी WhatsApp करा</span>
              </a>
            </div>
          </div>
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
                <a 
                  href="https://wa.me/917038086864" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-900 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition-colors shrink-0"
                >
                  <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                </a>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Management Helpline</p>
                  <a 
                    href="https://wa.me/917038086864" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    {SINGER_PROFILE.contact.phone}
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">WhatsApp</span>
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
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-sans">
                Social Contacts
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/917038086864" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-500 transition-all duration-300"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-pink-400 hover:text-white hover:bg-pink-500 transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={SINGER_PROFILE.contact.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-blue-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  title="Facebook"
                >
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
                
                {/* Form Title */}
                <div className="border-b border-stone-800 pb-3 mb-2">
                  <h3 className="text-lg font-bold text-white font-heading tracking-wide">
                    Send Booking & Inquiry Massage Vishal Jogdeo
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                    Please fill out the details below to reach our official booking desk.
                  </p>
                </div>

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
                      placeholder="Your Full Name (e.g. Rajesh Sharma)"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Location / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Nagpur / Mumbai"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
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
                    placeholder="e.g. +91 70380 86864"
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Booking inquiry for devotional concert (Abhanga Sandhya) in Nagpur on Nov 2026..."
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gold-gradient text-black font-extrabold text-xs rounded-full hover:opacity-95 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-black animate-pulse" />
                  <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Booking Message'}</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
