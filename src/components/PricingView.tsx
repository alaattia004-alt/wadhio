import React, { useState } from 'react';
import { CreditCard, Check, Sparkles, Building2, ShieldCheck, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { PRICING_PLANS, PAY_PER_SERVICE } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface PricingViewProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenPaymentHub?: (planId?: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  language,
  onOpenBooking,
  onOpenPaymentHub,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [selectedPlanModal, setSelectedPlanModal] = useState<any>(null);
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  const handleSubscribePlan = (plan: any) => {
    if (onOpenPaymentHub) {
      onOpenPaymentHub(plan.id);
      return;
    }
    setSelectedPlanModal(plan);
    setSubscribedMessage(false);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribedMessage(true);
    setTimeout(() => {
      setSelectedPlanModal(null);
      setSubscribedMessage(false);
    }, 2500);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <span>{isAr ? 'نموذج اقتصادي مستدام ومرن' : 'Modèle Économique & Tarification Transparente'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-legal-serif">
          {t.pricing.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {t.pricing.subtitle}
        </p>
      </div>

      {/* Subscription Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const name = isAr ? plan.nameAr : plan.nameFr;
          const target = isAr ? plan.targetAr : plan.targetFr;
          const price = isAr ? plan.priceAr : plan.priceFr;
          const cadence = isAr ? plan.cadenceAr : plan.cadenceFr;
          const features = isAr ? plan.featuresAr : plan.featuresFr;
          const cta = isAr ? plan.ctaAr : plan.ctaFr;

          return (
            <div
              key={plan.id}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-slate-900 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/40 relative'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full">
                  {isAr ? 'الأكثر اختياراً للمحترفين' : 'RECOMMANDÉ'}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white font-legal-serif">{name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{target}</p>
                </div>

                <div className="border-y border-slate-800/80 py-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {price}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">{cadence}</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSubscribePlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pay-Per-Service Showcase */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-legal-serif">
              {t.pricing.payPerServiceTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'ادفع فقط عند الحاجة دون إلزام باشتراك شهري، مع تقارير قانونية معتمدة.'
                : 'Facturation à l\'acte sans engagement pour des besoins ponctuels ciblés.'}
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono">ON-DEMAND ACCESS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAY_PER_SERVICE.map((srv) => (
            <div
              key={srv.id}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="text-sm font-bold text-white font-legal-serif mb-1">
                  {isAr ? srv.titleAr : srv.titleFr}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr ? srv.descAr : srv.descFr}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {isAr ? srv.priceAr : srv.priceFr}
                </span>
                <button
                  onClick={() => handleSubscribePlan(srv)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition-colors"
                >
                  {isAr ? 'طلب الخدمة' : 'Commander'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B2B / Institutional Partnerships Callout */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Building2 className="w-4 h-4" />
            <span>{isAr ? 'الشراكات المؤسسية والتكوينية' : 'Partenariats Institutionnels & Universités'}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white font-legal-serif">
            {isAr
              ? 'حلول موجهة لغرف التجارة، الجامعات، ومكاتب الاستشارات الكبرى'
              : 'Solutions pour Chambres de Commerce, Facultés de Droit et Grands Comptes'}
          </h4>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            {t.pricing.b2bEnterpriseBanner}
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shrink-0"
        >
          {isAr ? 'تواصل مع قسم الشراكات' : 'Contacter l\'Équipe Entreprise'}
        </button>
      </div>

      {/* Subscription Action Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-legal-serif">
                {isAr ? 'تأكيد الاشتراك / الطلب' : 'Confirmation d\'adhésion'}
              </h3>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {subscribedMessage ? (
              <div className="p-6 text-center space-y-3">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">
                  {isAr ? 'تم تفعيل الطلب بنجاح!' : 'Votre demande a été enregistrée avec succès !'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isAr ? 'تم إرسال تفاصيل الفاتورة وبوابة الدفع إلى بريدك الإلكتروني.' : 'Les détails d\'activation et la facture ont été envoyés par e-mail.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubscription} className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">{isAr ? 'الخدمة / الباقة:' : 'Formule choisie :'}</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {isAr ? (selectedPlanModal.nameAr || selectedPlanModal.titleAr) : (selectedPlanModal.nameFr || selectedPlanModal.titleFr)}
                  </span>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {isAr ? 'البريد الإلكتروني للفوترة:' : 'Adresse e-mail professionnelle :'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    {isAr ? 'طريقة الدفع المفضلة:' : 'Mode de paiement préféré :'}
                  </label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500">
                    <option>{isAr ? 'البطاقة الذهبية / CIB / Edahabia' : 'Carte Bancaire / CIB / Edahabia'}</option>
                    <option>{isAr ? 'بطاقة بنكية دولية (Visa / MasterCard)' : 'Carte Internationale (Visa / MasterCard)'}</option>
                    <option>{isAr ? 'تحويل بنكي رسمي للمؤسسات' : 'Virement bancaire professionnel'}</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    {t.common.close}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    {isAr ? 'تأكيد ومتابعة' : 'Confirmer'}
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
