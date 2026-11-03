import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, Award, Star, CheckCircle, ArrowRight, ArrowLeft, X, Download } from 'lucide-react';
import { LEGAL_COURSES, LegalCourse } from '../data/legalData';
import { Language, UI_STRINGS } from '../i18n/translations';

interface AcademyViewProps {
  language: Language;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  language,
}) => {
  const t = UI_STRINGS[language];
  const isAr = language === 'ar';

  const [selectedCourse, setSelectedCourse] = useState<LegalCourse | null>(null);
  const [activeQuizCourse, setActiveQuizCourse] = useState<LegalCourse | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [studentName, setStudentName] = useState(isAr ? 'محمد العيداني' : 'Mohammed El Idani');

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const handleSelectQuizOption = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleStartQuiz = (course: LegalCourse) => {
    setActiveQuizCourse(course);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowCertificate(false);
  };

  const calculateScore = () => {
    if (!activeQuizCourse) return 0;
    let correct = 0;
    activeQuizCourse.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / activeQuizCourse.quiz.length) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Academy Banner with Visual Media */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>{isAr ? 'أكاديمية بينة للتكوين والتدريب' : 'Académie Juridique et Formations'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'شهادات إتمام واختبارات تفاعلية' : 'Certificats et Évaluations'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif">
            {t.academy.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            {t.academy.subtitle}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1 font-mono">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>4.9 / 5 تقييم المشاركين</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>+920 متدرب معتمد</span>
          </div>
        </div>

        <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden border border-slate-800 shrink-0">
          <img
            src="/src/assets/images/legal_academy_training_1793577047807.jpg"
            alt="Legal Training Academy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEGAL_COURSES.map((course) => {
          const title = isAr ? course.titleAr : course.titleFr;
          const level = isAr ? course.levelAr : course.levelFr;
          const duration = isAr ? course.durationAr : course.durationFr;
          const price = isAr ? course.priceAr : course.priceFr;
          const instructor = isAr ? course.instructorAr : course.instructorFr;
          const desc = isAr ? course.descriptionAr : course.descriptionFr;

          return (
            <div
              key={course.id}
              className="flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-medium">{level}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{duration}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-legal-serif leading-snug">
                  {title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {desc}
                </p>

                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="font-semibold text-slate-300 block mb-0.5">
                    {isAr ? 'المؤطر:' : 'Formateur :'}
                  </span>
                  <span>{instructor}</span>
                </div>
              </div>

              {/* Course Footer Actions */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 font-mono">{price}</span>
                  <span className="text-slate-400 text-[11px]">
                    {course.studentsCount} {isAr ? 'مسجل' : 'inscrits'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
                  >
                    {isAr ? 'المحاور والمنهج' : 'Syllabus'}
                  </button>
                  <button
                    onClick={() => handleStartQuiz(course)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الاختبار والشهادة' : 'Évaluation'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-legal-serif">
                {isAr ? selectedCourse.titleAr : selectedCourse.titleFr}
              </h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-emerald-400 block">
                {t.academy.modules}:
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {(isAr ? selectedCourse.syllabusAr : selectedCourse.syllabusFr).map((mod, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const c = selectedCourse;
                  setSelectedCourse(null);
                  handleStartQuiz(c);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                {t.academy.takeQuiz}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quiz & Certification Flow */}
      {activeQuizCourse && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                {t.academy.quizTitle}
              </span>
              <h3 className="text-lg font-bold text-white font-legal-serif">
                {isAr ? activeQuizCourse.titleAr : activeQuizCourse.titleFr}
              </h3>
            </div>
            <button
              onClick={() => setActiveQuizCourse(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              {t.common.close}
            </button>
          </div>

          {/* Quiz Questions */}
          <div className="space-y-6">
            {activeQuizCourse.quiz.map((q, qIdx) => {
              const question = isAr ? q.questionAr : q.questionFr;
              const options = isAr ? q.optionsAr : q.optionsFr;
              const isAnswered = selectedAnswers[qIdx] !== undefined;
              const isCorrect = isAnswered && selectedAnswers[qIdx] === q.correctIndex;

              return (
                <div key={qIdx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-emerald-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      Q{qIdx + 1}
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed font-legal-serif">
                      {question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      let optionStyle = 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850';
                      if (quizSubmitted) {
                        if (oIdx === q.correctIndex) {
                          optionStyle = 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50';
                        } else if (isSelected) {
                          optionStyle = 'bg-red-950/40 text-red-300 border-red-500/50';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                          className={`w-full text-start p-3 text-xs rounded-lg border transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && oIdx === q.correctIndex && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {quizSubmitted && (
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-emerald-400 block mb-0.5">
                        {isAr ? 'التأصيل القانوني للحل:' : 'Fondement juridique :'}
                      </span>
                      {isAr ? q.explanationAr : q.explanationFr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < activeQuizCourse.quiz.length}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors"
              >
                {isAr ? 'اعتماد النتيجة والتصحيح' : 'Valider et corriger'}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300">{t.academy.score}</span>
                  <span className="font-mono text-base font-bold text-emerald-400">
                    {calculateScore()}%
                  </span>
                  <span className="text-xs text-slate-400">
                    {calculateScore() >= 70 ? t.academy.passMessage : t.academy.failMessage}
                  </span>
                </div>

                {calculateScore() >= 70 && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all"
                  >
                    <Award className="w-4 h-4" />
                    <span>{t.academy.downloadCertificate}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generated Certificate Modal */}
      {showCertificate && activeQuizCourse && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-2xl w-full p-8 text-center space-y-6 relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 end-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Border Decor */}
            <div className="border border-emerald-500/20 rounded-2xl p-6 sm:p-10 space-y-4 bg-gradient-to-b from-slate-950 to-slate-900">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>

              <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                {isAr ? 'أكاديمية wadhio للدراسات والتدريب القانوني' : 'ACADÉMIE WADHIO DE FORMATION JURIDIQUE'}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-serif">
                {isAr ? 'شهادة إتمام وتفوق مهني' : 'Certificat d\'Accomplissement Professionnel'}
              </h2>

              <p className="text-xs text-slate-400">
                {isAr ? 'تشهد الأكاديمية بأن المتدرب(ة):' : 'Ce document atteste que :'}
              </p>

              <div className="text-xl font-bold text-emerald-300 font-legal-serif border-b border-emerald-500/30 pb-2 max-w-xs mx-auto">
                {studentName}
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? `قد أتم بنجاح متطلبات الدورة التكوينية: "${activeQuizCourse.titleAr}" واستوفى كافة المعايير المنهجية والتطبيقات الإجرائية.`
                  : `A validé avec succès l'ensemble des modules pratiques de la formation : "${activeQuizCourse.titleFr}".`}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-800 font-mono">
                <span>VERIFY: WADHIO-2026-CERT-982</span>
                <span>{new Date().toISOString().split('T')[0]}</span>
                <span>SIGNATURE: Agréée</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'طباعة / حفظ الشهادة كـ PDF' : 'Imprimer / Exporter en PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
