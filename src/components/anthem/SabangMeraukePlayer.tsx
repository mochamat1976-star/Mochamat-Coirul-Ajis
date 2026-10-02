import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Music, Sparkles, Mic, Flag, CheckCircle2, X } from 'lucide-react';
import { playSabangMeraukeSong, stopSabangMeraukeSong, SABANG_MERAUKE_SONG, sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface SabangMeraukePlayerProps {
  onClose?: () => void;
  isOpenAsModal?: boolean;
}

export const SabangMeraukePlayer: React.FC<SabangMeraukePlayerProps> = ({
  onClose,
  isOpenAsModal = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [speed, setSpeed] = useState<number>(1.0);
  const [withVocals, setWithVocals] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      stopSabangMeraukeSong();
    };
  }, []);

  const handleStartPlay = () => {
    sound.playClick();
    setIsPlaying(true);
    setCurrentLineIndex(0);
    setCurrentWordIndex(0);

    playSabangMeraukeSong(
      speed,
      (lineIdx, wordIdx) => {
        setCurrentLineIndex(lineIdx);
        setCurrentWordIndex(wordIdx);
      },
      (lineIdx) => {
        setCurrentLineIndex(lineIdx);
        setCurrentWordIndex(0);
      },
      () => {
        setIsPlaying(false);
        setCurrentWordIndex(-1);
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch {}
      },
      withVocals
    );
  };

  const handleStopPlay = () => {
    sound.playClick();
    stopSabangMeraukeSong();
    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      handleStopPlay();
    } else {
      handleStartPlay();
    }
  };

  const content = (
    <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-400/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-red-950/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shadow-inner">
            🇮🇩
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              Lagu Wajib Nasional • R. Soerarjo
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              Lagu Asli: Dari Sabang Sampai Merauke
            </h3>
            <p className="text-xs text-red-100">
              Nyanyian Asli Merdu dengan Iringan Harmoni Piano & Paduan Suara Pelajar Pancasila
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Interactive Avatar Stage: Paduan Suara Pelajar Pancasila */}
      <div className="relative z-10 bg-black/25 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 mb-6 text-center">
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-4">
          {/* Avatar Putra Pelajar Pancasila */}
          <div className={`transition-all duration-300 transform ${isPlaying ? 'scale-110' : 'scale-100'}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl">
              🧑‍🎓
            </div>
            <span className="block mt-1 text-[11px] font-black tracking-wide text-amber-300">
              Pelajar Putra 🎶
            </span>
          </div>

          {/* Sound Wave / Flag Visualizer */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 border border-white/40 flex items-center justify-center text-2xl shadow-lg font-bold">
              🇮🇩
            </div>
            <div className="flex items-end gap-1 mt-2 h-6">
              {[40, 75, 100, 60, 90, 45, 80].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-amber-300 rounded-full transition-all duration-150 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
                  style={{ height: isPlaying ? `${Math.max(6, (h * (currentWordIndex + 1)) % 24)}px` : '4px' }}
                />
              ))}
            </div>
          </div>

          {/* Avatar Putri Pelajar Pancasila */}
          <div className={`transition-all duration-300 transform ${isPlaying ? 'scale-110' : 'scale-100'}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-700 border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl">
              👩‍🎓
            </div>
            <span className="block mt-1 text-[11px] font-black tracking-wide text-emerald-300">
              Pelajar Putri 🎤
            </span>
          </div>
        </div>

        {/* Current Active Lyric Display with Bouncing Star */}
        <div className="min-h-[90px] flex flex-col items-center justify-center px-2">
          {isPlaying ? (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-2xl font-black">
                {SABANG_MERAUKE_SONG[currentLineIndex].notes.map((note, wIdx) => {
                  const isActive = currentWordIndex === wIdx;
                  return (
                    <span
                      key={wIdx}
                      className={`transition-all duration-200 px-2 py-0.5 rounded-xl ${
                        isActive
                          ? 'bg-amber-300 text-slate-950 scale-125 shadow-lg font-black'
                          : wIdx < currentWordIndex
                          ? 'text-amber-200'
                          : 'text-white/70'
                      }`}
                    >
                      {note.word}
                    </span>
                  );
                })}
              </div>
              <div className="text-xs sm:text-sm text-amber-200/90 font-mono tracking-widest">
                {SABANG_MERAUKE_SONG[currentLineIndex].subtext}
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-amber-200">
                “Dari Sabang sampai Merauke berjajar pulau-pulau...”
              </p>
              <p className="text-xs text-red-100">
                Tekan tombol putar di bawah untuk menyanyikan lagu bersama paduan suara Pelajar Pancasila!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lyrics Overview Box */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 mb-6 text-xs sm:text-sm space-y-1.5">
        <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5" />
          <span>Teks Lirik Lagu Lengkap:</span>
        </div>
        {SABANG_MERAUKE_SONG.map((line, idx) => (
          <div
            key={idx}
            className={`transition-colors py-0.5 px-2 rounded-lg flex items-center justify-between ${
              isPlaying && currentLineIndex === idx
                ? 'bg-amber-400/30 text-amber-200 font-extrabold'
                : 'text-white/80'
            }`}
          >
            <span>{line.text}</span>
            <span className="font-mono text-[10px] text-white/50">{line.subtext}</span>
          </div>
        ))}
      </div>

      {/* Control Buttons Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Jeda Musik</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Putar Lagu Sekarang</span>
              </>
            )}
          </button>

          <button
            onClick={handleStopPlay}
            disabled={!isPlaying}
            className="p-3 bg-white/15 hover:bg-white/25 disabled:opacity-40 text-white rounded-2xl transition cursor-pointer"
            title="Hentikan / Ulangi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Settings: Vocal Toggle & Speed */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Vocal Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setWithVocals(!withVocals);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              withVocals
                ? 'bg-emerald-500 text-white shadow'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="Aktifkan vokal nyanyian merdu"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{withVocals ? 'Vokal Nyanyian: ON' : 'Karaoke Musik Saja'}</span>
          </button>

          {/* Tempo Speed */}
          <div className="flex items-center bg-black/30 rounded-xl p-1 border border-white/15 text-xs font-bold">
            <button
              onClick={() => setSpeed(0.9)}
              className={`px-2 py-1 rounded-lg transition ${speed === 0.9 ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/70'}`}
              title="Tempo Tenang & Khidmat"
            >
              0.9x
            </button>
            <button
              onClick={() => setSpeed(1.0)}
              className={`px-2 py-1 rounded-lg transition ${speed === 1.0 ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/70'}`}
              title="Tempo Standar"
            >
              1.0x
            </button>
            <button
              onClick={() => setSpeed(1.15)}
              className={`px-2 py-1 rounded-lg transition ${speed === 1.15 ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/70'}`}
              title="Tempo Ceria Cepat"
            >
              1.15x
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="max-w-2xl w-full">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
