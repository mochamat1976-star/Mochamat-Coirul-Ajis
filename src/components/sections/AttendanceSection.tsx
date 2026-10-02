import React, { useState, useEffect } from 'react';
import { UserCheck, Users, Download, Printer, ArrowRight, Sparkles, Smile, CheckCircle2, Trash2 } from 'lucide-react';
import { AttendanceRecord } from '../../types';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { saveStudentSubmission } from '../../services/studentSubmissionStore';

interface AttendanceSectionProps {
  onComplete: () => void;
  onNext: () => void;
  onStudentRecorded: (name: string, studentClass: string) => void;
  currentStudentName: string;
  isTeacherMode?: boolean;
}

const STORAGE_KEY = 'ruang_belajar_ppkn_attendance';

const MOODS = [
  { emoji: '🔥', label: 'Membara Semangat' },
  { emoji: '😊', label: 'Ceria & Bahagia' },
  { emoji: '🧐', label: 'Penasaran Belajar' },
  { emoji: '💪', label: 'Siap Berjuang' },
  { emoji: '🧘', label: 'Tenang & Fokus' }
];

export const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  onComplete,
  onNext,
  onStudentRecorded,
  currentStudentName,
  isTeacherMode
}) => {
  const [name, setName] = useState<string>(currentStudentName || '');
  const [studentNumber, setStudentNumber] = useState<string>('01');
  const [className, setClassName] = useState<string>('Kelas VIII-A');
  const [status, setStatus] = useState<'Hadir' | 'Izin' | 'Sakit'>('Hadir');
  const [mood, setMood] = useState<string>('🔥');
  const [hope, setHope] = useState<string>('Ingin mengerti mengapa hukum sangat penting di Indonesia.');
  
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecords(JSON.parse(saved));
      } else {
        // Sample starter class data
        const initialSample: AttendanceRecord[] = [
          {
            id: 'sample-1',
            name: 'Ahmad Faiz Fadhlurrahman',
            studentNumber: '01',
            className: 'Kelas VIII-A',
            status: 'Hadir',
            mood: '🔥',
            hope: 'Ingin tahu lembaga-lembaga hukum di Indonesia.',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          },
          {
            id: 'sample-2',
            name: 'Nadhira Putri Kirana',
            studentNumber: '02',
            className: 'Kelas VIII-A',
            status: 'Hadir',
            mood: '😊',
            hope: 'Semoga bisa menjadi hakim cilik yang adil.',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          },
          {
            id: 'sample-3',
            name: 'Bintang Pratama',
            studentNumber: '03',
            className: 'Kelas VIII-A',
            status: 'Hadir',
            mood: '🧐',
            hope: 'Ingin mengerti Pasal 1 Ayat 3 UUD 1945.',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          }
        ];
        setRecords(initialSample);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSample));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    sound.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      name: name.trim(),
      studentNumber,
      className,
      status,
      mood,
      hope: hope.trim() || 'Semangat belajar Pancasila!',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newRecord, ...records.filter(r => r.name.toLowerCase() !== name.trim().toLowerCase())];
    setRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Save to centralized teacher-only store
    saveStudentSubmission(name.trim(), className, prev => ({
      ...prev,
      studentName: name.trim(),
      studentClass: className,
      studentNumber,
      attendance: {
        status,
        mood,
        hope: hope.trim() || 'Semangat belajar Pancasila!',
        timestamp: newRecord.timestamp
      }
    }));

    setIsSubmitted(true);
    onStudentRecorded(name.trim(), className);
    onComplete();
  };

  const handleClearRecords = () => {
    if (window.confirm('Bersihkan seluruh daftar absensi kelas ini?')) {
      setRecords([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const handleExportCSV = () => {
    sound.playClick();
    const headers = 'No,No Absen,Nama Siswa,Kelas,Status,Mood,Harapan Belajar,Waktu Presensi\n';
    const rows = records.map((r, i) => 
      `"${i+1}","${r.studentNumber}","${r.name}","${r.className}","${r.status}","${r.mood}","${r.hope.replace(/"/g, '""')}","${r.timestamp}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Presensi_PPKn_${className.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: records.length,
    hadir: records.filter(r => r.status === 'Hadir').length,
    izin: records.filter(r => r.status === 'Izin').length,
    sakit: records.filter(r => r.status === 'Sakit').length
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold border border-blue-200">
          <span>📋 Bagian 3 dari 10</span>
          <span>•</span>
          <span>Presensi & Manajemen Kelas</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Absensi Peserta Didik
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Tunjukkan kedisiplinan sebagai salah satu wujud nyata ketaatan terhadap aturan dan tata tertib sekolah!
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">👩‍🏫 Manajemen Presensi Kelas (Mode Guru):</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
              Total Terdata: {stats.total} Siswa
            </span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Guru dapat memantau presensi dan mood kesiapan belajar peserta didik hari ini. Gunakan tombol <strong>"Ekspor CSV"</strong> di bawah untuk mengunduh rekap administrasi kelas.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Attendance Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Formulir Presensi Siswa</span>
            </h3>
            <span className="text-xs text-slate-400">Wajib Diisi</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Lengkap Siswa:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Muhammad Budi Santoso"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomor Absen:
                </label>
                <input
                  type="text"
                  required
                  value={studentNumber}
                  onChange={e => setStudentNumber(e.target.value)}
                  placeholder="01"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kelas / Rombel:
                </label>
                <select
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 text-sm bg-white"
                >
                  <option value="Kelas VII-A">Kelas VII-A</option>
                  <option value="Kelas VII-B">Kelas VII-B</option>
                  <option value="Kelas VIII-A">Kelas VIII-A</option>
                  <option value="Kelas VIII-B">Kelas VIII-B</option>
                  <option value="Kelas IX-A">Kelas IX-A</option>
                  <option value="Kelas IX-B">Kelas IX-B</option>
                  <option value="Kelas X / SMA-SMK">Kelas X (Fase E)</option>
                  <option value="Kelas XI / SMA-SMK">Kelas XI (Fase F)</option>
                </select>
              </div>
            </div>

            {/* Status radio buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Keterangan Kehadiran:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Hadir', 'Izin', 'Sakit'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setStatus(s);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === s
                        ? s === 'Hadir'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : s === 'Izin'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{s === 'Hadir' ? '✅' : s === 'Izin' ? '✉️' : '🏥'}</span>
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Perasaan / Suasana Hati Hari Ini:
              </label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <button
                    key={m.emoji}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMood(m.emoji);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      mood === m.emoji
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-base">{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hope / Learning Wish */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target / Harapan Belajar Hari Ini:
              </label>
              <textarea
                rows={2}
                value={hope}
                onChange={e => setHope(e.target.value)}
                placeholder="Apa yang ingin kamu pahami tentang hukum dan keadilan hari ini?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal text-slate-800 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Presensi Kehadiran</span>
            </button>
          </form>

          {/* Success Card */}
          {isSubmitted && (
            <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                  ✓ Presensi Berhasil Dicatat!
                </span>
                <span className="text-xs text-emerald-700 font-semibold">{mood} Semangat</span>
              </div>
              <p className="text-xs text-slate-700">
                Nama: <strong>{name}</strong> (No. {studentNumber}) - {className}. Kamu siap mengikuti langkah selanjutnya!
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Lanjut ke Tujuan Pembelajaran</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Live Attendance List & Summary */}
        <div className="lg:col-span-6 space-y-5">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-black text-emerald-700">{stats.hadir}</div>
              <div className="text-xs font-bold text-emerald-800">Siswa Hadir</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-black text-amber-700">{stats.izin}</div>
              <div className="text-xs font-bold text-amber-800">Izin</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-black text-rose-700">{stats.sakit}</div>
              <div className="text-xs font-bold text-rose-800">Sakit</div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h4 className="font-display font-bold text-base text-slate-900">
                  Rekap Kehadiran Kelas ({records.length})
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                  title="Unduh Rekap CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handleClearRecords}
                  className="p-1 text-slate-400 hover:text-red-500 rounded-lg transition"
                  title="Reset Absensi"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {records.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Belum ada presensi siswa yang dicatat. Silakan isi formulir di samping.
                </div>
              ) : (
                records.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center flex-shrink-0">
                        {rec.studentNumber}
                      </span>
                      <div className="truncate">
                        <div className="font-bold text-slate-800 truncate flex items-center gap-1.5">
                          <span>{rec.name}</span>
                          <span>{rec.mood}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate italic">
                          "{rec.hope}"
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          rec.status === 'Hadir'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'Izin'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {rec.status}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{rec.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
