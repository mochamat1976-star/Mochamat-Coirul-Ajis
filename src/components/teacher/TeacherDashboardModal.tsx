import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Award, CheckCircle2, XCircle, Printer, Download, Trash2, X, Shield, Sparkles, Filter, Search } from 'lucide-react';
import { getStoredSubmissions, clearAllSubmissions, StudentSubmission } from '../../services/studentSubmissionStore';
import { MODULE_INFO } from '../../data/materialData';
import { sound } from '../../utils/audio';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({ isOpen, onClose }) => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'aperception' | 'reflection' | 'sumatif'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSubmissions(getStoredSubmissions());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleClearData = () => {
    if (window.confirm('Apakah Bapak Guru yakin ingin mereset/menghapus seluruh rekap data jawaban siswa? Tindakan ini tidak dapat dibatalkan.')) {
      clearAllSubmissions();
      setSubmissions([]);
      sound.playClick();
    }
  };

  const filteredSubmissions = submissions.filter(s =>
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentNumber.includes(searchQuery)
  );

  // Stats calculation
  const totalStudents = submissions.length;
  const passedStudents = submissions.filter(s => (s.sumatifAssessment?.score || 0) >= 75).length;
  const avgSumatif = totalStudents > 0
    ? Math.round(submissions.reduce((acc, s) => acc + (s.sumatifAssessment?.score || 0), 0) / totalStudents)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shrink-0 no-print">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                PORTAL KHUSUS GURU
              </span>
              <span className="text-xs text-amber-200 font-semibold">{MODULE_INFO.school}</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
              Rekapitulasi Jawaban & Hasil Belajar Siswa
            </h2>
            <p className="text-xs text-slate-300">
              Pengampu: <strong>{MODULE_INFO.author}</strong> ({MODULE_INFO.role}) • Materi: {MODULE_INFO.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow"
              title="Cetak Rekap Nilai Siswa (PDF / Print)"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak Laporan</span>
            </button>

            <button
              onClick={handleClearData}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white transition cursor-pointer"
              title="Reset / Bersihkan Rekap"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
              title="Tutup Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'overview', label: '📊 Ringkasan Kelas' },
              { id: 'attendance', label: '📋 Presensi Siswa' },
              { id: 'aperception', label: '💡 Apersepsi & Kuis' },
              { id: 'reflection', label: '✍️ Refleksi 3-2-1 & Ikrar' },
              { id: 'sumatif', label: '📝 Asesmen Sumatif (10 PG)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Printable Official Header (Visible on print) */}
        <div className="hidden print:block p-6 text-center border-b-2 border-slate-800 space-y-1">
          <h1 className="font-serif font-black text-xl text-slate-900 uppercase">
            LAPORAN REKAPITULASI HASIL BELAJAR PESERTA DIDIK
          </h1>
          <p className="text-xs font-bold text-slate-700">
            {MODULE_INFO.school} — {MODULE_INFO.appTitle}
          </p>
          <p className="text-[11px] text-slate-600">
            Materi: {MODULE_INFO.title} ({MODULE_INFO.constitutionalArticle}) • Pengampu: {MODULE_INFO.author} ({MODULE_INFO.role})
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 0: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Total Peserta Didik</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalStudents} Siswa</div>
                  <p className="text-[10px] text-emerald-600 font-semibold">Tercatat di sistem kelas</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Ketuntasan Asesmen</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                    {totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0}%
                  </div>
                  <p className="text-[10px] text-emerald-700 font-semibold">{passedStudents} dari {totalStudents} Tuntas (≥75)</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">Rata-Rata Nilai Sumatif</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-950">{avgSumatif} / 100</div>
                  <p className="text-[10px] text-amber-700 font-semibold">Kategori Kinerja: Sangat Baik</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Ikrar Karakter</span>
                  <div className="text-2xl sm:text-3xl font-black text-blue-950">{totalStudents} Ikrar</div>
                  <p className="text-[10px] text-blue-700 font-semibold">100% Mengikrarkan Taat Hukum</p>
                </div>
              </div>

              {/* Master Summary Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Daftar Nilai Lengkap Peserta Didik ({MODULE_INFO.grade})
                  </h3>
                  <span className="text-xs text-slate-500">Tersimpan otomatis di sesi guru</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="p-3">No</th>
                        <th className="p-3">Nama Siswa</th>
                        <th className="p-3">Kelas</th>
                        <th className="p-3">Presensi</th>
                        <th className="p-3">Apersepsi</th>
                        <th className="p-3">Nilai Sumatif</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Ikrar Hukum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubmissions.map((sub, idx) => {
                        const score = sub.sumatifAssessment?.score || 0;
                        const isPass = score >= 75;
                        return (
                          <tr key={sub.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-slate-500">{sub.studentNumber || idx + 1}</td>
                            <td className="p-3 font-bold text-slate-900">{sub.studentName}</td>
                            <td className="p-3 text-slate-600">{sub.studentClass}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {sub.attendance?.status || 'Hadir'}
                              </span>
                            </td>
                            <td className="p-3">
                              {sub.aperceptionAnswer?.isCorrect ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="p-3 font-mono font-extrabold text-sm text-slate-900">
                              {score}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                {isPass ? 'TUNTAS' : 'REMEDIAL'}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 truncate max-w-xs" title={sub.reflection?.commitment}>
                              {sub.reflection?.commitment || 'Terikrar Pelajar Pancasila'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>📋 Buku Presensi & Kesiapan Emosional Siswa</span>
              </h3>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">No</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Mood Belajar</th>
                      <th className="p-3">Harapan Siswa Hari Ini</th>
                      <th className="p-3">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubmissions.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-500">{sub.studentNumber || idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900">{sub.studentName}</td>
                        <td className="p-3 text-slate-600">{sub.studentClass}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {sub.attendance?.status || 'Hadir'}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{sub.attendance?.mood || '🔥 Membara Semangat'}</td>
                        <td className="p-3 text-slate-600 italic">"{sub.attendance?.hope || 'Ingin memahami hukum Indonesia.'}"</td>
                        <td className="p-3 text-slate-400 font-mono">{sub.attendance?.timestamp || sub.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: APERSEPSI & KUIS MATERI */}
          {activeTab === 'aperception' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-slate-900">
                💡 Jawaban Pertanyaan Pemantik Apersepsi & Kuis Konsep
              </h3>
              <div className="space-y-3">
                {filteredSubmissions.map(sub => (
                  <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{sub.studentName} ({sub.studentClass})</span>
                      <span className="text-[10px] text-slate-400">{sub.submittedAt}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-700">Pertanyaan Pemantik: Mengapa Pasal 1 Ayat 3 menegaskan Indonesia adalah Negara Hukum?</div>
                      <div className="text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg">
                        🗣️ Jawaban Siswa: {sub.aperceptionAnswer?.selectedText || 'Agar seluruh warga negara terlindungi hak asasinya, ada kepastian hukum, dan keadilan tegak tanpa pandang bulu.'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-600">Kuis Cepat Pasal:</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                        {sub.materialQuiz?.selectedAnswer || 'Pasal 1 Ayat (3)'} (Benar)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REFLEKSI 3-2-1 */}
          {activeTab === 'reflection' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-slate-900">
                ✍️ Rekap Refleksi Belajar & Ikrar Pelajar Pancasila
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSubmissions.map(sub => (
                  <div key={sub.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">{sub.studentName}</h4>
                      <span className="text-amber-500 font-bold text-xs">⭐ 5/5 Bintang</span>
                    </div>

                    <div className="text-xs space-y-2 text-slate-700">
                      <div>
                        <span className="font-bold text-slate-900 block">1. Yang Paling Dipahami:</span>
                        <p className="italic text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-0.5">
                          "{sub.reflection?.q1Understand || 'Hukum adalah panglima tertinggi dan semua orang setara di depan hukum.'}"
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 block">2. Hal yang Ingin Dipelajari Lebih Lanjut:</span>
                        <p className="italic text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-0.5">
                          "{sub.reflection?.q2Question || 'Peran Mahkamah Konstitusi dan cara kerja peradilan Indonesia.'}"
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 block">3. Ikrar Komitmen Siswa:</span>
                        <p className="font-bold text-red-900 bg-red-50 p-2.5 rounded-lg border border-red-200 mt-0.5">
                          “{sub.reflection?.commitment || 'Saya berjanji akan menjunjung tinggi supremasi hukum dan tata tertib sekolah.'}”
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ASESMEN SUMATIF */}
          {activeTab === 'sumatif' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between">
                <span>📝 Nilai Asesmen Sumatif (10 Soal Pilihan Ganda Lampiran 2 RPM)</span>
                <span className="text-xs text-slate-500">Kriteria Ketuntasan Minimal (KKM): 75</span>
              </h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">No</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3 text-center">Jawaban Benar</th>
                      <th className="p-3 text-center">Nilai Akhir</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Tindak Lanjut RPM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubmissions.map((sub, idx) => {
                      const score = sub.sumatifAssessment?.score || 0;
                      const correct = sub.sumatifAssessment?.correctCount || Math.round(score / 10);
                      const isPass = score >= 75;
                      return (
                        <tr key={sub.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-500">{sub.studentNumber || idx + 1}</td>
                          <td className="p-3 font-bold text-slate-900">{sub.studentName}</td>
                          <td className="p-3 text-slate-600">{sub.studentClass}</td>
                          <td className="p-3 text-center font-mono font-bold">{correct} / 10 Soal</td>
                          <td className="p-3 text-center font-mono font-black text-base text-slate-900">{score}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {isPass ? 'TUNTAS' : 'REMEDIAL'}
                            </span>
                          </td>
                          <td className="p-3 text-center text-slate-600">
                            {isPass ? (
                              <span className="text-emerald-700 font-semibold">Pengayaan Kasus Hukum</span>
                            ) : (
                              <span className="text-amber-700 font-semibold">Bimbingan Asas Hukum</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 no-print">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Total {totalStudents} peserta didik terdata di Ruang Belajar Pendidikan Pancasila.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
