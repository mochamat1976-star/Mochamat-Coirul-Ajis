import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Volume2, ShieldAlert, Award, Flame, Users, Zap, Trophy, Timer, AlertTriangle, HelpCircle, Music, Heart, BookOpen, Flag } from 'lucide-react';
import { sound, speakText, stopSpeech } from '../../utils/audio';
import { SabangMeraukePlayer } from '../anthem/SabangMeraukePlayer';
import { NATIONAL_ANTHEM } from '../../data/materialData';
import confetti from 'canvas-confetti';

interface IceBreakingSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode: boolean;
}

interface GameRound {
  id: number;
  type: 'action' | 'trap';
  command: string;
  subtext: string;
  buttonLabel: string;
  buttonColor: string;
  icon: string;
  timeLimit: number; // in seconds
}

const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    type: 'action',
    command: '⚖️ HAKIM BERKATA: KETUK PALU KEADILAN!',
    subtext: 'Cepat ketuk palu sebelum waktu habis!',
    buttonLabel: '🔨 KETUK PALU SEKARANG!',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 ring-emerald-300',
    icon: '🔨',
    timeLimit: 3
  },
  {
    id: 2,
    type: 'trap',
    command: '🚨 JEBAKAN: HUKUM RIMBA! JANGAN DISENTUH!',
    subtext: 'Tahan jarimu! Jangan ada yang mengeklik tombol!',
    buttonLabel: '⚠️ JANGAN DIKLIK! (HUKUM RIMBA)',
    buttonColor: 'bg-rose-600 hover:bg-rose-700 ring-rose-300',
    icon: '🛑',
    timeLimit: 3
  },
  {
    id: 3,
    type: 'action',
    command: '⚖️ HAKIM BERKATA: ANGKAT DUA JEMPOL TERTIB!',
    subtext: 'Buktikan komitmen taat aturan dengan refleks cepat!',
    buttonLabel: '👍 ANGKAT DUA JEMPOL!',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 ring-blue-300',
    icon: '👍',
    timeLimit: 2.5
  },
  {
    id: 4,
    type: 'trap',
    command: '🚨 JEBAKAN: HOAKS BERBAHAYA! TAHAN DIRIMU!',
    subtext: 'Saring sebelum klik! Tahan jarimu sampai waktu habis!',
    buttonLabel: '⛔ JANGAN KLIK HOAKS INI!',
    buttonColor: 'bg-amber-600 hover:bg-amber-700 ring-amber-300',
    icon: '🚫',
    timeLimit: 3
  },
  {
    id: 5,
    type: 'action',
    command: '⚖️ HAKIM BERKATA: TEPUK TANGAN PANCASILA!',
    subtext: 'Ramaikan suasana kelas dengan tepuk tangan meriah!',
    buttonLabel: '👏 TEPUK TANGAN MERIAH!',
    buttonColor: 'bg-purple-600 hover:bg-purple-700 ring-purple-300',
    icon: '👏',
    timeLimit: 2.5
  },
  {
    id: 6,
    type: 'action',
    command: '🏆 SIDANG DITUTUP: KETUK PALU TIGA KALI!',
    subtext: 'Puncak ketangkasan! Ketuk untuk mengesahkan kesiapan kelas!',
    buttonLabel: '⚖️ KETUK PALU TIGA KALI!',
    buttonColor: 'bg-red-600 hover:bg-red-700 ring-red-300',
    icon: '🎉',
    timeLimit: 3
  }
];

export const IceBreakingSection: React.FC<IceBreakingSectionProps> = ({
  onComplete,
  onNext,
  isTeacherMode
}) => {
  // Default to the authentic national singing song as requested!
  const [activeTab, setActiveTab] = useState<'song' | 'game' | 'meaning'>('song');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'round_result' | 'finished'>('idle');
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [roundFeedback, setRoundFeedback] = useState<{ isSuccess: boolean; title: string; message: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(3);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const roundStartTimeRef = useRef<number>(0);

  const currentRound = GAME_ROUNDS[currentRoundIndex];

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
    };
  }, []);

  // Timer countdown during playing state
  useEffect(() => {
    if (gameState === 'playing') {
      roundStartTimeRef.current = Date.now();
      setTimeLeft(currentRound.timeLimit);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentRoundIndex]);

  // When time expires
  const handleTimeOut = () => {
    if (currentRound.type === 'trap') {
      // SUCCESS! Student resisted the trap
      sound.playSuccess();
      const addedScore = 20;
      setScore(s => s + addedScore);
      setComboStreak(c => c + 1);
      setRoundFeedback({
        isSuccess: true,
        title: '🌟 LUAR BIASA! FOKUS HAKIM SEMPURNA!',
        message: 'Kamu berhasil menahan diri dan tidak terjebak hukum rimba! Disiplin hukummu sangat hebat (+20 Poin).'
      });
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {}
    } else {
      // FAILED: Timed out on an action round
      sound.playWrong();
      setComboStreak(0);
      setRoundFeedback({
        isSuccess: false,
        title: '⏰ WAKTU HABIS!',
        message: 'Hakim sudah mengetuk palu tapi reaksimu terlambat. Tetap fokus di ronde berikutnya!'
      });
    }
    setGameState('round_result');
  };

  // Reaction button click
  const handleButtonClick = () => {
    if (gameState !== 'playing') return;
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = ((Date.now() - roundStartTimeRef.current) / 1000).toFixed(2);
    setReactionTime(Number(elapsed));

    if (currentRound.type === 'action') {
      // SUCCESS
      sound.playGavel();
      const addedScore = 20;
      setScore(s => s + addedScore);
      setComboStreak(c => c + 1);
      setRoundFeedback({
        isSuccess: true,
        title: '⚡ CEPAT DAN TEPAT!',
        message: `Kecepatan refleksmu luar biasa (${elapsed} detik)! Palu keadilan berhasil diketuk (+20 Poin).`
      });
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      // FAILED
      sound.playWrong();
      setComboStreak(0);
      setRoundFeedback({
        isSuccess: false,
        title: '💥 TERPERANGKAP HUKUM RIMBA!',
        message: 'Harusnya kamu menahan diri dan tidak mengeklik tombol jebakan. Disiplin diri adalah kunci penegak hukum!'
      });
    }
    setGameState('round_result');
  };

  const handleStartGame = () => {
    sound.playFanfare();
    setScore(0);
    setComboStreak(0);
    setCurrentRoundIndex(0);
    setRoundFeedback(null);
    setGameState('playing');
    speakText('Uji Fokus Hakim Keadilan dimulai! Perhatikan perintah hakim dan awasi jebakan ya sahabat pelajar!');
  };

  const handleNextRound = () => {
    sound.playClick();
    if (currentRoundIndex < GAME_ROUNDS.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setRoundFeedback(null);
      setGameState('playing');
    } else {
      sound.playApplause();
      sound.playFanfare();
      setGameState('finished');
      onComplete();
      try {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
      } catch {}
    }
  };

  const handleListenComfortGreeting = () => {
    sound.playComfortingChime();
    speakText(
      'Halo sahabat Pelajar Pancasila yang luar biasa! Selamat datang di ruang belajar yang tenang dan nyaman ini. Tarik napas perlahan, rilekskan pikiranmu, dan rasakan ketenangan bersama teman-teman sekelas. Mari kita bernyanyi bersama lagu Dari Sabang Sampai Merauke dengan sepenuh hati untuk menyatukan semangat kebangsaan kita.',
      undefined,
      'ramah_hangat',
      false
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-4 py-1.5 rounded-full text-xs font-bold border border-red-200 shadow-sm">
          <span>🎵 Bagian 5 dari 10</span>
          <span>•</span>
          <span>Ice Breaking: Nyanyian Kebangsaan</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Lagu Asli: “Dari Sabang Sampai Merauke”
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Ciptaan R. Soerarjo • Bernyanyi bersama dengan iringan harmoni piano merdu untuk menyatukan hati, cinta tanah air, dan kedaulatan hukum Indonesia.
        </p>
      </div>

      {/* Voice Comfort Badge: Suara Ramah yang Bikin Betah Belajar */}
      <div className="bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 rounded-2xl p-4 shadow-sm border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-slate-800 font-medium">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 shadow flex items-center justify-center text-xl font-bold">
            👩‍🏫
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-900">
              🎙️ Pengisi Suara Ruang Belajar:
            </div>
            <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <span>Kakak Mentor Ramah & Hangat</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                Nyaman & Bikin Betah
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleListenComfortGreeting}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-2 transform active:scale-95"
          title="Dengarkan Sapaan Ramah Kakak Pembimbing"
        >
          <Volume2 className="w-4 h-4 text-emerald-600" />
          <span>Dengarkan Sapaan Ramah</span>
        </button>
      </div>

      {/* Teacher Guide Notice */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl shadow-sm text-sm text-amber-950 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-700" />
              <span>Panduan Pedagogis Guru (Ice Breaking Kesiapan Jiwa & Cinta Tanah Air):</span>
            </span>
            <span className="bg-amber-200 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Durasi: 2 - 3 Menit
            </span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Menyanyikan lagu wajib nasional secara bersama-sama dalam suasana yang hangat dan tenang mampu menurunkan kecemasan (*cortisol reduction*) dan menumbuhkan rasa kebersamaan (*social bonding*). Lirik <em>“Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu itulah Indonesia”</em> adalah jembatan emosional paling tepat untuk memahami kesatuan wilayah yang dipersatukan oleh satu hukum yang adil.
          </p>
        </div>
      )}

      {/* Segmented Tab Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner max-w-xl mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('song');
          }}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'song'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>1. Nyanyian Lagu Asli</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('meaning');
          }}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'meaning'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Makna Luhur Lagu</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('game');
          }}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'game'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. Game Refleks Fokus</span>
        </button>
      </div>

      {/* TAB 1: AUTHENTIC ANTHEM SINGING (PRIMARY FEATURE) */}
      {activeTab === 'song' && (
        <div className="space-y-6 animate-fadeIn">
          <SabangMeraukePlayer />
        </div>
      )}

      {/* TAB 2: MEANING OF THE ANTHEM & NATIONAL UNITY */}
      {activeTab === 'meaning' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold">
              🇮🇩
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Pesan Persatuan dalam “Dari Sabang Sampai Merauke”
              </h3>
              <p className="text-xs text-slate-500">
                Karya monumental komponis R. Soerarjo untuk kedaulatan bangsa Indonesia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
              <span className="font-black text-xs text-red-800 uppercase tracking-wider block">
                Pulau Berjajar yang Dipersatukan
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Indonesia membentang luas dari Sabang di ujung barat pulau Sumatra hingga Merauke di ujung timur Papua. Tidak ada daerah yang ditinggalkan, semua berada dalam naungan Republik Indonesia yang satu dan berdaulat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="font-black text-xs text-amber-800 uppercase tracking-wider block">
                Satu Hukum untuk Keadilan Bersama
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Sesuai <strong>UUD NRI 1945 Pasal 1 Ayat 3</strong>, kepulauan yang luas ini disatukan oleh satu tata hukum nasional yang adil. Hukum hadir untuk melindungi hak asasi seluruh warga dari Sabang sampai Merauke tanpa diskriminasi.
              </p>
            </div>
          </div>

          {/* Inspirational Quote Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-red-950 text-white flex items-start gap-4 shadow-md">
            <div className="text-3xl shrink-0">🏛️</div>
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                Refleksi Karakter Pelajar Pancasila:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                “Menjunjung tanah airku, tanah airku Indonesia. Menjunjung tanah air di era sekarang berarti mematuhi aturan hukum, menghormati hak sesama teman, menolak kecurangan, dan menjadi pribadi yang jujur dan berintegritas.”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPTIONAL REFLEX GAME */}
      {activeTab === 'game' && (
        <div className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-red-500/30 relative overflow-hidden animate-fadeIn">
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Top Score Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black uppercase text-[11px]">
                  {gameState === 'playing' ? `Ronde ${currentRoundIndex + 1} / ${GAME_ROUNDS.length}` : 'Status Permainan'}
                </span>
                <span className="font-bold text-slate-200">
                  {gameState === 'idle' ? 'Siap Uji Ketangkasan' : gameState === 'finished' ? 'Game Selesai' : 'Konsentrasi Penuh!'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Flame className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Streak: {comboStreak}x</span>
                </div>
                <div className="flex items-center gap-1.5 font-black text-white bg-white/15 px-3 py-1 rounded-xl border border-white/20">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Skor: {score} Poin</span>
                </div>
              </div>
            </div>

            {/* STATE 1: IDLE */}
            {gameState === 'idle' && (
              <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-2xl flex items-center justify-center text-5xl border-4 border-amber-400 animate-bounce">
                  ⚖️
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    Uji Fokus: Palu Keadilan!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Aturan Main: Ketuk palu saat ada perintah hakim. <strong>JANGAN KLIK</strong> saat ada jebakan hukum rimba atau hoaks! Waktu sangat singkat!
                  </p>
                </div>

                <button
                  onClick={handleStartGame}
                  className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>Mulai Uji Fokus Sekarang!</span>
                </button>
              </div>
            )}

            {/* STATE 2: PLAYING */}
            {gameState === 'playing' && (
              <div className="py-6 space-y-6 text-center">
                {/* Timer Bar */}
                <div className="max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold text-amber-300">
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5" /> Waktu Respon
                    </span>
                    <span>{timeLeft.toFixed(1)} detik</span>
                  </div>
                  <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/20">
                    <div
                      className={`h-full transition-all duration-100 ${
                        timeLeft > 1.5 ? 'bg-emerald-500' : timeLeft > 0.8 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
                      }`}
                      style={{ width: `${(timeLeft / currentRound.timeLimit) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Command Card */}
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 max-w-lg mx-auto space-y-3">
                  <div className="text-4xl">{currentRound.icon}</div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide">
                    {currentRound.command}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200 font-medium">
                    {currentRound.subtext}
                  </p>
                </div>

                {/* Reaction Button */}
                <div className="pt-2">
                  <button
                    onClick={handleButtonClick}
                    className={`px-8 py-6 rounded-3xl font-display font-black text-base sm:text-xl text-white shadow-2xl transition-all transform active:scale-90 ring-4 cursor-pointer ${currentRound.buttonColor}`}
                  >
                    {currentRound.buttonLabel}
                  </button>
                </div>
              </div>
            )}

            {/* STATE 3: ROUND RESULT */}
            {gameState === 'round_result' && roundFeedback && (
              <div className="text-center py-6 space-y-6 max-w-md mx-auto animate-fadeIn">
                <div className="text-5xl">
                  {roundFeedback.isSuccess ? '🎉' : '⚠️'}
                </div>

                <div className="space-y-2">
                  <h3 className={`font-display font-black text-xl sm:text-2xl ${
                    roundFeedback.isSuccess ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {roundFeedback.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/10">
                    {roundFeedback.message}
                  </p>
                </div>

                <button
                  onClick={handleNextRound}
                  className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-display font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <span>{currentRoundIndex < GAME_ROUNDS.length - 1 ? 'Lanjut ke Ronde Berikutnya →' : 'Lihat Hasil Akhir 🏆'}</span>
                </button>
              </div>
            )}

            {/* STATE 4: FINISHED */}
            {gameState === 'finished' && (
              <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center text-5xl shadow-2xl border-4 border-amber-300">
                  🏆
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-black uppercase">
                    FOKUS & REFLEKS SEMPURNA!
                  </span>
                  <h3 className="font-display font-black text-3xl text-white">
                    Kelas 100% Siap Belajar!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Selamat! Seluruh siswa telah membuktikan kecepatan berpikir, daya tahan terhadap jebakan, dan disiplin tinggi. Total perolehan skor fokus kelasmu: <strong>{score} Poin</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Mainkan Sekali Lagi</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playSuccess();
                      onComplete();
                      onNext();
                    }}
                    className="px-7 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-display font-black text-xs sm:text-sm shadow-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut ke Tahap 6: Apersepsi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion & Next Step Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Kesiapan Jiwa & Persatuan Kelas Sudah Terpaut Erat!</span>
          </div>
          <p className="text-xs text-slate-500">
            Setelah menghayati lagu wajib nasional Dari Sabang Sampai Merauke, mari masuki pembahasan materi melalui studi kasus apersepsi.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSuccess();
            onComplete();
            onNext();
          }}
          className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Tahap 6: Apersepsi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
