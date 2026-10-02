import React from 'react';
import { Volume2, VolumeX, Shield, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionId } from '../types';
import { sound, speakText } from '../utils/audio';

interface NavbarProps {
  currentSection: SectionId;
  completedSections: SectionId[];
  onSelectSection: (section: SectionId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  onOpenTeacherDashboard?: () => void;
}

export const SECTIONS_NAV = [
  { id: 0 as SectionId, label: '0. Selamat Datang & Kesiapan Belajar', short: '0. Sapaan', icon: '👋' },
  { id: 1 as SectionId, label: '1. Ruang Belajar Pancasila Kelas VIII', short: '1. Judul', icon: '🏛️' },
  { id: 2 as SectionId, label: '2. Berdoa Bersama', short: '2. Berdoa', icon: '🤲' },
  { id: 3 as SectionId, label: '3. Absensi Siswa', short: '3. Absen', icon: '📋' },
  { id: 4 as SectionId, label: '4. Tujuan Pembelajaran', short: '4. Tujuan', icon: '🎯' },
  { id: 5 as SectionId, label: '5. Ice Breaking: Nyanyian Dari Sabang Sampai Merauke', short: '5. Lagu Asli', icon: '🎵' },
  { id: 6 as SectionId, label: '6. Apersepsi', short: '6. Apersepsi', icon: '💡' },
  { id: 7 as SectionId, label: '7. Penjelasan Materi', short: '7. Materi', icon: '⚖️' },
  { id: 8 as SectionId, label: '8. Game Turnamen (30m)', short: '8. Game', icon: '🎮' },
  { id: 9 as SectionId, label: '9. Refleksi & Piagam', short: '9. Refleksi', icon: '✍️' },
  { id: 10 as SectionId, label: '10. Kesimpulan & Motivasi', short: '10. Simpulan', icon: '🌟' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  completedSections,
  onSelectSection,
  isMuted,
  onToggleMute,
  isTeacherMode,
  onToggleTeacherMode,
  onOpenTeacherDashboard
}) => {
  const progressPercent = Math.round((completedSections.length / 10) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      {/* Top Banner with 2 Explicit Modes: Mode Khusus Siswa & Mode Khusus Guru */}
      <div className="bg-gradient-to-r from-red-700 via-red-800 to-slate-900 text-white px-3 sm:px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 max-w-xl truncate">
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold text-[11px]">PPKn SMP</span>
          <span className="hidden sm:inline font-medium">Indonesia Sebagai Negara Hukum (UUD 1945 Pasal 1 Ayat 3) • SMPN 5 Madiun</span>
          <span className="sm:hidden truncate">Negara Hukum Pasal 1 (3)</span>
        </div>

        {/* 2 Modes Explicit Segmented Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-black/40 p-0.5 rounded-full flex items-center border border-white/20 shadow-inner">
            <button
              onClick={() => {
                if (isTeacherMode) {
                  sound.playClick();
                  onToggleTeacherMode();
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                !isTeacherMode
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Aktifkan Mode Khusus Siswa (Tampilan Pembelajaran & Interaktif)"
            >
              <span>👨‍🎓</span>
              <span className="hidden sm:inline">Mode Khusus Siswa</span>
              <span className="sm:hidden">Mode Siswa</span>
            </button>

            <button
              onClick={() => {
                if (!isTeacherMode) {
                  sound.playClick();
                  onToggleTeacherMode();
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                isTeacherMode
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Aktifkan Mode Khusus Guru (Panduan Pedagogis RPM, Rubrik & Kontrol)"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mode Khusus Guru</span>
              <span className="sm:hidden">Mode Guru</span>
            </button>
          </div>

          {/* Suara: Kakak Guru Ramah (Bikin Betah Belajar) */}
          <button
            onClick={() => {
              sound.playComfortingChime();
              speakText(
                'Halo sahabat Pelajar Pancasila! Selamat datang di ruang belajar yang tenang, nyaman, dan menyenangkan. Mari kita belajar bersama dengan hati gembira dan pikiran yang jernih.',
                undefined,
                'ramah_hangat',
                false
              );
            }}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black transition cursor-pointer shadow-sm active:scale-95"
            title="Pengisi Suara: Kakak Guru Ramah & Inspiratif (Suara sejuk & bikin betah belajar)"
          >
            <span>👩‍🏫🎙️</span>
            <span className="hidden sm:inline">Suara: Guru Ramah</span>
            <span className="sm:hidden">Guru Ramah</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer"
            title={isMuted ? 'Nyalakan Suara / SFX' : 'Matikan Suara (Mute)'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-200" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-300" />}
            <span className="hidden md:inline">{isMuted ? 'Mute' : 'Audio On'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectSection(1)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center p-2 shadow-md shadow-red-200 text-xl font-bold">
            ⚖️
          </div>
          <div>
            <h1 className="font-display font-black text-base md:text-lg text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              <span>Ruang Belajar Pendidikan Pancasila Kelas VIII</span>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-red-200 shrink-0">
                Pasal 1 (3)
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">SMP Negeri 5 Madiun • Indonesia Sebagai Negara Hukum</p>
          </div>
        </div>

        {/* Mode Indicator & Action pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isTeacherMode ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenTeacherDashboard}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                title="Buka Rekapitulasi Seluruh Jawaban Siswa"
              >
                <span>📊</span>
                <span className="hidden sm:inline">Rekap Jawaban Siswa</span>
                <span className="sm:hidden">Rekap Siswa</span>
              </button>

              <button
                onClick={onToggleTeacherMode}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="Kunci & Keluar dari Mode Guru"
              >
                <span>🔒</span>
                <span className="hidden md:inline">Kunci Guru</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-emerald-50 border-emerald-300 text-emerald-900">
              <span>👨‍🎓 Mode Siswa Aktif (Fokus Belajar)</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* 10-Step Horizontal Navigation Bar */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 min-w-max">
          {SECTIONS_NAV.map((sec) => {
            const isActive = currentSection === sec.id;
            const isCompleted = completedSections.includes(sec.id);

            return (
              <button
                key={sec.id}
                onClick={() => {
                  sound.playClick();
                  onSelectSection(sec.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm shadow-red-300 scale-102 ring-2 ring-red-400/40'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{sec.icon}</span>
                <span>{sec.short}</span>
                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
