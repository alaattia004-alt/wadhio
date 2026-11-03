import React, { useState } from 'react';
import { X, CreditCard, Wallet, Banknote, QrCode, Receipt, CheckCircle2, ShieldCheck, Printer, Download, Sparkles, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { PRICING_PLANS } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface PaymentGatewayModalProps {
  language: Language;
  onClose: () => void;
  preselectedPlanId?: string;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  language,
  onClose,
  preselectedPlanId,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'transactions' | 'subscriptions'>(
    preselectedPlanId ? 'subscriptions' : 'transactions'
  );

  // Selected Transaction Fee Item
  const transactionItems = t.paymentHub.transactionItems;
  const [selectedFeeId, setSelectedFeeId] = useState<string>(transactionItems[0].id);

  // Selected Subscription Plan
  const [selectedPlanIdState, setSelectedPlanIdState] = useState<string>(
    preselectedPlanId || 'pro'
  );

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'card' | 'bank'>('edahabia');
  const [payerName, setPayerName] = useState(isAr ? 'عمر بن بلقاسم' : 'Omar Benbelkacem');
  const [payerEmail, setPayerEmail] = useState('omar.legal@example.com');
  const [transactionRef, setTransactionRef] = useState('CAS-2026-ALG-742');
  const [processing, setProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const selectedFee = transactionItems.find((item) => item.id === selectedFeeId) || transactionItems[0];
  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanIdState) || PRICING_PLANS[1];

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const isSub = activeTab === 'subscriptions';
      const itemTitle = isSub
        ? (isAr ? selectedPlan.nameAr : selectedPlan.nameFr)
        : selectedFee.name;
      const amountPaid = isSub
        ? (isAr ? selectedPlan.priceAr : selectedPlan.priceFr)
        : selectedFee.amount;

      setReceiptData({
        receiptNumber: `WADHIO-TAX-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        itemTitle,
        category: isSub ? (isAr ? 'اشتراك منصة' : 'Abonnement') : selectedFee.category,
        amount: amountPaid,
        method: t.paymentHub.methods[paymentMethod],
        payerName,
        payerEmail,
        ref: transactionRef || 'N/A',
        taxStamp: isAr ? 'معفى من الرسوم الإضافية' : 'Taxe fiscale incluse',
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-blue-950/40 border border-blue-500/40 shrink-0">
              <img
                src="/wadhio_logo.png"
                alt="wadhio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white font-legal-serif lowercase">
                  wadhio
                </span>
                <span className="text-slate-400">·</span>
                <h3 className="text-base font-bold text-slate-200 font-legal-serif">
                  {t.paymentHub.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {t.paymentHub.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {receiptData ? (
          /* Official Certified Receipt View */
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-blue-500/40 shrink-0">
                    <img
                      src="/wadhio_logo.png"
                      alt="wadhio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-legal-serif">
                      {t.paymentHub.receiptTitle}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {t.paymentHub.receiptSub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.paymentHub.statusPaid}</span>
                </div>
              </div>

              {/* Receipt Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">{t.paymentHub.receiptNumber}</span>
                  <span className="font-mono font-bold text-emerald-400">{receiptData.receiptNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">{t.paymentHub.receiptDate}</span>
                  <span className="font-mono text-slate-200">{receiptData.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">{isAr ? 'طريقة السداد:' : 'Moyen de paiement :'}</span>
                  <span className="text-slate-200">{receiptData.method}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block mb-0.5">{isAr ? 'البيان / نوع المعاملة:' : 'Désignation de l\'acte :'}</span>
                  <span className="font-bold text-white text-sm">{receiptData.itemTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">{isAr ? 'رقم ملف المعاملة:' : 'Réf dossier :'}</span>
                  <span className="font-mono text-slate-200">{receiptData.ref}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">
                    {isAr ? 'المبلغ الإجمالي المسدد:' : 'Montant total acquitté :'}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">
                    {receiptData.taxStamp}
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white font-mono">
                  {receiptData.amount}
                </div>
              </div>

              {/* QR Verification Seal */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0">
                    <QrCode className="w-full h-full text-slate-950" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300 block">
                      {isAr ? 'الختم الإلكتروني المعتمد' : 'Sceau Électronique Certifié'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      SHA256: 9f8a32b...c81e2b
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 text-center sm:text-end">
                  {isAr ? 'تم إرسال نسخة طبق الأصل إلى بريدك الإلكتروني.' : 'Un exemplaire certifié a été transmis par courriel.'}
                </span>
              </div>
            </div>

            {/* Actions for Receipt */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setReceiptData(null)}
                className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {isAr ? 'إجراء عملية دفع أخرى' : 'Autre paiement'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.paymentHub.printReceipt}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Selection & Checkout Flow */
          <form onSubmit={handleProcessPayment} className="space-y-6">
            {/* Tab Selector (Segmented control) */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('transactions')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'transactions'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Banknote className="w-4 h-4 text-amber-400" />
                <span>{t.paymentHub.tabTransactions}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('subscriptions')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'subscriptions'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>{t.paymentHub.tabSubscriptions}</span>
              </button>
            </div>

            {/* TAB 1: Transaction Fee Selector */}
            {activeTab === 'transactions' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t.paymentHub.selectFeeType}
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pe-1">
                  {transactionItems.map((item) => {
                    const isSelected = selectedFeeId === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedFeeId(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-slate-800/90 border-emerald-500/50 shadow-sm'
                            : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-legal-serif">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              · {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                        <div className="text-end shrink-0">
                          <span className="font-mono text-sm font-bold text-emerald-400 block">
                            {item.amount}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Subscriptions Selector */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  {isAr ? 'اختر باقة الاشتراك المناسبة:' : 'Sélectionnez la formule d\'abonnement :'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRICING_PLANS.filter((p) => p.id !== 'free').map((p) => {
                    const isSelected = selectedPlanIdState === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlanIdState(p.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                          isSelected
                            ? 'bg-slate-800/90 border-emerald-500/60 ring-1 ring-emerald-500/30'
                            : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-legal-serif">
                            {isAr ? p.nameAr : p.nameFr}
                          </span>
                          {p.popular && (
                            <span className="text-[9px] uppercase px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-semibold">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-mono font-bold text-emerald-400">
                          {isAr ? p.priceAr : p.priceFr}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                          {isAr ? p.targetAr : p.targetFr}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payer and Reference Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {t.paymentHub.payerName}
                </label>
                <input
                  type="text"
                  required
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {t.paymentHub.payerEmail}
                </label>
                <input
                  type="email"
                  required
                  value={payerEmail}
                  onChange={(e) => setPayerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  {t.paymentHub.transactionRef}
                </label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="ex: CAS-2026-981"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Payment Method Selector (Iconic Cards) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.paymentHub.paymentMethodLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('edahabia')}
                  className={`p-3 rounded-xl border text-start transition-all flex items-center gap-3 ${
                    paymentMethod === 'edahabia'
                      ? 'bg-amber-500/15 border-amber-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{isAr ? 'البطاقة الذهبية / CIB' : 'CIB / Edahabia'}</span>
                    <span className="text-[10px] text-slate-400">{isAr ? 'دفع فوري محلي' : 'Paiement instantané'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-start transition-all flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{isAr ? 'فيزا / ماستركارد' : 'Visa / Mastercard'}</span>
                    <span className="text-[10px] text-slate-400">{isAr ? 'بطاقة دولية' : 'Carte bancaire'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border text-start transition-all flex items-center gap-3 ${
                    paymentMethod === 'bank'
                      ? 'bg-blue-500/15 border-blue-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{isAr ? 'تحويل بنكي رسمي' : 'Virement Bancaire'}</span>
                    <span className="text-[10px] text-slate-400">{isAr ? 'للشركات والمكاتب' : 'Entreprises & B2B'}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Total and Checkout CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">{t.paymentHub.amountToPay}</span>
                <span className="text-2xl font-extrabold text-white font-mono">
                  {activeTab === 'subscriptions'
                    ? (isAr ? selectedPlan.priceAr : selectedPlan.priceFr)
                    : selectedFee.amount}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-950/50 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {processing ? t.common.loading : t.paymentHub.payNowBtn}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
