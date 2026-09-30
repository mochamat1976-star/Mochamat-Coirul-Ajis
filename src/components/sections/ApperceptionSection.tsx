import React, { useState } from 'react';
import { Lightbulb, AlertTriangle, ShieldCheck, ArrowRight, HelpCircle, Check, Sparkles } from 'lucide-react';
import { APPERCEPTION_CASES } from '../../data/materialData';
import { sound } from '../../utils/audio';

interface ApperceptionSectionProps {
  onComplete: () => void;
  onNext: () => void;
}

export const ApperceptionSection: React.FC<ApperceptionSectionProps> = ({ onComplete, onNext }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'with' | 'without'>('without');
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);

  const currentCase = APPERCEPTION_CASES[activeCaseIndex];

  const handleSelectPoll = (index: number) => {
    sound.playClick();
    setSelectedPoll(index);
    onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold border border-amber-200">
          <span>💡 Bagian 5 dari 9</span>
          <span>•</span>
          <span>Apersepsi & Pemantik Nalar</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Apersepsi: Mengapa Kita Butuh Hukum?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Bayangkan sejenak jika di dunia ini sama sekali tidak ada peraturan, undang-undang, atau polisi. Apa yang akan terjadi pada kehidupan kita?
        </p>
      </div>

      {/* Case Navigator Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {APPERCEPTION_CASES.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              sound.playClick();
              setActiveCaseIndex(idx);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeCaseIndex === idx
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{idx === 0 ? '🚦' : idx === 1 ? '🍱' : '📱'}</span>
            <span>{c.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Comparison Simulation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Eksperimen Pemikiran: Kasus {activeCaseIndex + 1}
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900">
              {currentCase.title}
            </h3>
          </div>

          {/* Toggle Button: With Law vs Without Law */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playWrong();
                setViewMode('without');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'without'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Tanpa Aturan ❌</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                setViewMode('with');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'with'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dengan Hukum & Aturan ✅</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display based on Toggle */}
        {viewMode === 'without' ? (
          <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-200 text-rose-800 flex items-center justify-center text-2xl flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-rose-900">
                  Kekacauan Ketika Tidak Ada Aturan (Hukum Rimba)
                </h4>
                <p className="text-xs text-rose-700">
                  Siapa yang kuat menindas yang lemah; rasa takut merajalela setiap saat.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-rose-100 space-y-2">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {currentCase.withoutLaw.description}
              </p>
              <div className="pt-2 border-t border-rose-100 flex items-center gap-2 text-xs font-bold text-rose-700">
                <span>Dampak Nyata:</span>
                <span>{currentCase.withoutLaw.impact}</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  sound.playSuccess();
                  setViewMode('with');
                }}
                className="text-xs font-bold text-rose-800 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-4 py-2 rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat apa yang terjadi jika ada HUKUM yang melindungi ➔</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-200 text-emerald-800 flex items-center justify-center text-2xl flex-shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-emerald-900">
                  Ketertiban & Keadilan Terwujud Berkat Hukum
                </h4>
                <p className="text-xs text-emerald-700">
                  Setiap orang memiliki rasa aman, hak dihormati, dan kedamaian tercipta.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-emerald-100 space-y-2">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {currentCase.withLaw.description}
              </p>
              <div className="pt-2 border-t border-emerald-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                <span>Dampak Nyata:</span>
                <span>{currentCase.withLaw.impact}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{currentCase.lesson}</span>
            </div>
          </div>
        )}

        {/* Latin Maxim */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <p className="font-serif italic text-base sm:text-lg text-slate-800 font-bold">
            “Ubi societas ibi ius”
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Pepatah Hukum Klasik (Cicero): “Di mana ada masyarakat, di situ pasti ada hukum.”
          </p>
        </div>
      </div>

      {/* Interactive Trigger Polling */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="font-display font-bold text-lg text-slate-900">
            Kuis Pemantik Apersepsi: Pendapatmu Penting!
          </h3>
        </div>

        <p className="text-sm text-slate-700 font-medium">
          “Menurut kamu, apa tujuan utama diciptakannya hukum di negara kita Indonesia?”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              text: 'Untuk menakut-nakuti dan menghukum orang sebanyak-banyaknya.',
              isCorrect: false,
              feedback: 'Kurang tepat. Hukum bukan alat balas dendam atau rasa takut, melainkan sarana keteraturan dan keadilan bersama.'
            },
            {
              text: 'Menciptakan ketertiban, keadilan, dan melindungi hak setiap warga negara.',
              isCorrect: true,
              feedback: 'Tepat sekali! Hukum hadir sebagai pelindung martabat manusia dan penjaga ketenteraman hidup bermasyarakat.'
            },
            {
              text: 'Hanya untuk menguntungkan orang-orang tertentu yang berkuasa.',
              isCorrect: false,
              feedback: 'Salah! Dalam negara hukum (Rechtsstaat), hukum berlaku bagi siapa saja tanpa pandang bulu (Equality Before the Law).'
            }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPoll(idx)}
              className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                selectedPoll === idx
                  ? item.isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                    : 'border-rose-400 bg-rose-50 text-rose-950'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                {String.fromCharCode(65 + idx)}. {item.text}
              </div>

              {selectedPoll === idx && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs font-normal">
                  <span className="font-bold">{item.isCorrect ? '✅ Ulasan: ' : '⚠️ Ulasan: '}</span>
                  {item.feedback}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playSuccess();
              onComplete();
              onNext();
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <span>Lanjut ke Penjelasan Materi Inti</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
