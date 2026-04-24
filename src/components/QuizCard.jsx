import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QuizCard — interactive MCQ quiz inside each phase
 * Props: quiz { question, options[], answer (index) }
 */
export default function QuizCard({ quiz }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.answer;

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  const getOptionClass = (idx) => {
    const base =
      'w-full text-left px-5 py-4 rounded-2xl text-xs font-bold border-2 transition-all duration-300 cursor-pointer leading-snug relative overflow-hidden group';
    if (!submitted) {
      if (selected === idx)
        return `${base} bg-orange-500 text-white border-orange-500 shadow-xl shadow-orange-500/20`;
      return `${base} bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-orange-500/50 hover:bg-gray-50 dark:hover:bg-gray-800`;
    }
    if (idx === quiz.answer)
      return `${base} bg-green-500 text-white border-green-500 shadow-xl shadow-green-500/20`;
    if (idx === selected && !isCorrect)
      return `${base} bg-red-500 text-white border-red-500 opacity-80`;
    return `${base} bg-white dark:bg-gray-800/30 text-gray-400 dark:text-gray-600 border-gray-100 dark:border-gray-800 opacity-50 grayscale`;
  };

  return (
    <div className="mt-8 p-6 rounded-[32px] bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-100/50 dark:border-white/5 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
          <motion.span
            animate={{ rotate: submitted && isCorrect ? [0, -15, 15, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl"
          >
            🧠
          </motion.span>
        </div>
        <span className="text-xs font-black text-orange-500 uppercase tracking-widest">
          Knowledge Check
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium leading-snug">
        {quiz.question}
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {quiz.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelect(idx)} className={getOptionClass(idx)}>
            <span className="mr-1.5 opacity-60">{String.fromCharCode(65 + idx)}.</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Submit / Result */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full mt-4 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-black uppercase tracking-widest
                     rounded-[20px] transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-30 disabled:translate-y-0 shadow-xl shadow-gray-900/10"
        >
          Verify Knowledge
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -6 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900'
            }`}
          >
            <span>
              {isCorrect
                ? `🎉 Correct! Well done!`
                : `❌ Correct answer: "${quiz.options[quiz.answer]}"`}
            </span>
            <button
              onClick={handleReset}
              className="ml-3 underline opacity-70 hover:opacity-100 transition-opacity font-medium"
            >
              Try again
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
