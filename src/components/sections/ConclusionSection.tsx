import React, { useState } from 'react';
import { Sparkles, Award, Heart, CheckCircle2, RotateCcw, Printer, Share2, BookOpen, Volume2, HelpCircle, Check, X } from 'lucide-react';
import { MOTIVATIONAL_QUOTES, SUMMARY_ACRONYM, MODULE_INFO, BUZZER_QUESTIONS } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { saveStudentSubmission } from '../../services/studentSubmissionStore';

interface ConclusionSectionProps {
  onRestart: () => void;
  studentName: string;
  studentClass?: string;
  isTeacherMode?: boolean;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onRestart, studentName, studentClass = 'Kelas VIII-A', isTeacherMode }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'sumatif'>('summary');
  const [sumatifAnswers, setSumatifAnswers] = useState<Record<number, number>>({});
  const [sumatifSubmitted, setSumatifSubmitted] = useState<boolean>(false);

  const triggerCelebration = () => {
    sound.playFanfare();
    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  };

  const handleListenSummary = () => {
    const text =
      'Selamat untuk seluruh anak-anak hebat kelas delapan atas ketekunan dan partisipasi aktifnya hari ini. Kesimpulan utama pembelajaran kita: Indonesia adalah Negara Hukum berdasarkan UUD 1945 Pasal 1 Ayat 3. Selalu ingat dan amalkan prinsip akronim H-U-K-U-M dalam keseharian: Hormati Aturan, Utamakan Keadilan, Konstitusi sebagai Pedoman Moral, Upayakan Penyelesaian Damai secara Musyawarah, dan Mulai dari Diri Sendiri. Kalian semua adalah generasi penerus bangsa dan teladan Pelajar Pancasila yang membanggakan.';
    speakText(text, undefined, 'ramah_hangat', true);
  };

  const handlePrintSummary = () => {
    sound.playClick();
    window.print();
  };

  // 10 Sumatif Questions (first 10 of BUZZER_QUESTIONS which match Lampiran 2)
  const sumatifQuestions = BUZZER_QUESTIONS.slice(0, 10);

  const handleSelectSumatifAnswer = (qId: number, optionIdx: number) => {
    if (sumatifSubmitted) return;
    sound.playClick();
    setSumatifAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateSumatifScore = () => {
    let correct = 0;
    sumatifQuestions.forEach(q => {
      if (sumatifAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / sumatifQuestions.length) * 100);
  };

  const handleSubmitSumatif = () => {
    sound.playFanfare();
    setSumatifSubmitted(true);
    triggerCelebration();

    const score = calculateSumatifScore();
    const correctCount = sumatifQuestions.filter(q => sumatifAnswers[q.id] === q.correctAnswer).length;

    saveStudentSubmission(studentName || 'Peserta Didik Aktif', studentClass, prev => ({
      ...prev,
      sumatifAssessment: {
        score,
        correctCount,
        totalQuestions: sumatifQuestions.length,
        isPassed: score >= 75,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        answersDetail: sumatifQuestions.map(q => {
          const selectedIdx = sumatifAnswers[q.id];
          return {
            questionId: q.id,
            question: q.question,
            studentAnswerText: selectedIdx !== undefined ? q.options[selectedIdx] : 'Tidak dijawab',
            correctAnswerText: q.options[q.correctAnswer],
            isCorrect: selectedIdx === q.correctAnswer
          };
        })
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
          <span>🌟 Bagian 10 dari 10</span>
          <span>•</span>
          <span>Puncak Pembelajaran (Penutup 10 Menit)</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Rangkuman Emas & Asesmen Sumatif
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Penegasan komitmen kebangsaan, evaluasi sumatif akhir, dan mutiara inspirasi bagi seluruh siswa <strong>{MODULE_INFO.school}</strong>.
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Panduan Tindak Lanjut Guru (Sintaks Penutup):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Guru memberikan umpan balik apresiatif atas jalannya pembelajaran. Nilai evaluasi sumatif 10 soal pilihan ganda di tab Asesmen Sumatif dapat direkap sebagai asesmen kognitif akhir. Jangan lupa ingatkan siswa untuk mengamalkan Profil Pelajar Pancasila di lingkungan keluarga dan masyarakat.
          </p>
        </div>
      )}

      {/* Switcher Tab: Rangkuman vs Asesmen Sumatif */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          📜 Rangkuman Rumus N-K-R-I & Motivasi
        </button>
        <button
          onClick={() => setActiveTab('sumatif')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'sumatif'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          ✍️ Asesmen Sumatif (10 Soal Lampiran 2)
        </button>
      </div>

      {activeTab === 'summary' ? (
        <>
          {/* Main Gold Summary Card */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-amber-100 border border-white/30">
                    RUMUS PENGINGAT ABADI
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
                    Pedoman Karakter: "H - U - K - U - M"
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleListenSummary}
                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-2xl text-white transition flex items-center gap-2 text-xs font-bold backdrop-blur-md cursor-pointer"
                    title="Dengarkan pembacaan rangkuman"
                  >
                    <Volume2 className="w-4 h-4 text-amber-200" />
                    <span className="hidden sm:inline">Dengar Ulasan</span>
                  </button>

                  <button
                    onClick={triggerCelebration}
                    className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-lg cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Rayakan Sukses!</span>
                  </button>
                </div>
              </div>

              {/* Acronym Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                {SUMMARY_ACRONYM.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2 hover:bg-white/20 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
                      {item.letter}
                    </div>
                    <h4 className="font-bold text-sm text-white">{item.word}</h4>
                    <p className="text-xs text-amber-100 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inspirational Quotes Carousel/Grid */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span>Pesan Inspiratif Para Tokoh Bangsa & Guru:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOTIVATIONAL_QUOTES.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <p className="font-serif italic text-sm sm:text-base text-slate-700 leading-relaxed">
                    {q.quote}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{q.author}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{q.role}</div>
                    </div>
                    <span className="text-2xl">🇮🇩</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Asesmen Sumatif (10 Soal Lampiran 2) */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-display font-black text-xl text-slate-900">
                Asesmen Sumatif: 10 Soal Pilihan Ganda (Lampiran 2 RPM)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kerjakan secara mandiri untuk mengukur ketercapaian tujuan pembelajaranmu hari ini.
              </p>
            </div>

            {sumatifSubmitted && (
              <div className="px-4 py-2 rounded-2xl bg-red-100 text-red-900 font-black text-sm border border-red-200 animate-bounce">
                Nilai Kamu: {calculateSumatifScore()} / 100
              </div>
            )}
          </div>

          <div className="space-y-6">
            {sumatifQuestions.map((q, qIdx) => {
              const selectedOpt = sumatifAnswers[q.id];

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrect = optIdx === q.correctAnswer;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (sumatifSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-300';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectSumatifAnswer(q.id, optIdx)}
                          disabled={sumatifSubmitted}
                          className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {sumatifSubmitted && (
                    <div className="pl-8 pt-2 text-xs text-slate-600 font-medium">
                      💡 <b>Kunci & Pembahasan:</b> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            {!sumatifSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitSumatif}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition cursor-pointer"
              >
                Kirim Jawaban Asesmen Sumatif
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSumatifAnswers({});
                  setSumatifSubmitted(false);
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Ulangi Asesmen Sumatif
              </button>
            )}
          </div>
        </div>
      )}

      {/* Teacher's Inspiring Message & Closing Note */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👨‍🏫</div>
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg">
              {MODULE_INFO.author}
            </h4>
            <p className="text-xs text-amber-300 font-bold">Mahasiswa PPG Pendidikan Pancasila</p>
            <p className="text-[11px] text-slate-400 font-medium">{MODULE_INFO.school}</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
          “Anak-anakku sekalian, kelak kalianlah yang akan memimpin bangsa ini. Jadikanlah hukum dan keadilan sebagai pedoman hidup, junjung tinggi kejujuran dan persamaan hak, tolak segala bentuk kecurangan serta perundungan, dan rawatlah Negara Hukum Republik Indonesia berlandaskan Pancasila dengan penuh integritas dan rasa syukur kepada Tuhan Yang Maha Esa. Teruslah taat aturan, berprestasi, dan saling mengasihi!”
        </p>

        <div className="p-3 bg-white/10 rounded-2xl text-xs text-amber-300 flex items-center justify-between">
          <span>🤲 <b>Penutup Pembelajaran:</b> Mengakhiri pelajaran dengan berdoa khusyuk dan salam penutup.</span>
          <span className="text-emerald-400 font-bold">Alhamdulillah / Puji Tuhan</span>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Seluruh 10 Tahapan Pembelajaran Telah Selesai dengan Sempurna!</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrintSummary}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rangkuman</span>
          </button>

          <button
            onClick={onRestart}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi dari Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
