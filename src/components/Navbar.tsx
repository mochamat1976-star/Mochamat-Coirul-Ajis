import React from 'react';
import { Volume2, VolumeX, Shield, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionId } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentSection: SectionId;
  completedSections: SectionId[];
  onSelectSection: (section: SectionId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
}

export const SECTIONS_NAV = [
  { id: 1 as SectionId, label: '1. Judul Materi', short: 'Judul', icon: '🇮🇩' },
  { id: 2 as SectionId, label: '2. Berdoa', short: 'Berdoa', icon: '🤲' },
  { id: 3 as SectionId, label: '3. Absensi', short: 'Absen', icon: '📋' },
  { id: 4 as SectionId, label: '4. Tujuan Pembelajaran', short: 'Tujuan', icon: '🎯' },
  { id: 5 as SectionId, label: '5. Apersepsi', short: 'Apersepsi', icon: '💡' },
  { id: 6 as SectionId, label: '6. Penjelasan Materi', short: 'Materi', icon: '⚖️' },
  { id: 7 as SectionId, label: '7. Game Visual Kartun', short: 'Game', icon: '🎮' },
  { id: 8 as SectionId, label: '8. Refleksi', short: 'Refleksi', icon: '✍️' },
  { id: 9 as SectionId, label: '9. Kesimpulan & Motivasi', short: 'Motivasi', icon: '🌟' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  completedSections,
  onSelectSection,
  isMuted,
  onToggleMute,
  isTeacherMode,
  onToggleTeacherMode
}) => {
  const progressPercent = Math.round((completedSections.length / 9) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-2xl truncate">
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-semibold">PPKn Interaktif</span>
          <span className="hidden sm:inline">Kurikulum Merdeka • Materi: Indonesia Sebagai Negara Hukum (UUD 1945 Pasal 1 Ayat 3)</span>
          <span className="sm:hidden truncate">Negara Hukum RI</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleTeacherMode();
            }}
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
              isTeacherMode ? 'bg-amber-400 text-slate-900' : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
            title="Beralih antara Mode Tampilan Siswa dan Panduan Guru"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isTeacherMode ? 'Mode Guru (Aktif)' : 'Mode Guru'}</span>
          </button>
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full text-xs font-semibold transition"
            title={isMuted ? 'Nyalakan Suara / SFX' : 'Matikan Suara (Mute)'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-200" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-300" />}
            <span className="hidden md:inline">{isMuted ? 'Suara: Mati' : 'Suara: Aktif'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectSection(1)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-between p-2 shadow-md shadow-red-200">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg md:text-xl text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              <span>Ruang Belajar PPKn</span>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-red-200">
                UUD 1945
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Modul Interaktif: Indonesia Sebagai Negara Hukum</p>
          </div>
        </div>

        {/* Progress pill & Quick Status */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{progressPercent}% Tuntas</span>
            <span className="text-[11px] text-slate-500">({completedSections.length}/9 Bagian)</span>
          </div>
        </div>
      </div>

      {/* 9-Step Horizontal Navigation Bar */}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative whitespace-nowrap ${
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
