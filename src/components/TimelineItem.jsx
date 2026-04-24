import { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import PhaseDetails from './PhaseDetails';
import Tooltip from './Tooltip';
import { useLanguage } from '../hooks/useLanguage';

/**
 * TimelineItem — individually polished phase card
 */
export default function TimelineItem({
  phase,
  index,
  isActive,
  isCompleted,
  isGuiding,
  isHighlighted,
  onToggle,
  onMarkComplete,
  dotRef,
}) {
  const { t, language } = useLanguage();
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: '-60px 0px' });
  const accent = phase.color;

  const displayTitle = language === 'hi' ? phase.hi.title : phase.title;
  const displaySubtitle = language === 'hi' ? phase.hi.subtitle : phase.subtitle;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative flex items-start gap-8 mb-8"
    >
      {/* Timeline Dot */}
      <div className="flex-shrink-0 relative z-10" ref={dotRef}>
        <Tooltip text={phase.iconTooltip}>
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.94 }}
            onClick={onToggle}
            className={`w-20 h-20 rounded-[30px] flex items-center justify-center text-3xl
                       cursor-pointer border-2 transition-all duration-400 select-none shadow-lg`}
            animate={{
              backgroundColor: isCompleted ? '#138808' : isActive ? accent : 'white',
              borderColor: isCompleted ? '#138808' : isActive ? accent : '#f1f1f1',
              boxShadow: isActive
                ? `0 20px 40px ${accent}30, inset 0 0 0 2px rgba(255,255,255,0.2)`
                : isCompleted
                ? '0 10px 20px rgba(19,136,8,0.2)'
                : '0 4px 12px rgba(0,0,0,0.03)',
              rotate: isActive ? 12 : 0,
            }}
          >
            <div className="text-white dark:text-inherit">
              {isCompleted ? <Check className="w-8 h-8 text-white" /> : phase.icon}
            </div>
          </motion.div>
        </Tooltip>

        {/* Pulse for Highlight */}
        {isHighlighted && !isActive && (
          <motion.div
            className="absolute inset-x-0 -bottom-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-orange-500 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter animate-bounce flex items-center gap-1">
              <Sparkles className="w-2 h-2" /> Start Here
            </div>
          </motion.div>
        )}
      </div>

      {/* Card */}
      <motion.div
        layout
        className={`flex-1 rounded-[32px] glass-card transition-all duration-500 cursor-pointer overflow-hidden group
                   ${isActive ? 'z-10' : 'z-0'} ${isActive ? 'ring-2 ring-opacity-50 ring-offset-4 dark:ring-offset-gray-950' : ''}`}
        style={{
          '--tw-ring-color': isActive ? accent : 'transparent'
        }}
        animate={{
          y: isActive ? -8 : 0,
          scale: isActive ? 1.02 : 1,
        }}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between p-6 gap-4">
          <div className="flex items-center gap-5 min-w-0">
             <div
               className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner"
               style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
             >
               {phase.id}
             </div>
             <div className="min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-xl font-poppins truncate leading-tight group-hover:text-orange-500 transition-colors">
                  {displayTitle}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-1 opacity-60">
                  {displaySubtitle}
                </p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             {isCompleted && (
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
               >
                 <Check className="w-4 h-4 text-white" strokeWidth={4} />
               </motion.div>
             )}
             <motion.div
               animate={{ rotate: isActive ? 180 : 0 }}
               className="w-10 h-10 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
             >
               <ChevronDown className="w-5 h-5" />
             </motion.div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isActive && (
            <PhaseDetails
              phase={phase}
              isCompleted={isCompleted}
              onMarkComplete={(e) => {
                e.stopPropagation();
                onMarkComplete();
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
