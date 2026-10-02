import React, { useState } from 'react';
import { ArrowRight, Volume2, Sparkles, CheckCircle2, Heart, BookOpen, Shield, Flame, Smile, GraduationCap, Award } from 'lucide-react';
import { sound, speakText, stopSpeech } from '../../utils/audio';
import { MODULE_INFO } from '../../data/materialData';
import confetti from 'canvas-confetti';

interface WelcomeSectionProps {
  onStart: () => void;
  isTeacherMode?: boolean;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStart, isTeacherMode }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [readinessChecked, setReadinessChecked] = useState<boolean[]>([true, true, true]);

  const handleListenGreeting = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const greetingText =
      'Halo anak-anak hebat generasi emas Pelajar Pancasila SMP Negeri 5 Madiun! Selamat datang di Ruang Belajar Pendidikan Pancasila Kelas Delapan. Di sini kita akan belajar bersama dalam suasana yang tenang, nyaman, dan menyenangkan tentang Indonesia Sebagai Negara Hukum. Rilekskan pikiranmu, satukan hati nurani, dan mari kita mulai proses belajar dengan penuh semangat dan rasa syukur.';
    speakText(greetingText, () => {
      setIsSpeaking(false);
    }, 'ramah_hangat', true);
  };

  const handleProceed = () => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {}
    onStart();
  };

  const toggleCheck = (index: number) => {
    sound.playClick();
    setReadinessChecked(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const allReady = readinessChecked.every(Boolean);

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Teacher Guide Notice */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl shadow-sm text-sm text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <GraduationCap className="w-5 h-5 text-amber-700" />
            <span>Panduan Pembukaan Pembelajaran (Tahap Orientasi Awal & Building Rapport):</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Halaman sambutan ini dirancang untuk menciptakan iklim belajar yang inklusif, ramah, dan membangkitkan rasa aman psikologis (<em>Psychological Safety</em>). Guru menyapa peserta didik dengan antusias, memastikan kesiapan fisik dan mental siswa, serta menumbuhkan rasa ingin tahu sebelum memasuki tahapan judul dan materi inti.
          </p>
        </div>
      )}

      {/* Main Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl text-white shadow-2xl p-6 sm:p-10 border border-red-500/30">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-950/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Greeting & Words of Readiness */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/30 text-amber-200">
              <span className="animate-pulse">👋</span>
              <span>GERBANG PEMBELAJARAN INTERAKTIF • {MODULE_INFO.school.toUpperCase()}</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                Selamat Datang di <br />
                <span className="text-amber-300 underline decoration-amber-400/60 decoration-wavy">
                  Ruang Belajar Pendidikan Pancasila
                </span>
              </h1>
              <div className="inline-block bg-white/20 text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl">
                Tingkat SMP / Fase D — {MODULE_INFO.grade}
              </div>
            </div>

            {/* Inspiring Warm Readiness Paragraph */}
            <div className="bg-black/20 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-sm sm:text-base leading-relaxed text-red-100 font-medium space-y-2">
              <p>
                “Halo Generasi Emas Pelajar Pancasila! Selamat datang di ruang belajar interaktif kita. Hari ini kita akan menjelajahi petualangan bermakna mengenai <strong>Indonesia Sebagai Negara Hukum</strong>.”
              </p>
              <p className="text-amber-200 text-xs sm:text-sm font-semibold">
                ✨ Siapkan pikiran yang jernih, buka hati nurani untuk keadilan, dan mari kita melangkah dengan rasa ingin tahu yang tinggi serta semangat gotong royong!
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleProceed}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-display font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Saya Siap Belajar! 🚀</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleListenGreeting}
                className="px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
                title="Dengarkan Sapaan Suara Guru"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>{isSpeaking ? 'Hentikan Suara' : 'Dengar Sapaan Guru'}</span>
              </button>
            </div>

            {/* Teacher Credit Tag */}
            <div className="pt-2 text-xs text-red-200 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-amber-300" /> Pengampu: <strong>{MODULE_INFO.author}</strong> ({MODULE_INFO.role})
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg">
                Tahun Ajaran {MODULE_INFO.academicYear}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Mascot & Readiness Badge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl border-4 border-amber-300 transform -rotate-3 hover:rotate-0 transition duration-300 animate-bounce">
                🇮🇩
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  SIAP & TANGGUH
                </span>
                <h3 className="font-display font-extrabold text-lg text-white">
                  Profil Pelajar Pancasila
                </h3>
                <p className="text-xs text-red-100 leading-relaxed">
                  Beriman, Bertakwa, Bernalar Kritis, Bergotong Royong, dan Cinta Keadilan Hukum.
                </p>
              </div>

              <div className="p-3 bg-black/20 rounded-xl text-left border border-white/10 text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Semboyan Belajar Hari Ini:</span>
                </div>
                <p className="italic text-slate-200 text-[11px]">
                  "Hukum sebagai pelindung segenap tumpah darah, keadilan untuk martabat bersama."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Learning Readiness (Kartu Cek Kesiapan Belajar) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <span>Cek Kesiapan Belajar Siswa (Klik Checklist):</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pastikan 3 aspek kesiapan ini sudah kamu miliki sebelum memasuki pembelajaran:
            </p>
          </div>

          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {readinessChecked.filter(Boolean).length} / 3 Siap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Pikiran */}
          <div
            onClick={() => toggleCheck(0)}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
              readinessChecked[0]
                ? 'bg-emerald-50/60 border-emerald-400 text-emerald-950 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧠</span>
              <input
                type="checkbox"
                checked={readinessChecked[0]}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer pointer-events-none"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">1. Kesiapan Pikiran (Fokus)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pikiran segar, siap menyimak fakta, bernalar kritis, dan aktif mengemukakan pendapat.
              </p>
            </div>
          </div>

          {/* Card 2: Hati */}
          <div
            onClick={() => toggleCheck(1)}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
              readinessChecked[1]
                ? 'bg-emerald-50/60 border-emerald-400 text-emerald-950 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">💖</span>
              <input
                type="checkbox"
                checked={readinessChecked[1]}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer pointer-events-none"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">2. Kesiapan Hati (Niat Baik)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Niat belajar dengan ikhlas, menghormati guru dan teman, serta menolak kecurangan.
              </p>
            </div>
          </div>

          {/* Card 3: Teknis */}
          <div
            onClick={() => toggleCheck(2)}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
              readinessChecked[2]
                ? 'bg-emerald-50/60 border-emerald-400 text-emerald-950 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🎒</span>
              <input
                type="checkbox"
                checked={readinessChecked[2]}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer pointer-events-none"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">3. Kesiapan Alat Belajar</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Buku catatan PPKn, alat tulis, dan gawai/layar belajar dalam kondisi siap digunakan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Next Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {allReady ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Semua aspek kesiapan terpenuhi! Kamu siap melangkah ke judul materi.
              </span>
            ) : (
              <span>Klik centang ketiga kartu di atas untuk memastikan kesiapanmu.</span>
            )}
          </div>

          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Masuk ke Pembelajaran: Judul Materi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
