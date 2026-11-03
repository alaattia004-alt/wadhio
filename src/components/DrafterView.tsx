import React, { useState } from 'react';
import { PenTool, FileCode2, Copy, Check, Sparkles, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n/translations';

interface DrafterViewProps {
  language: Language;
}

export const DrafterView: React.FC<DrafterViewProps> = ({
  language,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [mode, setMode] = useState<'legislative' | 'plain_content'>('legislative');
  const [objective, setObjective] = useState(
    isAr
      ? 'صياغة مشروع مادة قانونية لتنظيم العمل عن بعد وحماية حق الموظف في قطع الاتصال الرقمي خارج أوقات العمل الرسمية.'
      : 'Projet d\'article de loi encadrant le télétravail et instaurant un droit effectif à la déconnexion numérique en dehors des heures de service.'
  );
  const [parameters, setParameters] = useState(
    isAr
      ? 'استخدام أسلوب الصياغة التشريعية المعتمد، إدراج جزاءات مالية تدريجية في حال المخالفة، ووضع مذكرة أسباب موجبة.'
      : 'Formulation impérative selon la légistique moderne, gradation des astreintes et exposé des motifs circonstancié.'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const presets = [
    {
      title: isAr ? 'حق قطع الاتصال الرقمي (العمل عن بعد)' : 'Droit à la déconnexion (Télétravail)',
      obj: isAr
        ? 'صياغة مشروع مادة قانونية تنظم حق الأجير في عدم الرد على المكالمات والرسائل المهنية بعد انقضاء ساعات العمل التعاقدية.'
        : 'Projet de disposition garantissant l\'inviolabilité du repos du salarié et son droit de ne pas répondre aux sollicitations numériques hors temps de travail.',
      param: isAr ? 'تحديد نطاق الاستثناءات في حالات الطوارئ القصوى مع إقرار بدل مالي، وبيان الأسباب الموجبة.' : 'Définition des cas d\'urgence justifiés avec astreinte compensée, exposé des motifs.'
    },
    {
      title: isAr ? 'حماية بيانات المستهلك في التجارة الإلكترونية' : 'Protection des données e-commerce',
      obj: isAr
        ? 'صياغة بند قانوني ملزم للمتاجر الإلكترونية يمنع بيع أو مشاركة بيانات المتسوقين دون موافقة كتابية صريحة قابلة للإلغاء.'
        : 'Clause normative contraignante interdisant la cession des profils d\'acheteurs en ligne sans consentement explicite et révocable.',
      param: isAr ? 'تضمين عقوبات صارمة وإلزام التاجر بإنشاء بوابة حذف فوري للبيانات.' : 'Sanctions pécuniaires et obligation de plateforme de suppression instantanée des données.'
    }
  ];

  const handleGenerateDraft = async () => {
    if (!objective.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/legal/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          objective,
          parameters,
          targetLanguage: language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate draft');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Drafting error:', err);
      setError(err.message || 'Drafting error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.draftedBody) return;
    navigator.clipboard.writeText(result.draftedBody);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
          <span>{isAr ? 'الصياغة التشريعية والتواصل القانوني' : 'Légistique et Vulgarisation Juridique'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'صياغة مقترحات مواد وبنود احترافية' : 'Confection Normative & Clauses Pratiques'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif mb-2">
          {t.drafter.title}
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          {t.drafter.subtitle}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setMode('legislative')}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            mode === 'legislative'
              ? 'bg-slate-800 text-white shadow-sm border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode2 className="w-4 h-4 text-emerald-400" />
          <span>{t.drafter.modeLegislative}</span>
        </button>

        <button
          onClick={() => setMode('plain_content')}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            mode === 'plain_content'
              ? 'bg-slate-800 text-white shadow-sm border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4 text-emerald-400" />
          <span>{t.drafter.modePublic}</span>
        </button>
      </div>

      {/* Draft Setup Form */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="shrink-0">{t.common.sample}:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setObjective(p.obj);
                setParameters(p.param);
              }}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 shrink-0 transition-colors"
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Objective */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            {t.drafter.objectiveLabel}
          </label>
          <textarea
            rows={3}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder={t.drafter.objectivePlaceholder}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/60 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Parameters */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            {t.drafter.paramsLabel}
          </label>
          <input
            type="text"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            placeholder={t.drafter.paramsPlaceholder}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {isAr
              ? 'تعتمد الصياغة على الأصول التشريعية الصارمة وقواعد الصياغة التداولية الحديثة.'
              : 'Rédaction selon les règles strictes de légistique et de codification moderne.'}
          </span>
          <button
            onClick={handleGenerateDraft}
            disabled={loading || !objective.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? t.common.loading : t.drafter.generateBtn}</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/50 flex items-center gap-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 animate-pulse">
          <div className="h-6 w-1/3 bg-slate-800 rounded"></div>
          <div className="h-28 bg-slate-800/60 rounded-xl"></div>
          <div className="h-20 bg-slate-800/40 rounded-xl"></div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                {mode === 'legislative' ? (isAr ? 'مشروع نص تشريعي مقترح' : 'Proposition de Texte Normatif') : (isAr ? 'محتوى توعوي مبسط' : 'Fiche de Vulgarisation')}
              </span>
              <h3 className="text-xl font-bold text-white font-legal-serif">
                {result.title}
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copiedDraft ? (
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

          {/* Drafted Body */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-emerald-400 block">
              {t.drafter.resultDraft}
            </span>
            <div className="text-sm text-slate-100 font-legal-serif whitespace-pre-line leading-relaxed">
              {result.draftedBody}
            </div>
          </div>

          {/* Explanatory Memorandum */}
          {result.explanatoryMemorandum && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{t.drafter.resultMemo}</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-legal-serif">
                {result.explanatoryMemorandum}
              </p>
            </div>
          )}

          {/* Checklist & Regulatory Controls */}
          {result.checklistOrControls && result.checklistOrControls.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>{t.drafter.resultControls}</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {result.checklistOrControls.map((ctl: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono text-[11px] shrink-0">✓</span>
                    <span className="leading-relaxed">{ctl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
