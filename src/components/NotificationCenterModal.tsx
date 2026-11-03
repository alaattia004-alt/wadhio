import React, { useState } from 'react';
import { Bell, X, CheckCheck, Trash2, Sparkles, Scale, FileText, ArrowRight, ArrowLeft, RefreshCw, AlertCircle, Check } from 'lucide-react';
import { LegalNotification } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface NotificationCenterModalProps {
  notifications: LegalNotification[];
  language: Language;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onSelectDiff: (notification: LegalNotification) => void;
  onExplainWithAI: (text: string) => void;
  onSimulateAmendment: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  notifications,
  language,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onSelectDiff,
  onExplainWithAI,
  onSimulateAmendment,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';
  const [filter, setFilter] = useState<'all' | 'unread' | 'amendment'>('all');
  const [simulationToast, setSimulationToast] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'amendment') return n.type === 'amendment';
    return true;
  });

  const handleTriggerSimulation = () => {
    onSimulateAmendment();
    setSimulationToast(true);
    setTimeout(() => setSimulationToast(false), 3000);
  };

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-end">
      <div className="bg-slate-950 border-s border-slate-800 w-full max-w-xl h-full flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 space-y-4 shrink-0 bg-slate-900/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -end-1 w-5 h-5 bg-emerald-400 text-slate-950 rounded-full font-mono text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-legal-serif">
                  {t.notifications.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {unreadCount > 0
                    ? `${unreadCount} ${t.notifications.unreadBadge}`
                    : (isAr ? 'تمت قراءة كافة التنبيهات' : 'Toutes les alertes sont lues')}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Simulation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-xs text-slate-300">
              {isAr ? 'تجربة إشعار تعديل فوري:' : 'Tester l\'alerte en direct :'}
            </span>
            <button
              onClick={handleTriggerSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.notifications.simulateAmendment}</span>
            </button>
          </div>

          {/* Simulation Success Toast */}
          {simulationToast && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2 text-emerald-300 text-xs animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t.notifications.simulatedSuccess}</span>
            </div>
          )}

          {/* Controls: Filter Segmented Bar + Mark All Read */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.notifications.filterAll}
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filter === 'unread' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.notifications.filterUnread}
              </button>
              <button
                onClick={() => setFilter('amendment')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filter === 'amendment' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.notifications.filterAmendments}
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{t.notifications.markAllAsRead}</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <Bell className="w-12 h-12 text-slate-700" />
              <h4 className="text-sm font-semibold text-slate-300">
                {t.notifications.emptyTitle}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                {t.notifications.emptySubtitle}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const code = isAr ? notif.codeNameAr : notif.codeNameFr;
              const title = isAr ? notif.titleAr : notif.titleFr;
              const summary = isAr ? notif.summaryAr : notif.summaryFr;
              const gazette = isAr ? notif.gazetteRefAr : notif.gazetteRefFr;
              const typeLabel = t.notifications.typeLabels[notif.type] || notif.type;

              return (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 relative ${
                    !notif.read
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Unread Indicator Bar */}
                  {!notif.read && (
                    <div className="absolute top-4 end-4 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] text-emerald-400 font-mono uppercase font-semibold">
                        {isAr ? 'جديد' : 'NOUVEAU'}
                      </span>
                    </div>
                  )}

                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400">{code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-300">{notif.articleNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[11px] text-slate-400">{notif.createdAt}</span>
                  </div>

                  {/* Title & Type */}
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 inline-block mb-1">
                      {typeLabel}
                    </span>
                    <h4 className="text-sm font-bold text-white font-legal-serif leading-snug">
                      {title}
                    </h4>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed font-legal-serif">
                    {summary}
                  </p>

                  {/* Gazette Ref */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{gazette}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onMarkAsRead(notif.id);
                          onSelectDiff(notif);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{t.notifications.viewDiff}</span>
                      </button>

                      <button
                        onClick={() => {
                          onMarkAsRead(notif.id);
                          const text = (isAr ? notif.newTextAr : notif.newTextFr) || summary;
                          onExplainWithAI(text);
                          onClose();
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
                        title={t.notifications.explainWithAI}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">{t.notifications.explainWithAI}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {!notif.read && (
                        <button
                          onClick={() => onMarkAsRead(notif.id)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                          title="تحديد كمقروء"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteNotification(notif.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                        title="حذف الإشعار"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>{t.savedLibrary.alertsActive}</span>
          <span className="font-mono text-[11px] text-emerald-400">VEILLE-ACTIVE-2026</span>
        </div>
      </div>
    </div>
  );
};
