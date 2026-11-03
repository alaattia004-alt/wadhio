import React from 'react';
import { LayoutGrid, BookOpen, Sparkles, CreditCard, BookmarkCheck, Bell } from 'lucide-react';
import { Language } from '../i18n/translations';

interface BottomAppDockProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  onOpenPaymentHub: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  savedCount: number;
}

export const BottomAppDock: React.FC<BottomAppDockProps> = ({
  currentTab,
  onTabChange,
  language,
  onOpenPaymentHub,
  onOpenNotifications,
  unreadCount,
  savedCount,
}) => {
  const isAr = language === 'ar';

  const dockItems = [
    {
      id: 'dashboard',
      label: isAr ? 'الرئيسية' : 'Accueil',
      icon: LayoutGrid,
      action: () => onTabChange('dashboard'),
    },
    {
      id: 'library',
      label: isAr ? 'المكتبة' : 'Codes',
      icon: BookOpen,
      action: () => onTabChange('library'),
    },
    {
      id: 'simplifier',
      label: isAr ? 'المفسر' : 'Simplificateur',
      icon: Sparkles,
      action: () => onTabChange('simplifier'),
    },
    {
      id: 'payments',
      label: isAr ? 'دفع المعاملات' : 'Paiements',
      icon: CreditCard,
      action: onOpenPaymentHub,
      highlight: true,
    },
    {
      id: 'saved',
      label: isAr ? 'محفوظاتي' : 'Mes Textes',
      icon: BookmarkCheck,
      badge: savedCount > 0 ? savedCount : undefined,
      action: () => onTabChange('saved'),
    },
    {
      id: 'notifications',
      label: isAr ? 'التنبيهات' : 'Alertes',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      action: onOpenNotifications,
    },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl p-1.5 flex items-center gap-1 sm:gap-2 max-w-lg w-full justify-around ring-1 ring-slate-800">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const isHighlight = item.highlight;

          if (isHighlight) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all group relative shrink-0 -translate-y-1"
                title={item.label}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-950/40 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 font-bold" />
                </div>
                <span className="text-[10px] font-bold text-amber-300 mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative shrink-0 ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
              title={item.label}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -end-2 w-3.5 h-3.5 bg-emerald-400 text-slate-950 rounded-full font-mono text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
