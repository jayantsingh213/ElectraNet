import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tooltip — hover tooltip wrapper
 * Props: text (string), children
 */
export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-[100]
                       px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                       bg-gray-900 dark:bg-gray-700 text-white shadow-xl pointer-events-none"
          >
            {text}
            {/* Arrow */}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderTopColor: 'inherit' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
