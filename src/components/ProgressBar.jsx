import { motion } from 'framer-motion';

/**
 * ProgressBar — sticky top bar showing completion progress
 * Props: completed (number), total (number)
 */
export default function ProgressBar({ completed, total }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="sticky top-0 z-50 glass border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${pct === 100 ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 font-inter">
              {completed === 0
                ? 'Your Journey Begins'
                : completed === total
                ? "Election Ready"
                : `Progress: ${completed} / ${total} Phases`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
             <span
               className="text-sm font-black font-poppins"
               style={{ color: pct === 100 ? '#138808' : '#FF9933' }}
             >
               {pct}%
             </span>
          </div>
        </div>

        {/* Track */}
        <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full z-10"
            style={{
              background:
                pct === 100
                  ? 'linear-gradient(to right, #138808, #4ade80)'
                  : 'linear-gradient(to right, #FF9933, #138808)',
              boxShadow: pct > 0 ? `0 0 10px ${pct === 100 ? '#13880860' : '#FF993360'}` : 'none'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-2.5 px-0.5">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full relative"
              animate={{
                backgroundColor: i < completed ? '#138808' : i === completed ? '#FF9933' : 'rgba(156, 163, 175, 0.2)',
                scale: i === completed && completed < total ? 1.5 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
               {i === completed && completed < total && (
                 <motion.div 
                   layoutId="active-dot-glow"
                   className="absolute inset-0 bg-orange-500 rounded-full blur-[4px]"
                   animate={{ opacity: [0.4, 0.8, 0.4] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                 />
               )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
