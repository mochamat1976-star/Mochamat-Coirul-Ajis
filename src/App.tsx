/**
 * Ruang Belajar Pendidikan Pancasila Kelas VIII
 * Materi: Indonesia Sebagai Negara Hukum (UUD NRI 1945 Pasal 1 Ayat 3)
 * Pengampu: Mochamat Choirul Ajis, S.Pd. (Mahasiswa PPG Pendidikan Pancasila) - SMP Negeri 5 Madiun
 * Memuat 10 Tahapan Lengkap:
 * 1. Judul Materi (Ruang Belajar Pendidikan Pancasila Kelas VIII)
 * 2. Berdoa
 * 3. Absensi
 * 4. Tujuan Pembelajaran
 * 5. Ice Breaking: Game Refleks Uji Fokus Hakim Pancasila (Palu Keadilan vs Jebakan Hukum Rimba)
 * 6. Apersepsi
 * 7. Penjelasan Materi Indonesia Sebagai Negara Hukum
 * 8. Game Turnamen Kolaboratif 6 Kelompok (30 Menit) - Roda Putar Keadilan & Kasus Hukum
 * 9. Refleksi Model 3-2-1 & Piagam Penghargaan Siswa
 * 10. Kesimpulan H-U-K-U-M, Asesmen Sumatif 10 Soal PG, & Kata Motivasi Siswa
 */

import React, { useState } from 'react';
import { SectionId } from './types';
import { Navbar, SECTIONS_NAV } from './components/Navbar';
import { WelcomeSection } from './components/sections/WelcomeSection';
import { HeroSection } from './components/sections/HeroSection';
import { PrayerSection } from './components/sections/PrayerSection';
import { AttendanceSection } from './components/sections/AttendanceSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { IceBreakingSection } from './components/sections/IceBreakingSection';
import { ApperceptionSection } from './components/sections/ApperceptionSection';
import { MaterialSection } from './components/sections/MaterialSection';
import { GameSection } from './components/sections/GameSection';
import { ReflectionSection } from './components/sections/ReflectionSection';
import { ConclusionSection } from './components/sections/ConclusionSection';
import { TeacherAuthModal } from './components/teacher/TeacherAuthModal';
import { TeacherDashboardModal } from './components/teacher/TeacherDashboardModal';
import { sound } from './utils/audio';
import { ChevronLeft, ChevronRight, Lock, Users, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>(0);
  const [completedSections, setCompletedSections] = useState<SectionId[]>([0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState<boolean>(false);
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
    if (currentSection < 10) {
      const nextSec = (currentSection + 1) as SectionId;
      markComplete(currentSection);
      setCurrentSection(nextSec);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    sound.playClick();
    if (currentSection > 0) {
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

  // Secure Teacher Mode Switcher: requires PIN authentication
  const handleToggleTeacherMode = () => {
    if (isTeacherMode) {
      // Locking teacher mode and reverting to student mode
      sound.playClick();
      setIsTeacherMode(false);
      setIsTeacherAuthenticated(false);
    } else {
      // Trying to access teacher mode
      if (isTeacherAuthenticated) {
        sound.playClick();
        setIsTeacherMode(true);
      } else {
        // Must authenticate via Teacher PIN Modal
        sound.playClick();
        setIsAuthModalOpen(true);
      }
    }
  };

  const handleTeacherAuthSuccess = () => {
    setIsTeacherAuthenticated(true);
    setIsTeacherMode(true);
    setIsAuthModalOpen(false);
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
        onOpenTeacherDashboard={() => setIsDashboardModalOpen(true)}
      />

      {/* Floating / Sticky Teacher Control Bar (Only shown in Teacher Mode) */}
      {isTeacherMode && (
        <aside aria-label="Bilah Kontrol Guru" className="bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold shadow-md border-b border-amber-500 no-print flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
              MODE GURU AKTIF
            </span>
            <span>Mochamat Choirul Ajis, S.Pd. — Jawaban seluruh siswa otomatis tersimpan di sini.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDashboardModalOpen(true)}
              className="px-3 py-1 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Buka Rekapitulasi Jawaban Siswa</span>
            </button>

            <button
              onClick={handleToggleTeacherMode}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Kunci & Keluar dari Mode Guru"
            >
              <Lock className="w-3 h-3" />
              <span>Kunci Guru</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentSection === 0 && (
          <WelcomeSection
            onStart={handleNextSection}
            isTeacherMode={isTeacherMode}
          />
        )}

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
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 3 && (
          <AttendanceSection
            onComplete={() => markComplete(3)}
            onNext={handleNextSection}
            onStudentRecorded={handleStudentRecorded}
            currentStudentName={studentName}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 4 && (
          <ObjectivesSection
            onComplete={() => markComplete(4)}
            onNext={handleNextSection}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 5 && (
          <IceBreakingSection
            onComplete={() => markComplete(5)}
            onNext={handleNextSection}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 6 && (
          <ApperceptionSection
            onComplete={() => markComplete(6)}
            onNext={handleNextSection}
            isTeacherMode={isTeacherMode}
            studentName={studentName}
            studentClass={studentClass}
          />
        )}

        {currentSection === 7 && (
          <MaterialSection
            onComplete={() => markComplete(7)}
            onNext={handleNextSection}
            isTeacherMode={isTeacherMode}
            studentName={studentName}
            studentClass={studentClass}
          />
        )}

        {currentSection === 8 && (
          <GameSection
            onComplete={() => markComplete(8)}
            onNext={handleNextSection}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 9 && (
          <ReflectionSection
            onComplete={() => markComplete(9)}
            onNext={handleNextSection}
            studentName={studentName}
            studentClass={studentClass}
            isTeacherMode={isTeacherMode}
          />
        )}

        {currentSection === 10 && (
          <ConclusionSection
            onRestart={() => handleJumpToSection(0)}
            studentName={studentName}
            studentClass={studentClass}
            isTeacherMode={isTeacherMode}
          />
        )}
      </main>

      {/* Sticky Bottom Stepper Bar */}
      <nav aria-label="Navigasi Tahapan Pembelajaran" className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 shadow-lg no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevSection}
            disabled={currentSection === 0}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
              currentSection === 0
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
              {currentSection === 0 ? 'Sapaan & Kesiapan Belajar' : `Tahap ${currentSection} dari 10`}
            </div>
            <div className="font-display font-bold text-xs sm:text-sm text-slate-800 truncate">
              {SECTIONS_NAV.find(s => s.id === currentSection)?.label}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextSection}
            disabled={currentSection === 10}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md cursor-pointer ${
              currentSection === 10
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
              <span>⚖️ Ruang Belajar Pendidikan Pancasila Kelas VIII</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Modul Pembelajaran Mandiri & Klasikal Pendidikan Pancasila SMP Negeri 5 Madiun
            </p>
          </div>

          <div className="text-center text-[11px] text-slate-400 space-y-1">
            <div>Berlandaskan <strong>UUD NRI 1945 Pasal 1 Ayat (3)</strong> & Profil Pelajar Pancasila</div>
            <div className="text-amber-400 font-semibold">“Keadilan untuk Semua, Tertib untuk Bersama”</div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-1">
            <div>Pengampu: <strong>Mochamat Choirul Ajis, S.Pd.</strong></div>
            <div className="text-slate-500">Mahasiswa PPG Pendidikan Pancasila</div>
          </div>
        </div>
      </footer>

      {/* Teacher Authentication Modal (PIN) */}
      <TeacherAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleTeacherAuthSuccess}
      />

      {/* Teacher Central Dashboard Modal (Student Submissions Rekap) */}
      <TeacherDashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
      />
    </div>
  );
}
