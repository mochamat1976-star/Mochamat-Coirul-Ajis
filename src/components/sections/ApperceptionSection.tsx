import React, { useState } from 'react';
import { Lightbulb, AlertTriangle, ShieldCheck, ArrowRight, HelpCircle, Check, Sparkles, MapPin, Globe, Compass } from 'lucide-react';
import { APPERCEPTION_CASES, MODULE_INFO } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import { saveStudentSubmission } from '../../services/studentSubmissionStore';

interface ApperceptionSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode?: boolean;
  studentName?: string;
  studentClass?: string;
}

export const ApperceptionSection: React.FC<ApperceptionSectionProps> = ({ onComplete, onNext, isTeacherMode, studentName = '', studentClass = '' }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'with' | 'without'>('without');
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<string | null>('nusantara');

  const currentCase = APPERCEPTION_CASES[activeCaseIndex];

  const handleSelectPoll = (index: number) => {
    sound.playClick();
    setSelectedPoll(index);

    const pollTexts = [
      'Agar penguasa memiliki kewenangan bebas tanpa perlu dibatasi peraturan.',
      'Agar seluruh warga negara terlindungi hak asasinya, ada kepastian hukum, dan keadilan tegak tanpa pandang bulu.',
      'Agar hukum hanya berlaku bagi rakyat biasa sedangkan pejabat kebal hukum.'
    ];

    saveStudentSubmission(studentName || 'Peserta Didik Aktif', studentClass || 'Kelas VIII-A', prev => ({
      ...prev,
      aperceptionAnswer: {
        question: 'Mengapa dalam UUD NRI 1945 Pasal 1 Ayat 3 ditegaskan Indonesia adalah Negara Hukum?',
        selectedText: pollTexts[index] || '',
        isCorrect: index === 1,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    }));

    onComplete();
  };

  const islands = [
    { id: 'sumatera', name: 'Pulau Sumatera', info: 'Bumi Andalas, berbatasan langsung dengan Selat Malaka.', emoji: '🌿' },
    { id: 'jawa', name: 'Pulau Jawa & Madiun', info: 'Pusat aktivitas nasional & letak SMP Negeri 5 Madiun.', emoji: '🏛️' },
    { id: 'kalimantan', name: 'Pulau Kalimantan', info: 'Bumi Borneo, paru-paru dunia dan lokasi IKN Nusantara.', emoji: '🌳' },
    { id: 'sulawesi', name: 'Pulau Sulawesi', info: 'Bumi Celebes, kekayaan maritim & kepulauan tropis.', emoji: '⛵' },
    { id: 'papua', name: 'Pulau Papua & Merauke', info: 'Ujung timur NKRI, kaya sumber daya dan keindahan alam.', emoji: '🌄' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3.5 py-1 rounded-full text-xs font-bold border border-red-200">
          <span>💡 Bagian 6 dari 10</span>
          <span>•</span>
          <span>Apersepsi & Peta Wilayah NKRI</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Apersepsi: Mengapa Indonesia yang Begitu Luas Tetap Bersatu?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Dari Sabang sampai Merauke membentang lebih dari 17.000 pulau, ratusan suku, bahasa, dan adat istiadat. Mengapa kita tidak terpecah menjadi negara-negara kecil?
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Panduan Apersepsi Bermakna (Mode Guru):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Gunakan peta kepulauan dan studi kasus komparasi untuk merangsang rasa ingin tahu siswa: <em>"Apa yang mengikat pulau-pulau yang terpisah lautan luas ini menjadi satu kesatuan?"</em> Kunci jawabannya terletak pada kesepakatan konstitusi Pasal 1 Ayat 1 UUD 1945, Sumpah Pemuda 1928, dan semboyan Bhinneka Tunggal Ika.
          </p>
        </div>
      )}

      {/* Interactive Digital Map of NKRI Exploration */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-500/30">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '15s' }} />
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
              Peta Digital Nusantara: Sambung Menyambung Menjadi Satu
            </h3>
          </div>
          <span className="text-xs bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full shadow">
            Sabang ➔ Merauke
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Klik pulau-pulau besar di bawah ini untuk melihat bagaimana keberagaman disatukan dalam satu kedaulatan:
        </p>

        {/* Islands Interactive Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
          {islands.map((island) => (
            <button
              key={island.id}
              onClick={() => {
                sound.playClick();
                setSelectedIsland(island.id);
                speakText(`${island.name}: ${island.info}`);
              }}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedIsland === island.id
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <div className="text-2xl mb-1">{island.emoji}</div>
              <div className="font-extrabold text-xs">{island.name}</div>
            </button>
          ))}
        </div>

        {/* Selected Island Info Card */}
        {selectedIsland && (
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs sm:text-sm text-amber-200 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white">Fokus Wilayah: </span>
              {islands.find(i => i.id === selectedIsland)?.info || 'Wilayah NKRI membentang luas dalam satu ikatan Pancasila.'}
            </div>
          </div>
        )}
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
                ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{idx === 0 ? '🗺️' : '⚠️'}</span>
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-display font-extrabold text-xl text-slate-900">
              {currentCase.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bandingkan dua kondisi: Ketika persatuan runtuh vs ketika kita bersatu teguh dalam NKRI
            </p>
          </div>

          {/* Toggle Button Group */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-fit self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playWrong();
                setViewMode('without');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'without'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Tanpa Aturan Hukum</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                setViewMode('with');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'with'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Dengan Supremasi Hukum</span>
            </button>
          </div>
        </div>

        {/* Content Display based on View Mode */}
        {viewMode === 'without' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-rose-50/70 border border-rose-200 p-6 rounded-3xl animate-fadeIn">
            <div className="md:col-span-4 text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-5xl shadow-inner">
                ⚡
              </div>
              <span className="inline-block mt-3 px-3 py-1 bg-rose-200 text-rose-900 text-xs font-black rounded-full uppercase">
                Kondisi Tanpa Kepastian Hukum (Hukum Rimba)
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <h4 className="font-display font-extrabold text-lg text-rose-950">
                Gambaran Kekacauan & Ketidakadilan:
              </h4>
              <p className="text-sm text-rose-900 leading-relaxed font-medium">
                {currentCase.withoutLaw.description}
              </p>
              <div className="p-3 bg-white/80 rounded-xl border border-rose-200 text-xs text-rose-800 font-semibold flex items-center gap-2">
                <span>💥 Dampak:</span>
                <span>{currentCase.withoutLaw.impact}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-emerald-50/70 border border-emerald-200 p-6 rounded-3xl animate-fadeIn">
            <div className="md:col-span-4 text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-5xl shadow-inner">
                ⚖️
              </div>
              <span className="inline-block mt-3 px-3 py-1 bg-emerald-200 text-emerald-900 text-xs font-black rounded-full uppercase">
                Kondisi Tertib & Terlindungi Hukum
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <h4 className="font-display font-extrabold text-lg text-emerald-950">
                Kedamaian & Kedaulatan Bersama:
              </h4>
              <p className="text-sm text-emerald-900 leading-relaxed font-medium">
                {currentCase.withLaw.description}
              </p>
              <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <span>🛡️ Manfaat:</span>
                <span>{currentCase.withLaw.impact}</span>
              </div>
            </div>
          </div>
        )}

        {/* Key Takeaway Lesson */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-xs uppercase tracking-wider text-amber-900 block">
              Hikmah Pembelajaran Apersepsi:
            </span>
            <p className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
              {currentCase.lesson}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Trigger Polling */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-600" />
          <h3 className="font-display font-bold text-lg text-slate-900">
            Pertanyaan Pemantik RPM: Uji Nalar Kritis!
          </h3>
        </div>

        <p className="text-sm text-slate-700 font-medium">
          “Mengapa dalam UUD NRI 1945 Pasal 1 Ayat (3) ditegaskan bahwa Indonesia adalah Negara Hukum (Rechtsstaat), bukan negara kekuasaan (Machtsstaat)?”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              text: 'Agar penguasa memiliki kewenangan bebas tanpa perlu dibatasi oleh peraturan perundang-undangan.',
              isCorrect: false,
              feedback: 'Keliru! Negara hukum justru hadir untuk mencegah tirani dan kesewenang-wenangan penguasa.'
            },
            {
              text: 'Agar seluruh warga negara terlindungi hak asasinya, ada kepastian hukum, dan keadilan tegak tanpa pandang bulu.',
              isCorrect: true,
              feedback: 'Tepat sekali! Rechtsstaat menjamin supremasi hukum, equality before the law, dan perlindungan martabat rakyat.'
            },
            {
              text: 'Agar hukum hanya berlaku bagi rakyat biasa sedangkan pejabat memiliki kekebalan hukum khusus.',
              isCorrect: false,
              feedback: 'Salah besar! Prinsip equality before the law menjamin semua warga sama kedudukannya di dalam hukum.'
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
            <span>Lanjut ke Penjelasan Materi Negara Hukum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
