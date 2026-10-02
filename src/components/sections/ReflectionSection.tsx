import React, { useState } from 'react';
import { Star, Award, CheckCircle2, ArrowRight, Heart, Sparkles, BookOpen, Send, MessageSquare } from 'lucide-react';
import { sound } from '../../utils/audio';
import { CertificateModal } from '../CertificateModal';
import { REFLECTION_QUESTIONS, MODULE_INFO } from '../../data/materialData';
import confetti from 'canvas-confetti';
import { saveStudentSubmission } from '../../services/studentSubmissionStore';

interface ReflectionSectionProps {
  onComplete: () => void;
  onNext: () => void;
  studentName: string;
  studentClass: string;
  isTeacherMode?: boolean;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  onComplete,
  onNext,
  studentName,
  studentClass,
  isTeacherMode
}) => {
  const [rating, setRating] = useState<number>(5);
  const [q1, setQ1] = useState<string>(
    'Saya memahami bahwa Indonesia adalah negara hukum (Rechtsstaat) berdasarkan Pasal 1 ayat 3 UUD 1945, di mana hukum adalah panglima tertinggi dan semua orang setara di hadapan hukum (equality before the law).'
  );
  const [q2, setQ2] = useState<string>(
    'Saya ingin memperdalam bagaimana proses pengujian undang-undang di Mahkamah Konstitusi serta peran aparat penegak hukum dalam mewujudkan keadilan tanpa pandang bulu.'
  );
  const [q3, setQ3] = useState<string>(
    'Turnamen 6 kelompok selama 30 menit (Arena Roda Putar Keadilan, Cepat Tepat Bel, dan Sidang Kasus LKPD) serta game refleks Uji Fokus Hakim Pancasila.'
  );
  const [q4, setQ4] = useState<string>(
    'Nilai integritas, kejujuran akademik (anti-mencontek), keberanian menolak perundungan (bullying), serta budaya tertib aturan dalam kehidupan sehari-hari.'
  );
  const [commitment, setCommitment] = useState<string>(
    'Saya berjanji akan menjunjung tinggi supremasi hukum, taat tata tertib sekolah, bersikap adil kepada semua teman, dan menjadi Pelajar Pancasila yang berintegritas.'
  );

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}

    saveStudentSubmission(studentName || 'Peserta Didik Aktif', studentClass || 'Kelas VIII-A', prev => ({
      ...prev,
      reflection: {
        q1Understand: q1,
        q2Question: q2,
        q3FavoriteActivity: q3,
        q4MoralValue: q4,
        commitment,
        starRating: rating,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    }));

    setIsSaved(true);
    onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3.5 py-1 rounded-full text-xs font-bold border border-red-200">
          <span>✍️ Bagian 9 dari 10</span>
          <span>•</span>
          <span>Lembar Refleksi Peserta Didik (Bab VI.A RPM)</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Refleksi Pembelajaran Bermakna
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Ungkapkan apa yang telah kamu pahami, hal yang menarik, serta ikrar pribadimu sebagai generasi penjaga keutuhan NKRI.
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Catatan Asesmen Reflektif Guru (Sintaks Evaluasi Pembelajaran):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Perhatikan pengisian 4 butir pertanyaan refleksi dan komitmen moral siswa. Nilai komitmen siswa akan langsung tercetak pada Piagam Penghargaan Duta NKRI. Di dalam modal piagam penghargaan terdapat tombol <strong>"Keluar & Lanjut ke Tahap 10"</strong> untuk membawa siswa atau guru langsung ke sesi kesimpulan akhir.
          </p>
        </div>
      )}

      <form onSubmit={handleSaveReflection} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Rating Self-Assessment */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-100">
          <label className="font-display font-bold text-base text-slate-800 block">
            Tingkat Kepuasan & Pemahaman Diri Hari Ini:
          </label>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setRating(star);
                }}
                className="p-1.5 transition transform hover:scale-125 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                    star <= rating
                      ? 'text-amber-400 fill-amber-400 drop-shadow'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            {rating === 5 && '🌟 Sangat Paham, Bersemangat, dan Menjiwai Nilai Persatuan!'}
            {rating === 4 && '😊 Paham dengan Baik dan Menyenangkan.'}
            {rating === 3 && '🙂 Cukup Paham, Perlu Tambahan Latihan.'}
            {rating <= 2 && '🧐 Masih Perlu Bimbingan Guru.'}
          </p>
        </div>

        {/* 4 Standard Reflection Prompts (Bab VI.A of RPM) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-red-100 text-red-800 text-xs font-black flex items-center justify-center shrink-0">1</span>
              <span>Hal apa yang paling saya pahami dari pembelajaran hari ini?</span>
            </label>
            <textarea
              rows={3}
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium transition"
              placeholder="Tuliskan pemahaman utamamu..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center shrink-0">2</span>
              <span>Hal apa yang masih membingungkan atau perlu saya pelajari lebih lanjut?</span>
            </label>
            <textarea
              rows={2}
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium transition"
              placeholder="Tuliskan pertanyaan atau rasa penasaranmu..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">3</span>
              <span>Aktivitas apa yang paling menarik bagi saya selama pembelajaran hari ini?</span>
            </label>
            <textarea
              rows={2}
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium transition"
              placeholder="Contoh: Turnamen Roda Putar Keadilan, bel rebutan, atau game refleks Uji Fokus Hakim..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center shrink-0">4</span>
              <span>Nilai atau sikap apa yang saya pelajari dari pembelajaran hari ini?</span>
            </label>
            <textarea
              rows={2}
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium transition"
              placeholder="Contoh: Toleransi, gotong royong, menyaring informasi..."
              required
            />
          </div>

          {/* Personal Commitment Box for Certificate */}
          <div className="space-y-2 pt-2">
            <label className="font-display font-bold text-sm text-red-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-600 fill-current" />
              <span>Ikrar Komitmen Pribadi (Akan Tercetak pada Piagam):</span>
            </label>
            <textarea
              rows={3}
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-red-300 bg-red-50/40 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-xs sm:text-sm text-red-950 font-semibold leading-relaxed transition"
              placeholder="Tuliskan janjimu menjaga persatuan bangsa..."
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Jurnal Refleksi</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsCertificateOpen(true);
              }}
              className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Buka Piagam Duta NKRI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playSuccess();
                onComplete();
                onNext();
              }}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Tahap 10: Kesimpulan & Motivasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Certificate Modal with onNextSection passed to allow exiting to next section */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        onNextSection={onNext}
        studentName={studentName}
        studentClass={studentClass}
        commitment={commitment}
      />
    </div>
  );
};
