require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini
console.log('🔑 Server Key Check:', process.env.GEMINI_API_KEY ? `Key found: ${process.env.GEMINI_API_KEY.slice(0, 10)}...` : 'No key found!');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Middleware
app.use(express.json());
app.use(cors());

// Serve Static Files from Vite build
app.use(express.static(path.join(process.cwd(), 'dist')));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use(helmet({
  contentSecurityPolicy: false, // Temporarily disable CSP to rule it out as the blocker
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));

// Mock Election Data
const electionPhases = [
  { id: 1, name: 'Phase 1', date: 'April 19, 2024', status: 'completed', turnout: '66.1%' },
  { id: 2, name: 'Phase 2', date: 'April 26, 2024', status: 'completed', turnout: '66.7%' },
  { id: 3, name: 'Phase 3', date: 'May 7, 2024', status: 'upcoming', turnout: null },
  { id: 4, name: 'Phase 4', date: 'May 13, 2024', status: 'upcoming', turnout: null },
];

const dashboardStats = {
  totalVoters: '968,000,000',
  turnout: '67.4%',
  constituencies: 543,
  growth: '+4.2%'
};

// Endpoints
// API endpoints continue below...

// Favicon handler to prevent 404s in logs
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/api/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));

app.get('/api/election-data', (req, res) => {
  res.json({
    phases: electionPhases,
    stats: dashboardStats
  });
});

app.post('/api/voter-check', (req, res) => {
  const { voterId } = req.body;
  if (!voterId) return res.status(400).json({ error: 'Voter ID is required' });
  const isRegistered = voterId.length >= 10;
  res.json({
    voterId,
    status: isRegistered ? 'Registered' : 'Not Found',
    pollingStation: isRegistered ? 'Govt Primary School, Room 4' : null,
    boothNo: isRegistered ? '42' : null,
  });
});

// Gemini AI Proxy (FREE TIER)
app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not configured on server' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      systemInstruction: `You are an expert Indian election assistant. \nCONTEXT: ${context}\nExplain in simple terms. Neutral and non-partisan.`
    });

    // Convert message format for Gemini (History must start with 'user')
    const history = messages.slice(0, -1)
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history: history[0]?.role === 'model' ? history.slice(1) : history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    res.json({
      content: [{ text: text }]
    });
  } catch (error) {
    console.error('Gemini Proxy Error:', error);
    res.status(500).json({
      error: 'Failed to communicate with AI service. Please check your API key.'
    });
  }
});

// Catch-all route to serve the frontend for any other request
app.get('*splat', (req, res) => {
  const indexPath = path.join(process.cwd(), 'dist/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("Frontend not built. Please run 'npm run build' before starting the server.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Election Intelligence Server (Gemini Powered) running at http://localhost:${PORT}`);
});
