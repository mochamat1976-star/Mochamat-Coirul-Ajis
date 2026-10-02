import React, { useState } from 'react';
import { Trophy, RotateCw, Zap, Scale, Sparkles, CheckCircle, ArrowRight, RotateCcw, Volume2, HelpCircle, Users, Clock } from 'lucide-react';
import { GroupTeam } from '../../types';
import { DEFAULT_TEAMS, MODULE_INFO } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import { TournamentTimer } from '../game/TournamentTimer';
import { GroupLeaderboard } from '../game/GroupLeaderboard';
import { WheelOfJusticeArena } from '../game/WheelOfJusticeArena';
import { BuzzerBattleArena } from '../game/BuzzerBattleArena';
import { CourtTrialArena } from '../game/CourtTrialArena';
import { PodiumModal } from '../game/PodiumModal';
import confetti from 'canvas-confetti';

interface GameSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode?: boolean;
}

export const GameSection: React.FC<GameSectionProps> = ({ onComplete, onNext, isTeacherMode }) => {
  // 6 Teams state
  const [teams, setTeams] = useState<GroupTeam[]>(DEFAULT_TEAMS);
  const [activeTeamId, setActiveTeamId] = useState<number>(1);

  // 30-Minute Master Countdown Timer (1800s)
  const [timeRemaining, setTimeRemaining] = useState<number>(1800);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Active Game Mode Tab: 'board' | 'buzzer' | 'court'
  const [activeMode, setActiveMode] = useState<'board' | 'buzzer' | 'court'>('board');

  // Podium Modal state
  const [showPodium, setShowPodium] = useState<boolean>(false);

  // Show teacher guidance guide
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const handleOpenPodium = () => {
    sound.playFanfare();
    sound.playApplause();
    try {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    } catch {}
    setShowPodium(true);
    onComplete();
  };

  const handleModeChange = (mode: 'board' | 'buzzer' | 'court') => {
    sound.playClick();
    setActiveMode(mode);
    if (mode === 'board') {
      speakText('Mode Roda Putar Keadilan dibuka! Putar roda dan selesaikan tantangan kasus hukum kelompok!');
    } else if (mode === 'buzzer') {
      speakText('Mode Cepat Tepat Bel Rebutan dibuka! Siapkan jari di tombol bel kelompok masing-masing!');
    } else if (mode === 'court') {
      speakText('Mode Sidang Analisis Kasus LKPD dibuka! Majelis kelompok bergantian memutus perkara!');
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-red-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                🎮 Bagian 8 dari 10: Turnamen 30 Menit (6 Kelompok)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-indigo-200 border border-white/20 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-300" /> 6 Kelompok Kolaboratif
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-emerald-300 border border-white/20 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Durasi 30:00 Menit (PBL Sintaks)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Turnamen Akbar: Satria Keadilan & Hukum
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
              Media pembelajaran interaktif materi <strong>{MODULE_INFO.title}</strong> ({MODULE_INFO.author} — {MODULE_INFO.role}). Menguji asas legalitas, equality before the law, dan penalaran kasus hukum dalam 3 arena permainan seru!
            </p>
          </div>

          {/* Quick Guide & Podium Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 shadow cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Sintaks PBL (30 Menit)</span>
            </button>

            <button
              onClick={handleOpenPodium}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black transition-all shadow-lg flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Podium Juara & Piagam</span>
            </button>
          </div>
        </div>

        {/* Collapsible Classroom Guide */}
        {showGuide && (
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-slate-200 animate-in fade-in space-y-2">
            <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              📋 Manajemen Waktu Turnamen 30 Menit Sesuai RPM {MODULE_INFO.school}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-black/30 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 01 - 12 (Arena 1: Roda Putar Keadilan)</span>
                Masing-masing kelompok memutar Roda Putar Keadilan bergantian, berembuk 45 detik menuntaskan misi kasus hukum konstitusi, dan memenangkan poin kelompok!
              </div>
              <div className="p-3 bg-black/30 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 13 - 22 (Arena 2: Cepat Tepat Bel)</span>
                Adu ketangkasan bel rebutan! Tiap kelompok menekan tombol bel kelompok di layar/keyboard (tombol 1-6) menjawab soal sumatif kebangsaan & hukum.
              </div>
              <div className="p-3 bg-black/30 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 23 - 30 (Arena 3: Sidang Kasus LKPD & Juara)</span>
                Tiap kelompok berembuk 60 detik memutus perkara hoaks perbatasan dan sengketa sosial, diakhiri penganugerahan piala & piagam penghargaan!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 30-Minute Master Countdown Timer Bar */}
      <TournamentTimer
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        isRunning={isTimerRunning}
        setIsRunning={setIsTimerRunning}
        totalDuration={1800}
      />

      {/* 6-Group Live Leaderboard (Standings & Score Control) */}
      <GroupLeaderboard
        teams={teams}
        setTeams={setTeams}
        activeTeamId={activeTeamId}
        setActiveTeamId={setActiveTeamId}
      />

      {/* Game Mode Selector Tabs */}
      <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleModeChange('board')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'board'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Arena 1: Roda Putar Keadilan & Misi Kasus</span>
          </button>

          <button
            onClick={() => handleModeChange('buzzer')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'buzzer'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Arena 2: Cepat Tepat Bel (6 Bel)</span>
          </button>

          <button
            onClick={() => handleModeChange('court')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'court'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Arena 3: Sidang Kasus LKPD (6 Kasus)</span>
          </button>
        </div>

        <button
          onClick={handleOpenPodium}
          className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black flex items-center gap-1.5 transition-colors ml-auto cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Lihat Klasemen & Piagam</span>
        </button>
      </div>

      {/* Active Arena Component */}
      <div className="transition-all">
        {activeMode === 'board' && (
          <WheelOfJusticeArena
            teams={teams}
            activeTeamId={activeTeamId}
            onSelectTeam={setActiveTeamId}
            onUpdateTeamScore={(id, delta) => {
              setTeams(prev => prev.map(t => t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t));
            }}
            isTeacherMode={isTeacherMode}
          />
        )}

        {activeMode === 'buzzer' && (
          <BuzzerBattleArena
            teams={teams}
            setTeams={setTeams}
          />
        )}

        {activeMode === 'court' && (
          <CourtTrialArena
            teams={teams}
            setTeams={setTeams}
            activeTeamId={activeTeamId}
            setActiveTeamId={setActiveTeamId}
          />
        )}
      </div>

      {/* Winner Podium & Certificate Modal */}
      {showPodium && (
        <PodiumModal
          teams={teams}
          onClose={() => setShowPodium(false)}
          onNextSection={onNext}
        />
      )}

      {/* Bottom Step Advancement */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Selesai Bermain Game Turnamen 30 Menit?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Lanjutkan ke tahap refleksi diri (Model 4 Pertanyaan Bab VI.A) dan pengisian piagam integritas peserta didik.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <span>Lanjut ke Tahap 9: Refleksi & Piagam</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};