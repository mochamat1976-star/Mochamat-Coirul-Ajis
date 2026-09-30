import React, { useState } from 'react';
import { BookOpen, Scale, Shield, Landmark, Layers, CheckCircle2, ArrowRight, Volume2, VolumeX, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';
import { LAW_CONCEPTS } from '../../data/materialData';
import { sound, speakText, stopSpeech } from '../../utils/audio';

interface MaterialSectionProps {
  onComplete: () => void;
  onNext: () => void;
}

export const MaterialSection: React.FC<MaterialSectionProps> = ({ onComplete, onNext }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [quickQuizAnswer, setQuickQuizAnswer] = useState<number | null>(null);

  const tabs = [
    { id: 0, title: 'Landasan Konstitusi', icon: '📜' },
    { id: 1, title: '5 Ciri Negara Hukum', icon: '⚖️' },
    { id: 2, title: 'Lembaga Penegak Hukum', icon: '🏛️' },
    { id: 3, title: 'Hierarki Peraturan (UU 12/2011)', icon: '🔺' },
    { id: 4, title: 'Penerapan Sehari-hari', icon: '🤝' }
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
        'Landasan Konstitusi. Berdasarkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 Pasal 1 Ayat 3, Negara Indonesia adalah negara hukum. Artinya, seluruh tindakan negara dan warga negara harus bersandar pada hukum yang adil, bukan kekuasaan mutlak.';
    } else if (activeTab === 1) {
      speechText =
        'Lima ciri pokok negara hukum Indonesia: Supremasi hukum, persamaan di depan hukum tanpa pandang bulu, asas legalitas, peradilan yang merdeka dan jujur, serta jaminan perlindungan hak asasi manusia.';
    } else if (activeTab === 2) {
      speechText =
        'Lembaga penegak hukum Indonesia meliputi Kepolisian Republik Indonesia sebagai pemelihara keamanan, Kejaksaan sebagai penuntut perkara, Mahkamah Agung dan Mahkamah Konstitusi sebagai pengadil, KPK memberantas korupsi, dan Advokat sebagai pembela hak hukum warga.';
    } else if (activeTab === 3) {
      speechText =
        'Hierarki peraturan perundang-undangan diatur dalam Undang-Undang Nomor 12 Tahun 2011. Paling tinggi adalah UUD 1945, diikuti Tap MPR, Undang-Undang atau Perppu, Peraturan Pemerintah, Peraturan Presiden, Perda Provinsi, hingga Perda Kabupaten atau Kota.';
    } else {
      speechText =
        'Penerapan taat hukum dapat diwujudkan di lingkungan keluarga dengan menghormati aturan rumah, di sekolah dengan menaati tata tertib dan tidak bullying, di masyarakat dengan menjaga ketertiban, dan dalam bernegara dengan taat pajak dan patuh lalu lintas.';
    }

    speakText(speechText, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3.5 py-1 rounded-full text-xs font-bold border border-red-200">
          <span>⚖️ Bagian 6 dari 9</span>
          <span>•</span>
          <span>Materi Pembelajaran Inti</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Indonesia Sebagai Negara Hukum
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Pelajari konsep hukum, hierarki perundang-undangan, dan peran lembaga peradilan di Indonesia secara tuntas dan terstruktur.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              stopSpeech();
              setIsSpeaking(false);
              sound.playClick();
              setActiveTab(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300 scale-102'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Main Material Presentation Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        {/* Top Control Bar inside material card */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              {activeTab + 1}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              {tabs[activeTab].title}
            </h3>
          </div>

          <button
            onClick={handleListenTab}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              isSpeaking
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Hentikan Suara' : 'Dengarkan Materi Ini'}</span>
          </button>
        </div>

        {/* TAB 0: LANDASAN KONSTITUSI */}
        {activeTab === 0 && (
          <div className="space-y-6 animate-fadeIn">
            {/* The Article Banner */}
            <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-600 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute right-4 -bottom-6 text-9xl opacity-10 font-serif pointer-events-none">
                ⚖️
              </div>
              <div className="relative z-10 space-y-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/20">
                  Landasan Pokok Konstitusional
                </span>
                <h4 className="font-display font-black text-2xl sm:text-3xl tracking-wide text-amber-300">
                  {LAW_CONCEPTS.constitutionalBasis.article}
                </h4>
                <div className="p-4 bg-black/20 rounded-2xl border border-white/20">
                  <p className="font-serif italic text-xl sm:text-2xl font-bold leading-relaxed">
                    {LAW_CONCEPTS.constitutionalBasis.text}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-red-100 leading-relaxed max-w-3xl">
                  {LAW_CONCEPTS.constitutionalBasis.meaning}
                </p>
              </div>
            </div>

            {/* Comparison: Rechtsstaat vs Machstaat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <h5 className="font-bold text-base text-emerald-900">Rechtsstaat / Rule of Law</h5>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Negara Hukum:</strong> Pemerintahan dan warga negara tunduk pada undang-undang. Hukum bertindak sebagai pelindung rakyat, menjunjung hak asasi manusia, dan keadilan ditegakkan lewat pengadilan yang jujur.
                </p>
                <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 p-2 rounded-lg">
                  Prinsip yang dianut oleh Negara Kesatuan Republik Indonesia (NKRI).
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">❌</span>
                  <h5 className="font-bold text-base text-rose-900">Machtsstaat / Rule of Power</h5>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Negara Kekuasaan:</strong> Penguasa memegang kekuasaan mutlak di atas hukum. Peraturan hanya dibuat demi kepentingan penguasa dan rakyat tidak memiliki jaminan perlindungan hukum.
                </p>
                <div className="text-[11px] text-rose-800 font-semibold bg-rose-100/70 p-2 rounded-lg">
                  Bentuk kesewenang-wenangan yang ditolak mentah-mentah oleh para pendiri bangsa Indonesia!
                </div>
              </div>
            </div>

            {/* Sila Pancasila Connection */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-950">
                <strong className="block font-bold">Pancasila Sebagai Sumber dari Segala Sumber Hukum:</strong>
                Seluruh pasal undang-undang di Indonesia tidak boleh bertentangan dengan 5 sila Pancasila, khususnya Sila ke-2 (Kemanusiaan yang Adil dan Beradab) dan Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia).
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: 5 CIRI POKOK NEGARA HUKUM */}
        {activeTab === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-xs sm:text-sm text-slate-600">
              Negara hukum Indonesia memiliki lima pilar utama yang menjamin keadilan bagi seluruh masyarakat:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LAW_CONCEPTS.principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-red-50/40 border border-slate-200 hover:border-red-300 p-5 rounded-2xl transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {pr.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {pr.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{pr.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-red-600 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pilar Konstitusi RI</span>
                  </div>
                </div>
              ))}

              {/* Bonus Card: Keterbukaan Informasi */}
              <div className="bg-gradient-to-br from-red-600 to-amber-600 text-white p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    Prinsip Tambahan
                  </span>
                  <h4 className="font-bold text-base mt-2 text-white">Transparansi & Akuntabilitas</h4>
                  <p className="text-xs text-red-100 mt-1 leading-relaxed">
                    Setiap proses pembentukan hukum dan penegakannya harus terbuka bagi partisipasi dan pengawasan masyarakat.
                  </p>
                </div>
                <div className="text-[11px] text-amber-200 font-medium">Demokrasi Berlandaskan Hukum</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEMBAGA PENEGAK HUKUM */}
        {activeTab === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-xs sm:text-sm text-slate-600">
              Penegakan hukum di Indonesia dijalankan oleh lembaga-lembaga negara dengan pembagian wewenang yang tegas dan saling mengawasi (Checks and Balances):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LAW_CONCEPTS.institutions.map((inst, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                        {inst.role}
                      </span>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        {inst.name}
                      </h4>
                    </div>
                    <span className="text-2xl">
                      {idx === 0 ? '👮' : idx === 1 ? '📜' : idx === 2 ? '⚖️' : idx === 3 ? '🛡️' : '💼'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    <strong>Tugas Pokok: </strong>
                    {inst.duties}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Semboyan/Nilai: <strong className="text-slate-700">{inst.symbol}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HIERARKI PERATURAN PERUNDANG-UNDANGAN */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs sm:text-sm text-blue-950">
              <strong className="block font-bold text-blue-900">
                Undang-Undang Nomor 12 Tahun 2011 (jo. UU No. 13 Tahun 2022):
              </strong>
              Peraturan perundang-undangan di Indonesia tersusun secara hierarki (bertingkat). Aturan yang lebih rendah posisinya TIDAK BOLEH bertentangan dengan aturan yang lebih tinggi (*Lex Superior Derogat Legi Inferiori*).
            </div>

            {/* Hierarchical Staircase / Pyramid */}
            <div className="space-y-2 max-w-2xl mx-auto">
              {LAW_CONCEPTS.hierarchy.map((item) => (
                <div
                  key={item.level}
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-4 transition transform hover:scale-101 shadow-sm ${item.color}`}
                  style={{
                    marginLeft: `${(item.level - 1) * 12}px`,
                    marginRight: `${(item.level - 1) * 12}px`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {item.level}
                    </span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm leading-snug">{item.name}</div>
                      <div className="text-[10px] opacity-90">{item.note}</div>
                    </div>
                  </div>
                  <span className="text-xs opacity-75 font-mono">Tingkat {item.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PENERAPAN DALAM KEHIDUPAN */}
        {activeTab === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-xs sm:text-sm text-slate-600">
              Hukum bukan hanya ada di ruang sidang pengadilan, melainkan harus hidup dalam tingkah laku kita sehari-hari di berbagai lingkungan:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LAW_CONCEPTS.environments.map((env, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {idx === 0 ? '🏡' : idx === 1 ? '🏫' : idx === 2 ? '🏘️' : '🇮🇩'}
                    </span>
                    <h4 className="font-display font-bold text-base text-slate-900">{env.domain}</h4>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {env.examples.map((ex, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Check Quiz */}
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-sm sm:text-base">Kuis Cepat Pemahaman: UUD 1945 Pasal 1 Ayat (3)</h4>
          </div>
          <p className="text-xs text-slate-700">
            Bunyi dari Pasal 1 Ayat (3) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 adalah:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { text: 'A. “Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD.”', isCorrect: false },
              { text: 'B. “Negara Indonesia adalah negara hukum.”', isCorrect: true },
              { text: 'C. “Negara berdasar atas Ketuhanan Yang Maha Esa.”', isCorrect: false },
              { text: 'D. “Fakir miskin dan anak-anak telantar dipelihara oleh negara.”', isCorrect: false }
            ].map((ans, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (ans.isCorrect) sound.playSuccess();
                  else sound.playWrong();
                  setQuickQuizAnswer(idx);
                }}
                className={`p-3 rounded-xl text-left font-medium transition cursor-pointer border ${
                  quickQuizAnswer === idx
                    ? ans.isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold'
                      : 'bg-rose-500 text-white border-rose-500 font-bold'
                    : 'bg-white hover:bg-amber-100/60 border-amber-200 text-slate-800'
                }`}
              >
                {ans.text}
              </button>
            ))}
          </div>

          {quickQuizAnswer !== null && (
            <div className="text-xs font-bold pt-1 text-slate-800">
              {quickQuizAnswer === 1 ? (
                <span className="text-emerald-700">🎉 Benar sekali! Pasal 1 Ayat (3) UUD 1945 berbunyi: "Negara Indonesia adalah negara hukum".</span>
              ) : (
                <span className="text-rose-600">❌ Masih keliru. Jawaban yang tepat adalah B. "Negara Indonesia adalah negara hukum".</span>
              )}
            </div>
          )}
        </div>

        {/* Section Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Sub-materi: <strong>{activeTab + 1}</strong> dari {tabs.length}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab < tabs.length - 1 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab(prev => prev + 1);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Sub-materi Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}

            <button
              onClick={() => {
                sound.playSuccess();
                onComplete();
                onNext();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mainkan Game Visual Kartun</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
