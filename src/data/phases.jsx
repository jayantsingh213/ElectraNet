/**
 * India Election Phases Data
 * Updated with specific action links, tips, and metadata.
 */
export const phases = [
  {
    id: 1,
    title: 'Election Announcement',
    subtitle: 'ECI triggers the Model Code of Conduct',
    color: '#FF9933', // Saffron
    icon: '📢',
    iconTooltip: 'The journey begins!',
    summary: 'The Election Commission of India (ECI) announces the complete election schedule, including polling dates across all phases and the date of counting.',
    bullets: [
      { icon: '📅', text: 'President issues notification (Lok Sabha) or Governor (Vidhan Sabha)' },
      { icon: '🛑', text: 'Model Code of Conduct (MCC) takes effect immediately' },
      { icon: '🚀', text: 'Government restricted from announcing new big-ticket projects' },
      { icon: '📊', text: 'Poll timings and special arrangements for senior citizens declared' },
    ],
    documents: [
      { icon: '📄', label: 'ECI Notification' },
      { icon: '📜', label: 'MCC Guidelines' },
    ],
    didYouKnow: 'The Model Code of Conduct applies to candidates as well as the party in power at the Center and the States.',
    quiz: {
      question: 'When exactly does the Model Code of Conduct (MCC) kick into action?',
      options: [
        'On the first day of polling',
        'As soon as ECI announces the schedule',
        'When counting starts',
        'After results are declared',
      ],
      answer: 1,
    },
    cta: [
      { label: 'View Latest Schedule', href: 'https://eci.gov.in', primary: true },
    ],
    voterTip: 'Check if your constituency is voting in the first or later phases to plan your travel.',
    hi: {
      title: 'चुनाव की घोषणा',
      subtitle: 'ECI ने आदर्श आचार संहिता लागू की',
      summary: 'भारत निर्वाचन आयोग (ECI) पूर्ण चुनाव कार्यक्रम की घोषणा करता है, जिसमें सभी चरणों की मतदान तिथियां और मतगणना की तारीख शामिल है।',
      bullets: [
        { icon: '📅', text: 'राष्ट्रपति अधिसूचना जारी करते हैं (लोकसभा) या राज्यपाल (विधानसभा)' },
        { icon: '🛑', text: 'आदर्श आचार संहिता (MCC) तुरंत प्रभावी हो जाती है' },
        { icon: '🚀', text: 'सरकार को नई बड़ी परियोजनाओं की घोषणा करने से प्रतिबंधित किया गया' },
        { icon: '📊', text: 'मतदान का समय और वरिष्ठ नागरिकों के लिए विशेष व्यवस्था की घोषणा' },
      ],
      didYouKnow: 'आदर्श आचार संहिता उम्मीदवारों के साथ-साथ केंद्र और राज्यों में सत्ताधारी दल पर भी लागू होती है।',
      quiz: {
        question: 'आदर्श आचार संहिता (MCC) ठीक कब लागू होती है?',
        options: [
          'मतदान के पहले दिन',
          'जैसे ही ECI कार्यक्रम की घोषणा करता है',
          'जब मतगणना शुरू होती है',
          'परिणाम घोषित होने के बाद',
        ],
        answer: 1,
      },
      voterTip: 'अपनी यात्रा की योजना बनाने के लिए जांचें कि आपका निर्वाचन क्षेत्र पहले या बाद के चरणों में मतदान कर रहा है या नहीं।',
    }
  },
  {
    id: 2,
    title: 'Voter Registration',
    subtitle: 'The foundation of your vote',
    color: '#FF9933',
    icon: '📋',
    iconTooltip: 'Check your eligibility',
    summary: 'Before you can vote, you must ensure your name is on the Electoral Roll. This is the period to register new voters or update existing details.',
    bullets: [
      { icon: '🔍', text: 'Check your name on the Electoral Roll at voters.eci.gov.in' },
      { icon: '📝', text: 'New voters (18+) register using Form 6 on NVSP' },
      { icon: '🪪', text: "EPIC (Voter ID) is the primary document for identity verification" },
      { icon: '📬', text: 'Update address or details using Form 8 before the deadline' },
    ],
    documents: [
      { icon: '🆔', label: 'Aadhaar Card' },
      { icon: '🏠', label: 'Address Proof' },
      { icon: '🎂', label: 'Age Proof' },
    ],
    didYouKnow: 'If you have moved to a new city, you MUST register in your current place of residence to vote there.',
    quiz: {
      question: 'Which form should a new voter fill to register for the first time?',
      options: ['Form 7', 'Form 8', 'Form 6', 'Form 11'],
      answer: 2,
    },
    cta: [
      { label: 'Register to Vote', href: 'https://voters.eci.gov.in/registration/form6', primary: true },
      { label: 'Search Name in Roll', href: 'https://electoralsearch.eci.gov.in/', primary: false },
    ],
    voterTip: 'For first-time voters, ensure your Voter ID contains the correct spelling of your name as per your Aadhaar/Passport.',
    hi: {
      title: 'मतदाता पंजीकरण',
      subtitle: 'आपके वोट की नींव',
      summary: 'वोट देने से पहले, आपको यह सुनिश्चित करना होगा कि आपका नाम मतदाता सूची में है। यह नए मतदाताओं को पंजीकृत करने या मौजूदा विवरण अपडेट करने की अवधि है।',
      bullets: [
        { icon: '🔍', text: 'voters.eci.gov.in पर मतदाता सूची में अपना नाम जांचें' },
        { icon: '📝', text: 'नए मतदाता (18+) NVSP पर फॉर्म 6 का उपयोग करके पंजीकरण करें' },
        { icon: '🪪', text: "EPIC (मतदाता पहचान पत्र) पहचान सत्यापन के लिए प्राथमिक दस्तावेज है" },
        { icon: '📬', text: 'समय सीमा से पहले फॉर्म 8 का उपयोग करके पता या विवरण अपडेट करें' },
      ],
      didYouKnow: 'यदि आप एक नए शहर में चले गए हैं, तो आपको वहां वोट देने के लिए अपने वर्तमान निवास स्थान पर पंजीकरण करना होगा।',
      quiz: {
        question: 'पहली बार पंजीकरण करने के लिए एक नए मतदाता को कौन सा फॉर्म भरना चाहिए?',
        options: ['फॉर्म 7', 'फॉर्म 8', 'फॉर्म 6', 'फॉर्म 11'],
        answer: 2,
      },
      voterTip: 'पहली बार मतदाताओं के लिए, सुनिश्चित करें कि आपके मतदाता पहचान पत्र में आपके नाम की वर्तनी आपके आधार/पासपोर्ट के अनुसार सही है।',
    }
  },
  {
    id: 3,
    title: 'Nomination of Candidates',
    subtitle: 'Candidates file their papers',
    color: '#000080', // Navy
    icon: '📝',
    iconTooltip: 'Know who is running',
    summary: 'Prospective candidates file their nomination papers with the Returning Officer, disclosing their educational background, assets, and criminal records.',
    bullets: [
      { icon: '🏢', text: 'Candidates file papers at the District Election Office' },
      { icon: '💰', text: 'Security deposit is required: ₹25k (Lok Sabha), ₹10k (Vidhan Sabha)' },
      { icon: '🧐', text: 'Nominations undergo strict scrutiny by the Returning Officer' },
      { icon: '🏃', text: 'Candidates can withdraw their nomination before a set deadline' },
    ],
    didYouKnow: 'Every candidate must file an affidavit (Form 26) declaring their assets, liabilities, and criminal background.',
    quiz: {
      question: 'What is the mandatory document a candidate must file regarding their background?',
      options: ['Financial Bill', 'Form 26 Affidavit', 'Party Manifesto', 'Bank Statement'],
      answer: 1,
    },
    cta: [
      { label: 'View Candidate Affidavits', href: 'https://affidavit.eci.gov.in/', primary: true },
    ],
    voterTip: 'Use the KYC (Know Your Candidate) app or website to see the educational and financial background of people asking for your vote.',
    hi: {
      title: 'उम्मीदवारों का नामांकन',
      subtitle: 'उम्मीदवार अपने कागजात दाखिल करते हैं',
      summary: 'भावी उम्मीदवार रिटर्निंग ऑफिसर के पास अपना नामांकन पत्र दाखिल करते हैं, जिसमें उनकी शैक्षणिक पृष्ठभूमि, संपत्ति और आपराधिक रिकॉर्ड का खुलासा होता है।',
      bullets: [
        { icon: '🏢', text: 'उम्मीदवार जिला चुनाव कार्यालय में कागजात दाखिल करते हैं' },
        { icon: '💰', text: 'सुरक्षा जमा आवश्यक है: ₹25k (लोकसभा), ₹10k (विधानसभा)' },
        { icon: '🧐', text: 'नामांकन रिटर्निंग ऑफिसर द्वारा सख्त जांच से गुजरते हैं' },
        { icon: '🏃', text: 'उम्मीदवार एक निर्धारित समय सीमा से पहले अपना नामांकन वापस ले सकते हैं' },
      ],
      didYouKnow: 'प्रत्येक उम्मीदवार को अपनी संपत्ति, देनदारियों और आपराधिक पृष्ठभूमि की घोषणा करते हुए एक हलफनामा (फॉर्म 26) दाखिल करना होगा।',
      quiz: {
        question: 'उम्मीदवार को अपनी पृष्ठभूमि के संबंध में कौन सा अनिवार्य दस्तावेज दाखिल करना चाहिए?',
        options: ['वित्तीय विधेयक', 'फॉर्म 26 शपथ पत्र', 'पार्टी घोषणापत्र', 'बैंक विवरण'],
        answer: 1,
      },
      voterTip: 'वोट मांगने वाले लोगों की शैक्षणिक और वित्तीय पृष्ठभूमि देखने के लिए KYC (अपने उम्मीदवार को जानें) ऐप या वेबसाइट का उपयोग करें।',
    }
  },
  {
    id: 4,
    title: 'Election Campaign',
    subtitle: 'Parties reach out to voters',
    color: '#000080',
    icon: '🎙️',
    iconTooltip: 'Manifestos and rallies',
    summary: 'Political parties and candidates engage in high-octane campaigning through rallies, door-to-door visits, and digital media to share their manifestos.',
    bullets: [
      { icon: '📢', text: 'Parties release their Election Manifestos (promises)' },
      { icon: '🚫', text: 'MCC prohibits hate speech or luring voters with gifts/cash' },
      { icon: '🕗', text: 'Campaigning must end 48 hours before the start of polling' },
      { icon: '💸', text: 'ECI monitors the expenditure limits of every candidate' },
    ],
    didYouKnow: 'The 48-hour period before polling is called the "Silent Period" where no public meetings or propaganda are allowed.',
    quiz: {
      question: 'How many hours before poll closing must all campaigning stop?',
      options: ['24 hours', '72 hours', '48 hours', '12 hours'],
      answer: 2,
    },
    cta: [
      { label: 'Check MCC Rules', href: 'https://eci.gov.in/mcc/', primary: true },
    ],
    voterTip: 'Read the manifestos of all major parties to compare their vision for your constituency.',
    hi: {
      title: 'चुनाव अभियान',
      subtitle: 'पार्टियां मतदाताओं तक पहुंचती हैं',
      summary: 'राजनीतिक दल और उम्मीदवार अपने घोषणापत्र साझा करने के लिए रैलियों, घर-घर जाकर संपर्क करने और डिजिटल मीडिया के माध्यम से उच्च तीव्रता वाले प्रचार में शामिल होते हैं।',
      bullets: [
        { icon: '📢', text: 'पार्टियां अपना चुनाव घोषणापत्र (वादें) जारी करती हैं' },
        { icon: '🚫', text: 'MCC नफरत भरे भाषण या उपहार/नकद के साथ मतदाताओं को लुभाने से रोकता है' },
        { icon: '🕗', text: 'प्रचार मतदान शुरू होने से 48 घंटे पहले समाप्त होना चाहिए' },
        { icon: '💸', text: 'ECI प्रत्येक उम्मीदवार की व्यय सीमा की निगरानी करता है' },
      ],
      didYouKnow: 'मतदान से पहले 48 घंटे की अवधि को "मौन अवधि" कहा जाता है जहां कोई सार्वजनिक सभा या प्रचार की अनुमति नहीं होती है।',
      quiz: {
        question: 'मतदान समाप्त होने से कितने घंटे पहले सभी प्रचार बंद होने चाहिए?',
        options: ['24 घंटे', '72 घंटे', '48 घंटे', '12 घंटे'],
        answer: 2,
      },
      voterTip: 'अपने निर्वाचन क्षेत्र के लिए उनके दृष्टिकोण की तुलना करने के लिए सभी प्रमुख दलों के घोषणापत्र पढ़ें।',
    }
  },
  {
    id: 5,
    title: 'Voting Day (Poll Day)',
    subtitle: 'Matdaan: Democracy in Action',
    color: '#138808', // Green
    icon: '🗳️',
    iconTooltip: 'Time to vote!',
    summary: 'This is the most critical day. Voters head to polling booths to cast their ballots using Electronic Voting Machines (EVMs) and VVPAT machines.',
    bullets: [
      { icon: '📍', text: 'Locate your booth using your voter slip or ECI portal' },
      { icon: '⚡', text: 'Cast your vote on the EVM — it is 100% secure and battery-run' },
      { icon: '🎞️', text: 'VVPAT prints a slip for 7 seconds to let you verify your choice' },
      { icon: '🖋️', text: 'Indelible ink is applied to the left index finger as a mark of voting' },
    ],
    documents: [
      { icon: '🪪', label: 'Voter ID (EPIC)' },
      { icon: '💳', label: 'Aadhaar / Driving License' },
      { icon: '🛂', label: 'Passport' },
    ],
    didYouKnow: 'Even if you don\'t have a Voter ID card, you can still vote if your name is in the Electoral Roll and you have another valid ID proof.',
    quiz: {
      question: 'For how many seconds does the VVPAT slip remain visible for verification?',
      options: ['15 seconds', '5 seconds', '7 seconds', '3 seconds'],
      answer: 2,
    },
    cta: [
      { label: 'Find Your Polling Booth', href: 'https://voters.eci.gov.in/guide-to-voters', primary: true },
      { label: 'Know the EVM', href: 'https://eci.gov.in/evm/', primary: false },
    ],
    voterTip: 'Don\'t forget to carry a valid ID. Mobile phones are not allowed inside the polling booth!',
    hi: {
      title: 'मतदान का दिन',
      subtitle: 'मतदान: लोकतंत्र की कार्रवाई',
      summary: 'यह सबसे महत्वपूर्ण दिन है। मतदाता इलेक्ट्रॉनिक वोटिंग मशीन (EVM) और VVPAT मशीनों का उपयोग करके अपना वोट डालने के लिए मतदान केंद्रों पर जाते हैं।',
      bullets: [
        { icon: '📍', text: 'अपनी वोटर पर्ची या ECI पोर्टल का उपयोग करके अपने बूथ का पता लगाएं' },
        { icon: '⚡', text: 'EVM पर अपना वोट डालें — यह 100% सुरक्षित और बैटरी से चलने वाला है' },
        { icon: '🎞️', text: 'VVPAT आपको अपनी पसंद को सत्यापित करने के लिए 7 सेकंड के लिए एक पर्ची प्रिंट करता है' },
        { icon: '🖋️', text: 'मतदान के निशान के रूप में बाएं हाथ की तर्जनी पर अमिट स्याही लगाई जाती है' },
      ],
      didYouKnow: 'भले ही आपके पास वोटर आईडी कार्ड न हो, फिर भी आप वोट दे सकते हैं यदि आपका नाम मतदाता सूची में है और आपके पास कोई अन्य वैध आईडी प्रमाण है।',
      quiz: {
        question: 'VVPAT पर्ची सत्यापन के लिए कितने सेकंड तक दिखाई देती है?',
        options: ['15 सेकंड', '5 सेकंड', '7 सेकंड', '3 सेकंड'],
        answer: 2,
      },
      voterTip: 'एक वैध आईडी ले जाना न भूलें। मतदान केंद्र के अंदर मोबाइल फोन की अनुमति नहीं है!',
    }
  },
  {
    id: 6,
    title: 'Counting & Results',
    subtitle: 'The people\'s verdict',
    color: '#138808',
    icon: '🏆',
    iconTooltip: 'Results day',
    summary: 'After all phases conclude, EVM machines are unsealed at counting centers. Votes are tallied, and the winners are officially declared.',
    bullets: [
      { icon: '📦', text: 'EVMs are stored in multi-layered, heavily guarded "Strong Rooms"' },
      { icon: '🧮', text: 'Counting happens under the supervision of the Returning Officer' },
      { icon: '🖨️', text: 'VVPAT slips are randomly tallied to ensure 100% accuracy' },
      { icon: '🎖️', text: 'Certificate of Election is issued to the winning candidate' },
    ],
    didYouKnow: 'India uses the "First Past the Post" system — the candidate with the highest number of votes wins.',
    quiz: {
      question: 'Where are EVMs stored safely between polling and counting day?',
      options: ['Police Station', 'Strong Rooms', 'Party Offices', 'Court Rooms'],
      answer: 1,
    },
    cta: [
      { label: 'Check Live Results', href: 'https://results.eci.gov.in', primary: true },
    ],
    voterTip: 'Follow the official ECI results portal for the fastest and most accurate winning declarations.',
    hi: {
      title: 'मतगणना और परिणाम',
      subtitle: 'जनता का फैसला',
      summary: 'सभी चरण समाप्त होने के बाद, मतगणना केंद्रों पर EVM मशीनें खोली जाती हैं। मतों की गणना की जाती है, और विजेताओं की आधिकारिक घोषणा की जाती है।',
      bullets: [
        { icon: '📦', text: 'EVM को बहु-स्तरीय, भारी सुरक्षा वाले "स्ट्रॉन्ग रूम" में रखा जाता है' },
        { icon: '🧮', text: 'मतगणना रिटर्निंग ऑफिसर की देखरेख में होती है' },
        { icon: '🖨️', text: '100% सटीकता सुनिश्चित करने के लिए VVPAT पर्चियों का बेतरतीब ढंग से मिलान किया जाता है' },
        { icon: '🎖️', text: 'विजेता उम्मीदवार को चुनाव का प्रमाण पत्र जारी किया जाता है' },
      ],
      didYouKnow: 'भारत "फर्स्ट पास्ट द पोस्ट" प्रणाली का उपयोग करता है — सबसे अधिक वोट पाने वाला उम्मीदवार जीतता है।',
      quiz: {
        question: 'मतदान और मतगणना के दिन के बीच EVM को सुरक्षित रूप से कहां रखा जाता है?',
        options: ['पुलिस स्टेशन', 'स्ट्रॉन्ग रूम', 'पार्टी कार्यालय', 'कोर्ट रूम'],
        answer: 1,
      },
      voterTip: 'सबसे तेज़ और सबसे सटीक विजेता घोषणाओं के लिए आधिकारिक ECI परिणाम पोर्टल का पालन करें।',
    }
  },
];
