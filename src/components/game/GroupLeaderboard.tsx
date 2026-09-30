import React, { useState } from 'react';
import { Trophy, Award, Plus, Minus, Edit3, Volume2, Sparkles, Check, Users } from 'lucide-react';
import { GroupTeam } from '../../types';
import { sound, speakText } from '../../utils/audio';

interface GroupLeaderboardProps {
  teams: GroupTeam[];
  setTeams: React.Dispatch<React.SetStateAction<GroupTeam[]>>;
  activeTeamId: number;
  setActiveTeamId: (id: number) => void;
}

export const GroupLeaderboard: React.FC<GroupLeaderboardProps> = ({
  teams,
  setTeams,
  activeTeamId,
  setActiveTeamId
}) => {
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [tempName, setTempName] = useState<string>('');
  const [tempMotto, setTempMotto] = useState<string>('');

  // Sort by score descending to get ranks
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const handleAdjustScore = (teamId: number, delta: number) => {
    if (delta > 0) sound.playSuccess();
    else sound.playClick();

    setTeams(prev =>
      prev.map(t => {
        if (t.id === teamId) {
          const newScore = Math.max(0, t.score + delta);
          return { ...t, score: newScore };
        }
        return t;
      })
    );
  };

  const startEdit = (team: GroupTeam) => {
    sound.playClick();
    setEditingTeamId(team.id);
    setTempName(team.name);
    setTempMotto(team.motto);
  };

  const saveEdit = (teamId: number) => {
    sound.playSuccess();
    setTeams(prev =>
      prev.map(t =>
        t.id === teamId
          ? { ...t, name: tempName.trim() || t.name, motto: tempMotto.trim() || t.motto }
          : t
      )
    );
    setEditingTeamId(null);
  };

  const announceLeaderboard = () => {
    sound.playFanfare();
    const leader = sortedTeams[0];
    const speech = `Klasemen sementara: Peringkat pertama dipimpin oleh ${leader.name} dengan ${leader.score} poin! Semua kelompok tetap berjuang!`;
    speakText(speech);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Trophy className="w-6 h-6 text-amber-900" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              Papan Skor 6 Kelompok
              <span className="text-xs bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-400/30">
                Live Standings
              </span>
            </h3>
            <p className="text-xs text-indigo-200">
              Klik kartu kelompok untuk mengaktifkan giliran atau sesuaikan poin.
            </p>
          </div>
        </div>

        <button
          onClick={announceLeaderboard}
          className="px-3 py-1.5 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow border border-indigo-500/40"
          title="Dengarkan pengumuman peringkat suara guru"
        >
          <Volume2 className="w-4 h-4" />
          <span>Umumkan Klasemen</span>
        </button>
      </div>

      {/* Grid of 6 Teams */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-slate-50">
        {teams.map((team) => {
          const rank = sortedTeams.findIndex(t => t.id === team.id) + 1;
          const isActive = team.id === activeTeamId;

          return (
            <div
              key={team.id}
              onClick={() => {
                sound.playClick();
                setActiveTeamId(team.id);
              }}
              className={`relative rounded-xl p-3.5 transition-all cursor-pointer border-2 bg-white flex flex-col justify-between shadow-sm hover:shadow-md ${
                isActive
                  ? `${team.borderColor} ring-4 ${team.ringColor}/20 scale-[1.02] shadow-indigo-100`
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Active Badge */}
              {isActive && (
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-3 h-3" /> Giliran Aktif
                </div>
              )}

              <div>
                {/* Team Top: Rank + Avatar + Name */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${
                        rank === 1
                          ? 'bg-amber-500 shadow-md ring-2 ring-amber-300'
                          : rank === 2
                          ? 'bg-slate-400'
                          : rank === 3
                          ? 'bg-amber-700'
                          : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      #{rank}
                    </span>
                    <span className="text-2xl p-1 rounded-lg bg-slate-100">{team.avatar}</span>
                    <div className="overflow-hidden">
                      <h4 className="font-extrabold text-slate-900 text-sm leading-tight truncate">
                        {team.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 italic truncate max-w-[150px]">
                        "{team.motto}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(team);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Ubah Nama & Slogan Kelompok"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Score & Board Position Display */}
                <div className="my-2.5 flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Poin</span>
                    <span className="text-2xl font-black text-indigo-700">{team.score}</span>
                    <span className="text-[11px] text-slate-400 font-semibold ml-1">pts</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Posisi Papan</span>
                    <span className="inline-flex items-center gap-1 font-bold text-slate-700 text-xs bg-white px-2 py-1 rounded border border-slate-200">
                      Petak #{team.boardPosition}
                    </span>
                  </div>
                </div>

                {/* Sub Stats: Cases & Buzzers */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-2 px-1">
                  <span>⚖️ Sidang: <b>{team.casesSolved}</b></span>
                  <span>⚡ Bel Cepat: <b>{team.buzzersWon}</b></span>
                </div>
              </div>

              {/* Score Control Bar for Teacher/Group */}
              <div
                className="pt-2 border-t border-slate-100 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sesuaikan:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAdjustScore(team.id, -5)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 text-xs font-bold transition-colors"
                    title="Kurang 5 poin"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => handleAdjustScore(team.id, 5)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 text-xs font-bold transition-colors"
                    title="Tambah 5 poin"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => handleAdjustScore(team.id, 10)}
                    className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold transition-colors border border-indigo-200"
                    title="Tambah 10 poin bonus"
                  >
                    +10
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingTeamId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h4 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Sesuaikan Identitas Kelompok
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Kelompok:
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-800"
                  placeholder="Contoh: Kelompok 1 - Satria Hukum"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Slogan / Motto Tim:
                </label>
                <input
                  type="text"
                  value={tempMotto}
                  onChange={(e) => setTempMotto(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  placeholder="Contoh: Adil, Jujur, dan Berani!"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingTeamId(null)}
                className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={() => saveEdit(editingTeamId)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
