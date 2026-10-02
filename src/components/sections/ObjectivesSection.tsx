import React, { useState } from 'react';
import { Target, CheckSquare, Square, ArrowRight, Brain, Heart, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../../data/materialData';
import { sound, speakText, stopSpeech } from '../../utils/audio';

interface ObjectivesSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode?: boolean;
}

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ onComplete, onNext, isTeacherMode }) => {
  const [checkedIds, setCheckedIds] = useState<string[]>(['obj-1', 'obj-2']);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    sound.playClick();
    setCheckedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      if (next.length === LEARNING_OBJECTIVES.length) {
        sound.playSuccess();
        onComplete();
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    sound.playSuccess();
    setCheckedIds(LEARNING_OBJECTIVES.map(o => o.id));
    onComplete();
  };

  const handleListenObjectives = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    const text =
      'Halo sahabat Pelajar Pancasila! Berikut empat tujuan pembelajaran utama kita hari ini. Pertama, memahami prinsip Indonesia sebagai Negara Hukum berdasarkan UUD 1945 Pasal 1 Ayat 3. Kedua, menelaah asas persamaan di depan hukum dan jaminan hak asasi manusia. Ketiga, mengenal peran lembaga-lembaga penegak hukum yang adil. Dan keempat, aktif berkolaborasi dalam turnamen analisis kasus kelompok selama 30 menit. Mari kita capai seluruh target belajar ini bersama-sama dengan tekun dan gembira.';
    speakText(text, () => {
      setIsSpeaking(false);
    }, 'ramah_hangat', true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3.5 py-1 rounded-full text-xs font-bold border border-red-200">
          <span>🎯 Bagian 4 dari 10</span>
          <span>•</span>
          <span>Capaian & Alur Pembelajaran (ATP SMP.D.PPKn.8.2)</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Tujuan Pembelajaran & Target Capaian
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Target kompetensi yang akan kita kuasai bersama dalam pembelajaran materi <strong>Indonesia Sebagai Negara Hukum</strong> hari ini.
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Catatan Asesmen Diagnostik Awal & Rubrik (Mode Guru):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Guru memastikan pemahaman siswa terhadap 4 indikator utama: 2 ranah kognitif (UUD NRI 1945 Pasal 1 Ayat 3 Rechtsstaat vs Machtsstaat & ciri negara hukum), 1 ranah afektif (sikap adil dan integritas anti-perundungan), serta 1 ranah psikomotorik (kolaborasi turnamen 6 kelompok). Setelah tahap ini, arahkan kelas ke kegiatan <strong>Ice Breaking Game: "Uji Fokus Hakim Pancasila"</strong> untuk membakar semangat dan konsentrasi belajar.
          </p>
        </div>
      )}

      {/* Profil Pelajar Pancasila Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5 justify-center md:justify-start">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Dimensi Profil Pelajar Pancasila
          </span>
          <h3 className="font-display font-bold text-xl text-white">Karakter Unggul yang Dikembangkan</h3>
          <p className="text-xs text-purple-100 max-w-lg">
            Melalui materi ini, kamu tidak hanya menghafal aturan, tetapi melatih integritas moral, nalar kritis dalam memecahkan masalah keadilan, dan kemandirian dalam berbuat tertib.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
          <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">✨ Beriman & Bertakwa</span>
          <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">🧠 Bernalar Kritis</span>
          <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">🤝 Bergotong Royong</span>
          <span className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/20">⭐ Mandiri & Berintegritas</span>
        </div>
      </div>

      {/* Interactive Objectives Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Target Capaian Pembelajaran Siswa</span>
            </h3>
            <p className="text-xs text-slate-500">
              Centang target yang telah kamu pahami atau siap kamu pelajari hari ini:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleListenObjectives}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isSpeaking
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Hentikan' : 'Dengarkan Audio'}</span>
            </button>
            <button
              onClick={handleSelectAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Centang Semua
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_OBJECTIVES.map((obj, index) => {
            const isChecked = checkedIds.includes(obj.id);

            return (
              <div
                key={obj.id}
                onClick={() => toggleCheck(obj.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isChecked
                    ? 'border-purple-500 bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        obj.category === 'Kognitif'
                          ? 'bg-blue-100 text-blue-800'
                          : obj.category === 'Afektif'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Aspek {obj.category}
                    </span>
                    <button className="text-purple-600">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {index + 1}. {obj.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-100/60 flex items-center gap-2 text-[11px] text-purple-900 font-medium">
                  <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Indikator: {obj.indicator}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress & Next Step */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-600">
            Target yang dipilih: <strong className="text-purple-700">{checkedIds.length}</strong> dari{' '}
            {LEARNING_OBJECTIVES.length} target pembelajaran.
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onComplete();
              onNext();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lanjut ke Tahap 5: Ice Breaking (Uji Fokus)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
