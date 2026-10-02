import React, { useState } from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle, Clock, Users, Sparkles, Volume2, Shield, HeartHandshake, Music } from 'lucide-react';
import { sound, speakText, stopSpeech } from '../../utils/audio';
import { MODULE_INFO } from '../../data/materialData';
import { SabangMeraukePlayer } from '../anthem/SabangMeraukePlayer';

interface HeroSectionProps {
  onStart: () => void;
  isTeacherMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart, isTeacherMode }) => {
  const [isSpeakingTitle, setIsSpeakingTitle] = useState<boolean>(false);
  const [isSpeakingReadiness, setIsSpeakingReadiness] = useState<boolean>(false);
  const [isAnthemOpen, setIsAnthemOpen] = useState<boolean>(false);

  const triggerGavel = () => {
    sound.playGavel();
  };

  const handleListenTitle = () => {
    if (isSpeakingTitle) {
      stopSpeech();
      setIsSpeakingTitle(false);
      return;
    }
    stopSpeech();
    setIsSpeakingTitle(true);
    setIsSpeakingReadiness(false);
    speakText(
      `Halo anak-anak hebat generasi penerus bangsa! Selamat datang di Ruang Belajar Pendidikan Pancasila Kelas VIII SMP Negeri 5 Madiun. Hari ini kita mendalami materi penting: ${MODULE_INFO.title}, berlandaskan amanat luhur UUD 1945 Pasal 1 Ayat 3 bahwa Negara Indonesia adalah negara hukum. Mari kita pelajari bagaimana hukum melindungi kita semua dengan adil dan setara.`,
      () => setIsSpeakingTitle(false),
      'ramah_hangat',
      true
    );
  };

  const handleListenReadiness = () => {
    if (isSpeakingReadiness) {
      stopSpeech();
      setIsSpeakingReadiness(false);
      return;
    }
    stopSpeech();
    setIsSpeakingReadiness(true);
    setIsSpeakingTitle(false);
    speakText(
      'Halo anak-anak hebat generasi penerus bangsa! Satukan niat mulia, siapkan pikiran yang jernih dan hati nurani yang bersih. Mari kita mulai proses pembelajaran dengan penuh rasa syukur, semangat jujur, disiplin, dan gotong royong untuk menjadi Pelajar Pancasila yang teladan dan taat hukum.',
      () => setIsSpeakingReadiness(false),
      'ramah_hangat',
      true
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Teacher Guide Notice */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm text-sm text-amber-900">
          <p className="font-bold flex items-center gap-1.5">
            <span>👩‍🏫 Catatan Pedagogis RPM ({MODULE_INFO.school}):</span>
          </p>
          <p className="mt-1 text-amber-800">
            Modul ini dirancang berdasarkan Rencana Pembelajaran Mendalam (RPM) Kurikulum Merdeka oleh <strong>{MODULE_INFO.author}</strong> ({MODULE_INFO.role}). Memadukan sintaks <em>Problem Based Learning (PBL)</em>, Contextual Teaching & Learning (CTL), Profil Lulusan (Permendikdasmen No. 13 Tahun 2025), serta turnamen kolaboratif 6 kelompok (30 menit).
          </p>
        </div>
      )}

      {/* Bagian Awal Sebelum Judul: Sambutan Selamat Datang & Kata-Kata Kesiapan Belajar */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-red-400/30 flex flex-col md:flex-row items-center justify-between gap-5 animate-fadeIn">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/30 shadow-lg">
            👋
          </div>
          <div className="space-y-1.5">
            <div className="inline-block px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              ✨ Selamat Datang di Ruang Belajar Pendidikan Pancasila
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Kata-Kata Penyemangat & Kesiapan Belajar Siswa:
            </h3>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-medium">
              “Halo anak-anak hebat generasi penerus bangsa! Selamat datang di ruang belajar interaktif kita. Satukan niat mulia, siapkan pikiran yang jernih dan hati nurani yang bersih. Mari kita mulai proses pembelajaran dengan penuh rasa syukur, semangat jujur, disiplin, dan gotong royong untuk menjadi Pelajar Pancasila yang teladan dan taat hukum!”
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={handleListenReadiness}
            className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20 shadow cursor-pointer"
            title="Dengarkan kata-kata kesiapan pembelajaran"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>{isSpeakingReadiness ? 'Hentikan Audio' : 'Dengarkan Kesiapan Belajar'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card: Ruang Belajar Pendidikan Pancasila Kelas VIII */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl text-white shadow-xl p-6 sm:p-10 border border-red-500/30">
        {/* Decorative background badges & shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-950/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/30 text-amber-200">
              <span className="animate-pulse">🇮🇩</span>
              <span>{MODULE_INFO.school.toUpperCase()} • {MODULE_INFO.subject.toUpperCase()}</span>
            </div>

            <div className="space-y-3">
              <div className="inline-block px-3.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                🏛️ {MODULE_INFO.grade.toUpperCase()}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                Ruang Belajar <br />
                <span className="text-amber-300 underline decoration-amber-400/60 decoration-wavy">
                  Pendidikan Pancasila Kelas VIII
                </span>
              </h1>
              <div className="pt-1">
                <span className="inline-block bg-white/20 text-amber-200 border border-white/30 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                  Materi Pokok: Indonesia Sebagai Negara Hukum ({MODULE_INFO.constitutionalArticle})
                </span>
              </div>
              <p className="text-base sm:text-lg text-red-100 font-medium leading-relaxed max-w-xl pt-1">
                Menyelami ketentuan luhur <strong className="text-white">{MODULE_INFO.constitutionalArticle}</strong>: <em>{MODULE_INFO.constitutionalText}</em>, menegakkan kesetaraan di depan hukum (<em>equality before the law</em>), asas legalitas, serta menumbuhkan budaya taat hukum Pelajar Pancasila.
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
                <span>{isSpeakingTitle ? 'Hentikan Audio' : 'Dengar Pengantar'}</span>
              </button>

              <button
                onClick={handleListenReadiness}
                className="px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-bold text-sm backdrop-blur-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
                title="Dengarkan kata-kata kesiapan pembelajaran"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Kesiapan Belajar</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsAnthemOpen(true);
                }}
                className="px-4 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                title="Putar Lagu Kebangsaan: Dari Sabang Sampai Merauke"
              >
                <Music className="w-4 h-4 text-slate-950" />
                <span>Putar Lagu Sabang-Merauke</span>
              </button>
            </div>

            {/* Badge pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-red-100 font-medium">
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" /> {MODULE_INFO.timeAllocation}
              </span>
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-300" /> {MODULE_INFO.grade}
              </span>
              <span className="bg-black/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-300" /> {MODULE_INFO.author} ({MODULE_INFO.role})
              </span>
            </div>
          </div>

          {/* Right Visual Mascot Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
              {/* Mascot / Emblem */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl sm:text-6xl border-4 border-amber-300 transform -rotate-3 hover:rotate-0 transition duration-300 animate-bounce">
                ⚖️
              </div>

              <div className="mt-4 space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-900 shadow">
                  RECHTSSTAAT INDONESIA
                </span>
                <h3 className="font-display font-extrabold text-xl text-white">
                  Negara Hukum Pancasila
                </h3>
                <p className="text-xs text-red-100 italic">
                  “Hukum adalah panglima tertinggi, melindungi segenap bangsa dan seluruh tumpah darah Indonesia.”
                </p>
              </div>

              {/* Interactive Gavel Button */}
              <div className="mt-5 pt-4 border-t border-white/20">
                <button
                  onClick={triggerGavel}
                  className="w-full py-2.5 px-4 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-white/30 shadow cursor-pointer"
                  title="Klik untuk membunyikan Palu Keadilan"
                >
                  <span>🔨</span>
                  <span>Ketuk Palu Keadilan (SFX)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-red-100 text-red-600 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Landasan Konstitusi</h4>
            <p className="text-xs text-slate-500 mt-0.5">UUD NRI Tahun 1945 Pasal 1 Ayat 3 sebagai dasar hukum tertinggi.</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Supremasi Hukum</h4>
            <p className="text-xs text-slate-500 mt-0.5">Hukum berkedudukan tertinggi, bukan kehendak sewenang-wenang penguasa.</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Equality Before the Law</h4>
            <p className="text-xs text-slate-500 mt-0.5">Semua warga negara setara di hadapan hukum tanpa diskriminasi.</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Perlindungan HAM</h4>
            <p className="text-xs text-slate-500 mt-0.5">Menjamin hak asasi manusia, keadilan sosial, dan ketertiban umum.</p>
          </div>
        </div>
      </div>

      {/* Modal Pemutar Lagu Nasional: Dari Sabang Sampai Merauke */}
      {isAnthemOpen && (
        <SabangMeraukePlayer
          isOpenAsModal={true}
          onClose={() => setIsAnthemOpen(false)}
        />
      )}
    </div>
  );
};
