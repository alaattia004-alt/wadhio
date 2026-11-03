import React, { useState } from 'react';
import { ShieldAlert, Send, AlertTriangle, CheckCircle2, Clock, Scale, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n/translations';

interface LegalAdvisorViewProps {
  language: Language;
  onOpenBooking: () => void;
}

export const LegalAdvisorView: React.FC<LegalAdvisorViewProps> = ({
  language,
  onOpenBooking,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('labor');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const presetQueries = [
    {
      label: isAr ? 'فصل تعسفي من العمل' : 'Licenciement abusif sans préavis',
      cat: 'labor',
      text: isAr
        ? 'تم فصلي من العمل شفهياً وبشكل مفاجئ دون سابق إنذار أو توجيه استدعاء لجلسة استماع، بعد عمل متواصل لمدة ثلاث سنوات بعقد دائم، ورفض المشغل منحي مستحقاتي وشهادة العمل.'
        : 'Mon employeur m\'a notifié verbalement mon licenciement immédiat sans entretien préalable ni respect de préavis après 3 ans d\'ancienneté en CDI, en refusant de me verser mes indemnités.'
    },
    {
      label: isAr ? 'نزاع إيجاري واسترداد الضمان' : 'Bail d\'habitation et dépôt de garantie',
      cat: 'civil',
      text: isAr
        ? 'أخليت الشقة المؤجرة بعد انتهاء العقد وسلمت المفاتيح دون أي أضرار، لكن المالك يرفض إرجاع مبلغ الوديعة (الضمان) بدعوى رغبته في إعادة طلاء الجدران على حسابي الخاص.'
        : 'J\'ai restitué les clés d\'un logement loué en parfait état d\'entretien, mais le bailleur refuse de me restituer le dépôt de garantie au motif de travaux de rafraîchissement.'
    },
    {
      label: isAr ? 'عيب خفي في سلعة مشتراة' : 'Vice caché sur véhicule d\'occasion',
      cat: 'consumer',
      text: isAr
        ? 'اشتريت سيارة مستعملة من تاجر سيارات، وبعد 48 ساعة فقط تعطل المحرك تماماً وأثبت الخبير أن المحرك كان يعاني من كسر قديم تم إخفاؤه بمادة لحام مؤقتة قبل البيع.'
        : 'J\'ai acheté un véhicule d\'occasion auprès d\'un professionnel; 48 heures après la vente, le moteur a rendu l\'âme. L\'expertise prouve l\'existence d\'une avarie antérieure masquée.'
    }
  ];

  const categories = [
    { id: 'civil', label: t.common.lawCategories.civil },
    { id: 'labor', label: t.common.lawCategories.labor },
    { id: 'commercial', label: t.common.lawCategories.commercial },
    { id: 'consumer', label: t.common.lawCategories.consumer },
  ];

  const handleConsult = async (overrideText?: string, overrideCat?: string) => {
    const text = (overrideText !== undefined ? overrideText : query).trim();
    if (!text) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/legal/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          category: overrideCat || category,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve legal orientation');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Advisor error:', err);
      setError(err.message || 'Error processing consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
          <span>{isAr ? 'الاستشارة القانونية التوجيهية' : 'Orientation Juridique Préliminaire'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'تكييف وقائع وتحديد الإجراءات' : 'Qualification et Prévention des Risques'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif mb-2">
          {t.advisor.title}
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          {t.advisor.subtitle}
        </p>
      </div>

      {/* Query Form */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        {/* Category picker */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 me-2">{t.advisor.categoryLabel}</span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                category === c.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Preset Situation Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="shrink-0">{t.common.sample}:</span>
          {presetQueries.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p.text);
                setCategory(p.cat);
                handleConsult(p.text, p.cat);
              }}
              className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.advisor.inputPlaceholder}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Form Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isAr
                ? 'تحليل قانوني أولي لتحديد مركزك القانوني وخطواتك الأولى.'
                : 'Analyse préliminaire permettant d\'identifier vos droits et vos premières démarches.'}
            </span>
          </div>

          <button
            onClick={() => handleConsult()}
            disabled={loading || !query.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? t.common.loading : t.common.submit}</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/50 flex items-center gap-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 animate-pulse">
          <div className="h-6 w-1/3 bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800/60 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-800/60 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="h-28 bg-slate-800/40 rounded-xl"></div>
            <div className="h-28 bg-slate-800/40 rounded-xl"></div>
          </div>
        </div>
      )}

      {/* Consultation Result */}
      {result && !loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                {t.advisor.resultHeader}
              </span>
              <h3 className="text-xl font-bold text-white font-legal-serif">
                {result.legalCharacterization || (isAr ? 'التكييف القانوني الأولي للنزاع' : 'Qualification Juridique des Faits')}
              </h3>
            </div>
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isAr ? 'استشارة محامٍ متخصص' : 'Consulter un avocat'}</span>
            </button>
          </div>

          {/* Preliminary Assessment */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="text-xs font-semibold text-emerald-400">
              {t.advisor.assessment}
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-legal-serif">
              {result.preliminaryAssessment}
            </p>
          </div>

          {/* Relevant Legal Principles */}
          {result.relevantLegalPrinciples && result.relevantLegalPrinciples.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{t.advisor.applicableLaws}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.relevantLegalPrinciples.map((principle: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono text-[11px] shrink-0">§</span>
                    <span className="leading-relaxed">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Two Columns: Actionable Steps vs Risks & Time limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Recommended Steps */}
            {result.recommendedSteps && result.recommendedSteps.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.advisor.steps}</span>
                </h4>
                <ol className="space-y-2 text-xs text-slate-300">
                  {result.recommendedSteps.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Potential Risks & Deadlines */}
            {result.potentialRisks && result.potentialRisks.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{t.advisor.risks}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.potentialRisks.map((risk: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Official Ethical Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {result.officialDisclaimer || t.advisor.disclaimerNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
