import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Bell, Timer as TimerIcon } from 'lucide-react';
import { sound, speakText } from '../../utils/audio';

interface TournamentTimerProps {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  totalDuration?: number;
}

export const TournamentTimer: React.FC<TournamentTimerProps> = ({
  timeRemaining,
  setTimeRemaining,
  isRunning,
  setIsRunning,
  totalDuration = 1800 // 30 minutes in seconds
}) => {
  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            sound.playTimerAlert();
            sound.playFanfare();
            speakText('Waktu permainan turnamen 30 menit telah berakhir! Mari kita lihat skor akhir kelompok!');
            return 0;
          }

          // Sound alerts at critical timestamps
          if (prev === 600) {
            // 10 minutes left
            sound.playTimerAlert();
            speakText('Perhatian seluruh kelompok, waktu tersisa sepuluh menit!');
          } else if (prev === 300) {
            // 5 minutes left
            sound.playTimerAlert();
            speakText('Waktu tersisa lima menit! Tingkatkan semangat dan kerja sama!');
          } else if (prev === 60) {
            // 1 minute left
            sound.playTimerAlert();
            speakText('Satu menit terakhir!');
          }

          return prev - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, setIsRunning, setTimeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progressPercent = ((totalDuration - timeRemaining) / totalDuration) * 100;

  // Format MM:SS
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const toggleTimer = () => {
    sound.playClick();
    if (!isRunning && timeRemaining === totalDuration) {
      speakText('Turnamen kelompok dimulai! Waktu berjalan 30 menit!');
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    sound.playClick();
    setIsRunning(false);
    setTimeRemaining(totalDuration);
  };

  const addFiveMinutes = () => {
    sound.playClick();
    setTimeRemaining((prev) => Math.min(prev + 300, 3600));
  };

  const subtractFiveMinutes = () => {
    sound.playClick();
    setTimeRemaining((prev) => Math.max(prev - 300, 60));
  };

  const isLowTime = timeRemaining <= 300; // under 5 minutes

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-indigo-500/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white animate-pulse">
            <TimerIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Waktu Turnamen 30 Menit
              </span>
              {isRunning && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Waktu Berjalan
                </span>
              )}
            </div>
            <h4 className="font-bold text-white text-base sm:text-lg">
              Hitung Mundur Pertandingan 6 Kelompok
            </h4>
          </div>
        </div>

        {/* Digital Clock Display */}
        <div className="flex items-center gap-3">
          <div
            className={`px-5 py-2.5 rounded-xl font-mono text-3xl sm:text-4xl font-extrabold tracking-widest border transition-all duration-300 ${
              isLowTime
                ? 'bg-rose-950/80 text-rose-300 border-rose-500 shadow-lg shadow-rose-900/50 animate-pulse'
                : 'bg-slate-950/80 text-amber-300 border-amber-500/40 shadow-inner'
            }`}
          >
            {formattedTime}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={toggleTimer}
              className={`p-2.5 rounded-lg font-bold transition-all shadow-md flex items-center gap-1 text-sm ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
              title={isRunning ? 'Jeda Waktu' : 'Mulai Waktu'}
            >
              {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="hidden sm:inline">{isRunning ? 'Jeda' : 'Mulai'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Reset Waktu ke 30 Menit"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={subtractFiveMinutes}
              className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-600 text-slate-300 transition-colors text-xs flex items-center"
              title="Kurang 5 Menit"
            >
              <Minus className="w-3.5 h-3.5" /> 5m
            </button>

            <button
              onClick={addFiveMinutes}
              className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-600 text-slate-300 transition-colors text-xs flex items-center"
              title="Tambah 5 Menit"
            >
              <Plus className="w-3.5 h-3.5" /> 5m
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3.5">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Awal Permainan (0m)</span>
          <span className="font-semibold text-slate-300">
            {timeRemaining === 0 ? 'WAKTU HABIS!' : `Sisa ${minutes} Menit ${seconds} Detik`}
          </span>
          <span>Batas Waktu (30m)</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isLowTime
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 animate-pulse'
                : 'bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400'
            }`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
