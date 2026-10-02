import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle, ArrowRight, Clock, Heart, BookOpen, Sparkles } from 'lucide-react';
import { PRAYERS } from '../../data/materialData';
import { sound, speakText, stopSpeech } from '../../utils/audio';

interface PrayerSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode?: boolean;
}

export const PrayerSection: React.FC<PrayerSectionProps> = ({ onComplete, onNext, isTeacherMode }) => {
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('islam');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [hasPrayed, setHasPrayed] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const currentPrayer = PRAYERS.find(p => p.id === selectedPrayerId) || PRAYERS[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sound.playFanfare();
      setHasPrayed(true);
      onComplete();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, onComplete]);

  const handleStartTimer = (seconds: number) => {
    sound.playClick();
    setTimerSeconds(seconds);
    setIsTimerRunning(true);
  };

  const handleListenPrayer = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const speechText = `${currentPrayer.title}. ${currentPrayer.latin}. Artinya: ${currentPrayer.meaning}`;
    speakText(speechText, () => {
      setIsSpeaking(false);
    });
  };

  const handleConfirmPrayed = () => {
    sound.playSuccess();
    setHasPrayed(true);
    onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
          <span>🤲 Bagian 2 dari 10</span>
          <span>•</span>
          <span>Spiritual & Budi Pekerti</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Berdoa Sebelum Belajar
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Sebagai insan beriman dan warga negara yang berketuhanan (Sila ke-1 Pancasila), marilah kita mengawali kegiatan belajar ini dengan memohon petunjuk dan keberkahan ilmu kepada Tuhan Yang Maha Esa.
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Panduan Berdoa Kelas (Mode Guru):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Guru dapat menunjuk ketua kelas memimpin doa atau memanfaatkan pemutar audio lantunan doa bersama dan timer hening 60 detik di bawah ini untuk menciptakan ketenangan spiritual sebelum memulai pembelajaran.
          </p>
        </div>
      )}

      {/* Prayer Choice Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {PRAYERS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              stopSpeech();
              setIsSpeaking(false);
              sound.playClick();
              setSelectedPrayerId(p.id);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              selectedPrayerId === p.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102 ring-2 ring-emerald-400'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{p.id === 'islam' ? '🌙' : p.id === 'universal' ? '🇮🇩' : p.id === 'christian' ? '✝️' : '🕊️'}</span>
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      {/* Prayer Card */}
      <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          {/* Header of Prayer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Doa Penuntut Ilmu
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">{currentPrayer.title}</h3>
            </div>

            {/* Audio Speech Button */}
            <button
              onClick={handleListenPrayer}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                isSpeaking
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Hentikan Suara' : 'Dengarkan Pelafalan Doa'}</span>
            </button>
          </div>

          {/* Arabic Text (If available) */}
          {currentPrayer.arabic && (
            <div className="bg-emerald-900/5 p-6 rounded-2xl border border-emerald-100 text-center">
              <p className="font-serif text-2xl sm:text-3xl leading-loose text-emerald-950 font-bold tracking-wide" dir="rtl">
                {currentPrayer.arabic}
              </p>
            </div>
          )}

          {/* Latin Transliteration */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bacaan Latin:</span>
            <p className="text-base sm:text-lg font-semibold text-slate-800 italic bg-white p-3.5 rounded-xl border border-slate-200">
              "{currentPrayer.latin}"
            </p>
          </div>

          {/* Indonesian Meaning */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Artinya:</span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
              {currentPrayer.meaning}
            </p>
          </div>

          {/* Adab Note */}
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-900">
            <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Adab Berdoa: </span>
              <span>{currentPrayer.adab}</span>
            </div>
          </div>

          {/* Silent Reflection Mode / Timer for Focus */}
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Latihan Hening Cipta & Berdoa Khusyuk:
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isTimerRunning ? (
                <span className="text-sm font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg animate-pulse">
                  Berdoa sedang berlangsung... {timerSeconds} dtk
                </span>
              ) : (
                <>
                  <button
                    onClick={() => handleStartTimer(15)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    15 Detik
                  </button>
                  <button
                    onClick={() => handleStartTimer(30)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    30 Detik
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Confirmation Action */}
          <div className="pt-4 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleConfirmPrayed}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition cursor-pointer ${
                hasPrayed
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{hasPrayed ? 'Doa Telah Ditunaikan ✓' : 'Saya Sudah Selesai Berdoa'}</span>
            </button>

            {hasPrayed && (
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer animate-bounce"
              >
                <span>Lanjut ke Absensi Kelas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
