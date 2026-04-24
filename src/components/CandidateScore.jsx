import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, GraduationCap, Wallet, AlertCircle, Scale } from 'lucide-react';

const CANDIDATES = [
  {
    id: 1,
    name: 'Candidate A',
    party: 'Mainland Party',
    assets: '₹12.4 Cr',
    education: 'Doctorate',
    criminalRecords: 0,
    score: 92,
  },
  {
    id: 2,
    name: 'Candidate B',
    party: 'Regional Front',
    assets: '₹4.2 Cr',
    education: 'Post Graduate',
    criminalRecords: 1,
    score: 68,
  },
  {
    id: 3,
    name: 'Candidate C',
    party: 'Independent',
    assets: '₹45 Lakh',
    education: 'Undergraduate',
    criminalRecords: 4,
    score: 42,
  }
];

export default function CandidateScore() {
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const toggleCandidate = (id) => {
    setSelectedCandidates(prev => {
      if (prev.includes(id)) return prev.filter(cId => cId !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 bg-green-50 dark:bg-green-950/20';
    if (score >= 60) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    return 'text-red-500 bg-red-50 dark:bg-red-950/20';
  };

  const getScoreBorder = (score) => {
    if (score >= 80) return 'border-green-500';
    if (score >= 60) return 'border-yellow-500';
    return 'border-red-500';
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50 -z-10" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-navy-50 dark:bg-navy-900/30 text-navy-600 dark:text-navy-400 text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#000080' }}>
            Transparency Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-gray-900 dark:text-white mb-4 tracking-tight">
            Candidate <span className="text-orange-500">Transparency</span> Score
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Analyze candidates based on public data — assets, criminal records, and education. Select two to compare.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {CANDIDATES.map(c => {
            const isSelected = selectedCandidates.includes(c.id);
            return (
              <motion.div
                key={c.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCandidate(c.id)}
                className={`p-6 rounded-[32px] glass-card transition-all duration-500 cursor-pointer relative group ${
                  isSelected ? 'ring-2 ring-orange-500 ring-offset-4 dark:ring-offset-gray-950' : ''
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  >
                    {selectedCandidates.indexOf(c.id) + 1}
                  </motion.div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${getScoreColor(c.score)} border ${getScoreBorder(c.score)}`}>
                    {c.score}
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{c.party}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 flex items-center gap-1.5"><GradCap className="w-3 h-3" /> Education</span>
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{c.education}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Records</span>
                    <span className={`${c.criminalRecords > 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>{c.criminalRecords} Pending</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison View */}
        <AnimatePresence>
          {selectedCandidates.length === 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-10 rounded-[40px] glass-card relative overflow-hidden border-2 border-orange-500/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center z-10 shadow-2xl shadow-orange-500/50 text-white font-black text-sm font-poppins">
                  VS
                </div>

                <div className="grid grid-cols-2 gap-12 relative">
                  {selectedCandidates.map(id => {
                    const c = CANDIDATES.find(cand => cand.id === id);
                    return (
                      <div key={id} className="space-y-6">
                        <div className="text-center">
                          <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center font-bold text-3xl mb-4 ${getScoreColor(c.score)} border-2 ${getScoreBorder(c.score)} shadow-inner`}>
                            {c.score}
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">{c.name}</h4>
                          <p className="text-xs text-orange-500 font-bold tracking-widest">{c.party}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <StatRow icon={<GradCap />} label="Qualification" value={c.education} />
                          <StatRow icon={<AlertCircle />} label="Criminal Cases" value={c.criminalRecords} alert={c.criminalRecords > 0} />
                          <StatRow icon={<Wallet />} label="Total Assets" value={c.assets} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StatRow({ icon, label, value, alert }) {
  return (
    <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-white/5 flex items-center justify-between transition-all hover:bg-white dark:hover:bg-gray-800/50 group">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl transition-colors ${alert ? 'bg-red-500/10 text-red-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:text-orange-500'}`}>{icon}</div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-sm font-black ${alert ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{value}</span>
    </div>
  );
}

function GradCap(props) {
  return <GraduationCap className={props.className || "w-4 h-4"} />
}
