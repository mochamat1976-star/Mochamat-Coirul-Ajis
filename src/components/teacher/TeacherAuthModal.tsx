import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldAlert, CheckCircle2, X, GraduationCap } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_PIN = '1945';
const BACKUP_PIN = 'guru8';

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === DEFAULT_PIN || pin.trim().toLowerCase() === BACKUP_PIN) {
      sound.playSuccess();
      setErrorMsg('');
      onSuccess();
    } else {
      sound.playWrong();
      setErrorMsg('PIN Salah! Akses ini dilindungi khusus untuk Guru Pengampu.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg mb-3">
            <Lock className="w-6 h-6 text-slate-950" />
          </div>
          <h3 className="font-display font-black text-xl text-white">
            Verifikasi Akses Guru Pengampu
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Mochamat Choirul Ajis, S.Pd. — SMP Negeri 5 Madiun
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Proteksi Keamanan Khusus Guru:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              Mode ini memuat rubrik pembelajaran RPM, kunci pembahasan asesmen, dan <strong>seluruh rekap jawaban siswa</strong>. Siswa tidak diperkenankan mengakses halaman ini.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Masukkan PIN Keamanan Guru:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                maxLength={10}
                placeholder="Masukkan 4 angka PIN (Contoh: 1945)"
                autoFocus
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 font-mono text-center tracking-widest text-lg font-bold outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Hint */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              {showHint ? 'Sembunyikan Petunjuk' : 'Lupa PIN Guru? Klik petunjuk ini'}
            </button>
            {showHint && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-1 font-semibold">
                💡 Petunjuk Resmi: Masukkan tahun kemerdekaan Republik Indonesia yaitu <strong>1945</strong> atau kata sandi <strong>guru8</strong>.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
            >
              Batal / Kembali ke Mode Siswa
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Buka Mode Guru</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
