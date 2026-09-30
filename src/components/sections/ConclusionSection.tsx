import React from 'react';
import { Sparkles, Award, Heart, CheckCircle2, RotateCcw, Printer, Share2, BookOpen, Volume2 } from 'lucide-react';
import { MOTIVATIONAL_QUOTES, SUMMARY_ACRONYM } from '../../data/materialData';
import { sound, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ConclusionSectionProps {
  onRestart: () => void;
  studentName: string;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onRestart, studentName }) => {
  const triggerCelebration = () => {
    sound.playFanfare();
    try {
      // Fire confetti from both sides
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  };

  const handleListenSummary = () => {
    const text =
      'Kesimpulan pembelajaran hari ini: Indonesia adalah negara hukum sebagaimana termaktub dalam Pasal 1 Ayat 3 UUD 1945. Ingat akronim HUKUM: Hormati aturan, Utamakan keadilan, Konstitusi pedomannya, Upayakan perdamaian, dan Mulai dari diri sendiri. Kalian adalah harapan bangsa Indonesia!';
    speakText(text);
  };

  const handlePrintSummary = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
          <span>🌟 Bagian 9 dari 9</span>
          <span>•</span>
          <span>Puncak Pembelajaran</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Kesimpulan & Untaian Kata Motivasi Siswa
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Selamat! Kamu telah menuntaskan seluruh materi "Indonesia Sebagai Negara Hukum" dengan sangat membanggakan.
        </p>
      </div>

      {/* Celebration Banner */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white p-6 sm:p-10 rounded-3xl shadow-xl text-center space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="text-5xl animate-bounce">🎓✨</div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white drop-shadow">
            Hebat, {studentName || 'Sahabat Pelajar Pancasila'}!
          </h3>
          <p className="text-xs sm:text-base text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Kamu kini memahami bahwa hukum bukanlah beban atau kekangan, melainkan <strong>anugerah penjaga kebebasan, benteng keadilan, dan jaminan keamanan</strong> bagi 280 juta rakyat Indonesia.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={triggerCelebration}
              className="px-6 py-3 bg-amber-300 hover:bg-amber-200 text-slate-950 font-display font-black text-sm sm:text-base rounded-2xl shadow-lg transition transform hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-red-600" />
              <span>Rayakan Kelulusan Materi Ini! 🎊</span>
            </button>

            <button
              onClick={handleListenSummary}
              className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Dengarkan Pesan Suara Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rangkuman Akronim Emas H-U-K-U-M */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Rumus Cepat Diingat
            </span>
            <h4 className="font-display font-bold text-xl text-slate-900">
              Rangkuman Emas: Akronim “H - U - K - U - M”
            </h4>
          </div>
          <span className="text-xs font-bold bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
            Panduan Hidup Pelajar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {SUMMARY_ACRONYM.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:bg-red-50/30 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white font-display font-black text-xl flex items-center justify-center shadow-md">
                  {item.letter}
                </span>
                <h5 className="font-bold text-sm text-slate-900 mt-3 leading-snug">
                  {item.word}
                </h5>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quotes & Kata Mutiara Tokoh Bangsa */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-red-600" />
          <h4 className="font-display font-bold text-lg text-slate-900">
            Untaian Kata Mutiara Inspiratif dari Tokoh Bangsa
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOTIVATIONAL_QUOTES.map((q, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-2">
                <span className="text-3xl font-serif text-amber-500 opacity-60">“</span>
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed font-medium">
                  {q.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{q.author}</div>
                  <div className="text-[11px] text-slate-500">{q.role}</div>
                </div>
                <span className="text-2xl">{idx === 0 ? '⚖️' : idx === 1 ? '🇮🇩' : idx === 2 ? '🏛️' : '📚'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pesan Penyemangat Akhir dari Guru */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4 text-amber-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl shadow-sm">
            💌
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-amber-950">
              Pesan Cinta & Harapan Guru PPKn untuk Masa Depanmu:
            </h4>
            <p className="text-xs text-amber-800">
              Menyongsong Indonesia Emas 2045 yang Berkeadilan dan Bermartabat
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
          “Anak-anakku yang hebat, negara kita Indonesia membutuhkan generasi muda yang bukan hanya pandai secara akademis, tetapi juga memiliki <strong>hati nurani yang jujur</strong> dan <strong>keberanian moral untuk menegakkan aturan</strong>. Jadilah lilin penerang yang taat aturan mulai dari hal-hal paling sederhana: hormati orang tuamu, sayangi teman-temanmu, rawat alam sekitarmu, dan berbanggalah menjadi anak Indonesia!”
        </p>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrintSummary}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-600" />
            <span>Cetak Rangkuman Materi Pembelajaran</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi dari Judul Pembelajaran</span>
          </button>
        </div>
      </div>
    </div>
  );
};
