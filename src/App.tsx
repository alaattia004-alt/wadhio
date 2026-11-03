import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AppIconDashboard } from './components/AppIconDashboard';
import { BottomAppDock } from './components/BottomAppDock';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { LegalLibraryView } from './components/LegalLibraryView';
import { SavedLibraryView } from './components/SavedLibraryView';
import { SimplifierView } from './components/SimplifierView';
import { LegalAdvisorView } from './components/LegalAdvisorView';
import { DocumentAnalyzerView } from './components/DocumentAnalyzerView';
import { DrafterView } from './components/DrafterView';
import { AcademyView } from './components/AcademyView';
import { ExpertsView } from './components/ExpertsView';
import { PricingView } from './components/PricingView';
import { Footer } from './components/Footer';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { ArticleDiffModal } from './components/ArticleDiffModal';
import { Language } from './i18n/translations';
import { LegalArticle, LegalExpert, LEGAL_EXPERTS, LEGAL_ARTICLES, LegalNotification, INITIAL_NOTIFICATIONS } from './data/legalData';
import { Bell, CreditCard, Check, Scale } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedArticleForSimplifier, setSelectedArticleForSimplifier] = useState<LegalArticle | null>(null);
  const [bookingExpert, setBookingExpert] = useState<LegalExpert | null>(null);

  // Payment & Fees Gateway State
  const [paymentGatewayOpen, setPaymentGatewayOpen] = useState<boolean>(false);
  const [preselectedPlanForPayment, setPreselectedPlanForPayment] = useState<string | undefined>(undefined);

  // Saved Articles & Notifications State
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(['art-lab-12', 'art-con-15']);
  const [notifications, setNotifications] = useState<LegalNotification[]>(INITIAL_NOTIFICATIONS);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState<boolean>(false);
  const [selectedDiffNotification, setSelectedDiffNotification] = useState<LegalNotification | null>(null);
  const [toastAlert, setToastAlert] = useState<{ title: string; summary: string } | null>(null);

  // Sync document language and text direction dynamically (RTL for Arabic, LTR for French)
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleSelectArticleForSimplifier = (article: LegalArticle) => {
    setSelectedArticleForSimplifier(article);
    setCurrentTab('simplifier');
  };

  const handleOpenGeneralBooking = () => {
    setBookingExpert(LEGAL_EXPERTS[0]);
    setCurrentTab('experts');
  };

  const handleOpenPaymentGateway = (planId?: string) => {
    setPreselectedPlanForPayment(planId);
    setPaymentGatewayOpen(true);
  };

  // Toggle Save / Unsave Article in Personal Library
  const handleToggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) => {
      if (prev.includes(articleId)) {
        return prev.filter((id) => id !== articleId);
      } else {
        const updated = [...prev, articleId];
        const art = LEGAL_ARTICLES.find((a) => a.id === articleId);
        const name = art ? (language === 'ar' ? art.titleAr : art.titleFr) : '';
        setToastAlert({
          title: language === 'ar' ? 'تمت إضافة المادة إلى مكتبتك' : 'Article ajouté à votre bibliothèque',
          summary: language === 'ar' ? `تم تفعيل الرصد الآلي للجريدة الرسمية لمادة: ${name}` : `Veille active activée pour : ${name}`,
        });
        setTimeout(() => setToastAlert(null), 3500);
        return updated;
      }
    });
  };

  const handleRemoveFromSaved = (articleId: string) => {
    setSavedArticleIds((prev) => prev.filter((id) => id !== articleId));
  };

  // Notifications Management
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simulate an official legislative amendment notification on a saved article
  const handleSimulateAmendment = () => {
    const targetArticle = LEGAL_ARTICLES.find((a) => savedArticleIds.includes(a.id)) || LEGAL_ARTICLES[0];
    const newId = `notif-sim-${Date.now()}`;

    const newNotif: LegalNotification = {
      id: newId,
      articleId: targetArticle.id,
      articleNumber: targetArticle.articleNumber,
      codeNameAr: targetArticle.codeNameAr,
      codeNameFr: targetArticle.codeNameFr,
      type: 'amendment',
      titleAr: `تعديل تشريعي بالجريدة الرسمية رقم 28: إعادة صياغة أحكام ${targetArticle.articleNumber}`,
      titleFr: `Publication J.O. N° 28: Nouvelle rédaction de l'${targetArticle.articleNumber}`,
      summaryAr: `صدر تعديل تشريعي رسمي بالجريدة الرسمية يحدد شروطاً جديدة وإجراءات ملزمة تطبيقاً للسياسات التشريعية لعام 2026.`,
      summaryFr: `Amendement substantiel modifiant les conditions d'application et les délais légaux de l'article conformément aux textes 2026.`,
      gazetteRefAr: 'الجريدة الرسمية رقم 28 لسنة 2026 - ص. 18',
      gazetteRefFr: 'Journal Officiel N° 28 de 2026 - p. 18',
      effectiveDate: '2026-04-01',
      oldTextAr: targetArticle.originalTextAr,
      oldTextFr: targetArticle.originalTextFr,
      newTextAr: `${targetArticle.originalTextAr} (معدلة ومتممة: تسري هذه الأحكام بصفة آمرة، مع مضاعفة الجزاءات الإجرائية عند المخالفة).`,
      newTextFr: `${targetArticle.originalTextFr} (Dispositions d'ordre public complétées: délais impératifs réduits de moitié en cas de récidive).`,
      keyChangesAr: [
        'تعديل الصياغة لتصبح من النظام العام الملزم للأطراف',
        'تشديد الجزاءات عند الإخلال بالالتزام المذكور في المادة'
      ],
      keyChangesFr: [
        'Consécration du caractère d\'ordre public impératif',
        'Renforcement des astreintes et sanctions en cas d\'inexécution'
      ],
      read: false,
      createdAt: language === 'ar' ? 'الآن' : 'à l\'instant',
    };

    setNotifications((prev) => [newNotif, ...prev]);

    setToastAlert({
      title: language === 'ar' ? 'تنبيه تشريعي جديد!' : 'Nouvel Amendement Législatif !',
      summary: language === 'ar' ? newNotif.titleAr : newNotif.titleFr,
    });
    setTimeout(() => setToastAlert(null), 4500);
  };

  const handleExplainWithAI = (text: string) => {
    const tempArticle: LegalArticle = {
      id: 'amended-custom',
      codeNameAr: 'نص معدل بالجريدة الرسمية',
      codeNameFr: 'Texte Amendé au J.O.',
      articleNumber: 'نص معدل حديثاً',
      titleAr: 'المادة بعد التعديل التشريعي الأخير',
      titleFr: 'Article après récent amendement',
      category: 'civil',
      jurisdiction: 'UNIFIED',
      officialSourceAr: 'الجريدة الرسمية المحدثة',
      officialSourceFr: 'Journal Officiel Actualisé',
      gazetteRef: 'J.O. 2026',
      originalTextAr: text,
      originalTextFr: text,
      summaryAr: 'النص المحدث بموجب التعديل التشريعي الأخير.',
      summaryFr: 'Version actualisée selon le récent amendement.',
      targetLevelExamples: {
        citizenAr: '',
        citizenFr: '',
        studentAr: '',
        studentFr: '',
        practitionerAr: '',
        practitionerFr: '',
      },
    };
    setSelectedArticleForSimplifier(tempArticle);
    setCurrentTab('simplifier');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300 pb-20">
      {/* Top Header with Notification Bell, Saved Library, and Dedicated Payment Button */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
        onOpenBooking={handleOpenGeneralBooking}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setNotificationCenterOpen(true)}
        savedArticlesCount={savedArticleIds.length}
        onOpenPaymentHub={() => handleOpenPaymentGateway()}
      />

      {/* Floating Real-Time Toast Notification */}
      {toastAlert && (
        <div className="fixed bottom-20 start-6 z-50 max-w-sm w-full bg-slate-900 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{toastAlert.title}</span>
              <button
                onClick={() => setToastAlert(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {toastAlert.summary}
            </p>
            <button
              onClick={() => {
                setToastAlert(null);
                setNotificationCenterOpen(true);
              }}
              className="text-[11px] text-emerald-400 font-semibold hover:underline block pt-1"
            >
              {language === 'ar' ? 'عرض التنبيه الآن ←' : 'Consulter l\'alerte →'}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <AppIconDashboard
            language={language}
            onNavigateToTab={setCurrentTab}
            onOpenPaymentHub={() => handleOpenPaymentGateway()}
            onOpenNotifications={() => setNotificationCenterOpen(true)}
            savedCount={savedArticleIds.length}
            unreadCount={unreadCount}
          />
        )}

        {currentTab === 'library' && (
          <LegalLibraryView
            language={language}
            onSelectArticleForSimplifier={handleSelectArticleForSimplifier}
            onNavigateToTab={setCurrentTab}
            savedArticleIds={savedArticleIds}
            onToggleSaveArticle={handleToggleSaveArticle}
          />
        )}

        {currentTab === 'saved' && (
          <SavedLibraryView
            savedArticleIds={savedArticleIds}
            notifications={notifications}
            language={language}
            onRemoveFromSaved={handleRemoveFromSaved}
            onSelectArticleForSimplifier={handleSelectArticleForSimplifier}
            onSelectDiff={(notif) => setSelectedDiffNotification(notif)}
            onOpenNotifications={() => setNotificationCenterOpen(true)}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'simplifier' && (
          <SimplifierView
            language={language}
            preselectedArticle={selectedArticleForSimplifier}
          />
        )}

        {currentTab === 'advisor' && (
          <LegalAdvisorView
            language={language}
            onOpenBooking={handleOpenGeneralBooking}
          />
        )}

        {currentTab === 'analyzer' && (
          <DocumentAnalyzerView
            language={language}
          />
        )}

        {currentTab === 'drafter' && (
          <DrafterView
            language={language}
          />
        )}

        {currentTab === 'academy' && (
          <AcademyView
            language={language}
          />
        )}

        {currentTab === 'experts' && (
          <ExpertsView
            language={language}
            bookingExpert={bookingExpert}
            onSelectExpertForBooking={setBookingExpert}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingView
            language={language}
            onOpenBooking={handleOpenGeneralBooking}
            onOpenPaymentHub={(planId) => handleOpenPaymentGateway(planId)}
          />
        )}
      </main>

      {/* Bottom Iconic App Dock */}
      <BottomAppDock
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        onOpenPaymentHub={() => handleOpenPaymentGateway()}
        onOpenNotifications={() => setNotificationCenterOpen(true)}
        unreadCount={unreadCount}
        savedCount={savedArticleIds.length}
      />

      {/* Payment & Fees Gateway Modal */}
      {paymentGatewayOpen && (
        <PaymentGatewayModal
          language={language}
          onClose={() => setPaymentGatewayOpen(false)}
          preselectedPlanId={preselectedPlanForPayment}
        />
      )}

      {/* Notifications Drawer / Modal */}
      {notificationCenterOpen && (
        <NotificationCenterModal
          notifications={notifications}
          language={language}
          onClose={() => setNotificationCenterOpen(false)}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDeleteNotification={handleDeleteNotification}
          onSelectDiff={(notif) => {
            setSelectedDiffNotification(notif);
          }}
          onExplainWithAI={handleExplainWithAI}
          onSimulateAmendment={handleSimulateAmendment}
        />
      )}

      {/* Article Diff & Comparison Modal */}
      {selectedDiffNotification && (
        <ArticleDiffModal
          notification={selectedDiffNotification}
          language={language}
          onClose={() => setSelectedDiffNotification(null)}
          onExplainWithAI={handleExplainWithAI}
        />
      )}

      {/* Footer */}
      <Footer
        language={language}
        onNavigateToTab={setCurrentTab}
      />
    </div>
  );
}
