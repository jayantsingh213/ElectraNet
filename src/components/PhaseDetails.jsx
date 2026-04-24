import { motion } from 'framer-motion';
import QuizCard from './QuizCard';
import ReadAloud from './ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

/**
 * PhaseDetails — fully expanded content for each timeline phase
 * Wraps in a motion.div for smooth accordion animation via AnimatePresence in parent
 */
export default function PhaseDetails({ phase, isCompleted, onMarkComplete }) {
  const { t, language } = useLanguage();
  const accent = phase.color;

  const displaySummary = language === 'hi' ? phase.hi.summary : phase.summary;
  const displayBullets = language === 'hi' ? phase.hi.bullets : phase.bullets;
  const displayDidYouKnow = language === 'hi' ? phase.hi.didYouKnow : phase.didYouKnow;

  const containerVariants = {
    hidden:  { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const bulletVariants = {
    hidden:  { opacity: 0, x: -14 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.08 + i * 0.07, duration: 0.35, ease: 'easeOut' },
    }),
  };

  const allText = `${displaySummary}. ${displayBullets.map(b => b.text).join('. ')}. ${displayDidYouKnow}`;

  return (
    <motion.div
      key="phase-details"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="overflow-hidden"
    >
      <div
        className="border-t mx-5 mb-1"
        style={{ borderColor: `${accent}25` }}
      />

      <div className="px-5 pb-6 pt-3 space-y-5">
        {/* Summary with Read Aloud */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {displaySummary}
          </p>
          <ReadAloud text={allText} className="mt-1" />
        </div>

        {/* Bullet points */}
        <ul className="space-y-3">
          {displayBullets.map((b, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={bulletVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-3"
            >
              <span className="text-xl leading-none flex-shrink-0 mt-0.5">{b.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{b.text}</span>
            </motion.li>
          ))}
        </ul>
        
        {/* ... remaining code same ... */}
        {/* Required documents (optional) */}
        {phase.documents && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              {t('idDocs')}
            </p>
            <div className="flex flex-wrap gap-2">
              {phase.documents.map((doc, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                             text-xs text-gray-700 dark:text-gray-300 font-medium"
                >
                  <span>{doc.icon}</span>
                  {doc.label}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Did You Know */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[24px] p-6 flex gap-4 glass relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accent }} />
          <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform">💡</span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
              {t('didYouKnow')}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {displayDidYouKnow}
            </p>
          </div>
        </motion.div>

        {/* Quiz */}
        <div className="pt-2">
          <QuizCard quiz={phase.quiz} />
        </div>

        {/* CTA Buttons + Mark Complete */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {phase.cta.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                btn.primary ? 'text-white shadow-md' : 'border bg-transparent'
              }`}
              style={
                btn.primary
                  ? { background: accent, boxShadow: `0 4px 16px ${accent}40` }
                  : { borderColor: accent, color: accent }
              }
            >
              {btn.label}
            </a>
          ))}

          {/* Mark as Completed */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMarkComplete}
            className={`ml-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg ${
              isCompleted
                ? 'bg-green-500 text-white shadow-green-500/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500'
            }`}
          >
            {isCompleted ? `✅ ${t('completed')}` : `☐ ${t('markCompleted')}`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
