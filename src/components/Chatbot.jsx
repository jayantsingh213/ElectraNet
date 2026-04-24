import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, ChevronDown, Minus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const SYSTEM_PROMPT = `You are an expert, friendly assistant that helps Indian citizens understand the election process. 
You explain things in simple, clear language suitable for the general public, including low-literacy users. 
Focus on Indian elections — Lok Sabha, Vidhan Sabha, the role of ECI, voting process, voter rights, EVMs, MCC, and related topics. 
Keep answers concise (3-5 sentences). 
Always be neutral and non-partisan.
Respond in the language the user is using (English or Hindi).`;

const SUGGESTIONS = {
  en: [
    'Explain turnout trends',
    'How does voting work?',
    'What is Model Code of Conduct?',
    'How does EVM work?',
    'Who runs Indian elections?',
  ],
  hi: [
    'टर्नआउट रुझान समझाएं',
    'मतदान कैसे काम करता है?',
    'आदर्श आचार संहिता क्या है?',
    'EVM कैसे काम करता है?',
    'भारतीय चुनाव कौन कराता है?',
  ]
};

export default function Chatbot({ activePhase, isFirstTime, onMinimize }) {
  const { language, t } = useLanguage();
  const currentPhaseName = activePhase ? `Phase ${activePhase}` : 'none';
  const userHint = isFirstTime ? 'a first-time voter' : 'an experienced voter';

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: language === 'hi' 
        ? `🙏 **नमस्ते!** मैं आपका भारत चुनाव इंटेलिजेंस सहायक हूँ। आज मैं आपको मतदान प्रक्रिया या चुनावी आंकड़ों को समझने में कैसे मदद कर सकता हूँ? 🇮🇳`
        : `🙏 **Namaste!** I'm your India Election Intelligence Assistant. How can I help you understand the voting process or election data today? 🇮🇳`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        sendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        notify(`⚠️ ${event.error}`, 'error');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        notify('Speech recognition not supported', 'error');
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onstart = () => setIsBotSpeaking(true);
      utterance.onend = () => setIsBotSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const notify = (msg, type = 'info') => {
    setShowNotification({ msg, type });
    setTimeout(() => setShowNotification(null), 4000);
  };

  const sendMessage = async (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context: `The user is viewing ${currentPhaseName}. They are ${userHint}. Language: ${language}.`,
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API Error');
      }

      const data = await response.json();
      const reply = data.content[0].text;

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      speakText(reply);
    } catch (err) {
      notify(`❌ Error: ${err.message}`, 'error');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, I hit a snag: ${err.message}` },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <div key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-orange-600 dark:text-orange-400">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={j}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-navy-800 to-navy-900 border-b border-white/5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #000080, #1a1ab3)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg relative bg-white">
            <img 
              src="/electranet-logo.png" 
              alt="ElectraNet AI" 
              className="w-full h-full object-contain" 
            />
            {isBotSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-1 rounded-2xl border-2 border-orange-400/50 pointer-events-none"
              />
            )}
          </div>
          <div>
            <h3 className="font-black text-white text-xs tracking-widest uppercase">Election AI Guide</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[8px] text-white/60 font-black tracking-widest uppercase">ALWAYS ONLINE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isBotSpeaking && (
            <button onClick={() => window.speechSynthesis.cancel()} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
              <VolumeX className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onMinimize}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div
                className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-sm shadow-sm ${
                  m.role === 'user'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                }`}
              >
                {m.role === 'user' ? '👤' : '🤖'}
              </div>
              <div
                className={`px-5 py-4 rounded-[24px] text-[13px] leading-relaxed shadow-sm group relative font-medium ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-white/5'
                }`}
              >
                {formatContent(m.content)}
                {m.role === 'assistant' && (
                  <button onClick={() => speakText(m.content)} className="absolute -right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-2 overflow-x-auto bg-gray-50 dark:bg-gray-950/50">
        {SUGGESTIONS[language].map((s, i) => (
          <button
            key={i}
            onClick={() => sendMessage(s)}
            className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all whitespace-nowrap active:scale-95"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900 flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={isListening ? t('listening') : t('askElections')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className={`w-full px-5 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 text-sm text-gray-900 dark:text-white focus:ring-0 outline-none transition-all ${
              isListening ? 'border-orange-500 ring-4 ring-orange-500/10' : 'border-transparent focus:border-orange-500/30'
            }`}
          />
          <button
            onClick={toggleListening}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isListening ? 'bg-orange-500 text-white animate-pulse shadow-lg shadow-orange-500/40' : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
        
        <button
          onClick={() => sendMessage()}
          disabled={isThinking || !input.trim()}
          className="w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-all shadow-xl shadow-orange-500/30 active:scale-90 disabled:opacity-50 group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[120] px-4 py-2 rounded-xl bg-gray-900 text-white text-[10px] font-bold shadow-2xl"
        >
          {showNotification.msg}
        </motion.div>
      )}
    </div>
  );
}
