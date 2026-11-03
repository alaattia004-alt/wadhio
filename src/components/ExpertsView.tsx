import React, { useState } from 'react';
import { Users, CheckCircle, Video, MapPin, Calendar, Star, Shield, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { LEGAL_EXPERTS, LegalExpert } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface ExpertsViewProps {
  language: Language;
  bookingExpert: LegalExpert | null;
  onSelectExpertForBooking: (expert: LegalExpert | null) => void;
}

export const ExpertsView: React.FC<ExpertsViewProps> = ({
  language,
  bookingExpert,
  onSelectExpertForBooking,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mode: 'online',
    notes: '',
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      onSelectExpertForBooking(null);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
          <span>{isAr ? 'شبكة المحامين والخبراء المعتمدين' : 'Réseau d\'Avocats & Experts Agréés'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'استشارات مباشرة ومرافعة' : 'Consultations Directes et Représentation'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif mb-2">
          {t.experts.title}
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          {t.experts.subtitle}
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEGAL_EXPERTS.map((expert) => {
          const name = isAr ? expert.nameAr : expert.nameFr;
          const title = isAr ? expert.titleAr : expert.titleFr;
          const specialty = isAr ? expert.specialtyAr : expert.specialtyFr;
          const city = isAr ? expert.cityAr : expert.cityFr;
          const fee = isAr ? expert.consultationFeeAr : expert.consultationFeeFr;

          return (
            <div
              key={expert.id}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 hover:bg-slate-900/90 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Header row with avatar badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-700 flex items-center justify-center font-bold text-white text-base font-legal-serif shrink-0">
                      {name.charAt(isAr ? 3 : 0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white font-legal-serif">
                          {name}
                        </h3>
                        {expert.verified && (
                          <span title={isAr ? 'عضوية معتمدة ومحققة' : 'Identité et inscription vérifiées'}>
                            <Shield className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-snug mt-0.5">
                        {title}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{expert.rating}</span>
                  </div>
                </div>

                {/* Specialty Box */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400 block mb-0.5">
                    {isAr ? 'التخصص الدقيق:' : 'Spécialité :'}
                  </span>
                  <span>{specialty}</span>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{city}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{expert.experienceYears} {isAr ? 'سنة خبرة' : 'ans d\'expérience'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{expert.languages.join(' / ')}</span>
                </div>
              </div>

              {/* Action and Fee */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">
                    {isAr ? 'أتعاب الاستشارة:' : 'Tarif indicatif :'}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">{fee}</span>
                </div>

                <button
                  onClick={() => onSelectExpertForBooking(expert)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.common.bookConsultation}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {bookingExpert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-legal-serif">
                  {t.experts.bookModalTitle}
                </h3>
                <span className="text-xs text-emerald-400">
                  {isAr ? bookingExpert.nameAr : bookingExpert.nameFr}
                </span>
              </div>
              <button
                onClick={() => onSelectExpertForBooking(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-legal-serif">
                  {t.experts.bookingSuccess}
                </h4>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {t.experts.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'مثال: أحمد عبد الله' : 'ex: Ahmed Abdallah'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      {t.experts.yourPhone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+213 / +212..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      {t.experts.yourEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {t.experts.preferredMode}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: 'online' })}
                      className={`p-2.5 rounded-lg border text-start transition-all ${
                        formData.mode === 'online'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Video className="w-4 h-4 mb-1" />
                      <span className="font-semibold block">{t.experts.onlineVideo}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: 'office' })}
                      className={`p-2.5 rounded-lg border text-start transition-all ${
                        formData.mode === 'office'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <MapPin className="w-4 h-4 mb-1" />
                      <span className="font-semibold block">{t.experts.officeVisit}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {t.experts.notes}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={isAr ? 'وصف موجز لموضوع الاستشارة...' : 'Bref résumé des faits...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectExpertForBooking(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    {t.common.close}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    {t.experts.confirmBooking}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
