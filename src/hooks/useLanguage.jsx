import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    title: "ElectraNet",
    tagline: "Powering Transparent Elections",
    heroTitle: "ElectraNet Intelligence Hub",
    heroSubtitle: "Explore data, understand trends, and make informed decisions",
    startJourney: "Start Journey",
    viewInsights: "View Insights",
    journey: "Journey",
    market: "Market",
    transparency: "Transparency",
    askAI: "Ask AI",
    resources: "Resources",
    theECI: "The ECI",
    searchRoll: "Search in Electoral Roll",
    voterPortal: "Voter Portal (NVSP)",
    candidateAffidavits: "Candidate Affidavits",
    aboutECI: "About ECI",
    mcc: "Model Code of Conduct",
    complaintPortal: "Complaint Portal",
    footerText: "Empowering Indian citizens with accurate, interactive, and neutral information about the democratic process.",
    copyright: "© 2024 ElectraNet. For educational use.",
    jaiHind: "Jai Hind",
    voterTip: "Voter Tip for {state} residents",
    firstTimeTip: "As a first-time voter, we recommend starting with 'Voter Registration' to secure your EPIC card.",
    experiencedTip: "Ensure your name is still in the Electoral Roll for the upcoming elections.",
    readyToVote: "You are ready to vote! 🎉",
    readyToVoteDesc: "Great job! You have explored all {count} phases of the election process. Now go out and exercise your right!",
    resetProgress: "Reset Progress",
    beginJourney: "Begin Smart Journey",
    exitGuide: "Exit Guide Mode",
    markCompleted: "Mark as Completed",
    completed: "Completed!",
    idDocs: "Accepted ID / Documents",
    didYouKnow: "Did You Know?",
    aiAssistant: "AI Assistant",
    askAssistant: "Ask the Assistant",
    aiGuide: "ElectraNet AI Guide",
    alwaysOnline: "ALWAYS ONLINE",
    apiKeyRequired: "API Key Required",
    apiKeyDesc: "To enable AI responses, enter your Anthropic API key below. It's only stored in memory for this session.",
    save: "Save",
    askElections: "Ask about elections...",
    speaking: "Speaking...",
    listening: "Listening...",
    howToVote: "How to vote?",
    registerVote: "How to register for voting?",
  },
  hi: {
    title: "ElectraNet",
    tagline: "पारदर्शी चुनावों को सशक्त बनाना",
    heroTitle: "ElectraNet इंटेलिजेंस हब",
    heroSubtitle: "डेटा का पता लगाएं, रुझान समझें और सोच-समझकर निर्णय लें",
    startJourney: "यात्रा शुरू करें",
    viewInsights: "अंतर्दृष्टि देखें",
    journey: "यात्रा",
    market: "बाज़ार",
    transparency: "पारदर्शिता",
    askAI: "AI से पूछें",
    resources: "संसाधन",
    theECI: "चुनाव आयोग",
    searchRoll: "मतदाता सूची में खोजें",
    voterPortal: "मतदाता पोर्टल (NVSP)",
    candidateAffidavits: "उम्मीदवार शपथ पत्र",
    aboutECI: "ECI के बारे में",
    mcc: "आदर्श आचार संहिता",
    complaintPortal: "शिकायत पोर्टल",
    footerText: "भारतीय नागरिकों को लोकतांत्रिक प्रक्रिया के बारे में सटीक, इंटरैक्टिव और निष्पक्ष जानकारी के साथ सशक्त बनाना।",
    copyright: "© 2024 ElectraNet। शैक्षिक उपयोग के लिए।",
    jaiHind: "जय हिंद",
    voterTip: "{state} के निवासियों के लिए मतदाता टिप",
    firstTimeTip: "पहली बार मतदाता के रूप में, हम अपना EPIC कार्ड सुरक्षित करने के लिए 'मतदाता पंजीकरण' के साथ शुरू करने की सलाह देते हैं।",
    experiencedTip: "सुनिश्चित करें कि आगामी चुनावों के लिए आपका नाम अभी भी मतदाता सूची में है।",
    readyToVote: "आप वोट देने के लिए तैयार हैं! 🎉",
    readyToVoteDesc: "बहुत बढ़िया! आपने चुनावी प्रक्रिया के सभी {count} चरणों का पता लगा लिया है। अब बाहर निकलें और अपने अधिकार का प्रयोग करें!",
    resetProgress: "प्रगति रीसेट करें",
    beginJourney: "स्मार्ट यात्रा शुरू करें",
    exitGuide: "गाइड मोड से बाहर निकलें",
    markCompleted: "पूर्ण के रूप में चिह्नित करें",
    completed: "पूर्ण!",
    idDocs: "स्वीकृत आईडी / दस्तावेज",
    didYouKnow: "क्या आप जानते हैं?",
    aiAssistant: "AI सहायक",
    askAssistant: "सहायक से पूछें",
    aiGuide: "चुनाव AI गाइड",
    alwaysOnline: "हमेशा ऑनलाइन",
    apiKeyRequired: "API कुंजी आवश्यक है",
    apiKeyDesc: "AI प्रतिक्रियाओं को सक्षम करने के लिए, नीचे अपनी Anthropic API कुंजी दर्ज करें। यह केवल इस सत्र के लिए मेमोरी में संग्रहीत है।",
    save: "सहेजें",
    askElections: "चुनावों के बारे में पूछें...",
    speaking: "बोल रहे हैं...",
    listening: "सुन रहे हैं...",
    howToVote: "वोट कैसे दें?",
    registerVote: "मतदान के लिए पंजीकरण कैसे करें?",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('election_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('election_language', language);
  }, [language]);

  const t = (key, params = {}) => {
    let text = translations[language][key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
