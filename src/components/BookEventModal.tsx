import React, { useState } from 'react';
import { X, Calendar, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Show } from '../types';
import { SINGER_PROFILE } from '../data/mockData';

interface BookEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedShow?: Show | null;
}

export const BookEventModal: React.FC<BookEventModalProps> = ({
  isOpen,
  onClose,
  preselectedShow
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: preselectedShow ? `Ticket / Pass Inquiry for ${preselectedShow.title}` : 'Temple Bhajan / Kirtan Sandhya',
    eventDate: preselectedShow ? preselectedShow.date : '',
    city: preselectedShow ? preselectedShow.city : '',
    budgetRange: 'Standard Festival Package',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121218] border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-stone-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 border-b border-stone-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 text-[10px] font-bold border border-amber-500/30">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Event Booking</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-white">
            Book <span className="font-serif italic text-gold-gradient font-normal">Vishal Jogdeo</span>
          </h3>
          <p className="text-xs text-stone-300 font-sans">
            Submit your event details or concert inquiry to receive an official proposal.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4 my-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-heading">Booking Request Submitted!</h4>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              We have received your event inquiry for {formData.eventType}. Our team will review availability and connect with you via phone or WhatsApp.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-semibold text-stone-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 Mobile"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email ID"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-300 mb-1">Proposed Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">City / Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Event City"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-300 mb-1">Inquiry Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Temple Bhajan / Kirtan Sandhya">Temple Bhajan / Kirtan Sandhya</option>
                <option value="Abhanga Sandhya Concert">Abhanga Sandhya Concert</option>
                <option value="Private Family Puja / Sangeet">Private Family Puja / Sangeet</option>
                <option value="International Tour Presentation">International Tour Presentation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-300 mb-1">Additional Notes</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention expected audience size, venue type..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gold-gradient hover:opacity-95 text-black font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit Event Inquiry</span>
              </button>

              <a
                href={SINGER_PROFILE.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
