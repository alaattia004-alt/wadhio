import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, ExternalLink, Sparkles, Copy, Check, ShieldCheck, Scale, ArrowRight, ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { LEGAL_ARTICLES, LegalArticle } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface LegalLibraryViewProps {
  language: Language;
  onSelectArticleForSimplifier: (article: LegalArticle) => void;
  onNavigateToTab: (tab: string) => void;
  savedArticleIds: string[];
  onToggleSaveArticle: (id: string) => void;
}

export const LegalLibraryView: React.FC<LegalLibraryViewProps> = ({
  language,
  onSelectArticleForSimplifier,
  onNavigateToTab,
  savedArticleIds,
  onToggleSaveArticle,
}) => {
  const t = UI_STRINGS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.common.lawCategories.all },
    { id: 'civil', label: t.common.lawCategories.civil },
    { id: 'labor', label: t.common.lawCategories.labor },
    { id: 'commercial', label: t.common.lawCategories.commercial },
    { id: 'consumer', label: t.common.lawCategories.consumer },
  ];

  const filteredArticles = useMemo(() => {
    return LEGAL_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesJurisdiction = selectedJurisdiction === 'ALL' || article.jurisdiction === selectedJurisdiction || article.jurisdiction === 'UNIFIED';
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory && matchesJurisdiction;

      const matchesText =
        article.titleAr.toLowerCase().includes(query) ||
        article.titleFr.toLowerCase().includes(query) ||
        article.codeNameAr.toLowerCase().includes(query) ||
        article.codeNameFr.toLowerCase().includes(query) ||
        article.articleNumber.toLowerCase().includes(query) ||
        article.originalTextAr.toLowerCase().includes(query) ||
        article.originalTextFr.toLowerCase().includes(query) ||
        article.gazetteRef.toLowerCase().includes(query);

      return matchesCategory && matchesJurisdiction && matchesText;
    });
  }, [searchQuery, selectedCategory, selectedJurisdiction]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      {/* Hero Presentation Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_legal_balance_1793577047529.jpg"
            alt="Scales of Justice"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3">
            <span>{language === 'ar' ? 'المنصة الوطنية لتيسير القانون' : 'Portail d\'Accessibilité Juridique'}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ar' ? 'نصوص رسمية معتمدة' : 'Sources Officielles Certifiées'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-legal-serif mb-4 leading-relaxed">
            {language === 'ar'
              ? 'تقريب القانون وتبسيط النصوص الرسمية لكافة أفراد المجتمع'
              : 'Démocratiser l\'accès au droit et clarifier les textes officiels'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            {language === 'ar'
              ? 'تعتمد بينة على تقنيات التحليل اللغوي والتداولي المدعومة بالذكاء الاصطناعي لفك تعقيدات الخطاب القانوني وتحويل مواده إلى شروحات مفهومة، مع الحفاظ الكامل على الدقة التشريعية والمراجع القضائية.'
              : 'Bayyina s\'appuie sur l\'analyse linguistique et l\'intelligence artificielle pour lever l\'opacité du langage juridique et restituer le sens exact des lois de manière transparente et intelligible.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('simplifier')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'تجربة المفسر الذكي بالمستويات' : 'Tester le Simplificateur Multi-Niveaux'}</span>
            </button>
            <button
              onClick={() => onNavigateToTab('advisor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm rounded-lg border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'استشارة قانونية أولية' : 'Conseil Juridique Préliminaire'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filtering Workspace */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-xl ps-10 pe-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 end-3 text-xs text-slate-400 hover:text-white"
              >
                {t.common.clear}
              </button>
            )}
          </div>

          {/* Quick jurisdiction tag filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 whitespace-nowrap">{language === 'ar' ? 'النظام المقارن:' : 'Juridiction:'}</span>
            {['ALL', 'UNIFIED', 'DZ', 'MA', 'TN', 'FR'].map((jur) => (
              <button
                key={jur}
                onClick={() => setSelectedJurisdiction(jur)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors whitespace-nowrap ${
                  selectedJurisdiction === jur
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {jur === 'ALL' ? (language === 'ar' ? 'الكل' : 'Tous') : jur}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Buttons (Functional Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/60 border border-slate-800/80 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header with Metadata Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span>{language === 'ar' ? 'النصوص والمواد الموثقة المتاحة:' : 'Articles et textes officiels disponibles :'}</span>
          <span className="font-mono tabular-nums text-emerald-400 font-semibold">{filteredArticles.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{language === 'ar' ? 'المطابقة مع الجريدة الرسمية' : 'Conformité Journal Officiel'}</span>
          <span aria-hidden="true">·</span>
          <span>{language === 'ar' ? 'محدثة لعام 2026' : 'À jour 2026'}</span>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300 mb-1">
            {language === 'ar' ? 'لا توجد مواد مطابقة للبحث' : 'Aucun article trouvé'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {language === 'ar'
              ? 'جرب البحث بكلمات أخرى أو اختر فئة قانونية مختلفة.'
              : 'Essayez d\'ajuster vos filtres de recherche ou sélectionnez une autre catégorie.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedJurisdiction('ALL');
            }}
            className="px-4 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors"
          >
            {t.common.reset}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredArticles.map((article) => {
            const isAr = language === 'ar';
            const codeName = isAr ? article.codeNameAr : article.codeNameFr;
            const title = isAr ? article.titleAr : article.titleFr;
            const originalText = isAr ? article.originalTextAr : article.originalTextFr;
            const summary = isAr ? article.summaryAr : article.summaryFr;
            const officialSource = isAr ? article.officialSourceAr : article.officialSourceFr;

            const isSaved = savedArticleIds.includes(article.id);

            return (
              <div
                key={article.id}
                className={`flex flex-col justify-between p-5 rounded-xl border transition-all group ${
                  isSaved
                    ? 'border-emerald-500/30 bg-slate-900/80'
                    : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700/80 hover:bg-slate-900/90'
                }`}
              >
                <div className="space-y-3">
                  {/* Clean unboxed metadata row */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="font-semibold text-emerald-400">{codeName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-300">{article.articleNumber}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400 shrink-0">{article.gazetteRef}</span>
                      <button
                        onClick={() => onToggleSaveArticle(article.id)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                        }`}
                        title={isSaved ? t.savedLibrary.savedArticle : t.savedLibrary.saveArticle}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-3 h-3 text-emerald-400" />
                            <span>{isAr ? 'محفوظة' : 'Sauvegardée'}</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3 h-3" />
                            <span>{isAr ? 'حفظ' : 'Sauvegarder'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-legal-serif">
                    {title}
                  </h3>

                  {/* Official Legal Text Box */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-legal-serif italic">
                    "{originalText}"
                  </div>

                  {/* Plain Language Summary */}
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-200">
                      {isAr ? 'الخلاصة الميسرة: ' : 'Sens vulgarisé : '}
                    </span>
                    {summary}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(originalText, article.id)}
                      className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 rounded transition-colors"
                      title={t.common.copy}
                    >
                      {copiedId === article.id ? (
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
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      {officialSource}
                    </span>
                  </div>

                  {/* Explain with AI Level Button */}
                  <button
                    onClick={() => onSelectArticleForSimplifier(article)}
                    className="flex items-center gap-1.5 px-3 py-1.5 font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'شرح المادة بالذكاء الاصطناعي' : 'Décrypter avec l\'IA'}</span>
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
