/**
 * Ruang Belajar PPKn Interaktif: Indonesia Sebagai Negara Hukum
 * Memuat 9 Tahapan Lengkap:
 * 1. Judul Materi
 * 2. Berdoa
 * 3. Absensi
 * 4. Tujuan Pembelajaran
 * 5. Apersepsi
 * 6. Penjelasan Materi Indonesia Sebagai Negara Hukum
 * 7. Game Visual Kartun (Hakim Cilik RPG & Sortir Aksi)
 * 8. Refleksi Model 3-2-1 & Piagam Penghargaan Siswa
 * 9. Kesimpulan "H-U-K-U-M" & Kata Motivasi Siswa
 */

import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { Navbar, SECTIONS_NAV } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PrayerSection } from './components/sections/PrayerSection';
import { AttendanceSection } from './components/sections/AttendanceSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { ApperceptionSection } from './components/sections/ApperceptionSection';
import { MaterialSection } from './components/sections/MaterialSection';
import { GameSection } from './components/sections/GameSection';
import { ReflectionSection } from './components/sections/ReflectionSection';
import { ConclusionSection } from './components/sections/ConclusionSection';
import { sound } from './utils/audio';
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>(1);
  const [completedSections, setCompletedSections] = useState<SectionId[]>([1]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('Kelas VIII-A');

  // Mark section complete
  const markComplete = (secId: SectionId) => {
    setCompletedSections(prev => {
      if (!prev.includes(secId)) {
        return [...prev, secId];
      }
      return prev;
    });
  };

  const handleNextSection = () => {
    sound.playClick();
    if (currentSection < 9) {
      const nextSec = (currentSection + 1) as SectionId;
      markComplete(currentSection);
      setCurrentSection(nextSec);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    sound.playClick();
    if (currentSection > 1) {
      const prevSec = (currentSection - 1) as SectionId;
      setCurrentSection(prevSec);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToSection = (secId: SectionId) => {
    sound.playClick();
    setCurrentSection(secId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleTeacherMode = () => {
    setIsTeacherMode(prev => !prev);
  };

  const handleStudentRecorded = (name: string, cls: string) => {
    setStudentName(name);
    setStudentClass(cls);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentSection={currentSection}
        completedSections={completedSections}
        onSelectSection={handleJumpToSection}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={handleToggleTeacherMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentSection === 1 && (
          <HeroSection
            onStart={handleNextSection}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 2 && (
          <PrayerSection
            onComplete={() => markComplete(2)}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 3 && (
          <AttendanceSection
            onComplete={() => markComplete(3)}
            onNext={handleNextSection}
            onStudentRecorded={handleStudentRecorded}
            currentStudentName={studentName}
          />
        )}

        {currentSection === 4 && (
          <ObjectivesSection
            onComplete={() => markComplete(4)}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 5 && (
          <ApperceptionSection
            onComplete={() => markComplete(5)}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 6 && (
          <MaterialSection
            onComplete={() => markComplete(6)}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 7 && (
          <GameSection
            onComplete={() => markComplete(7)}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 8 && (
          <ReflectionSection
            onComplete={() => markComplete(8)}
            onNext={handleNextSection}
            studentName={studentName}
            studentClass={studentClass}
          />
        )}

        {currentSection === 9 && (
          <ConclusionSection
            onRestart={() => handleJumpToSection(1)}
            studentName={studentName}
          />
        )}
      </main>

      {/* Sticky Bottom Stepper Bar */}
      <nav aria-label="Navigasi Tahapan Pembelajaran" className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 shadow-lg no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevSection}
            disabled={currentSection === 1}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
              currentSection === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {/* Current Step Name Display */}
          <div className="text-center truncate px-2">
            <div className="text-[10px] uppercase font-extrabold text-red-600 tracking-wider">
              Tahap {currentSection} dari 9
            </div>
            <div className="font-display font-bold text-xs sm:text-sm text-slate-800 truncate">
              {SECTIONS_NAV.find(s => s.id === currentSection)?.label}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextSection}
            disabled={currentSection === 9}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md cursor-pointer ${
              currentSection === 9
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
            }`}
          >
            <span className="hidden sm:inline">Langkah Selanjutnya</span>
            <span className="sm:hidden">Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-display font-bold text-sm text-white flex items-center justify-center md:justify-start gap-2">
              <span>⚖️ Ruang Belajar PPKn Interaktif</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Modul Pembelajaran Mandiri & Klasikal Pendidikan Pancasila dan Kewarganegaraan
            </p>
          </div>

          <div className="text-center text-[11px] text-slate-400 space-y-1">
            <div>Berlandaskan <strong>UUD NRI 1945 Pasal 1 Ayat (3)</strong> & Profil Pelajar Pancasila</div>
            <div className="text-amber-400 font-semibold">“Keadilan untuk Semua, Tertib untuk Bersama”</div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-1">
            <div>Didesain untuk Siswa & Guru di Seluruh Nusantara</div>
            <div className="text-slate-500">Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
