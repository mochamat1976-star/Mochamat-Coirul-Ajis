import React, { useState } from 'react';
import { BookOpen, Shield, Landmark, Scale, CheckCircle2, ArrowRight, Volume2, VolumeX, Sparkles, HelpCircle, ChevronRight, AlertTriangle, Users, Briefcase, Search, ShieldAlert, Award } from 'lucide-react';
import { LEGAL_STATE_CONCEPTS, MODULE_INFO } from '../../data/materialData';
import { sound, speakText, stopSpeech } from '../../utils/audio';
import { saveStudentSubmission } from '../../services/studentSubmissionStore';

interface MaterialSectionProps {
  onComplete: () => void;
  onNext: () => void;
  isTeacherMode?: boolean;
  studentName?: string;
  studentClass?: string;
}

export const MaterialSection: React.FC<MaterialSectionProps> = ({ onComplete, onNext, isTeacherMode, studentName = '', studentClass = '' }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [quickQuizAnswer, setQuickQuizAnswer] = useState<number | null>(null);

  const tabs = [
    { id: 0, title: 'Landasan Konstitusi', icon: '📜' },
    { id: 1, title: '5 Ciri Negara Hukum', icon: '⚖️' },
    { id: 2, title: 'Rechtsstaat vs Machtsstaat', icon: '🏛️' },
    { id: 3, title: 'Lembaga Penegak Hukum', icon: '🛡️' },
    { id: 4, title: 'Tata Urutan Peraturan (UU 12/2011)', icon: '📑' }
  ];

  const handleListenTab = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);

    let speechText = '';
    if (activeTab === 0) {
      speechText =
        'Anak-anakku yang berbahagia, mari kita pahami bersama landasan konstitusional negara kita. Di dalam UUD NRI 1945 Pasal 1 Ayat 3 ditegaskan bahwa Negara Indonesia adalah negara hukum. Artinya, seluruh penyelenggaraan negara, kepemimpinan, dan kehidupan bermasyarakat harus berpedoman pada hukum yang adil, bukan atas dasar kekuasaan belaka. Hukum hadir untuk melindungi hak setiap warga negara dan menjamin keadilan bagi seluruh rakyat Indonesia.';
    } else if (activeTab === 1) {
      speechText =
        'Ada lima prinsip utama negara hukum yang patut kita hayati bersama. Pertama, supremasi hukum, di mana hukum menjadi pedoman tertinggi. Kedua, persamaan di depan hukum atau equality before the law, yang artinya setiap orang memiliki hak dan kedudukan yang setara tanpa diskriminasi. Ketiga, asas legalitas, yaitu setiap tindakan pemerintah harus berlandaskan undang-undang yang sah. Keempat, peradilan yang merdeka dan tidak memihak. Serta kelima, jaminan perlindungan hak asasi manusia bagi seluruh warga negara.';
    } else if (activeTab === 2) {
      speechText =
        'Mari kita cermati perbedaan penting antara Rechtsstaat dan Machtsstaat. Rechtsstaat adalah negara hukum yang berkeadilan, di mana kekuasaan dibatasi oleh konstitusi demi melindungi hak-hak rakyat dan menegakkan kepastian hukum. Sebaliknya, Machtsstaat adalah negara kekuasaan, di mana penguasa bertindak sewenang-wenang tanpa batas hukum. Para pendiri bangsa kita telah memilih dengan tegas bahwa Indonesia adalah Rechtsstaat, sebuah negara hukum yang bermartabat dan menjunjung tinggi nilai-nilai Pancasila.';
    } else if (activeTab === 3) {
      speechText =
        'Dalam kehidupan bernegara, kita memiliki lembaga-lembaga penegak hukum yang berdedikasi menjaga ketertiban dan keadilan. Kepolisian Republik Indonesia bertugas memelihara keamanan masyarakat dan menegakkan hukum. Kejaksaan Republik Indonesia bertindak sebagai penuntut umum dalam persidangan. Mahkamah Agung beserta badan peradilan di bawahnya mengadili dan memutus perkara dengan bijaksana. Mahkamah Konstitusi menguji undang-undang terhadap UUD 1945. Serta KPK bertugas memberantas korupsi. Sebagai Pelajar Pancasila, kita mendukung tugas mulia ini dengan senantiasa bersikap jujur dan tertib.';
    } else {
      speechText =
        'Mari kita perhatikan hierarki tata urutan peraturan perundang-undangan di Indonesia sesuai amanat Undang-Undang Nomor 12 Tahun 2011. Pada puncak tertingginya adalah UUD NRI 1945, diikuti Ketetapan MPR, Undang-Undang atau Perppu, Peraturan Pemerintah, Peraturan Presiden, Peraturan Daerah Provinsi, dan Peraturan Daerah Kabupaten atau Kota. Asas hukum menentukan bahwa peraturan yang berada di tingkat lebih rendah tidak boleh bertentangan dengan peraturan yang lebih tinggi.';
    }

    speakText(speechText, () => {
      setIsSpeaking(false);
    }, 'ramah_hangat', true);
  };

  const handleTabChange = (idx: number) => {
    sound.playClick();
    setActiveTab(idx);
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 px-3.5 py-1 rounded-full text-xs font-bold border border-red-200">
          <span>⚖️ Bagian 7 dari 10</span>
          <span>•</span>
          <span>Materi Pembelajaran Mendalam (Deep Learning)</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Indonesia Sebagai Negara Hukum
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Eksplorasi 5 konsep esensial: landasan yuridis Pasal 1 Ayat (3), ciri negara hukum, Rechtsstaat vs Machtsstaat, lembaga peradilan, serta tata urutan perundang-undangan.
        </p>
      </div>

      {/* Teacher Mode Guide */}
      {isTeacherMode && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl shadow-sm text-sm text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>👩‍🏫 Catatan Konseptual Guru (Sintaks Pengorganisasian Belajar & RPM {MODULE_INFO.school}):</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Fokuskan penalaran kritis siswa pada pergeseran dari <em>Machtsstaat</em> (negara kekuasaan) menuju <em>Rechtsstaat</em> (negara hukum Pancasila). Kuatkan pemahaman bahwa hukum bukan sekadar aturan tertulis, melainkan instrumen perlindungan harkat dan martabat manusia serta jaminan kesetaraan hak (Equality before the Law - Pasal 27 Ayat 1).
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-2 rounded-3xl border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Voice control bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Materi Inti</span>
            <span>•</span>
            <span className="text-red-700">{tabs[activeTab].title}</span>
          </div>

          <button
            onClick={handleListenTab}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isSpeaking
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-red-600" />}
            <span>{isSpeaking ? 'Hentikan Audio' : 'Dengarkan Ulasan Suara'}</span>
          </button>
        </div>

        {/* TAB 0: Landasan Konstitusi */}
        {activeTab === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 border border-white/30 text-amber-200 inline-block mb-3">
                Bunyi Konstitusi Tertinggi
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                {LEGAL_STATE_CONCEPTS.constitutionalBasis.article}
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-amber-200 italic font-semibold leading-relaxed mb-4">
                {LEGAL_STATE_CONCEPTS.constitutionalBasis.text}
              </p>
              <p className="text-sm sm:text-base text-red-100 leading-relaxed font-medium bg-black/20 p-4 rounded-2xl border border-white/10">
                {LEGAL_STATE_CONCEPTS.constitutionalBasis.meaning}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 text-base flex items-center gap-2">
                  <span>🏛️ Makna Rechtsstaat (Negara Hukum)</span>
                </h4>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Penyelenggaraan negara dikendalikan oleh hukum yang adil dan demokratis. Pemerintah dan seluruh warga tunduk pada peraturan perundang-undangan yang sah.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                <h4 className="font-bold text-red-950 text-base flex items-center gap-2">
                  <span>⚖️ Bukan Machtsstaat (Negara Kekuasaan)</span>
                </h4>
                <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                  Negara Indonesia menolak kesewenang-wenangan penguasa. Hukum adalah panglima tertinggi (supremasi hukum), bukan kehendak sepihak pemegang kekuasaan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: 5 Ciri Pokok Negara Hukum */}
        {activeTab === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                5 Karakteristik Utama Negara Hukum Indonesia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Pilar-pilar penting penegakan keadilan dan ketertiban kehidupan bermasyarakat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEGAL_STATE_CONCEPTS.principles.map((prinsip, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-red-50/50 hover:border-red-300 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                      Prinsip #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">{prinsip.tag}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{prinsip.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {prinsip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Rechtsstaat vs Machtsstaat */}
        {activeTab === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Perbandingan: Rechtsstaat (Negara Hukum) vs Machtsstaat (Negara Kekuasaan)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Mengapa Indonesia menjamin perlindungan hukum bagi setiap warganya tanpa diskriminasi.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold border-b border-slate-800">Aspek Perbandingan</th>
                    <th className="p-4 font-bold border-b border-slate-800 bg-red-900/60 text-red-200">
                      ⚖️ Rechtsstaat (Negara Hukum)
                    </th>
                    <th className="p-4 font-bold border-b border-slate-800 bg-slate-800 text-slate-300">
                      👑 Machtsstaat (Negara Kekuasaan)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {LEGAL_STATE_CONCEPTS.rechtsstaatVsMachtsstaat.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-4 font-bold text-slate-900">{row.aspect}</td>
                      <td className="p-4 font-semibold text-red-900 bg-red-50/40">{row.rechtsstaat}</td>
                      <td className="p-4 text-slate-600">{row.machtsstaat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 font-semibold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <b>Kesimpulan:</b> Konsep negara hukum menempatkan rakyat sebagai pemegang kedaulatan yang hak asasinya dilindungi dan dijamin oleh pengadilan yang independen.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: Lembaga Penegak Hukum */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Lembaga-Lembaga Penegak Hukum di Indonesia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Aparat dan institusi yang bertugas mengawal kepastian hukum dan keadilan bagi masyarakat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGAL_STATE_CONCEPTS.institutions.map((inst, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-red-300 transition">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg">
                    {idx === 0 ? '👮' : idx === 1 ? '⚖️' : idx === 2 ? '🏛️' : idx === 3 ? '📜' : '🔍'}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{inst.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {inst.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Hierarki Peraturan & Budaya Taat */}
        {activeTab === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Tata Urutan Peraturan Perundang-undangan (UU No. 12 Tahun 2011)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Asas <em>Lex Superior Derogat Legi Inferiori</em>: Peraturan yang lebih rendah tidak boleh bertentangan dengan peraturan yang lebih tinggi.
              </p>
            </div>

            <div className="space-y-2.5">
              {LEGAL_STATE_CONCEPTS.hierarchy.map((tier) => (
                <div key={tier.level} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      #{tier.level}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{tier.name}</h4>
                      <p className="text-xs text-slate-500">{tier.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 shrink-0">
                    Tingkat {tier.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Check Understanding Quiz */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-display font-bold text-slate-900 text-base">
              Uji Cepat Pemahaman: Pasal Negara Hukum
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Pasal manakah dalam UUD NRI Tahun 1945 yang menegaskan dengan tegas bahwa: <em>“Negara Indonesia adalah negara hukum”</em>?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { text: 'Pasal 1 Ayat (3)', isCorrect: true },
              { text: 'Pasal 27 Ayat (1)', isCorrect: false },
              { text: 'Pasal 33 Ayat (1)', isCorrect: false }
            ].map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (option.isCorrect) sound.playSuccess();
                  else sound.playWrong();
                  setQuickQuizAnswer(idx);

                  saveStudentSubmission(studentName || 'Peserta Didik Aktif', studentClass || 'Kelas VIII-A', prev => ({
                    ...prev,
                    materialQuiz: {
                      question: 'Pasal manakah dalam UUD NRI 1945 yang menegaskan bahwa Negara Indonesia adalah negara hukum?',
                      selectedAnswer: option.text,
                      isCorrect: option.isCorrect,
                      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                    }
                  }));
                }}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition cursor-pointer ${
                  quickQuizAnswer === idx
                    ? option.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-rose-400 bg-rose-50 text-rose-900'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {quickQuizAnswer !== null && (
            <div className={`p-3 rounded-xl text-xs font-bold ${quickQuizAnswer === 0 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
              {quickQuizAnswer === 0
                ? '✅ Tepat sekali! UUD NRI 1945 Pasal 1 Ayat (3) adalah landasan konstitusi bahwa Negara Indonesia adalah negara hukum (Rechtsstaat).'
                : '❌ Kurang tepat. Jawaban yang benar adalah Pasal 1 Ayat (3). (Pasal 27 Ayat 1 mengatur kesamaan di depan hukum).'}
            </div>
          )}
        </div>

        {/* Footer Next Button */}
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playSuccess();
              onComplete();
              onNext();
            }}
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <span>Lanjut ke Tahap 8: Game Turnamen 6 Kelompok (30 Menit)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
