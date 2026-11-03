import React, { useState } from 'react';
import { FileText, Languages, Sparkles, AlertTriangle, Clock, CheckCircle2, Copy, Check, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface DocumentAnalyzerViewProps {
  language: Language;
}

export const DocumentAnalyzerView: React.FC<DocumentAnalyzerViewProps> = ({
  language,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'audit' | 'translate'>('audit');

  // Audit state
  const [docText, setDocText] = useState(SAMPLE_CONTRACTS[0].content);
  const [docType, setDocType] = useState('commercial_lease');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [auditError, setAuditError] = useState<string | null>(null);

  // Translation state
  const [transSourceText, setTransSourceText] = useState(
    isAr
      ? 'يلتزم الطرف الثاني بدفع غرامة تأخيرية تعادل 5% عن كل يوم تأخير في تسليم المشروع، مع بقاء حق الطرف الأول في تفعيل الشرط الفاسخ الصريح ومصادرة خطاب الضمان البنكي دون حاجة إلى إعذار رسمي.'
      : 'Toute inexécution partielle ou totale des obligations contractuelles ouvre droit à indemnisation intégrale et permet la mise en jeu immédiate de la clause résolutoire sans mise en demeure préalable.'
  );
  const [transSourceLang, setTransSourceLang] = useState<'ar' | 'fr'>('ar');
  const [transTargetLang, setTransTargetLang] = useState<'ar' | 'fr'>('fr');
  const [transLoading, setTransLoading] = useState(false);
  const [transResult, setTransResult] = useState<any>(null);
  const [transError, setTransError] = useState<string | null>(null);
  const [copiedTrans, setCopiedTrans] = useState(false);

  const handleAudit = async (customDoc?: string) => {
    const text = (customDoc !== undefined ? customDoc : docText).trim();
    if (!text) return;

    setAuditLoading(true);
    setAuditError(null);

    try {
      const response = await fetch('/api/legal/analyze-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: text,
          docType,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to audit document');
      }

      const data = await response.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error('Audit error:', err);
      setAuditError(err.message || 'Audit error');
    } finally {
      setAuditLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!transSourceText.trim()) return;

    setTransLoading(true);
    setTransError(null);

    try {
      const response = await fetch('/api/legal/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transSourceText,
          sourceLang: transSourceLang,
          targetLang: transTargetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to translate legal text');
      }

      const data = await response.json();
      setTransResult(data);
    } catch (err: any) {
      console.error('Translation error:', err);
      setTransError(err.message || 'Translation error');
    } finally {
      setTransLoading(false);
    }
  };

  const handleSwitchTranslateDirection = () => {
    const newSource = transTargetLang;
    const newTarget = transSourceLang;
    setTransSourceLang(newSource);
    setTransTargetLang(newTarget);
    if (transResult?.translatedText) {
      setTransSourceText(transResult.translatedText);
      setTransResult(null);
    }
  };

  const handleCopyTranslation = () => {
    if (!transResult?.translatedText) return;
    navigator.clipboard.writeText(transResult.translatedText);
    setCopiedTrans(true);
    setTimeout(() => setCopiedTrans(false), 2000);
  };

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      {/* Header with Visual Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>{isAr ? 'مختبر التدقيق والترجمة المعتمدة' : 'Laboratoire d\'Audit et Traduction'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'كشف البنود المجحفة والثغرات' : 'Détection des Clauses Abusives'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif">
            {t.docAnalyzer.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t.docAnalyzer.subtitle}
          </p>
        </div>

        <div className="w-full md:w-56 h-32 rounded-xl overflow-hidden border border-slate-800 shrink-0">
          <img
            src="/src/assets/images/legal_document_analysis_1793577047802.jpg"
            alt="Legal Document Analysis"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Tab Switcher (Functional Segmented Button Control) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'audit'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>{t.docAnalyzer.tabDoc}</span>
        </button>

        <button
          onClick={() => setActiveTab('translate')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'translate'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Languages className="w-4 h-4 text-emerald-400" />
          <span>{t.docAnalyzer.tabTranslate}</span>
        </button>
      </div>

      {/* TAB 1: CONTRACT AUDIT */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-300">
                {t.docAnalyzer.docInputLabel}
              </span>

              {/* Sample Presets */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{t.common.sample}:</span>
                {SAMPLE_CONTRACTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setDocText(sample.content);
                      handleAudit(sample.content);
                    }}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
                  >
                    {isAr ? sample.nameAr : sample.nameFr}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={6}
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              placeholder={t.docAnalyzer.docInputPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed font-legal-serif"
            />

            <div className="flex items-center justify-between gap-4 pt-1">
              <span className="text-xs text-slate-400">
                {isAr
                  ? 'يقوم المدقق بفحص الشروط الجزائية، فسخ العقد التلقائي، وتوازن الالتزامات.'
                  : 'L\'audit analyse les clauses résolutoires, délais de forclusion et déséquilibres contractuels.'}
              </span>
              <button
                onClick={() => handleAudit()}
                disabled={auditLoading || !docText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{auditLoading ? t.common.loading : t.common.submit}</span>
              </button>
            </div>
          </div>

          {/* Audit Loading */}
          {auditLoading && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4 animate-pulse">
              <div className="h-5 w-44 bg-slate-800 rounded"></div>
              <div className="h-4 w-full bg-slate-800/60 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-28 bg-slate-800/40 rounded-xl"></div>
                <div className="h-28 bg-slate-800/40 rounded-xl"></div>
              </div>
            </div>
          )}

          {/* Audit Results */}
          {auditResult && !auditLoading && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold block mb-1">
                    {t.docAnalyzer.detectedType}
                  </span>
                  <h3 className="text-xl font-bold text-white font-legal-serif">
                    {auditResult.documentTypeDetected}
                  </h3>
                </div>
                {auditResult.mainObject && (
                  <span className="text-xs text-slate-400 max-w-sm text-end">
                    {auditResult.mainObject}
                  </span>
                )}
              </div>

              {/* Critical Clauses Grid */}
              {auditResult.criticalClauses && auditResult.criticalClauses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300">
                    {t.docAnalyzer.criticalClauses}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {auditResult.criticalClauses.map((clause: any, idx: number) => {
                      const isHigh = clause.riskLevel === 'high';
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border ${
                            isHigh
                              ? 'bg-red-950/20 border-red-800/40'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white">
                              {clause.clauseTitle}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                isHigh
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {clause.riskLevel?.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {clause.analysis}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Deadlines & Abusive Terms (Two Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Deadlines */}
                {auditResult.deadlinesAndDates && auditResult.deadlinesAndDates.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{t.docAnalyzer.deadlines}</span>
                    </h4>
                    <div className="space-y-2 text-xs">
                      {auditResult.deadlinesAndDates.map((dl: any, idx: number) => (
                        <div key={idx} className="border-b border-slate-800/80 pb-2 last:border-0">
                          <span className="font-semibold text-white block">{dl.timeline}</span>
                          <span className="text-slate-400">{dl.consequence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Abusive Terms */}
                {auditResult.abusiveOrRiskyPoints && auditResult.abusiveOrRiskyPoints.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{t.docAnalyzer.abusiveTerms}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {auditResult.abusiveOrRiskyPoints.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400">·</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              {auditResult.actionableRecommendations && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.docAnalyzer.recommendations}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {auditResult.actionableRecommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono text-[11px] shrink-0">✓</span>
                        <span className="leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SPECIALIZED LEGAL TRANSLATION (ARABIC <-> FRENCH) */}
      {activeTab === 'translate' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            {/* Translation direction header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white">
                  {transSourceLang === 'ar' ? t.common.arabic : t.common.french}
                </span>
                <button
                  onClick={handleSwitchTranslateDirection}
                  className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-emerald-400 font-mono transition-colors"
                  title="Inverser les langues / تبديل الاتجاه"
                >
                  ⇄
                </button>
                <span className="text-xs font-semibold text-emerald-400">
                  {transTargetLang === 'ar' ? t.common.arabic : t.common.french}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {isAr ? 'ترجمة قانونية تحافظ على التكييف' : 'Traduction jurilinguistique certifiée'}
              </span>
            </div>

            {/* Dual Column Editor / Input */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Source Input */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">{t.docAnalyzer.translateSource}</span>
                <textarea
                  rows={6}
                  value={transSourceText}
                  onChange={(e) => setTransSourceText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed font-legal-serif"
                />
              </div>

              {/* Target Result Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{t.docAnalyzer.translateResult}</span>
                  {transResult?.translatedText && (
                    <button
                      onClick={handleCopyTranslation}
                      className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      {copiedTrans ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.common.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.common.copy}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="min-h-[148px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 leading-relaxed font-legal-serif">
                  {transLoading ? (
                    <div className="flex items-center justify-center h-28 text-xs text-slate-500 animate-pulse">
                      {t.common.loading}
                    </div>
                  ) : transResult?.translatedText ? (
                    transResult.translatedText
                  ) : (
                    <span className="text-slate-600 text-xs italic">
                      {isAr ? 'ستظهر الترجمة القانونية الدقيقة هنا مع المصطلحات المكافئة...' : 'La traduction juridique spécialisée s\'affichera ici...'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Translate Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleTranslate}
                disabled={transLoading || !transSourceText.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{transLoading ? t.common.loading : (isAr ? 'ترجمة النص القانوني' : 'Traduire le texte juridique')}</span>
              </button>
            </div>
          </div>

          {/* Terminology Matching Glossary */}
          {transResult?.terminologyMatches && transResult.terminologyMatches.length > 0 && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-400" />
                <span>{t.docAnalyzer.terminology}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transResult.terminologyMatches.map((match: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-200">{match.sourceTerm}</span>
                      <span className="text-emerald-400 font-mono">⇄ {match.targetTerm}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {match.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
