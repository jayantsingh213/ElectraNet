import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ShieldCheck, Milestone, MessageCircle, BarChart3, Sun, Moon, Globe, Users, TrendingUp, MapPin, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import TimelineContainer from './components/TimelineContainer';
import Chatbot from './components/Chatbot';
import ElectionDashboard from './components/ElectionDashboard';
import CandidateScore from './components/CandidateScore';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [activePhase, setActivePhase] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [activeSection, setActiveSection] = useState('timeline');
  const [showChatbot, setShowChatbot] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('election_dark_mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('election_dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const ft = localStorage.getItem('election_user_is_first_time');
    if (ft !== null) setIsFirstTime(ft === 'true');
  }, [darkMode]);

  const toggleDark = () => setDarkMode((d) => !d);

  return (
    <div className="min-h-screen bg-mesh text-gray-900 dark:text-white transition-colors duration-500 font-inter selection:bg-orange-500/10 selection:text-orange-600 relative overflow-x-hidden">
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <img 
                src="/electranet-logo.png" 
                alt="ElectraNet" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="font-black text-xl font-poppins tracking-tight">
              {t('title').split(' ')[0]}<span className="text-orange-500">{t('title').split(' ')[1]}</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1 rounded-[20px] border border-gray-100 dark:border-white/5 backdrop-blur-md">
             <NavLink active={activeSection === 'stats'} onClick={() => setActiveSection('stats')} icon={<BarChart3 className="w-4 h-4" />} label={t('market')} href="#stats" />
             <NavLink active={activeSection === 'timeline'} onClick={() => setActiveSection('timeline')} icon={<Milestone className="w-4 h-4" />} label={t('journey')} href="#timeline" />
             <NavLink active={activeSection === 'transparency'} onClick={() => setActiveSection('transparency')} icon={<ShieldCheck className="w-4 h-4" />} label={t('transparency')} href="#transparency" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-2xl flex items-center gap-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-all border border-gray-100 dark:border-white/10 text-xs font-bold"
            >
              <Globe className="w-4 h-4 text-orange-500" />
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>
            <button
              onClick={toggleDark}
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-all border border-gray-100 dark:border-white/10"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowChatbot(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black uppercase tracking-widest shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> {t('askAI')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Animated Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10 animate-pulse [animation-delay:2s]" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-inner"
            >
              <Sparkles className="w-3 h-3" />
              {t('tagline')}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black font-poppins tracking-tight mb-8 leading-[1.1] text-gray-900 dark:text-white"
            >
              {t('heroTitle').split(' ')[0]} <span className="text-orange-500">{t('heroTitle').split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-20"
            >
              <button 
                onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 rounded-[24px] bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold text-base shadow-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {t('startJourney')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-[24px] bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-white/5 text-gray-900 dark:text-white font-bold text-base hover:border-orange-500/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 group shadow-xl"
              >
                <LayoutDashboard className="w-5 h-5 text-orange-500" /> {t('viewInsights')}
              </button>
            </motion.div>

            {/* Floating Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              <HeroStatCard 
                icon={<Users className="w-6 h-6" />} 
                label="Total Voters" 
                value="968M" 
                sub="+2.4% vs 2019" 
                color="orange"
                delay={0.6}
              />
              <HeroStatCard 
                icon={<TrendingUp className="w-6 h-6" />} 
                label="Turnout %" 
                value="67.4%" 
                sub="Last Election" 
                color="green"
                delay={0.7}
              />
              <HeroStatCard 
                icon={<MapPin className="w-6 h-6" />} 
                label="Constituencies" 
                value="543" 
                sub="Active Seats" 
                color="navy"
                delay={0.8}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Smart Insight Strip */}
      <div className="ticker-wrap mt-10">
        <div className="ticker-item flex items-center gap-12">
          <span>🔥 Voter turnout increased by +4.2% in Phase 1</span>
          <span>📍 Highest participation recorded in Maharashtra</span>
          <span>⚡ 12.5M First-time voters registered this year</span>
          <span>🇮🇳 ECI deploys 15M polling staff nationwide</span>
          <span>✅ 99.8% EVM accuracy maintained</span>
          <span>🔥 Voter turnout increased by +4.2% in Phase 1</span>
          <span>📍 Highest participation recorded in Maharashtra</span>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div id="stats" className="scroll-mt-24 pt-24">
         <ElectionDashboard darkMode={darkMode} />
      </div>

      {/* Main Journey Timeline */}
      <div id="timeline" className="scroll-mt-24 pt-24">
         <TimelineContainer onPhaseChange={setActivePhase} />
      </div>

      {/* Transparency Section */}
      <div id="transparency" className="scroll-mt-24 pt-24">
         <CandidateScore />
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-950/50 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
           <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
                  <img 
                    src="/electranet-logo.png" 
                    alt="ElectraNet" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="font-black text-2xl font-poppins">{t('title')}</span>
              </div>
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                {t('footerText')}
              </p>
           </div>
           <div className="flex flex-col gap-5">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">{t('resources')}</h4>
              <FooterLink label={t('searchRoll')} href="https://electoralsearch.eci.gov.in" />
              <FooterLink label={t('voterPortal')} href="https://voters.eci.gov.in" />
              <FooterLink label={t('candidateAffidavits')} href="https://affidavit.eci.gov.in" />
           </div>
           <div className="flex flex-col gap-5">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">{t('theECI')}</h4>
              <FooterLink label={t('aboutECI')} href="https://eci.gov.in" />
              <FooterLink label={t('mcc')} href="https://eci.gov.in/mcc/" />
              <FooterLink label={t('complaintPortal')} href="https://cvigil.eci.gov.in" />
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t('copyright')}</p>
           <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              🇮🇳 {t('jaiHind')}
           </div>
        </div>
      </footer>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {showChatbot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[400px] h-[600px] glass-card rounded-[40px] shadow-2xl overflow-hidden border-2 border-orange-500/20"
            >
               <Chatbot activePhase={activePhase} isFirstTime={isFirstTime} onMinimize={() => setShowChatbot(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatbot(!showChatbot)}
          className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all duration-500 ${showChatbot ? 'bg-red-500 rotate-90' : 'bg-navy-900 dark:bg-white text-white dark:text-navy-900'}`}
        >
          {showChatbot ? <Milestone className="w-6 h-6 rotate-[-90deg]" /> : <MessageCircle className="w-7 h-7" />}
          {!showChatbot && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-ping" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

function NavLink({ active, onClick, icon, label, href }) {
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`nav-link-premium group relative ${
        active 
          ? 'text-orange-500' 
          : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
      }`}
    >
      <span className={`transition-transform duration-500 group-hover:-translate-y-0.5 ${active ? 'text-orange-500' : ''}`}>{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.15em]">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute -bottom-1 left-6 right-6 h-1 bg-orange-500 rounded-full blur-[2px]"
        />
      )}
    </a>
  );
}

function HeroStatCard({ icon, label, value, sub, color, delay }) {
  const colors = {
    orange: 'from-orange-500/10 to-orange-500/5 text-orange-500 border-orange-500/20',
    green: 'from-green-500/10 to-green-500/5 text-green-500 border-green-500/20',
    navy: 'from-navy-500/10 to-navy-500/5 text-indigo-500 border-indigo-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`p-8 rounded-[40px] glass-card glass-card-hover border-2 bg-gradient-to-br ${colors[color]} text-left animate-float-slow`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white dark:bg-gray-800 shadow-xl`}>
        {icon}
      </div>
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{label}</h4>
      <div className="text-4xl font-black font-poppins text-gray-900 dark:text-white mb-2 leading-none">{value}</div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${color === 'navy' ? 'text-indigo-400' : colors[color].split(' ')[2]}`}>{sub}</div>
    </motion.div>
  );
}

function FooterLink({ label, href }) {
  return (
     <a 
       href={href} 
       target="_blank" 
       rel="noopener noreferrer"
       className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-all hover:translate-x-1 inline-block"
     >
       {label}
     </a>
  );
}
