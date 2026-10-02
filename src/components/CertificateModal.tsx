import React from 'react';
import { X, Printer, Award, Shield, CheckCircle2, ArrowRight, LogOut } from 'lucide-react';
import { sound } from '../utils/audio';
import { MODULE_INFO } from '../data/materialData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextSection?: () => void;
  studentName: string;
  studentClass: string;
  commitment: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  onNextSection,
  studentName,
  studentClass,
  commitment
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleExitAndProceed = () => {
    sound.playClick();
    onClose();
    if (onNextSection) {
      onNextSection();
    }
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 relative my-6">
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Piagam Duta Penjaga Keutuhan NKRI</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            {onNextSection && (
              <button
                onClick={handleExitAndProceed}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow"
                title="Keluar dari piagam dan lanjut ke pembahasan berikutnya"
              >
                <span>Keluar & Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
              title="Tutup Piagam"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div className="p-6 sm:p-10 bg-[#fffdfa] border-8 border-double border-red-700/30 m-4 rounded-2xl relative text-center space-y-5">
          {/* Watermark / Corner Decorations */}
          <div className="absolute top-2 left-2 text-2xl text-red-600/40">🇮🇩</div>
          <div className="absolute top-2 right-2 text-2xl text-red-600/40">🇮🇩</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-600/40">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-600/40">⚜️</div>

          {/* Header */}
          <div className="space-y-1">
            <div className="text-3xl">🦅</div>
            <div className="text-[11px] font-black tracking-widest text-red-700 uppercase">
              REPUBLIK INDONESIA • {MODULE_INFO.subject.toUpperCase()}
            </div>
            <div className="text-xs font-bold text-slate-600">
              {MODULE_INFO.school} — Tahun Ajaran {MODULE_INFO.academicYear}
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 tracking-tight pt-1">
              PIAGAM PENGHARGAAN
            </h2>
            <p className="font-display font-bold text-base text-red-800 tracking-wide">
              DUTA PENEGAK HUKUM & KEADILAN PELAJAR PANCASILA
            </p>
          </div>

          {/* Body */}
          <div className="space-y-2.5 max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-600 italic">
              Diberikan dengan penuh rasa bangga dan apresiasi kepada:
            </p>

            <div className="border-b-2 border-slate-800 pb-1 inline-block min-w-[280px]">
              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                {studentName || 'Peserta Didik Berprestasi'}
              </h3>
            </div>

            <p className="text-xs font-bold text-slate-700">
              {studentClass || `${MODULE_INFO.grade} - ${MODULE_INFO.school}`}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
              Telah menyelesaikan seluruh rangkaian kegiatan pembelajaran mendalam (Deep Learning) materi{' '}
              <strong>"Indonesia Sebagai Negara Hukum ({MODULE_INFO.constitutionalArticle})"</strong>,
              bernalar kritis memecahkan studi kasus keadilan, dan mengikrarkan komitmen ketertiban hukum:
            </p>

            {/* Commitment Box */}
            <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 italic">
              “{commitment || 'Saya berikrar menjunjung tinggi supremasi hukum, taat pada norma dan peraturan sekolah maupun masyarakat, menolak segala bentuk kecurangan dan perundungan, serta bersikap adil demi terwujudnya keadilan sosial bagi seluruh rakyat Indonesia.'}”
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-6 pt-5 border-t border-slate-200 items-end max-w-lg mx-auto">
            <div className="text-center space-y-1">
              <div className="text-2xl">🏛️</div>
              <div className="font-bold text-xs text-slate-800">{MODULE_INFO.school}</div>
              <div className="text-[10px] text-slate-500">Madiun, Jawa Timur</div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-[11px] text-slate-600">{currentDate}</div>
              <div className="font-serif font-bold text-sm text-slate-900 underline mt-4">
                {MODULE_INFO.author}
              </div>
              <div className="text-[10px] text-slate-700 font-bold">Mahasiswa PPG Pendidikan Pancasila</div>
              <div className="text-[9px] text-slate-400 font-medium">SMP Negeri 5 Madiun</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar with prominent Exit button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Piagam ini bukti kelulusan materi Indonesia Sebagai Negara Hukum.
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Tutup
            </button>

            {onNextSection && (
              <button
                onClick={handleExitAndProceed}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg hover:shadow-red-500/25 ring-2 ring-red-400 cursor-pointer"
                title="Keluar dari piagam dan lanjutkan ke Kesimpulan & Kata Motivasi Siswa"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar & Lanjut ke Tahap 10: Kesimpulan & Motivasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
