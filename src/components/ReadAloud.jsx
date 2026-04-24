import { useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export default function ReadAloud({ text, className = "" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language } = useLanguage();

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={isSpeaking ? stop : speak}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-90 ${
          isSpeaking 
            ? 'bg-orange-500 text-white animate-pulse' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-orange-500 hover:text-white'
        }`}
        title={isSpeaking ? "Stop Reading" : "Read Aloud"}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
      
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-1"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-0.5 bg-orange-500 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
