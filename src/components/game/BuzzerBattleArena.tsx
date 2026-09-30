import React, { useState, useEffect } from 'react';
import { Zap, Bell, CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy, HelpCircle, Timer, Volume2 } from 'lucide-react';
import { BuzzerQuestion, GroupTeam } from '../../types';
import { BUZZER_QUESTIONS } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BuzzerBattleArenaProps {
  teams: GroupTeam[];
  setTeams: React.Dispatch<React.SetStateAction<GroupTeam[]>>;
}

export const BuzzerBattleArena: React.FC<BuzzerBattleArenaProps> = ({
  teams,
  setTeams
}) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [buzzedTeamId, setBuzzedTeamId] = useState<number | null>(null);
  const [answerTimer, setAnswerTimer] = useState<number>(15);
  const [isAnswerTimerRunning, setIsAnswerTimerRunning] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<{ isCorrect: boolean; teamId: number } | null>(null);
  const [lockedTeams, setLockedTeams] = useState<number[]>([]); // Teams that answered wrong on this question

  const currentQuestion: BuzzerQuestion = BUZZER_QUESTIONS[questionIndex];
  const buzzedTeam = teams.find(t => t.id === buzzedTeamId);

  // Keyboard shortcut listener for keys 1 through 6
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Keys '1' to '6'
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const teamIndex = parseInt(e.key, 10) - 1;
        const targetTeam = teams[teamIndex];
        if (targetTeam) {
          handleBuzz(targetTeam.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [buzzedTeamId, lockedTeams, answeredState]);

  // Answer countdown timer (15 seconds)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAnswerTimerRunning && answerTimer > 0) {
      timer = setInterval(() => {
        setAnswerTimer(prev => {
          if (prev <= 1) {
            sound.playWrong();
            speakText('Waktu menjawab habis!');
            setIsAnswerTimerRunning(false);
            if (buzzedTeamId) {
              setLockedTeams(prevLocked => [...prevLocked, buzzedTeamId]);
              setBuzzedTeamId(null);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAnswerTimerRunning, answerTimer, buzzedTeamId]);

  // Trigger a team buzzer press
  const handleBuzz = (teamId: number) => {
    if (buzzedTeamId !== null || answeredState !== null || lockedTeams.includes(teamId)) {
      return; // Already buzzed or answered or locked
    }

    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    sound.playGroupBuzzer(team.id - 1);
    setBuzzedTeamId(team.id);
    setAnswerTimer(15);
    setIsAnswerTimerRunning(true);
    speakText(`Bel ditekan oleh ${team.name}! Silakan jawab dalam 15 detik!`);
  };

  // Select an option by the buzzed team
  const handleSelectAnswer = (optionIdx: number) => {
    if (selectedOption !== null || !buzzedTeamId || answeredState !== null) return;

    setSelectedOption(optionIdx);
    setIsAnswerTimerRunning(false);
    const isCorrect = optionIdx === currentQuestion.correctAnswer;

    if (isCorrect) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {}
      setAnsweredState({ isCorrect: true, teamId: buzzedTeamId });
      speakText(`Luar biasa tepat! ${buzzedTeam?.name} mendapatkan 20 poin!`);

      // Award +20 points and increment buzzersWon
      setTeams(prev =>
        prev.map(t => {
          if (t.id === buzzedTeamId) {
            return {
              ...t,
              score: t.score + currentQuestion.points,
              buzzersWon: t.buzzersWon + 1
            };
          }
          return t;
        })
      );
    } else {
      sound.playWrong();
      setAnsweredState({ isCorrect: false, teamId: buzzedTeamId });
      speakText(`Jawaban kurang tepat! Pengurangan 10 poin untuk ${buzzedTeam?.name}. Kelompok lain bersiap merebut!`);

      // Deduct -10 points, lock this team, and allow other teams to buzz
      setTeams(prev =>
        prev.map(t => {
          if (t.id === buzzedTeamId) {
            return { ...t, score: Math.max(0, t.score - 10) };
          }
          return t;
        })
      );

      // Lock out the failing team so remaining 5 can buzz
      setLockedTeams(prev => [...prev, buzzedTeamId]);

      // Release buzzer for steal after 1.5 seconds
      setTimeout(() => {
        setSelectedOption(null);
        setAnsweredState(null);
        setBuzzedTeamId(null);
        setAnswerTimer(15);
      }, 2000);
    }
  };

  // Next question
  const handleNextQuestion = () => {
    sound.playClick();
    if (questionIndex < BUZZER_QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      sound.playFanfare();
      speakText('Seluruh soal Cepat Tepat Bel telah selesai!');
    }
  };

  // Previous question
  const handlePrevQuestion = () => {
    sound.playClick();
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setBuzzedTeamId(null);
    setSelectedOption(null);
    setAnsweredState(null);
    setLockedTeams([]);
    setAnswerTimer(15);
    setIsAnswerTimerRunning(false);
  };

  const readQuestionAloud = () => {
    speakText(`Soal nomor ${questionIndex + 1}: ${currentQuestion.question}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Question Header */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentQuestion.category}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Soal {questionIndex + 1} dari {BUZZER_QUESTIONS.length}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Cepat Tepat Bel Rebutan Satria Hukum
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={readQuestionAloud}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Bacakan Soal dengan Suara"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Bacakan Soal</span>
            </button>

            <button
              onClick={resetQuestionState}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Reset Status Bel Soal Ini"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Bel</span>
            </button>
          </div>
        </div>

        {/* Question Text Card */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-inner border border-indigo-500/30">
          <p className="text-lg sm:text-xl font-bold leading-relaxed">
            {currentQuestion.question}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-indigo-200">
            <span>Nilai: <b className="text-amber-300">+{currentQuestion.points} Poin</b> (Salah: -10 Poin)</span>
            <span className="italic">Gunakan bel kelompok di bawah atau tekan tombol 1 - 6 pada keyboard</span>
          </div>
        </div>
      </div>

      {/* 6 Giant Buzzer Buttons */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div>
            <h4 className="font-extrabold text-base text-amber-300 flex items-center gap-2">
              <Bell className="w-5 h-5 fill-current text-amber-400 animate-bounce" />
              Papan 6 Tombol Bel Rebutan Kelompok
            </h4>
            <p className="text-xs text-slate-400">
              Kelompok tercepat yang memencet bel berhak menjawab soal terlebih dahulu!
            </p>
          </div>

          {/* Answer Countdown */}
          {buzzedTeamId && (
            <div className="flex items-center gap-2 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-mono font-black text-sm shadow animate-pulse">
              <Timer className="w-4 h-4" />
              <span>Sisa Waktu Jawab: {answerTimer}s</span>
            </div>
          )}
        </div>

        {/* 6 Giant Buzzers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {teams.map((team, idx) => {
            const isBuzzed = team.id === buzzedTeamId;
            const isLocked = lockedTeams.includes(team.id);

            return (
              <button
                key={team.id}
                onClick={() => handleBuzz(team.id)}
                disabled={buzzedTeamId !== null || isLocked || answeredState?.isCorrect}
                className={`relative rounded-2xl p-4 flex flex-col items-center justify-between min-h-[130px] transition-all transform active:scale-95 shadow-lg border-2 ${
                  isBuzzed
                    ? 'bg-amber-400 border-amber-200 text-slate-950 scale-105 ring-4 ring-amber-300 shadow-amber-500/50 animate-pulse'
                    : isLocked
                    ? 'bg-slate-800 border-slate-700 text-slate-500 opacity-40 cursor-not-allowed'
                    : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-600 text-white hover:border-slate-400'
                }`}
              >
                {/* Keyboard Shortcut Badge */}
                <span className="absolute top-2 left-2 text-[10px] font-black px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                  Key [{idx + 1}]
                </span>

                <div className="text-3xl mt-2">{team.avatar}</div>

                <div className="text-center my-1">
                  <h5 className="font-black text-xs leading-tight">
                    {team.name}
                  </h5>
                  <span className="text-[10px] opacity-75 font-semibold">
                    {team.score} pts
                  </span>
                </div>

                <div className="w-full">
                  <span
                    className={`block w-full py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-center ${
                      isBuzzed
                        ? 'bg-slate-950 text-amber-300'
                        : isLocked
                        ? 'bg-rose-950 text-rose-300'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isBuzzed ? '⚡ TERCEPAT!' : isLocked ? 'Terkunci' : 'PENCET BEL!'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Options (Enabled when a team buzzes) */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            Pilihan Jawaban Soal:
          </h4>
          {buzzedTeam && (
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
              Hak Jawab: <b>{buzzedTeam.name}</b>
            </span>
          )}
        </div>

        {!buzzedTeamId && (
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-center text-xs font-bold text-amber-800">
            🔔 Menunggu salah satu kelompok memencet bel di atas untuk membuka opsi jawaban!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {currentQuestion.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const showCorrectness = selectedOption !== null;

            let btnClass = 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800';
            if (showCorrectness) {
              if (isCorrect) {
                btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-rose-500 text-white border-rose-600 shadow-md';
              } else {
                btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={!buzzedTeamId || selectedOption !== null}
                className={`p-3.5 rounded-xl border-2 font-bold text-sm text-left flex items-start gap-3 transition-all ${btnClass} ${
                  !buzzedTeamId ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0">
                  {letter}
                </span>
                <span className="leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {selectedOption !== null && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in">
            <h5 className="font-black text-xs uppercase tracking-wider text-slate-500 mb-1">
              Pembahasan Kunci Konstitusi:
            </h5>
            <p className="text-sm font-semibold text-slate-800">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation bottom */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            ← Soal Sebelumnya
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={questionIndex === BUZZER_QUESTIONS.length - 1}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow transition-all disabled:opacity-40"
          >
            <span>Soal Selanjutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
