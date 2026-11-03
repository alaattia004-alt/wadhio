import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onNavigateToTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateToTab,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/80 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md border border-blue-500/40 shrink-0">
                <img
                  src="/wadhio_logo.png"
                  alt="wadhio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white font-sans lowercase">
                  wadhio
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  Clarity powered by intelligence
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.taglineSubtitle}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <span>{isAr ? 'موثوقية المحتوى استناداً للجرائد الرسمية' : 'Conformité aux Journaux Officiels'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'عربية وفرنسية' : 'Bilingue Arabe / Français'}</span>
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isAr ? 'الخدمات الذكية' : 'Services Intelligents'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigateToTab('library')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.search}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('simplifier')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.simplifier}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('advisor')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.advisor}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('analyzer')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.analyzer}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('drafter')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.drafter}
                </button>
              </li>
            </ul>
          </div>

          {/* Education & Network */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isAr ? 'التكوين والخبراء' : 'Académie & Réseau'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigateToTab('academy')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.academy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('experts')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.experts}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('pricing')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.pricing}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Ethical & Legal Disclaimer */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isAr
                ? 'إخلاء مسؤولية: الشروحات والاستشارات الأولية في المنصة ذات طبيعة إرشادية وتداولية، ولا تحل محل استشارة المحامي المختص.'
                : 'Avertissement: Les analyses préliminaires sont fournies à titre informatif et ne sauraient remplacer l\'assistance d\'un avocat.'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span>© {new Date().getFullYear()} wadhio</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'كافة الحقوق محفوظة' : 'Tous droits réservés'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
