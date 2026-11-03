import React, { useState, useEffect } from 'react';
import { Sparkles, User, GraduationCap, Briefcase, BookOpen, AlertCircle, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { LegalArticle, LEGAL_ARTICLES } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface SimplifierViewProps {
  language: Language;
  preselectedArticle?: LegalArticle | null;
}

export const SimplifierView: React.FC<SimplifierViewProps> = ({
  language,
  preselectedArticle,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [level, setLevel] = useState<'citizen' | 'student' | 'practitioner'>('citizen');
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // If a preselected article is provided from library
  useEffect(() => {
    if (preselectedArticle) {
      const text = isAr ? preselectedArticle.originalTextAr : preselectedArticle.originalTextFr;
      setInputText(text);
      handleSimplify(text, level);
    } else if (!inputText) {
      // Default sample
      const defaultText = isAr ? LEGAL_ARTICLES[0].originalTextAr : LEGAL_ARTICLES[0].originalTextFr;
      setInputText(defaultText);
    }
  }, [preselectedArticle, language]);

  const handleLevelChange = (newLevel: 'citizen' | 'student' | 'practitioner') => {
    setLevel(newLevel);
    if (inputText.trim()) {
      handleSimplify(inputText, newLevel);
    }
  };

  const handleSimplify = async (textToSimplify?: string, currentLevel?: string) => {
    const text = (textToSimplify !== undefined ? textToSimplify : inputText).trim();
    if (!text) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/legal/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          level: currentLevel || level,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to simplify legal text');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Simplifier error:', err);
      setError(err.message || 'Error occurred during simplification');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    const content = `${result.title || ''}\n\n${result.plainExplanation}\n\n${result.practicalImpact}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelsConfig = [
    {
      id: 'citizen',
      label: isAr ? 'المواطن العام' : 'Citoyen',
      desc: isAr ? 'لغة واضحة، بدون تعقيد، تطبيق يومي ملموس' : 'Langage clair, concret et accessible',
      icon: User,
    },
    {
      id: 'student',
      label: isAr ? 'طالب وباحث قانوني' : 'Étudiant & Chercheur',
      desc: isAr ? 'تأصيل فقهي، أركان القاعدة، وتحليل تركيبي' : 'Analyse doctrinale et qualification',
      icon: GraduationCap,
    },
    {
      id: 'practitioner',
      label: isAr ? 'محامٍ وممارس' : 'Avocat & Praticien',
      desc: isAr ? 'دفوع إجرائية، استثناءات، وعبء الإثبات القضائي' : 'Procédure, exceptions et contentieux',
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
          <span>{isAr ? 'التحليل اللغوي والتداولي الذكي' : 'Analyse Linguistique et Discursive'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'حفظ الدقة التشريعية' : 'Rigueur Juridique Préservée'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif mb-2">
          {t.simplifier.title}
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          {t.simplifier.subtitle}
        </p>
      </div>

      {/* Level Selection Switcher (Zero-pill, functional segmented button row) */}
      <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
        {levelsConfig.map((lvl) => {
          const Icon = lvl.icon;
          const isSelected = level === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => handleLevelChange(lvl.id as any)}
              className={`flex items-start gap-3 p-3 text-start rounded-lg transition-all ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-sm border border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{lvl.label}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{lvl.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Input & Quick Presets Section */}
      <div className="space-y-3">
        {/* Presets Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="shrink-0">{t.simplifier.quickSelect}</span>
          {LEGAL_ARTICLES.map((art) => (
            <button
              key={art.id}
              onClick={() => {
                const text = isAr ? art.originalTextAr : art.originalTextFr;
                setInputText(text);
                handleSimplify(text, level);
              }}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors shrink-0"
            >
              {isAr ? art.titleAr : art.titleFr}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.simplifier.inputPlaceholder}
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed font-legal-serif"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {isAr
              ? 'النموذج يحلل المبنى اللغوي، المقصد التداولي، وأثر القاعدة في الواقع المعاش.'
              : 'L\'IA dissèque la structure sémantique, la portée normative et les effets pratiques.'}
          </span>
          <button
            onClick={() => handleSimplify()}
            disabled={loading || !inputText.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
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
          <div className="h-5 w-48 bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800/60 rounded"></div>
          <div className="h-4 w-3/4 bg-slate-800/60 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="h-24 bg-slate-800/40 rounded-xl"></div>
            <div className="h-24 bg-slate-800/40 rounded-xl"></div>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
          {/* Header of Result */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                <span>{isAr ? 'نتيجة التحليل حسب:' : 'Niveau d\'analyse :'}</span>
                <span className="font-semibold">
                  {level === 'citizen' ? (isAr ? 'المواطن العام' : 'Citoyen') :
                   level === 'student' ? (isAr ? 'طالب وباحث' : 'Étudiant') :
                   (isAr ? 'المحامي والممارس' : 'Praticien')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-legal-serif">
                {result.title || t.simplifier.resultTitle}
              </h3>
            </div>
            <button
              onClick={handleCopyResult}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t.common.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.common.copy}</span>
                </>
              )}
            </button>
          </div>

          {/* Plain Explanation Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <div className="text-xs font-semibold text-emerald-400">
              {isAr ? 'الشرح اللغوي والتداولي المبسط:' : 'Explication et sens discursif :'}
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-legal-serif">
              {result.plainExplanation}
            </p>
          </div>

          {/* Practical Impact */}
          {result.practicalImpact && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{t.simplifier.practicalImpact}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 bg-slate-900/80 p-4 rounded-xl border border-slate-800/70 leading-relaxed">
                {result.practicalImpact}
              </p>
            </div>
          )}

          {/* Dual Column: Rights & Obligations vs Exceptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Rights & Obligations */}
            {result.keyObligationsAndRights && result.keyObligationsAndRights.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.simplifier.rightsAndObligations}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.keyObligationsAndRights.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono text-[11px] shrink-0">0{idx + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exceptions & Caveats */}
            {result.exceptions && result.exceptions.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>{t.simplifier.exceptions}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.exceptions.map((exc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono text-[11px] shrink-0">·</span>
                      <span className="leading-relaxed">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Specialized Glossary */}
          {result.glossary && result.glossary.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-slate-300">
                {t.simplifier.glossary}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.glossary.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">
                      {item.term}
                    </span>
                    <span className="text-xs text-slate-400 leading-relaxed block">
                      {item.definition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Guidance Note */}
          {result.officialSourceGuidance && (
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{result.officialSourceGuidance}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">LEX-CERTIFIED</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
