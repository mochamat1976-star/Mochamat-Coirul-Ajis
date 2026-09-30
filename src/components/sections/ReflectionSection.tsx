import React, { useState } from 'react';
import { Star, Award, CheckCircle2, ArrowRight, Heart, Sparkles, BookOpen, Send } from 'lucide-react';
import { sound } from '../../utils/audio';
import { CertificateModal } from '../CertificateModal';
import confetti from 'canvas-confetti';

interface ReflectionSectionProps {
  onComplete: () => void;
  onNext: () => void;
  studentName: string;
  studentClass: string;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  onComplete,
  onNext,
  studentName,
  studentClass
}) => {
  const [rating, setRating] = useState<number>(5);
  const [learnings, setLearnings] = useState<string>(
    '1. Makna UUD 1945 Pasal 1 Ayat 3.\n2. Lima pilar negara hukum Indonesia.\n3. Pentingnya lembaga penegak hukum yang adil.'
  );
  const [favorites, setFavorites] = useState<string>(
    '1. Game visual Hakim Cilik saat memecahkan kasus perundungan dan lalu lintas.\n2. Visual piramida hierarki undang-undang.'
  );
  const [commitment, setCommitment] = useState<string>(
    'Saya berjanji akan selalu memakai helm saat naik motor, tidak mencontek saat ujian, dan bijak dalam bermedia sosial tanpa menyebarkan fitnah.'
  );

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
    setIsSaved(true);
    onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3.5 py-1 rounded-full text-xs font-bold border border-indigo-200">
          <span>✍️ Bagian 8 dari 9</span>
          <span>•</span>
          <span>Refleksi Belajar & Komitmen Diri</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Refleksi Model 3-2-1
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Belajar hukum yang sejati adalah ketika nilai-nilai keadilan tersebut terpatri dalam hati dan menjelma menjadi tindakan nyata sehari-hari.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        {/* Rating Meter */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Tingkat Kepuasan & Pemahaman Materi Hari Ini
          </span>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setRating(star);
                }}
                className="p-1 transition-transform hover:scale-125 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 sm:w-10 sm:h-10 ${
                    star <= rating
                      ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="text-xs font-bold text-slate-700">
            {rating === 5 && '⭐⭐⭐⭐⭐ Sangat Paham & Sangat Menyenangkan!'}
            {rating === 4 && '⭐⭐⭐⭐ Paham dengan Baik & Seru!'}
            {rating === 3 && '⭐⭐⭐ Cukup Paham, Perlu Latihan Tambahan'}
            {rating < 3 && 'Perlu Membaca Ulang Materi'}
          </div>
        </div>

        {/* 3-2-1 Form */}
        <form onSubmit={handleSaveReflection} className="space-y-6">
          {/* 3 Learnings */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              3 Hal Baru yang Kupahami Hari Ini:
            </label>
            <textarea
              rows={3}
              required
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
              placeholder="1. ... 2. ... 3. ..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </div>

          {/* 2 Favorites */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              2 Hal yang Paling Berkesan / Menarik Bagiku:
            </label>
            <textarea
              rows={2}
              required
              value={favorites}
              onChange={(e) => setFavorites(e.target.value)}
              placeholder="1. ... 2. ..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </div>

          {/* 1 Commitment */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              1 Komitmen Nyata Taat Hukum yang Akan Kulakukan Mulai Hari Ini:
            </label>
            <textarea
              rows={2}
              required
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              placeholder="Tuliskan komitmen konkritmu sebagai pelajar taat hukum..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed bg-red-50/30"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-display font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Lembar Refleksi Diri</span>
          </button>
        </form>

        {/* Certificate Callout */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-black uppercase text-amber-200 tracking-wider">
              Hadiah Capaian Siswa
            </span>
            <h4 className="font-display font-bold text-lg text-white">
              Piagam Duta Pelajar Sadar Hukum
            </h4>
            <p className="text-xs text-amber-100 max-w-md">
              Klaim dan cetak sertifikat resmi atas komitmenmu hari ini untuk dipajang di kelas atau portofolio belajarmu!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              setIsCertificateOpen(true);
            }}
            className="px-5 py-3 bg-white text-slate-900 rounded-2xl font-display font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Buka Piagam Penghargaan</span>
          </button>
        </div>

        {/* Next to Conclusion */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playSuccess();
              onComplete();
              onNext();
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <span>Lanjut ke Kesimpulan & Motivasi Siswa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal Popup Certificate */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentName}
        studentClass={studentClass}
        commitment={commitment}
      />
    </div>
  );
};
