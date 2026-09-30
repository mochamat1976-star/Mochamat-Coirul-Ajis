import React, { useRef } from 'react';
import { Trophy, Award, Medal, Printer, X, Sparkles, CheckCircle2, Star, Users } from 'lucide-react';
import { GroupTeam } from '../../types';
import { sound } from '../../utils/audio';

interface PodiumModalProps {
  teams: GroupTeam[];
  onClose: () => void;
}

export const PodiumModal: React.FC<PodiumModalProps> = ({ teams, onClose }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const champion = sortedTeams[0];
  const runnerUp = sortedTeams[1];
  const thirdPlace = sortedTeams[2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 p-5 text-slate-950 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black">
              <Trophy className="w-7 h-7 text-white fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Penganugerahan Piala Satria Hukum
              </h3>
              <p className="text-xs text-amber-100 font-semibold">
                Hasil Akhir Turnamen 6 Kelompok (Durasi 30 Menit)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold flex items-center gap-1.5 shadow transition-all"
              title="Cetak Piagam Penghargaan Kelompok"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak Piagam</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Podium Display (1st, 2nd, 3rd) */}
        <div className="p-6 bg-gradient-to-b from-amber-50/50 to-slate-50 border-b border-slate-200">
          <div className="flex items-end justify-center gap-3 sm:gap-6 pt-4">
            {/* 2nd Place */}
            {runnerUp && (
              <div className="flex flex-col items-center flex-1 max-w-[170px]">
                <div className="text-3xl mb-1">{runnerUp.avatar}</div>
                <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-black text-sm border-2 border-white shadow-md">
                  #2
                </div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-800 text-center mt-1 truncate w-full">
                  {runnerUp.name}
                </h5>
                <span className="text-xs font-black text-indigo-700">{runnerUp.score} pts</span>
                <div className="w-full h-24 bg-gradient-to-t from-slate-300 to-slate-200 rounded-t-2xl shadow-inner mt-2 flex items-center justify-center font-extrabold text-slate-600 text-xs">
                  🥈 Perak
                </div>
              </div>
            )}

            {/* 1st Place Champion */}
            {champion && (
              <div className="flex flex-col items-center flex-1 max-w-[190px] -mt-6">
                <div className="text-4xl mb-1 animate-bounce">{champion.avatar}</div>
                <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg border-4 border-yellow-200 shadow-xl ring-4 ring-amber-300/50">
                  👑
                </div>
                <h5 className="font-black text-sm sm:text-base text-amber-950 text-center mt-1 truncate w-full">
                  {champion.name}
                </h5>
                <span className="text-sm font-black text-amber-600">{champion.score} pts</span>
                <div className="w-full h-36 bg-gradient-to-t from-amber-400 via-amber-300 to-yellow-300 rounded-t-2xl shadow-lg mt-2 flex flex-col items-center justify-center font-black text-amber-950 text-sm border-t-2 border-yellow-100">
                  <Trophy className="w-6 h-6 mb-1 text-amber-800 fill-current" />
                  <span>🥇 JUARA 1</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {thirdPlace && (
              <div className="flex flex-col items-center flex-1 max-w-[170px]">
                <div className="text-3xl mb-1">{thirdPlace.avatar}</div>
                <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-md">
                  #3
                </div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-800 text-center mt-1 truncate w-full">
                  {thirdPlace.name}
                </h5>
                <span className="text-xs font-black text-indigo-700">{thirdPlace.score} pts</span>
                <div className="w-full h-16 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-2xl shadow-inner mt-2 flex items-center justify-center font-extrabold text-amber-100 text-xs">
                  🥉 Perunggu
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Table of All 6 Teams */}
        <div className="p-5">
          <h4 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Rekapitulasi Lengkap 6 Kelompok:
          </h4>

          <div className="space-y-2">
            {sortedTeams.map((team, idx) => (
              <div
                key={team.id}
                className={`p-3 rounded-xl flex items-center justify-between border ${
                  idx === 0
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    idx === 0 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-2xl">{team.avatar}</span>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{team.name}</h5>
                    <p className="text-[11px] text-slate-500 italic">"{team.motto}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="text-xs text-slate-500">
                    <span>Petak #{team.boardPosition}</span> • <span>⚖️ {team.casesSolved}</span> • <span>⚡ {team.buzzersWon}</span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-indigo-700">{team.score}</span>
                    <span className="text-xs text-slate-400 font-semibold ml-1">pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Printable Certificate Template (Shown during print) */}
        <div ref={printRef} className="hidden print:block p-8 border-8 border-double border-amber-500 m-4 rounded-xl text-center bg-amber-50/20">
          <div className="border-2 border-amber-400 p-6 rounded-lg">
            <h1 className="text-2xl font-black text-amber-900 tracking-wide uppercase">
              PIAGAM PENGHARGAAN TURNAMEN SATRIA HUKUM
            </h1>
            <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest font-semibold">
              Materi: Indonesia Sebagai Negara Hukum (UUD 1945 Pasal 1 Ayat 3)
            </p>

            <div className="my-6">
              <p className="text-sm text-slate-700">Diberikan dengan penuh kehormatan kepada:</p>
              <h2 className="text-2xl font-black text-indigo-900 mt-1 underline decoration-amber-400">
                {champion?.name || 'Kelompok Juara'}
              </h2>
              <p className="text-xs text-slate-500 italic mt-1">"{champion?.motto}"</p>
            </div>

            <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
              Atas integritas, kerja sama, ketangkasan bernalar konstitusi, dan dedikasi luar biasa dalam Turnamen PPKn 6 Kelompok dengan total raihan <b>{champion?.score || 0} Poin</b>.
            </p>

            <div className="mt-8 flex justify-between items-center text-xs text-slate-700 px-8">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold mt-10 border-t border-slate-400 pt-1">Guru Pamong PPKn</p>
              </div>
              <div className="text-amber-600 font-black text-sm">
                ⭐ PELAJAR PANCASILA TERCERAHKAN ⭐
              </div>
              <div>
                <p>Tanggal Turnamen,</p>
                <p className="font-bold mt-10 border-t border-slate-400 pt-1">{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Tutup & Lanjutkan Pembelajaran
          </button>
        </div>
      </div>
    </div>
  );
};
