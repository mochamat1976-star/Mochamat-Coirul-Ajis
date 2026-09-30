import React, { useState } from 'react';
import { Dices, Sparkles, ChevronRight, Gift, AlertTriangle, ArrowUpRight, HelpCircle, Trophy, RotateCcw } from 'lucide-react';
import { BoardCell, GroupTeam, MysteryCard } from '../../types';
import { BOARD_CELLS, MYSTERY_CARDS } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BoardGameArenaProps {
  teams: GroupTeam[];
  setTeams: React.Dispatch<React.SetStateAction<GroupTeam[]>>;
  activeTeamId: number;
  setActiveTeamId: (id: number) => void;
}

export const BoardGameArena: React.FC<BoardGameArenaProps> = ({
  teams,
  setTeams,
  activeTeamId,
  setActiveTeamId
}) => {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [currentEventCell, setCurrentEventCell] = useState<BoardCell | null>(null);
  const [revealedMysteryCard, setRevealedMysteryCard] = useState<MysteryCard | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  // Roll the virtual dice
  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceValue(null);
    setCurrentEventCell(null);
    setRevealedMysteryCard(null);
    setQuizAnswered(null);

    sound.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 8) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        processMove(finalValue);
      }
    }, 90);
  };

  // Move the active team on the board
  const processMove = (steps: number) => {
    const currentPos = activeTeam.boardPosition;
    let newPos = Math.min(currentPos + steps, 30);
    const landingCell = BOARD_CELLS.find(c => c.index === newPos) || BOARD_CELLS[0];

    // Trigger cell event after animation delay
    setTimeout(() => {
      sound.playClick();
      setCurrentEventCell(landingCell);

      if (landingCell.type === 'finish') {
        sound.playFanfare();
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch {}
        speakText(`Selamat kepada ${activeTeam.name}! Berhasil mencapai Istana Keadilan!`);
        updateTeamPositionAndScore(newPos, 50);
      } else if (landingCell.type === 'ladder') {
        sound.playSuccess();
        const target = landingCell.targetIndex || newPos;
        speakText(`Tangga Keadilan! ${activeTeam.name} melompat maju ke petak nomor ${target}!`);
        try {
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
        } catch {}
        updateTeamPositionAndScore(target, landingCell.points || 25);
      } else if (landingCell.type === 'slide') {
        sound.playWrong();
        const target = landingCell.targetIndex || newPos;
        speakText(`Peringatan sanksi! ${activeTeam.name} merosot turun ke petak nomor ${target}!`);
        updateTeamPositionAndScore(target, landingCell.points || -10);
      } else if (landingCell.type === 'mystery') {
        sound.playCardFlip();
        const randomCard = MYSTERY_CARDS[Math.floor(Math.random() * MYSTERY_CARDS.length)];
        setRevealedMysteryCard(randomCard);
        speakText(`Kotak Misteri Konstitusi terbuka untuk ${activeTeam.name}! ${randomCard.title}`);
        updateTeamPositionAndScore(newPos + (randomCard.stepsDelta || 0), randomCard.pointsDelta);
      } else if (landingCell.type === 'quiz') {
        sound.playClick();
        speakText(`Petak Kuis Konstitusi untuk ${activeTeam.name}! Diskusikan jawaban bersama tim!`);
        // Just move position, points awarded on quiz answer
        updateTeamPositionAndScore(newPos, 0);
      } else {
        // Normal cell
        sound.playSuccess();
        updateTeamPositionAndScore(newPos, landingCell.points || 10);
      }
    }, 600);
  };

  const updateTeamPositionAndScore = (newPos: number, pointsDelta: number) => {
    setTeams(prev =>
      prev.map(t => {
        if (t.id === activeTeam.id) {
          const boundedPos = Math.max(1, Math.min(newPos, 30));
          const updatedScore = Math.max(0, t.score + pointsDelta);
          return {
            ...t,
            boardPosition: boundedPos,
            score: updatedScore
          };
        }
        return t;
      })
    );
  };

  // Next team turn
  const handleNextTurn = () => {
    sound.playClick();
    const currentIndex = teams.findIndex(t => t.id === activeTeamId);
    const nextIndex = (currentIndex + 1) % teams.length;
    const nextTeam = teams[nextIndex];
    setActiveTeamId(nextTeam.id);
    setDiceValue(null);
    setCurrentEventCell(null);
    setRevealedMysteryCard(null);
    setQuizAnswered(null);
    speakText(`Giliran berikutnya: ${nextTeam.name}! Silakan putar dadu.`);
  };

  // Quick quiz handler on quiz tile
  const handleQuizAnswer = (isCorrect: boolean) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(isCorrect);
    if (isCorrect) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 30, spread: 60 });
      } catch {}
      updateTeamPositionAndScore(activeTeam.boardPosition, 15);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Turn Action Banner & 3D Dice Station */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-indigo-400/30 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3.5">
          <div className="text-4xl p-2 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20 shadow-inner">
            {activeTeam.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow">
                Giliran Beraksi
              </span>
              <span className="text-xs text-indigo-200 font-medium">
                Petak #{activeTeam.boardPosition}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {activeTeam.name}
            </h3>
            <p className="text-xs text-indigo-200 italic mt-0.5">
              "{activeTeam.motto}"
            </p>
          </div>
        </div>

        {/* Dice Roller Center */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={handleRollDice}
              disabled={isRolling}
              className={`w-20 h-20 rounded-2xl font-black text-3xl flex flex-col items-center justify-center transition-all shadow-xl border-2 ${
                isRolling
                  ? 'bg-amber-400 text-slate-950 border-amber-300 animate-spin scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-indigo-200 hover:scale-105 active:scale-95'
              }`}
              title="Klik untuk Kocok Dadu"
            >
              {diceValue ? (
                <span className="text-4xl">{diceValue}</span>
              ) : (
                <Dices className="w-10 h-10 text-indigo-600" />
              )}
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 mt-1">
                {isRolling ? 'Kocok...' : 'Putar Dadu'}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleRollDice}
              disabled={isRolling}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Dices className="w-4 h-4" />
              <span>Kocok Dadu</span>
            </button>

            <button
              onClick={handleNextTurn}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <span>Giliran Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Event Popout Banner if landing on special cell */}
      {currentEventCell && (
        <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-indigo-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="text-4xl p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                {currentEventCell.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                    Petak #{currentEventCell.index}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-900 text-white">
                    {currentEventCell.title}
                  </span>
                </div>
                <p className="text-slate-700 text-sm font-medium mt-1">
                  {currentEventCell.description}
                </p>

                {/* Ladder / Slide info */}
                {currentEventCell.type === 'ladder' && (
                  <div className="mt-2 text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 border border-emerald-200">
                    <ArrowUpRight className="w-4 h-4" /> Bonus Melangkah ke Petak #{currentEventCell.targetIndex} (+{currentEventCell.points} Poin)
                  </div>
                )}

                {currentEventCell.type === 'slide' && (
                  <div className="mt-2 text-xs font-black text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 border border-rose-200">
                    <AlertTriangle className="w-4 h-4" /> Sanksi Meluncur Turun ke Petak #{currentEventCell.targetIndex} ({currentEventCell.points} Poin)
                  </div>
                )}

                {/* Mystery card details */}
                {revealedMysteryCard && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <h5 className="font-extrabold text-amber-900 text-sm flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-amber-600" /> {revealedMysteryCard.title}
                    </h5>
                    <p className="text-xs text-amber-800 mt-1">
                      {revealedMysteryCard.description}
                    </p>
                    <div className="mt-2 text-xs font-black text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded inline-block">
                      ⚡ {revealedMysteryCard.actionText}
                    </div>
                  </div>
                )}

                {/* Mini quiz on quiz cell */}
                {currentEventCell.type === 'quiz' && quizAnswered === null && (
                  <div className="mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                    <p className="text-xs font-bold text-indigo-900 mb-2">
                      Jawab pertanyaan bersama kelompok: Apakah bunyi Pasal 1 Ayat (3) UUD 1945?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuizAnswer(true)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow"
                      >
                        A. "Negara Indonesia adalah negara hukum"
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(false)}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow"
                      >
                        B. "Negara Indonesia berdasarkan kekuasaan semata"
                      </button>
                    </div>
                  </div>
                )}

                {quizAnswered !== null && (
                  <div className={`mt-2 text-xs font-bold px-3 py-1 rounded-lg inline-block ${quizAnswered ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {quizAnswered ? 'Jawaban Benar! (+15 Poin)' : 'Jawaban Kurang Tepat, tetap semangat!'}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNextTurn}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1 shrink-0 transition-colors shadow"
            >
              Lanjut <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 30-Cell Visual Game Board */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              🗺️ Papan Ekspedisi 30 Petak Satria Hukum
            </h4>
            <p className="text-xs text-slate-500">
              Jelajahi 30 petak norma, hindari perosotan sanksi, raih tangga keadilan, dan capai Istana Keadilan!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              Total 30 Petak
            </span>
          </div>
        </div>

        {/* Board Grid: 5 columns x 6 rows = 30 tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
          {BOARD_CELLS.map((cell) => {
            // Find teams currently on this cell
            const teamsOnCell = teams.filter(t => t.boardPosition === cell.index);
            const isFinish = cell.type === 'finish';
            const isLadder = cell.type === 'ladder';
            const isSlide = cell.type === 'slide';
            const isMystery = cell.type === 'mystery';
            const isQuiz = cell.type === 'quiz';

            let cellBg = 'bg-slate-50 border-slate-200';
            if (isFinish) cellBg = 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-amber-400 shadow-md ring-2 ring-amber-300';
            else if (isLadder) cellBg = 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200';
            else if (isSlide) cellBg = 'bg-rose-50 border-rose-300 ring-1 ring-rose-200';
            else if (isMystery) cellBg = 'bg-purple-50 border-purple-300';
            else if (isQuiz) cellBg = 'bg-blue-50 border-blue-300';

            return (
              <div
                key={cell.index}
                className={`relative rounded-xl p-2.5 min-h-[90px] border flex flex-col justify-between transition-all hover:scale-[1.02] ${cellBg}`}
              >
                {/* Cell Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${isFinish ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    #{cell.index}
                  </span>
                  <span className="text-xl">{cell.icon}</span>
                </div>

                {/* Cell Title */}
                <div className="my-1">
                  <p className="text-[11px] font-extrabold text-slate-800 leading-tight line-clamp-2">
                    {cell.title}
                  </p>
                  {cell.badge && (
                    <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${
                      isLadder ? 'text-emerald-700' : isSlide ? 'text-rose-700' : 'text-slate-600'
                    }`}>
                      {cell.badge}
                    </span>
                  )}
                </div>

                {/* Team Avatars on this Cell */}
                <div className="flex flex-wrap items-center gap-1 min-h-[22px] pt-1 border-t border-slate-200/50">
                  {teamsOnCell.map(t => (
                    <span
                      key={t.id}
                      className={`text-sm px-1 py-0.5 rounded-full shadow-xs ring-2 ${t.ringColor} bg-white animate-bounce`}
                      title={`${t.name} (Poin: ${t.score})`}
                    >
                      {t.avatar}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
            🪜 Tangga Keadilan (Lompat Maju)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-100 border border-rose-400" />
            🛝 Perosotan Sanksi (Mundur)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-100 border border-purple-400" />
            🎁 Kotak Misteri
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-400" />
            ❓ Kuis Konstitusi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-300 border border-amber-500" />
            🏆 Istana Finish
          </span>
        </div>
      </div>
    </div>
  );
};
