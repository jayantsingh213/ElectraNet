import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, ChevronRight, X } from 'lucide-react';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir'
].sort();

export default function OnboardingModal({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('election_user_onboarded');
    if (!saved) {
      setTimeout(() => setIsOpen(true), 1500);
    }
  }, []);

  const handleFinish = () => {
    localStorage.setItem('election_user_onboarded', 'true');
    localStorage.setItem('election_user_is_first_time', isFirstTime);
    localStorage.setItem('election_user_state', selectedState);
    setIsOpen(false);
    if (onComplete) onComplete({ isFirstTime, selectedState });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md glass-card rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-0 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
                  Welcome to <span className="text-orange-500">Election</span> Guide
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Help us personalize your voting journey.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress Indicator */}
              <div className="flex gap-2 mb-8">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`} />
              </div>

              {/* Step 1: Voter Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-orange-500" />
                    ARE YOU A FIRST-TIME VOTER?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsFirstTime(true)}
                      className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                        isFirstTime === true
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 shadow-xl shadow-orange-500/10'
                          : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-orange-500/30'
                      }`}
                    >
                      <span className="text-2xl">🎉</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Yes, I am!</span>
                    </button>
                    <button
                      onClick={() => setIsFirstTime(false)}
                      className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                        isFirstTime === false
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 shadow-xl shadow-orange-500/10'
                          : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-orange-500/30'
                      }`}
                    >
                      <span className="text-2xl">🗳️</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">I've voted before</span>
                    </button>
                  </div>

                  <button
                    disabled={isFirstTime === null}
                    onClick={() => setStep(2)}
                    className="w-full mt-6 py-3.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Next Step <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: State Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    SELECT YOUR STATE / UT
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none text-sm text-gray-900 dark:text-white transition-all appearance-none"
                  >
                    <option value="">Choose your state...</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3.5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      disabled={!selectedState}
                      onClick={handleFinish}
                      className="flex-[2] py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
                    >
                      Start Exploring 🚀
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
