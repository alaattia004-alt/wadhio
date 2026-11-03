import React from 'react';
import { 
  BookOpen, 
  BookmarkCheck, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  Languages, 
  PenTool, 
  GraduationCap, 
  Users, 
  CreditCard, 
  Bell, 
  Scale, 
  Receipt, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n/translations';

interface AppIconDashboardProps {
  language: Language;
  onNavigateToTab: (tab: string) => void;
  onOpenPaymentHub: () => void;
  onOpenNotifications: () => void;
  savedCount: number;
  unreadCount: number;
}

export const AppIconDashboard: React.FC<AppIconDashboardProps> = ({
  language,
  onNavigateToTab,
  onOpenPaymentHub,
  onOpenNotifications,
  savedCount,
  unreadCount,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const appTiles = [
    {
      id: 'library',
      title: isAr ? 'المكتبة والجريدة الرسمية' : 'Codes & Journal Officiel',
      subtitle: isAr ? 'نصوص القوانين ومصادرها المعتمدة' : 'Sources législatives et décrets',
      icon: BookOpen,
      gradient: 'from-blue-600 to-indigo-700',
      badge: isAr ? 'محدث 2026' : 'À jour 2026',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      action: () => onNavigateToTab('library'),
    },
    {
      id: 'saved',
      title: isAr ? 'مكتبتي واليقظة التشريعية' : 'Mes Textes & Veille',
      subtitle: isAr ? 'المواد المحفوظة وتنبيهات التعديلات' : 'Articles suivis et alertes en direct',
      icon: BookmarkCheck,
      gradient: 'from-teal-600 to-emerald-700',
      badge: `${savedCount} ${isAr ? 'محفوظة' : 'sauvegardés'}`,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      action: () => onNavigateToTab('saved'),
    },
    {
      id: 'simplifier',
      title: isAr ? 'المفسر الذكي بالمستويات' : 'Simplificateur Multi-Niveaux',
      subtitle: isAr ? 'شرح للمواطن، الطالب، والمحامي' : 'Décryptage citoyen, étudiant et avocat',
      icon: Sparkles,
      gradient: 'from-emerald-600 to-teal-800',
      badge: isAr ? 'تحليل تداولي' : 'IA Juridique',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      action: () => onNavigateToTab('simplifier'),
    },
    {
      id: 'advisor',
      title: isAr ? 'المستشار القانوني الأولي' : 'Conseiller Préliminaire',
      subtitle: isAr ? 'تكييف النزاع، الإجراءات والمخاطر' : 'Orientation, démarches et risques',
      icon: ShieldAlert,
      gradient: 'from-sky-600 to-blue-800',
      badge: isAr ? 'استشارة فورية' : 'Orientation',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      action: () => onNavigateToTab('advisor'),
    },
    {
      id: 'payments',
      title: isAr ? 'دفع المعاملات والاشتراكات' : 'Paiement Droits & Forfaits',
      subtitle: isAr ? 'سداد رسوم العقود والقضايا والاشتراك' : 'Droits de mutation, greffe et abonnements',
      icon: CreditCard,
      gradient: 'from-amber-500 via-orange-600 to-emerald-600',
      badge: isAr ? 'وصل رسمي معتمد' : 'Paiement Sécurisé',
      badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
      action: onOpenPaymentHub,
      highlight: true,
    },
    {
      id: 'analyzer',
      title: isAr ? 'تدقيق العقود والوثائق' : 'Audit de Contrats',
      subtitle: isAr ? 'كشف الشروط المجحفة والمهل' : 'Détection des clauses léonines',
      icon: FileText,
      gradient: 'from-violet-600 to-purple-800',
      badge: isAr ? 'كشف الثغرات' : 'Audit Risque',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      action: () => onNavigateToTab('analyzer'),
    },
    {
      id: 'translate',
      title: isAr ? 'الترجمة القانونية المعتمدة' : 'Traduction Juridique',
      subtitle: isAr ? 'عربي ⇄ فرنسي بدقة المصطلحات' : 'Bilingue Arabe / Français certifiée',
      icon: Languages,
      gradient: 'from-fuchsia-600 to-pink-800',
      badge: isAr ? 'مسرد مقارن' : 'Assermentée',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      action: () => onNavigateToTab('analyzer'),
    },
    {
      id: 'drafter',
      title: isAr ? 'صائغ المواد والتشريع' : 'Studio de Légistique',
      subtitle: isAr ? 'صياغة مواد قانونية ومذكرات أسباب' : 'Rédaction normative et vulgarisation',
      icon: PenTool,
      gradient: 'from-rose-600 to-red-800',
      badge: isAr ? 'للمتخصصين' : 'Praticiens',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      action: () => onNavigateToTab('drafter'),
    },
    {
      id: 'academy',
      title: isAr ? 'أكاديمية الدورات والشهادات' : 'Académie & Formations',
      subtitle: isAr ? 'مسارات تدريبية واختبارات معتمدة' : 'Formations certifiantes et quiz',
      icon: GraduationCap,
      gradient: 'from-cyan-600 to-teal-800',
      badge: isAr ? 'شهادات رقمية' : 'Certifiante',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      action: () => onNavigateToTab('academy'),
    },
    {
      id: 'experts',
      title: isAr ? 'دليل المحامين والخبراء' : 'Annuaire des Avocats',
      subtitle: isAr ? 'حجز مواعيد استشارة حضورية أو عن بعد' : 'Consultation en cabinet ou visio',
      icon: Users,
      gradient: 'from-emerald-700 to-slate-900',
      badge: isAr ? 'محامون مرخصون' : 'Vérifiés',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      action: () => onNavigateToTab('experts'),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* App Header Showcase */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-blue-950/60 border-2 border-blue-500/50 shrink-0">
              <img
                src="/wadhio_logo.png"
                alt="wadhio logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white font-sans lowercase">
                  wadhio
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-xs font-semibold text-emerald-400 tracking-wide">
                Clarity powered by intelligence
              </p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white font-legal-serif">
            {isAr
              ? 'تطبيق تيسير الخطاب والقانون الذكي'
              : 'Application Juridique & Accès au Droit'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {isAr
              ? 'اختر أي خدمة من الأيقونات الذكية أدناه لبدء التفسير الفوري، تدقيق الوثائق، استشارة المحامين، أو سداد حقوق المعاملات والاشتراكات.'
              : 'Accédez instantanément à chaque service par son icône dédiée : décryptage, consultation, formations ou règlement des droits officiels.'}
          </p>
        </div>

        {/* Featured Iconic Action: PAY TRANSACTIONS & FEES */}
        <div 
          onClick={onOpenPaymentHub}
          className="p-5 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all shadow-xl hover:scale-105 shrink-0 flex items-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-950/40 group-hover:rotate-6 transition-transform">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold block mb-1 w-fit">
              {isAr ? 'سداد فوري ومؤمن' : 'PAIEMENT DIRECT'}
            </span>
            <h3 className="text-base font-bold text-white font-legal-serif group-hover:text-amber-300 transition-colors">
              {isAr ? 'دفع حقوق المعاملات والاشتراكات' : 'Paiement Droits & Abonnements'}
            </h3>
            <span className="text-xs text-slate-300 block">
              {isAr ? 'رسوم القضايا، العقود، والتراخيص ←' : 'Droits d\'actes, taxes & quittance →'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Iconic App Tiles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-slate-200">
            {isAr ? 'تطبيقات وخدمات المنصة (انقر على أيقونة لفتح الخدمة):' : 'Applications & Outils (Sélectionnez une icône pour ouvrir) :'}
          </span>
          <span className="font-mono text-emerald-400">10 ICONS ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {appTiles.map((tile) => {
            const Icon = tile.icon;
            const isHighlight = tile.highlight;

            return (
              <div
                key={tile.id}
                onClick={tile.action}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 group hover:-translate-y-1 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-slate-900 to-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Iconic Squircle Button */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tile.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${tile.badgeColor}`}>
                      {tile.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-sm font-bold text-white font-legal-serif group-hover:text-emerald-300 transition-colors ${
                      isHighlight ? 'text-amber-300' : ''
                    }`}>
                      {tile.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">
                      {tile.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <span className="text-[11px] font-medium">{isAr ? 'فتح التطبيق' : 'Ouvrir'}</span>
                  <div className="w-5 h-5 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center text-[10px] transition-colors">
                    {isAr ? '←' : '→'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
