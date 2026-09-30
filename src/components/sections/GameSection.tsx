import React, { useState } from 'react';
import { Trophy, Dices, Zap, Scale, Award, Sparkles, CheckCircle, ArrowRight, RotateCcw, Volume2, HelpCircle, Users, Clock } from 'lucide-react';
import { GroupTeam } from '../../types';
import { DEFAULT_TEAMS } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import { TournamentTimer } from '../game/TournamentTimer';
import { GroupLeaderboard } from '../game/GroupLeaderboard';
import { BoardGameArena } from '../game/BoardGameArena';
import { BuzzerBattleArena } from '../game/BuzzerBattleArena';
import { CourtTrialArena } from '../game/CourtTrialArena';
import { PodiumModal } from '../game/PodiumModal';
import confetti from 'canvas-confetti';

interface GameSectionProps {
  onComplete: () => void;
  onNext: () => void;
}

export const GameSection: React.FC<GameSectionProps> = ({ onComplete, onNext }) => {
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
      speakText('Mode Board Game Ekspedisi Tiga Puluh Petak Konstitusi dibuka!');
    } else if (mode === 'buzzer') {
      speakText('Mode Cepat Tepat Bel Rebutan dibuka! Siapkan jari di tombol bel kelompok masing-masing!');
    } else if (mode === 'court') {
      speakText('Mode Sidang Peradilan Mahkamah Cilik dibuka! Majelis hakim bergantian tiap perkara!');
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                🎮 Tahap 7: Turnamen Edukasi 30 Menit
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-indigo-200 border border-white/20 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-300" /> 6 Kelompok Kolaboratif
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-emerald-300 border border-white/20 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Durasi 30:00 Menit
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Turnamen Akbar: Satria Negara Hukum
            </h2>
            <p className="text-indigo-200 text-sm sm:text-base mt-1 max-w-2xl">
              Permainan interaktif kelompok untuk menguji ketangkasan, pemahaman konstitusi, dan integritas. Dilengkapi 3 arena permainan seru, 30 petak papan, bel cepat tepat, dan sidang kasus peradilan!
            </p>
          </div>

          {/* Quick Guide & Podium Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 shadow"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Panduan Guru (30 Menit)</span>
            </button>

            <button
              onClick={handleOpenPodium}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black transition-all shadow-lg flex items-center gap-1.5 active:scale-95"
            >
              <Trophy className="w-4 h-4" />
              <span>Penganugerahan Juara</span>
            </button>
          </div>
        </div>

        {/* Collapsible Classroom Guide */}
        {showGuide && (
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-indigo-100 animate-in fade-in space-y-2">
            <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              📋 Manajemen Waktu Turnamen 30 Menit untuk Guru & 6 Kelompok:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 01 - 12 (Board Game)</span>
                Masing-masing kelompok melempar dadu bergiliran, menjelajahi 30 petak norma, menaiki tangga keadilan, dan membuka kotak misteri.
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 13 - 22 (Cepat Tepat Bel)</span>
                Adu ketangkasan bel rebutan! Tiap kelompok menekan tombol nomornya di layar/keyboard saat guru membacakan pertanyaan HOTS.
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="font-black text-amber-300 block mb-1">⏱️ Menit 23 - 30 (Sidang Kasus & Juara)</span>
                Tiap kelompok berembuk 60 detik menentukan vonis kasus hukum nyata, diikuti penganugerahan piala & cetak piagam juara!
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
      <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => handleModeChange('board')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeMode === 'board'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Dices className="w-4 h-4 text-amber-300" />
            <span>Arena 1: Board Game (30 Petak)</span>
          </button>

          <button
            onClick={() => handleModeChange('buzzer')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeMode === 'buzzer'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Arena 2: Cepat Tepat Bel (6 Bel)</span>
          </button>

          <button
            onClick={() => handleModeChange('court')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeMode === 'court'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Arena 3: Sidang Mahkamah (6 Kasus)</span>
          </button>
        </div>

        <button
          onClick={handleOpenPodium}
          className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black flex items-center gap-1.5 transition-colors ml-auto"
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Lihat Klasemen Podium Juara</span>
        </button>
      </div>

      {/* Active Arena Component */}
      <div className="transition-all">
        {activeMode === 'board' && (
          <BoardGameArena
            teams={teams}
            setTeams={setTeams}
            activeTeamId={activeTeamId}
            setActiveTeamId={setActiveTeamId}
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
            Lanjutkan ke tahap refleksi diri (Model 3-2-1) dan pembuatan piagam individu pelajar sadar hukum.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <span>Lanjut ke Tahap 8: Refleksi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
