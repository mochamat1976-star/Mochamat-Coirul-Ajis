import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sparkles, CheckCircle, XCircle, Timer, Users, Trophy, Award, ArrowRight, Volume2, HelpCircle, Shield, Scale, ChevronRight } from 'lucide-react';
import { GroupTeam, WheelSegment, WheelChallenge } from '../../types';
import { WHEEL_SEGMENTS, WHEEL_CHALLENGES } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface WheelOfJusticeArenaProps {
  teams: GroupTeam[];
  activeTeamId: number;
  onSelectTeam: (id: number) => void;
  onUpdateTeamScore: (id: number, delta: number) => void;
  isTeacherMode?: boolean;
}

export const WheelOfJusticeArena: React.FC<WheelOfJusticeArenaProps> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onUpdateTeamScore,
  isTeacherMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [selectedChallenge, setSelectedChallenge] = useState<WheelChallenge | null>(null);
  const [activeSegment, setActiveSegment] = useState<WheelSegment | null>(null);
  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  // 45-Second Group Deliberation Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev === 1) {
            sound.playTimerWarning();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds]);

  // Draw Wheel on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 15;
    const numSegments = WHEEL_SEGMENTS.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, width, height);

    // Save state for rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);

    // Draw Outer Shadow Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    // Draw Segments
    WHEEL_SEGMENTS.forEach((seg, i) => {
      const startAngle = i * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Segment text and icon
      ctx.save();
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(`${seg.icon} ${seg.label}`, radius - 20, 0);

      // Points badge
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText(`+${seg.points}p`, radius - 110, 0);
      ctx.restore();
    });

    // Draw Center Cap
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚖️', 0, 0);

    ctx.restore();

    // Draw Top Pointer Triangle (Fixed at Top)
    ctx.beginPath();
    ctx.moveTo(centerX - 16, 8);
    ctx.lineTo(centerX + 16, 8);
    ctx.lineTo(centerX, 36);
    ctx.closePath();
    ctx.fillStyle = '#dc2626';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Little pin shadow
    ctx.beginPath();
    ctx.arc(centerX, 14, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#fef08a';
    ctx.fill();
  }, [currentRotation]);

  const handleSpinWheel = () => {
    if (isSpinning) return;
    sound.playClick();
    setIsSpinning(true);
    setShowChallengeModal(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    // Random landing segment index (0 to 7)
    const targetSegmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const numSegments = WHEEL_SEGMENTS.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    // The top pointer points at angle -PI/2 (or 3PI/2).
    // An angle theta on the wheel will land under pointer if:
    // (targetSegmentCenterAngle + currentRotation) % 2PI == 3PI/2
    const targetSegmentCenter = targetSegmentIndex * segmentAngle + segmentAngle / 2;
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
    const targetAngle = (3 * Math.PI) / 2 - targetSegmentCenter + extraRotations;

    const startTime = performance.now();
    const duration = 3800; // 3.8s spin
    const startRotation = currentRotation % (2 * Math.PI);
    const deltaRotation = targetAngle;

    let lastTickAngle = startRotation;

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newRot = startRotation + deltaRotation * easeOut;
      setCurrentRotation(newRot);

      // Play tick sound when passing segments
      if (Math.abs(newRot - lastTickAngle) > segmentAngle / 2) {
        sound.playWheelTick();
        lastTickAngle = newRot;
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        const landedSeg = WHEEL_SEGMENTS[targetSegmentIndex];
        setActiveSegment(landedSeg);

        // Find corresponding challenge
        const challenge = WHEEL_CHALLENGES.find(c => c.segmentId === landedSeg.id) || WHEEL_CHALLENGES[0];
        setSelectedChallenge(challenge);

        sound.playFanfare();
        setTimerSeconds(45);
        setIsTimerActive(true);
        setShowChallengeModal(true);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !selectedChallenge) return;
    setIsAnswerSubmitted(true);
    setIsTimerActive(false);

    if (selectedOption === selectedChallenge.correctIndex) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch {}
      onUpdateTeamScore(activeTeamId, selectedChallenge.rewardPoints);
    } else {
      sound.playWrong();
    }
  };

  const handleNextTurn = () => {
    sound.playClick();
    setShowChallengeModal(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsTimerActive(false);

    // Pass turn to next group (1 to 6)
    const nextTeamId = (activeTeamId % teams.length) + 1;
    onSelectTeam(nextTeamId);
  };

  return (
    <div className="space-y-6">
      {/* Active Team Highlight Banner */}
      <div className={`p-4 sm:p-5 rounded-3xl border-2 ${activeTeam.borderColor} ${activeTeam.bgColor}/10 flex flex-wrap items-center justify-between gap-4 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl border border-slate-200">
            {activeTeam.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white">
                Giliran Aktif Memutar
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTeam.badgeBg}`}>
                Skor: {activeTeam.score} Pts
              </span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 mt-0.5">
              {activeTeam.name}
            </h3>
            <p className="text-xs text-slate-500 italic">“{activeTeam.motto}”</p>
          </div>
        </div>

        {/* Group Selector Dropdown / Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-bold mr-1">Pilih Giliran:</span>
          {teams.map(t => (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                onSelectTeam(t.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                t.id === activeTeamId
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-400'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{t.avatar}</span>
              <span className="hidden sm:inline">Kel. {t.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Wheel Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Spinning Wheel Graphic */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-center mb-4 space-y-1">
            <h4 className="font-display font-black text-xl text-slate-900 flex items-center justify-center gap-2">
              <RotateCw className={`w-5 h-5 text-red-600 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>Roda Putar Keadilan & Misi Kasus</span>
            </h4>
            <p className="text-xs text-slate-500">
              Putar roda untuk mendapatkan tantangan kasus hukum, pasal konstitusi, atau kartu emas poin keadilan!
            </p>
          </div>

          {/* Canvas Container */}
          <div className="relative my-2">
            <canvas
              ref={canvasRef}
              width={380}
              height={380}
              className="max-w-full drop-shadow-2xl cursor-pointer"
              onClick={handleSpinWheel}
            />
          </div>

          {/* Spin Trigger Button */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className={`px-8 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center gap-3 transition transform active:scale-95 shadow-xl cursor-pointer ${
                isSpinning
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white shadow-amber-500/25 ring-4 ring-amber-300/40'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Roda Sedang Berputar...' : `PUTAR RODA KEADILAN (KELOMPOK ${activeTeamId})`}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            💡 Setiap kelompok bergiliran memutar roda dan bermusyawarah menyelesaikan misi hukum.
          </p>
        </div>

        {/* Right: Challenge Panel / Live Status */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Team Points Standings Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-display font-black text-base text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Papan Skor Turnamen 6 Kelompok</span>
              </h4>
              <span className="text-xs text-amber-300 font-bold">Live Score</span>
            </div>

            <div className="space-y-2.5">
              {[...teams]
                .sort((a, b) => b.score - a.score)
                .map((t, rank) => (
                  <div
                    key={t.id}
                    className={`p-2.5 rounded-2xl flex items-center justify-between text-xs transition border ${
                      t.id === activeTeamId
                        ? 'bg-white/15 border-amber-400 font-bold'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[10px] font-black flex items-center justify-center">
                        #{rank + 1}
                      </span>
                      <span className="text-base">{t.avatar}</span>
                      <span className="text-slate-200 truncate max-w-[140px]">{t.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-amber-300 text-sm">{t.score} Pts</span>
                      {isTeacherMode && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onUpdateTeamScore(t.id, 5)}
                            className="w-5 h-5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer"
                            title="Tambah 5 Poin (Guru)"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => onUpdateTeamScore(t.id, -5)}
                            className="w-5 h-5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer"
                            title="Kurang 5 Poin (Guru)"
                          >
                            -5
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Wheel Segment Legend Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>8 Sektor Roda Putar Keadilan:</span>
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {WHEEL_SEGMENTS.map(s => (
                <div key={s.id} className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-base">{s.icon}</span>
                  <div className="truncate">
                    <div className="font-bold text-slate-800 truncate text-[11px]">{s.label}</div>
                    <div className="text-[10px] text-amber-600 font-extrabold">+{s.points} Poin</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Challenge Modal (Popup upon landing) */}
      {showChallengeModal && selectedChallenge && activeSegment && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in zoom-in-95">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto space-y-0">
            {/* Modal Header */}
            <div
              className="p-5 text-white flex items-center justify-between"
              style={{ backgroundColor: activeSegment.color }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-white/20 rounded-2xl backdrop-blur-xs">
                  {activeSegment.icon}
                </span>
                <div>
                  <span className="text-xs uppercase font-black tracking-wider text-yellow-200">
                    Tantangan {activeSegment.label} • Hadiah +{selectedChallenge.rewardPoints} Poin
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white">
                    {selectedChallenge.title}
                  </h3>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <Timer className={`w-4 h-4 ${timerSeconds <= 10 ? 'text-rose-300 animate-pulse' : 'text-amber-300'}`} />
                <span className="font-mono font-black text-sm text-white">
                  {timerSeconds}s
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Active Team Answering */}
              <div className="flex items-center justify-between text-xs bg-slate-100 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activeTeam.avatar}</span>
                  <span className="font-extrabold text-slate-800">
                    Giliran Menjawab: {activeTeam.name}
                  </span>
                </div>
                <span className="text-slate-500 font-medium">Bermusyawarahlah dalam kelompok!</span>
              </div>

              {/* Scenario Description */}
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                  Situasi Kasus:
                </span>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {selectedChallenge.scenario}
                </p>
              </div>

              {/* Question */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
                  {selectedChallenge.question}
                </h4>

                <div className="space-y-2">
                  {selectedChallenge.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === selectedChallenge.correctIndex;

                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-300';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                  selectedOption === selectedChallenge.correctIndex
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="font-bold flex items-center gap-2">
                    {selectedOption === selectedChallenge.correctIndex ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>Jawaban Kelompok Benar! (+{selectedChallenge.rewardPoints} Poin)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Jawaban Kurang Tepat!</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed pt-1">
                    {selectedChallenge.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Poin Langsung Terekam di Leaderboard Turnamen
              </span>

              <div className="flex items-center gap-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer shadow ${
                      selectedOption !== null
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Kunci Jawaban Kelompok
                  </button>
                ) : (
                  <button
                    onClick={handleNextTurn}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <span>Lanjut ke Giliran Kelompok Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
