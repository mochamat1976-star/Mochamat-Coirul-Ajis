import React, { useState, useEffect } from 'react';
import { Scale, CheckCircle, XCircle, Volume2, Timer, Sparkles, ArrowRight, RotateCcw, Users } from 'lucide-react';
import { GroupTeam, LawCase } from '../../types';
import { CARTOON_CASES } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface CourtTrialArenaProps {
  teams: GroupTeam[];
  setTeams: React.Dispatch<React.SetStateAction<GroupTeam[]>>;
  activeTeamId: number;
  setActiveTeamId: (id: number) => void;
}

export const CourtTrialArena: React.FC<CourtTrialArenaProps> = ({
  teams,
  setTeams,
  activeTeamId,
  setActiveTeamId
}) => {
  const [caseIndex, setCaseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [discussionTimer, setDiscussionTimer] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [hasKnockedGavel, setHasKnockedGavel] = useState<boolean>(false);

  const currentCase: LawCase = CARTOON_CASES[caseIndex] || CARTOON_CASES[0];
  const judgingTeam = teams[caseIndex % teams.length];

  // 60-second discussion timer for team deliberation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && discussionTimer > 0) {
      interval = setInterval(() => {
        setDiscussionTimer(prev => {
          if (prev <= 1) {
            sound.playTimerAlert();
            speakText('Waktu musyawarah kelompok habis! Silakan Majelis Hakim mengetuk palu dan menentukan vonis.');
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, discussionTimer]);

  const toggleTimer = () => {
    sound.playClick();
    if (!isTimerRunning && discussionTimer === 60) {
      speakText(`Waktu musyawarah dimulai untuk ${judgingTeam.name}! Diskusikan keputusan kalian.`);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const handleKnockGavel = () => {
    sound.playGavel();
    setHasKnockedGavel(true);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    handleKnockGavel();
    setSelectedOption(idx);
    setIsTimerRunning(false);

    const option = currentCase.options[idx];

    setTimeout(() => {
      if (option.isFair) {
        sound.playSuccess();
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch {}
        speakText(`Putusan adil disahkan oleh ${judgingTeam.name}! Meraih 20 poin!`);

        // Award points to judging team
        setTeams(prev =>
          prev.map(t =>
            t.id === judgingTeam.id
              ? {
                  ...t,
                  score: t.score + option.point,
                  casesSolved: t.casesSolved + 1
                }
              : t
          )
        );
      } else {
        sound.playWrong();
        speakText(`Putusan kurang adil. Cermati penjelasan hukum dan asas keadilan.`);
      }
    }, 450);
  };

  const handleNextCase = () => {
    sound.playClick();
    if (caseIndex < CARTOON_CASES.length - 1) {
      const nextIdx = caseIndex + 1;
      setCaseIndex(nextIdx);
      setSelectedOption(null);
      setHasKnockedGavel(false);
      setDiscussionTimer(60);
      setIsTimerRunning(false);
      const nextTeam = teams[nextIdx % teams.length];
      setActiveTeamId(nextTeam.id);
      speakText(`Sidang perkara nomor ${nextIdx + 1}! Majelis Hakim beralih kepada ${nextTeam.name}!`);
    } else {
      sound.playFanfare();
      speakText('Seluruh 6 perkara persidangan telah diputuskan oleh semua kelompok!');
    }
  };

  const readCaseAloud = () => {
    speakText(`Kasus: ${currentCase.title}. Skenario: ${currentCase.scenario}. Pertanyaan: ${currentCase.question}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Judge Designation */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
            <Scale className="w-7 h-7 text-amber-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Sidang Perkara {caseIndex + 1} dari {CARTOON_CASES.length}
              </span>
              <span className="text-xs text-amber-300 font-bold">
                Lokasi: {currentCase.location}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              Majelis Hakim Sidang: <span className="text-amber-400">{judgingTeam.name}</span>
            </h3>
          </div>
        </div>

        {/* 60s Discussion Timer Box */}
        <div className="flex items-center gap-3 bg-slate-800/90 p-2 rounded-xl border border-slate-700">
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Waktu Musyawarah</span>
            <span className={`font-mono text-xl font-black ${discussionTimer <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {discussionTimer}s
            </span>
          </div>

          <button
            onClick={toggleTimer}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow ${
              isTimerRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
            }`}
          >
            {isTimerRunning ? 'Jeda' : 'Mulai Diskusi (60s)'}
          </button>

          <button
            onClick={() => {
              setDiscussionTimer(60);
              setIsTimerRunning(false);
            }}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs"
            title="Reset Timer Musyawarah"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Case Investigation Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl p-1.5 bg-slate-100 rounded-xl">{currentCase.avatar}</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-lg leading-tight">
                {currentCase.title}
              </h4>
              <p className="text-xs text-slate-500">
                Karakter Terkait: <b className="text-indigo-600">{currentCase.cartoonCharacter}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={readCaseAloud}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Dengarkan Perkara</span>
            </button>

            <button
              onClick={handleKnockGavel}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow active:scale-95"
              title="Ketuk Palu Hakim Sidang"
            >
              <span>🔨 Ketuk Palu</span>
            </button>
          </div>
        </div>

        {/* Scenario Story Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
          <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">
            📜 Kronologi Peristiwa Kasus:
          </h5>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
            {currentCase.scenario}
          </p>
        </div>

        {/* Decision Prompt */}
        <div className="mb-4">
          <h5 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            {currentCase.question}
          </h5>
          <p className="text-xs text-slate-500 mt-0.5">
            Sebagai Majelis Hakim, musyawarahkan opsi terbaik berdasarkan prinsip negara hukum:
          </p>
        </div>

        {/* Verdict Options */}
        <div className="space-y-3">
          {currentCase.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isFinished = selectedOption !== null;

            let cardStyle = 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-800';
            if (isFinished) {
              if (option.isFair) {
                cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/40';
              } else if (isSelected && !option.isFair) {
                cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/40';
              } else {
                cardStyle = 'bg-slate-50 border-slate-200 opacity-50';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${cardStyle} ${
                  isFinished ? 'cursor-default' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0">
                      {['A', 'B', 'C'][idx]}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-relaxed">{option.text}</p>

                      {/* Explanation Reveal */}
                      {isFinished && (
                        <p className="text-xs mt-2 font-semibold text-slate-700 bg-white/70 p-2 rounded-lg border border-slate-200">
                          ⚖️ <b>Analisis Hukum:</b> {option.explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  {isFinished && (
                    <div className="shrink-0">
                      {option.isFair ? (
                        <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4" /> Vonis Adil (+{option.point} pts)
                        </span>
                      ) : (
                        isSelected && (
                          <span className="flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                            <XCircle className="w-4 h-4" /> Keliru (0 pts)
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            {selectedOption !== null ? '✅ Vonis telah diketok oleh majelis hakim' : '⏳ Menunggu putusan hakim...'}
          </span>

          <button
            onClick={handleNextCase}
            disabled={caseIndex === CARTOON_CASES.length - 1}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow transition-all disabled:opacity-40"
          >
            <span>Sidang Perkara Selanjutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
