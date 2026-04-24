import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MousePointer2, StopCircle, CheckCircle2 } from 'lucide-react';
import TimelineItem from './TimelineItem';
import ProgressBar from './ProgressBar';
import OnboardingModal from './OnboardingModal';
import ReadAloud from './ReadAloud';
import { phases } from '../data/phases';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';

/**
 * TimelineContainer — Enhanced main orchestrator
 */
export default function TimelineContainer({ onPhaseChange }) {
  const { t } = useLanguage();
  const [activePhase, setActivePhase] = useState(null);
  const [completedPhases, setCompletedPhases] = useLocalStorage('election_completed_phases', []);
  const [isGuiding, setIsGuiding] = useState(false);
  const [guideStep, setGuideStep] = useState(null); // Current phase ID in guide
  const [userData, setUserData] = useState(null);

  const containerRef  = useRef(null);
  const phaseRefs     = useRef({});
  const guideTimerRef = useRef(null);

  /* Load onboarding data */
  useEffect(() => {
    const isFirstTime = localStorage.getItem('election_user_is_first_time');
    const selectedState = localStorage.getItem('election_user_state');
    if (isFirstTime !== null) {
      setUserData({ isFirstTime: isFirstTime === 'true', selectedState });
    }
  }, []);

  const handleOnboardingComplete = (data) => {
    setUserData(data);
  };

  /* Scroll-driven timeline line */
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start 80%', 'end 30%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleToggle = useCallback((id) => {
    if (isGuiding) return; // Disable manual toggle during guide
    const nextPhase = activePhase === id ? null : id;
    setActivePhase(nextPhase);
    if (onPhaseChange) onPhaseChange(nextPhase);
  }, [isGuiding, activePhase, onPhaseChange]);

  const handleMarkComplete = useCallback((id) => {
    setCompletedPhases((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, [setCompletedPhases]);

  /* Enhanced Guide Mode */
  const startGuide = async () => {
    if (isGuiding) {
      clearTimeout(guideTimerRef.current);
      setIsGuiding(false);
      setGuideStep(null);
      return;
    }
    setIsGuiding(true);

    for (const phase of phases) {
      setGuideStep(phase.id);
      setActivePhase(phase.id);
      if (onPhaseChange) onPhaseChange(phase.id);

      const el = phaseRefs.current[phase.id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      await new Promise((resolve) => {
        guideTimerRef.current = setTimeout(resolve, 4500);
      });
    }
    setIsGuiding(false);
    setGuideStep(null);
  };

  return (
    <div className="relative">
      <OnboardingModal onComplete={handleOnboardingComplete} />

      <section aria-label="Election Phase Timeline" className="pb-20 relative">
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50 -z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <ProgressBar completed={completedPhases.length} total={phases.length} />

          <div className="text-center mb-10 pt-16">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              Interactive Guide
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
              The Voting <span className="text-orange-500">Journey</span> 🧭
            </h2>
          </div>

          {/* Guide Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startGuide}
              className={`group relative inline-flex items-center gap-3 px-10 py-4 rounded-[24px] font-bold text-sm text-white shadow-2xl transition-all overflow-hidden ${isGuiding ? 'bg-red-600' : 'bg-royal-navy'}`}
              style={{
                background: isGuiding
                  ? 'linear-gradient(135deg, #EF4444, #dc2626)'
                  : 'linear-gradient(135deg, #000080, #1a1ab3)',
              }}
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              {isGuiding ? <StopCircle className="w-5 h-5" /> : <MousePointer2 className="w-5 h-5" />}
              {isGuiding ? t('exitGuide') : t('beginJourney')}
            </motion.button>

            {completedPhases.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setCompletedPhases([]); setActivePhase(null); }}
                className="px-6 py-3.5 rounded-2xl text-xs font-bold border-2 border-gray-100 dark:border-gray-800 text-gray-500 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900 transition-all bg-white dark:bg-gray-900"
              >
                {t('resetProgress')}
              </motion.button>
            )}
          </div>

          {/* Personalized Banner */}
          <AnimatePresence>
            {userData && !isGuiding && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 p-6 rounded-[32px] glass-card flex items-center gap-6 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center text-xl">
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {t('voterTip', { state: userData.selectedState })}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                    {userData.isFirstTime
                      ? t('firstTimeTip')
                      : t('experiencedTip')}
                  </p>
                </div>
                <ReadAloud text={`${t('voterTip', { state: userData.selectedState })}. ${userData.isFirstTime ? t('firstTimeTip') : t('experiencedTip')}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline Container */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-[39px] top-4 bottom-4 w-1 rounded-full bg-gray-100 dark:bg-gray-800" />

            {/* Scroll Progress Line */}
            <div className="absolute left-[39px] top-4 bottom-4 w-1 rounded-full overflow-hidden pointer-events-none">
              <motion.div
                className="w-full origin-top rounded-full"
                style={{
                  scaleY: lineScaleY,
                  height: '100%',
                  background: 'linear-gradient(to bottom, #FF9933 0%, #000080 50%, #138808 100%)',
                }}
              />
            </div>

            {/* Phases */}
            {phases.map((phase, index) => {
              const isActive = activePhase === phase.id;
              const isCompleted = completedPhases.includes(phase.id);
              const isHighlighted = userData?.isFirstTime && phase.id === 2 && !isCompleted;

              return (
                <div key={phase.id} className="relative">
                  {/* Guide Tooltip Overlay */}
                  <AnimatePresence>
                    {isGuiding && guideStep === phase.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-12 left-20 z-20 bg-gray-900 text-white px-4 py-2 rounded-xl text-[11px] font-bold shadow-2xl flex items-center gap-2 border border-white/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        {t('journey')}: {phase.title}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <TimelineItem
                    phase={phase}
                    index={index}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    isGuiding={isGuiding}
                    isHighlighted={isHighlighted}
                    onToggle={() => handleToggle(phase.id)}
                    onMarkComplete={() => handleMarkComplete(phase.id)}
                    dotRef={(el) => { phaseRefs.current[phase.id] = el; }}
                  />
                </div>
              );
            })}

            {/* Final Celebration */}
            <AnimatePresence>
              {completedPhases.length === phases.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-12 p-12 rounded-[56px] text-center glass-card border-2 border-green-500/20 shadow-2xl shadow-green-500/10 group overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-2">
                    {t('readyToVote')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                    {t('readyToVoteDesc', { count: phases.length })}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
