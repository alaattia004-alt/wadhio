import React from 'react';
import { Bookmark, BookmarkCheck, Bell, Sparkles, Scale, Trash2, BookOpen, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { LegalArticle, LegalNotification, LEGAL_ARTICLES } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface SavedLibraryViewProps {
  savedArticleIds: string[];
  notifications: LegalNotification[];
  language: Language;
  onRemoveFromSaved: (id: string) => void;
  onSelectArticleForSimplifier: (article: LegalArticle) => void;
  onSelectDiff: (notification: LegalNotification) => void;
  onOpenNotifications: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const SavedLibraryView: React.FC<SavedLibraryViewProps> = ({
  savedArticleIds,
  notifications,
  language,
  onRemoveFromSaved,
  onSelectArticleForSimplifier,
  onSelectDiff,
  onOpenNotifications,
  onNavigateToTab,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const savedArticles = LEGAL_ARTICLES.filter((art) => savedArticleIds.includes(art.id));

  // Find notifications corresponding to saved articles
  const getNotificationForArticle = (articleId: string) => {
    return notifications.find((n) => n.articleId === articleId);
  };

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      {/* View Header with Active Monitoring Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <BookmarkCheck className="w-4 h-4" />
              <span>{t.savedLibrary.alertsActive}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{savedArticles.length} {t.savedLibrary.savedCount}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif">
              {t.savedLibrary.title}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mt-1">
              {t.savedLibrary.subtitle}
            </p>
          </div>

          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors shrink-0 shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span>{isAr ? 'عرض مركز الإشعارات والتعديلات' : 'Ouvrir les Alertes'}</span>
          </button>
        </div>
      </div>

      {/* Saved Articles List */}
      {savedArticles.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 space-y-4">
          <Bookmark className="w-12 h-12 text-slate-700 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">
            {t.savedLibrary.emptySavedTitle}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            {t.savedLibrary.emptySavedSubtitle}
          </p>
          <button
            onClick={() => onNavigateToTab('library')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.savedLibrary.browseLibrary}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {savedArticles.map((article) => {
            const codeName = isAr ? article.codeNameAr : article.codeNameFr;
            const title = isAr ? article.titleAr : article.titleFr;
            const originalText = isAr ? article.originalTextAr : article.originalTextFr;
            const summary = isAr ? article.summaryAr : article.summaryFr;
            const notif = getNotificationForArticle(article.id);

            return (
              <div
                key={article.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-4 relative"
              >
                <div className="space-y-3">
                  {/* Metadata and Saved Badge */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-emerald-400">{codeName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-300">{article.articleNumber}</span>
                    </div>

                    <button
                      onClick={() => onRemoveFromSaved(article.id)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                      title={t.savedLibrary.removeFromLibrary}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.savedLibrary.removeFromLibrary}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white font-legal-serif">
                    {title}
                  </h3>

                  {/* Legal Text */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-legal-serif italic">
                    "{originalText}"
                  </div>

                  {/* Plain Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-200">
                      {isAr ? 'الخلاصة: ' : 'Synthèse : '}
                    </span>
                    {summary}
                  </p>

                  {/* Amendment Alert Banner if Notification Exists! */}
                  {notif && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                          <Bell className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                          <span>
                            {isAr
                              ? 'تنبيه: صدر تعديل رسمي لهذه المادة بالجريدة الرسمية!'
                              : 'Alerte: Un amendement officiel a été publié pour cet article !'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {isAr ? notif.gazetteRefAr : notif.gazetteRefFr}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {isAr ? notif.summaryAr : notif.summaryFr}
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={() => onSelectDiff(notif)}
                          className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{t.notifications.viewDiff}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{isAr ? 'قيد المراقبة الآلية' : 'Veille active'}</span>
                  </span>

                  <button
                    onClick={() => onSelectArticleForSimplifier(article)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'شرح المادة بالمفسر' : 'Décrypter'}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
