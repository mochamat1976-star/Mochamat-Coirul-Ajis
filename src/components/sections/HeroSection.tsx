import React from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle, Clock, Users, Sparkles, Volume2 } from 'lucide-react';
import { sound, speakText } from '../../utils/audio';

interface HeroSectionProps {
  onStart: () => void;
  isTeacherMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart, isTeacherMode }) => {
  const triggerGavel = () => {
    sound.playGavel();
  };

  const handleListenTitle = () => {
    speakText(
      'Selamat datang di media pembelajaran interaktif Pendidikan Pancasila dan Kewarganegaraan. Materi: Indonesia Sebagai Negara Hukum, berdasarkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 Pasal 1 Ayat 3. Mari kita mulai belajar dengan penuh semangat!'
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Teacher Guide Notice */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm text-sm text-amber-900">
          <p className="font-bold flex items-center gap-1.5">
            <span>👩‍🏫 Catatan Pedagogis untuk Bapak/Ibu Guru:</span>
          </p>
          <p className="mt-1 text-amber-800">
            Aplikasi ini dirancang sebagai media pembelajaran berbasis Kurikulum Merdeka (Fase D/E). Modul memuat alur pembelajaran lengkap 9 tahapan: pembukaan (judul, doa, absensi), eksplorasi (tujuan, apersepsi kasus nyata), pendalaman (penjelasan interaktif), evaluasi kinestetik (game kartun Hakim Cilik & sortir hukum), serta penutup (refleksi 3-2-1, pembuatan sertifikat, dan motivasi).
          </p>
        </div>
      )}

      {/* Main Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl text-white shadow-xl p-6 sm:p-10 border border-red-500/30">
        {/* Decorative background badges & shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-950/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/30 text-amber-200">
              <span className="animate-pulse">🇮🇩</span>
              <span>PENDIDIKAN PANCASILA & KEWARGANEGARAAN (PPKn)</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                Indonesia Sebagai <br />
                <span className="text-amber-300 underline decoration-amber-400/60 decoration-wavy">
                  Negara Hukum
                </span>
              </h1>
              <p className="text-base sm:text-lg text-red-100 font-medium leading-relaxed max-w-xl">
                Menyelami makna luhur <strong className="text-white">UUD NRI 1945 Pasal 1 Ayat (3)</strong>, mengenali lembaga penegak keadilan, dan menumbuhkan karakter Pelajar Pancasila yang jujur, adil, serta tertib hukum.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playSuccess();
                  onStart();
                }}
                className="group px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl font-display font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleListenTitle}
                className="px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-bold text-sm backdrop-blur-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
                title="Dengarkan pengantar suara guru"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>Dengar Pengantar</span>
              </button>

              <button
                onClick={triggerGavel}
                className="px-3.5 py-3.5 bg-black/20 hover:bg-black/30 text-amber-200 rounded-2xl font-semibold text-xs border border-white/10 transition flex items-center gap-1.5"
                title="Bunyikan Palu Sidang Keadilan"
              >
                <span>🔨</span>
                <span>Ketuk Palu Hakim</span>
              </button>
            </div>

            {/* Badge pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-red-100 font-medium">
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" /> 2 JP (80 Menit)
              </span>
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-300" /> Kelas VII - IX / X
              </span>
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Interaktif & Berhadiah
              </span>
            </div>
          </div>

          {/* Right Visual Cartoon Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl text-center space-y-4">
              {/* Cartoon Judge Avatar Frame */}
              <div className="relative mx-auto w-36 h-36 bg-gradient-to-tr from-amber-300 to-yellow-100 rounded-full flex items-center justify-center shadow-inner border-4 border-white/40">
                <span className="text-6xl animate-bounce" role="img" aria-label="Hakim Kartun">
                  👩‍⚖️
                </span>
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white">
                  Hakim Adila
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">Kak Adila & Kawan Pancasila</h3>
                <p className="text-xs text-amber-100 mt-1">
                  “Halo teman-teman! Saya akan memandu petualanganmu memahami hukum di Indonesia dengan seru dan adil!”
                </p>
              </div>

              {/* Mini Feature Highlights */}
              <div className="grid grid-cols-2 gap-2 text-left pt-2">
                <div className="bg-white/15 p-2.5 rounded-xl border border-white/15">
                  <div className="text-lg">⚖️</div>
                  <div className="font-bold text-xs text-white">UUD 1945 Psl 1 (3)</div>
                  <div className="text-[10px] text-red-100">Landasan Konstitusi</div>
                </div>
                <div className="bg-white/15 p-2.5 rounded-xl border border-white/15">
                  <div className="text-lg">🎮</div>
                  <div className="font-bold text-xs text-white">Hakim Cilik RPG</div>
                  <div className="text-[10px] text-red-100">5 Kasus Keadilan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9 Modules Roadmap Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <span>Alur Pembelajaran 9 Tahap Hari Ini</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Ikuti setiap tahapan untuk membangun pemahaman yang utuh dan mendapatkan Piagam Pelajar Sadar Hukum!
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Langkah 1 dari 9
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition">
            <div className="text-xs font-bold text-red-600">FASE 1: PENDAHULUAN</div>
            <ul className="text-xs text-slate-600 mt-1.5 space-y-1">
              <li>1. 📖 Judul Materi & Gambaran Umum</li>
              <li>2. 🤲 Berdoa Sebelum Belajar</li>
              <li>3. 📋 Presensi / Absensi & Suasana Hati</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition">
            <div className="text-xs font-bold text-amber-700">FASE 2: EKSPLORASI INTI</div>
            <ul className="text-xs text-slate-600 mt-1.5 space-y-1">
              <li>4. 🎯 Capaian & Tujuan Pembelajaran</li>
              <li>5. 💡 Apersepsi Kasus Kontekstual</li>
              <li>6. ⚖️ Materi Indonesia Negara Hukum</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition">
            <div className="text-xs font-bold text-emerald-700">FASE 3: APLIKASI & PENUTUP</div>
            <ul className="text-xs text-slate-600 mt-1.5 space-y-1">
              <li>7. 🎮 Game Visual Kartun Hakim Cilik</li>
              <li>8. ✍️ Refleksi & Piagam Komitmen</li>
              <li>9. 🌟 Kesimpulan Emas & Motivasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
