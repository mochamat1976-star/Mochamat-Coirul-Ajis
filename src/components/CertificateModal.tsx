import React from 'react';
import { X, Printer, Award, Shield, CheckCircle2, Download } from 'lucide-react';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentClass: string;
  commitment: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentClass,
  commitment
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 relative my-8">
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Piagam Penghargaan Pelajar Sadar Hukum</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div className="p-8 sm:p-12 bg-[#fffdfa] border-8 border-double border-amber-600/30 m-4 rounded-2xl relative text-center space-y-6">
          {/* Watermark / Corner Decorations */}
          <div className="absolute top-2 left-2 text-2xl text-amber-600/40">⚜️</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-600/40">⚜️</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-600/40">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-600/40">⚜️</div>

          {/* Header */}
          <div className="space-y-1">
            <div className="text-3xl">🇮🇩</div>
            <div className="text-xs font-black tracking-widest text-red-700 uppercase">
              REPUBLIK INDONESIA • PENDIDIKAN PANCASILA & KEWARGANEGARAAN
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
              PIAGAM KOMITMEN
            </h2>
            <p className="font-display font-bold text-base text-amber-800 tracking-wide">
              DUTA PELAJAR PANCASILA SADAR HUKUM
            </p>
          </div>

          {/* Body */}
          <div className="space-y-3 max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-600 italic">
              Diberikan dengan penuh rasa bangga dan apresiasi kepada:
            </p>

            <div className="border-b-2 border-slate-800 pb-1 inline-block min-w-[280px]">
              <h3 className="font-display font-black text-xl sm:text-3xl text-slate-900">
                {studentName || 'Siswa Berprestasi'}
              </h3>
            </div>

            <p className="text-xs font-bold text-slate-600">
              {studentClass || 'Peserta Didik Indonesia'}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
              Telah berhasil menyelesaikan seluruh modul pembelajaran interaktif materi{' '}
              <strong>"Indonesia Sebagai Negara Hukum (UUD NRI 1945 Pasal 1 Ayat 3)"</strong> dan
              berjanji memegang teguh komitmen integritas:
            </p>

            {/* Commitment Box */}
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 italic">
              “{commitment || 'Saya bertekad menjadi warga negara yang jujur, disiplin menaati aturan di mana pun berada, dan membela kebenaran.'}”
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 items-end max-w-lg mx-auto">
            <div className="text-center space-y-1">
              <div className="text-3xl">🏛️</div>
              <div className="font-bold text-xs text-slate-800">Ruang Belajar PPKn</div>
              <div className="text-[10px] text-slate-500">Kementerian Pendidikan & Kebudayaan</div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-[11px] text-slate-600">{currentDate}</div>
              <div className="font-serif font-bold text-sm text-slate-900 underline mt-4">
                Guru Mata Pelajaran PPKn
              </div>
              <div className="text-[10px] text-slate-500">NIP. Guru Pengampu Pembelajaran</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
