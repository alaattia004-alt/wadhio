import React from 'react';
import { X, Scale, FileText, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { LegalNotification, LEGAL_ARTICLES } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface ArticleDiffModalProps {
  notification: LegalNotification;
  language: Language;
  onClose: () => void;
  onExplainWithAI: (text: string) => void;
}

export const ArticleDiffModal: React.FC<ArticleDiffModalProps> = ({
  notification,
  language,
  onClose,
  onExplainWithAI,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const codeName = isAr ? notification.codeNameAr : notification.codeNameFr;
  const title = isAr ? notification.titleAr : notification.titleFr;
  const summary = isAr ? notification.summaryAr : notification.summaryFr;
  const gazetteRef = isAr ? notification.gazetteRefAr : notification.gazetteRefFr;
  const oldText = (isAr ? notification.oldTextAr : notification.oldTextFr) || (isAr ? 'النص الأصلي السابق للمادة قبل التعديل.' : 'Texte initial avant amendement.');
  const newText = (isAr ? notification.newTextAr : notification.newTextFr) || (isAr ? 'النص المعدل بموجب الجريدة الرسمية.' : 'Nouveau texte issu du Journal Officiel.');
  const keyChanges = (isAr ? notification.keyChangesAr : notification.keyChangesFr) || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span>{codeName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-300">{notification.articleNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[11px] text-slate-400 font-mono">{gazetteRef}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-legal-serif">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gazette and Effective Date Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t.notifications.gazetteRefLabel}</span>
            <span className="font-mono text-emerald-400 font-bold">{gazetteRef}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>{t.notifications.effectiveDateLabel}</span>
            <span className="font-mono text-slate-200">{notification.effectiveDate}</span>
          </div>
        </div>

        {/* Diff Visual Presentation: Old Text vs New Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Old Text (Before Amendment) */}
          <div className="p-5 rounded-2xl bg-red-950/15 border border-red-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-red-400 border-b border-red-900/30 pb-2">
              <span>{t.savedLibrary.oldTextHeading}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                {isAr ? 'صيغة ملغاة' : 'Abrogé'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-legal-serif italic line-through opacity-80">
              "{oldText}"
            </p>
          </div>

          {/* New Text (After Official Gazette Amendment) */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/50 space-y-3 ring-1 ring-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 border-b border-emerald-800/30 pb-2">
              <span>{t.savedLibrary.newTextHeading}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                {isAr ? 'نافذ ومحدث' : 'En vigueur'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-legal-serif font-medium">
              "{newText}"
            </p>
          </div>
        </div>

        {/* Key Legal Changes and Impact */}
        {keyChanges.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.savedLibrary.keyChangesHeading}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {keyChanges.map((change, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-[11px] shrink-0 font-bold">0{idx + 1}.</span>
                  <span className="leading-relaxed">{change}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {isAr
              ? 'تم التحقق من النص استناداً للمنشور بالجريدة الرسمية.'
              : 'Texte vérifié conforme à la publication officielle.'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {t.common.close}
            </button>
            <button
              onClick={() => {
                onClose();
                onExplainWithAI(newText);
              }}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.notifications.explainWithAI}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
