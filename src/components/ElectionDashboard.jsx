import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area, LineChart, Line } from 'recharts';
import { Users, Vote, Target, TrendingUp, X, Maximize2, Activity, Info } from 'lucide-react';

const BAR_DATA = [
  { year: '2004', turnout: 58.1 },
  { year: '2009', turnout: 58.2 },
  { year: '2014', turnout: 66.4 },
  { year: '2019', turnout: 67.4 },
  { year: '2024*', turnout: 69.1 },
];

const VOTER_DATA = [
  { name: 'Male', value: 50.4, color: '#000080' },
  { name: 'Female', value: 46.2, color: '#FF9933' },
  { name: 'Others', value: 3.4, color: '#138808' },
];

const STATE_DATA = [
  { name: 'Maharashtra', turnout: 61.1, growth: 2.1 },
  { name: 'UP', turnout: 59.2, growth: 1.5 },
  { name: 'Bihar', turnout: 57.3, growth: 3.2 },
  { name: 'Kerala', turnout: 77.6, growth: 0.8 },
  { name: 'WB', turnout: 81.9, growth: -0.4 },
];

export default function ElectionDashboard({ darkMode }) {
  const [liveVoters, setLiveVoters] = useState(968000000);
  const [selectedCard, setSelectedCard] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [voterStatus, setVoterStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Fetch initial data from backend
    fetch('/api/election-data')
      .then(res => res.json())
      .then(data => {
        setLiveVoters(parseInt(data.stats.totalVoters.replace(/,/g, '')));
      })
      .catch(err => console.error('Error fetching data:', err));

    const interval = setInterval(() => {
      setLiveVoters(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVoterCheck = async (e) => {
    e.preventDefault();
    if (!voterId) return;
    setIsChecking(true);
    try {
      const res = await fetch('/api/voter-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterId })
      });
      const data = await res.json();
      setVoterStatus(data);
    } catch (err) {
      console.error('Check failed:', err);
    } finally {
      setIsChecking(false);
    }
  };

  const closeOverlay = useCallback(() => setSelectedCard(null), []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <Activity className="w-3 h-3" />
              Real-time Intelligence
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
              Electoral <span className="text-green-600">Analytics</span> <span className="text-orange-500">Hub</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Click on any card to explore deep-dive insights</p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card px-8 py-6 rounded-[32px] flex items-center gap-6 border-2 border-green-500/20 shadow-green-500/10"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Live Eligible Voters</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
                <CountUp value={liveVoters} />
              </h4>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <motion.div 
            layoutId="card-turnout"
            onClick={() => setSelectedCard('turnout')}
            className="lg:col-span-2 p-10 rounded-[48px] glass-card glass-card-hover cursor-pointer relative group"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-green-500/10 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg tracking-tight">Voter Turnout History</h3>
                  <p className="text-xs text-gray-400 font-medium">National percentage trends across years</p>
                </div>
              </div>
              <Maximize2 className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={BAR_DATA}>
                  <defs>
                    <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#138808" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#138808" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#ffffff10' : '#00000010'} />
                  <XAxis dataKey="year" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} dy={10} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} domain={[50, 75]} tick={{fill: '#94a3b8', fontWeight: 600}} dx={-10} />
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#138808', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="turnout" 
                    stroke="#138808" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorTurnout)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Info className="w-3 h-3" /> Click to explore state-wise breakdown
            </div>
          </motion.div>

          <div className="space-y-8">
            {/* Demographics Card */}
            <motion.div 
              layoutId="card-demo"
              onClick={() => setSelectedCard('demo')}
              className="p-10 rounded-[48px] glass-card glass-card-hover cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                    <Vote className="w-4 h-4" />
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-sm tracking-tight">Demographics</h3>
                </div>
                <Maximize2 className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="h-[160px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={VOTER_DATA}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={8}
                      dataKey="value"
                      animationBegin={500}
                      animationDuration={1500}
                    >
                      {VOTER_DATA.map((entry, index) => (
                        <Cell key={index} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">968<span className="text-xs text-gray-400">M</span></span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {VOTER_DATA.map(d => (
                  <div key={d.name} className="text-center">
                    <div className="text-[10px] font-black text-gray-900 dark:text-white">{d.value}%</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{d.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Target Card */}
            <div className="p-8 rounded-[40px] bg-gradient-to-br from-navy-900 to-indigo-900 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight">75% Target</h4>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">MISSION 2024</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-black tabular-nums">69.1%</div>
                  <div className="text-[10px] font-black text-orange-400 mb-1">+2.7% GAP</div>
                </div>
                <div className="h-3 bg-white/10 rounded-full p-0.5 overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  />
                </div>
              </div>
            </div>

            {/* Voter Check Card */}
            <div className="p-8 rounded-[40px] glass-card border-2 border-indigo-500/10">
              <h3 className="font-black text-gray-900 dark:text-white text-sm mb-4 tracking-tight uppercase">Voter Status Check</h3>
              <form onSubmit={handleVoterCheck} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter Voter ID (EPIC)..."
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 outline-none text-xs font-bold transition-all"
                />
                <button 
                  disabled={isChecking}
                  className="w-full py-3 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                >
                  {isChecking ? 'Checking...' : 'Check Status'}
                </button>
              </form>
              
              <AnimatePresence>
                {voterStatus && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${voterStatus.status === 'Registered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {voterStatus.status}
                      </span>
                    </div>
                    {voterStatus.pollingStation && (
                      <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                        📍 {voterStatus.pollingStation} (Booth {voterStatus.boothNo})
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Modal Overlay */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOverlay}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={selectedCard === 'turnout' ? 'card-turnout' : 'card-demo'}
              className="w-full max-w-5xl glass-card rounded-[56px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] bg-white dark:bg-gray-900"
            >
              <button 
                onClick={closeOverlay}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-12 overflow-y-auto">
                {selectedCard === 'turnout' ? (
                  <div className="space-y-12">
                    <div>
                      <h2 className="text-4xl font-black font-poppins text-gray-900 dark:text-white mb-4 tracking-tight">Detailed Turnout Insights</h2>
                      <p className="text-gray-500 dark:text-gray-400 max-w-2xl font-medium">State-wise comparative analysis of voter participation and growth trends relative to the 2019 general elections.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="h-[400px] bg-gray-50 dark:bg-white/5 rounded-[40px] p-8">
                         <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">State-wise Participation (%)</h4>
                         <ResponsiveContainer width="100%" height="90%">
                           <BarChart data={STATE_DATA} layout="vertical">
                             <XAxis type="number" hide />
                             <YAxis dataKey="name" type="category" fontSize={11} axisLine={false} tickLine={false} width={80} tick={{fill: '#94a3b8', fontWeight: 700}} />
                             <RechartsTooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                             <Bar dataKey="turnout" radius={[0, 10, 10, 0]} barSize={24}>
                               {STATE_DATA.map((entry, i) => (
                                 <Cell key={i} fill={entry.turnout > 70 ? '#138808' : '#FF9933'} />
                               ))}
                             </Bar>
                           </BarChart>
                         </ResponsiveContainer>
                      </div>

                      <div className="h-[400px] bg-gray-50 dark:bg-white/5 rounded-[40px] p-8">
                         <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Participation Growth Trends</h4>
                         <ResponsiveContainer width="100%" height="90%">
                           <LineChart data={STATE_DATA}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                             <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                             <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                             <RechartsTooltip content={<CustomTooltip />} />
                             <Line type="step" dataKey="growth" stroke="#138808" strokeWidth={4} dot={{r: 6, fill: '#138808', strokeWidth: 4, stroke: '#fff'}} />
                           </LineChart>
                         </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div>
                      <h2 className="text-4xl font-black font-poppins text-gray-900 dark:text-white mb-4 tracking-tight">Voter Demographics</h2>
                      <p className="text-gray-500 dark:text-gray-400 max-w-2xl font-medium">A deep dive into the diverse tapestry of the Indian electorate, segmented by age, gender, and regional location.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <MetricBox label="First Time Voters" value="12.5M" sub="+15% increase" />
                       <MetricBox label="Female Ratio" value="948" sub="per 1000 males" />
                       <MetricBox label="NRIs Registered" value="1.2L" sub="Global participation" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CountUp({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(start + (end - start) * progress);
      setDisplayValue(current);

      if (frame === totalFrames) clearInterval(counter);
    }, frameDuration);

    return () => clearInterval(counter);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-white/50">{payload[0].payload.year || payload[0].payload.name}</div>
        <div className="text-base font-black text-orange-500">{payload[0].value}% <span className="text-[10px] text-white/70">Turnout</span></div>
      </div>
    );
  }
  return null;
}

function MetricBox({ label, value, sub }) {
  return (
    <div className="p-8 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
      <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{label}</h5>
      <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{value}</div>
      <p className="text-[10px] font-bold text-green-500">{sub}</p>
    </div>
  );
}
