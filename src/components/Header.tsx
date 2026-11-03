import React from 'react';
import { Scale, Globe, BookOpen, Sparkles, ShieldAlert, FileText, PenTool, GraduationCap, Users, CreditCard, Bell, BookmarkCheck, LayoutGrid, Banknote } from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n/translations';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  savedArticlesCount: number;
  onOpenPaymentHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onOpenBooking,
  unreadNotificationsCount,
  onOpenNotifications,
  savedArticlesCount,
  onOpenPaymentHub,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const navItems = [
    { id: 'dashboard', label: isAr ? 'الرئيسية' : 'Accueil', icon: LayoutGrid },
    { id: 'library', label: t.nav.search, icon: BookOpen },
    { id: 'saved', label: `${t.nav.saved} (${savedArticlesCount})`, icon: BookmarkCheck },
    { id: 'simplifier', label: t.nav.simplifier, icon: Sparkles },
    { id: 'advisor', label: t.nav.advisor, icon: ShieldAlert },
    { id: 'analyzer', label: t.nav.analyzer, icon: FileText },
    { id: 'drafter', label: t.nav.drafter, icon: PenTool },
    { id: 'academy', label: t.nav.academy, icon: GraduationCap },
    { id: 'experts', label: t.nav.experts, icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Bar Contract: 3 zones separated by gap-8 (Brand, Nav, Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand title, one line */}
          <div 
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-950/50 border border-blue-500/40 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/wadhio_logo.png"
                alt="wadhio logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans lowercase">
                wadhio
              </span>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wide">
                Clarity powered by intelligence
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links, concise, single-line */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Iconic Payment Button + Alerts + Language Switch */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Dedicated Iconic Button: Pay Transaction Fees & Subscriptions */}
            <button
              onClick={onOpenPaymentHub}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 rounded-xl transition-all shadow-md shadow-amber-950/20 whitespace-nowrap hover:scale-105"
              title={t.paymentHub.title}
            >
              <CreditCard className="w-4 h-4 font-bold" />
              <span className="hidden sm:inline">{isAr ? 'دفع المعاملات والاشتراكات' : 'Paiement Droits'}</span>
              <span className="sm:hidden font-mono text-[11px] font-extrabold">{isAr ? 'دفع' : 'Payer'}</span>
            </button>

            {/* Legislative Notifications Bell Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors"
              title={t.notifications.title}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-emerald-400" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -end-1 w-4 h-4 bg-emerald-400 text-slate-950 rounded-full font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Bilingual Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'ar' ? 'fr' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.common.languageSwitch}</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet scrollable tab bar */}
        <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto pb-2.5 pt-1 scrollbar-none border-t border-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
