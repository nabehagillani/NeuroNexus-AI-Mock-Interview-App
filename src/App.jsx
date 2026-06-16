import React, { useState, useEffect, useRef } from 'react';
import { INTERVIEW_DISCIPPINES, INTERVIEW_CATEGORIES } from './questions';
import { GoogleGenAI } from '@google/genai';
import { 
  ChevronRight, ChevronLeft, HelpCircle, Lightbulb, 
  CheckCircle2, RefreshCw, Layers, Sparkles, Terminal, Stethoscope, Cpu, FlaskConical, Briefcase, ArrowLeft, Send, Award, ArrowUpRight
} from 'lucide-react';

// SECURE API KEY ACCESS
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// HIGH-END FIELDS SPECIFIC ULTRA NEON STYLES CONFIGURATION
const getTheme = (discipline) => {
  const themes = {
    computing: {
      text: 'text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]',
      border: 'border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.05)]',
      glowCard: 'bg-gradient-to-br from-cyan-950/20 via-slate-950/80 to-black border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      btnAccent: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 hover:scale-[1.02] active:scale-[0.98] text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      bgMesh: 'bg-[radial-gradient(circle_at_30%_20%,_rgba(34,211,238,0.15),_transparent_40%)]',
      barGlow: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
    },
    medical: {
      text: 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]',
      border: 'border-emerald-500/20 hover:border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.05)]',
      glowCard: 'bg-gradient-to-br from-emerald-950/20 via-slate-950/80 to-black border-emerald-500/30 shadow-[0_0_30px_rgba(52,211,153,0.1)]',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      btnAccent: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:scale-[1.02] active:scale-[0.98] text-white shadow-[0_0_20px_rgba(52,211,153,0.3)]',
      bgMesh: 'bg-[radial-gradient(circle_at_30%_20%,_rgba(52,211,153,0.15),_transparent_40%)]',
      barGlow: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
    },
    electrical: {
      text: 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]',
      border: 'border-amber-500/20 hover:border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.05)]',
      glowCard: 'bg-gradient-to-br from-amber-950/20 via-slate-950/80 to-black border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.1)]',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      btnAccent: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-400 hover:scale-[1.02] active:scale-[0.98] text-white shadow-[0_0_20px_rgba(251,191,36,0.3)]',
      bgMesh: 'bg-[radial-gradient(circle_at_30%_20%,_rgba(251,191,36,0.15),_transparent_40%)]',
      barGlow: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
    },
    chemical: {
      text: 'text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.5)]',
      border: 'border-rose-500/20 hover:border-rose-400/50 shadow-[0_0_15px_rgba(251,113,133,0.05)]',
      glowCard: 'bg-gradient-to-br from-rose-950/20 via-slate-950/80 to-black border-rose-500/30 shadow-[0_0_30px_rgba(251,113,133,0.1)]',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      btnAccent: 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-400 hover:scale-[1.02] active:scale-[0.98] text-white shadow-[0_0_20px_rgba(251,113,133,0.3)]',
      bgMesh: 'bg-[radial-gradient(circle_at_30%_20%,_rgba(251,113,133,0.15),_transparent_40%)]',
      barGlow: 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]'
    },
    bba: {
      text: 'text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]',
      border: 'border-violet-500/20 hover:border-violet-400/50 shadow-[0_0_15px_rgba(167,139,250,0.05)]',
      glowCard: 'bg-gradient-to-br from-violet-950/20 via-slate-950/80 to-black border-violet-500/30 shadow-[0_0_30px_rgba(167,139,250,0.1)]',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
      btnAccent: 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-400 hover:scale-[1.02] active:scale-[0.98] text-white shadow-[0_0_20px_rgba(167,139,250,0.3)]',
      bgMesh: 'bg-[radial-gradient(circle_at_30%_20%,_rgba(167,139,250,0.15),_transparent_40%)]',
      barGlow: 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]'
    }
  };
  return themes[discipline] || themes.computing;
};

const GetDisciplineIcon = ({ id, className = "w-5 h-5" }) => {
  switch(id) {
    case 'computing': return <Terminal className={className} />;
    case 'medical': return <Stethoscope className={className} />;
    case 'electrical': return <Cpu className={className} />;
    case 'chemical': return <FlaskConical className={className} />;
    case 'bba': return <Briefcase className={className} />;
    default: return <Layers className={className} />;
  }
};

export default function App() {
  const [activeDiscipline, setActiveDiscipline] = useState(null);
  const [selectedSubfield, setSelectedSubfield] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTip, setShowTip] = useState(false);
  
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('nn_answers')) || {});
  const [evaluations, setEvaluations] = useState(() => JSON.parse(localStorage.getItem('nn_evaluations')) || {});
  const [customQuestions, setCustomQuestions] = useState(() => JSON.parse(localStorage.getItem('nn_custom_questions')) || []);
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  const safeDisciplines = INTERVIEW_DISCIPPINES || {};
  const safeCategories = INTERVIEW_CATEGORIES || {};

  const currentSubfields = activeDiscipline ? (safeDisciplines[activeDiscipline]?.subfields || {}) : {};
  const staticQuestions = safeCategories[selectedSubfield] || [];
  const dynamicQuestions = customQuestions.filter(q => q.subfield === selectedSubfield && q.difficulty === difficulty);
  const totalQuestions = [...staticQuestions, ...dynamicQuestions];
  const currentQuestion = totalQuestions[currentIndex] || null;

  const currentTheme = getTheme(activeDiscipline);

  useEffect(() => { localStorage.setItem('nn_answers', JSON.stringify(answers)); }, [answers]);
  useEffect(() => { localStorage.setItem('nn_evaluations', JSON.stringify(evaluations)); }, [evaluations]);
  useEffect(() => { localStorage.setItem('nn_custom_questions', JSON.stringify(customQuestions)); }, [customQuestions]);

  useEffect(() => {
    if (selectedSubfield && difficulty) {
      const storageKey = `nn_index_${selectedSubfield}_${difficulty}`;
      const savedIndex = parseInt(localStorage.getItem(storageKey), 10);
      if (!isNaN(savedIndex) && savedIndex < totalQuestions.length) {
        setCurrentIndex(savedIndex);
      } else {
        setCurrentIndex(0);
      }
      setShowLevelUpModal(false);
    }
  }, [selectedSubfield, difficulty, customQuestions]);

  const updateIndex = (newIdx) => {
    setCurrentIndex(newIdx);
    if (selectedSubfield && difficulty) {
      localStorage.setItem(`nn_index_${selectedSubfield}_${difficulty}`, newIdx.toString());
    }
  };

  useEffect(() => {
    if (!selectedSubfield) return;
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.warn("Camera track blocked.");
      }
    }
    initCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedSubfield]);

  const checkConceptMastery = () => {
    const relevantIds = totalQuestions.map(q => q.id);
    const completedEvals = relevantIds.map(id => evaluations[id]).filter(Boolean);
    
    if (completedEvals.length >= totalQuestions.length && totalQuestions.length > 0) {
      const averageScore = completedEvals.reduce((acc, curr) => acc + curr.score, 0) / completedEvals.length;
      if (averageScore >= 75 && (difficulty === 'beginner' || difficulty === 'intermediate')) {
        setShowLevelUpModal(true);
      }
    }
  };

  const handleEvaluate = async () => {
    if (!currentQuestion) return;
    const currentAnswer = (answers[currentQuestion.id] || '').trim();
    if (!currentAnswer) return;
    setIsAiLoading(true);
    try {
      const prompt = `Grade this candidate response for an interview assessment. Domain: "${currentSubfields[selectedSubfield]}". Difficulty: "${difficulty}". Question: "${currentQuestion.question}". Candidate Answer: "${currentAnswer}". Respond ONLY with a valid JSON block: {"score": number, "remarks": "string"}`;
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const resultObj = JSON.parse(rawText);
      
      setEvaluations(prev => {
        const updated = { ...prev, [currentQuestion.id]: resultObj };
        setTimeout(() => checkConceptMastery(), 200);
        return updated;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateQuestion = async () => {
    setIsGeneratingQuestion(true);
    try {
      const prompt = `Generate an interview question for a ${difficulty} level candidate in ${currentSubfields[selectedSubfield]}. Respond ONLY with valid JSON format: {"question": "string", "tip": "string"}`;
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(rawText);
      
      const newQuestion = {
        id: `gen-${Date.now()}`,
        subfield: selectedSubfield,
        difficulty: difficulty,
        ...parsed
      };
      setCustomQuestions(prev => [...prev, newQuestion]);
      setTimeout(() => {
        updateIndex(totalQuestions.length);
        setShowTip(false);
      }, 50);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const promoteLevel = () => {
    const nextMap = { 'beginner': 'intermediate', 'intermediate': 'advanced' };
    if (nextMap[difficulty]) {
      setDifficulty(nextMap[difficulty]);
      setShowLevelUpModal(false);
    }
  };

  if (!activeDiscipline && !selectedSubfield) {
    return (
      <div className="min-h-screen bg-[#02050d] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl w-full text-center relative z-10">
          <div className="mb-8 relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 opacity-30 blur-2xl rounded-full scale-125 transition-all duration-700" />
            <div className="w-28 h-28 rounded-3xl bg-[#060a17]/90 border border-slate-800/80 flex items-center justify-center relative shadow-2xl">
              <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tighter">N</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white uppercase mb-3">
            NEURO<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent font-extralight">NEXUS</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.5em] text-slate-500 font-black mb-16">
            AI-ENGINEERED PERSISTENT INTERVIEW SIMULATION HUB
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            {Object.keys(safeDisciplines).map((key) => {
              const disc = safeDisciplines[key];
              const theme = getTheme(key);
              return (
                <button
                  key={key}
                  onClick={() => setActiveDiscipline(key)}
                  className={`group p-8 rounded-3xl border bg-slate-950/50 border-slate-900/80 hover:bg-slate-900/20 backdrop-blur-xl transition-all duration-500 text-center flex flex-col items-center justify-center gap-5 relative overflow-hidden ${theme.border}`}
                >
                  <div className={`p-4 rounded-2xl border bg-black/40 border-slate-800/80 text-slate-400 group-hover:scale-110 transition-all duration-300 ${theme.text} ${theme.badge}`}>
                    <GetDisciplineIcon id={key} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">
                    {disc.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (activeDiscipline && !selectedSubfield) {
    return (
      <div className={`min-h-screen bg-[#02040a] ${currentTheme.bgMesh} text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="max-w-4xl w-full relative z-10">
          <button 
            onClick={() => { setActiveDiscipline(null); }}
            className="group mb-8 flex items-center gap-2 text-xs font-black text-slate-400 hover:text-white transition-all bg-slate-950/80 border border-slate-900 px-5 py-2.5 rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN TO CORE HUB
          </button>
          <div className={`border rounded-3xl p-6 md:p-10 backdrop-blur-2xl relative overflow-hidden ${currentTheme.glowCard}`}>
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${currentTheme.barGlow}`} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-900">
              <div>
                <span className={`text-[10px] font-mono tracking-[0.3em] font-black uppercase ${currentTheme.text}`}>SYSTEM CLUSTER SEGMENT</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">{safeDisciplines[activeDiscipline]?.title}</h2>
              </div>
              <div className="flex bg-black/60 p-1 rounded-xl border border-slate-900 text-[10px]">
                {['beginner', 'intermediate', 'advanced'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`px-4 py-2 rounded-lg font-black uppercase tracking-widest transition-all ${
                      difficulty === lvl ? 'bg-slate-900 text-white shadow-xl border border-slate-800' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.keys(currentSubfields).map((subKey) => (
                <button
                  key={subKey}
                  onClick={() => { setSelectedSubfield(subKey); }}
                  className="text-left p-4 rounded-2xl border border-slate-900 bg-black/40 hover:bg-slate-900/30 hover:border-slate-800 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    {currentSubfields[subKey]}
                  </span>
                  <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-900 transition-all shrink-0 ml-4">
                    <ChevronRight className={`w-4 h-4 text-slate-600 ${currentTheme.text}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 flex flex-col font-sans relative overflow-hidden">
      {showLevelUpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#050914] border-2 border-emerald-500/30 p-8 rounded-3xl text-center shadow-[0_0_50px_rgba(52,211,153,0.15)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">Concept Mastery Verified</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Our neural analytical engine evaluated your answer matrix profiles. You demonstrated consistent foundational comprehension with score aggregates exceeding criteria parameters.
            </p>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={promoteLevel}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center gap-2"
              >
                PROCEED TO NEXT ADVANCED SECTOR <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowLevelUpModal(false)}
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all"
              >
                CONTINUE REINFORCING SAME SECTOR LEVEL ({totalQuestions.length} / 200)
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-slate-900/80 bg-[#040714]/90 backdrop-blur-xl px-4 py-4 flex flex-wrap items-center justify-between gap-y-4 relative z-20 shadow-xl">
        <div className="flex items-center gap-2 sm:gap-5">
          <button 
            onClick={() => { setSelectedSubfield(null); }}
            className="border border-slate-800 hover:border-slate-700 bg-slate-950/80 p-2.5 rounded-xl text-slate-400 hover:text-white transition-all shadow-md"
          >
            <Layers className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-xs ${currentTheme.text}`}>N</div>
            <div className="hidden sm:block">
              <h2 className="text-[10px] font-black text-white uppercase tracking-wider max-w-sm truncate">{currentSubfields[selectedSubfield]}</h2>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">TRACK LEVEL: <span className={currentTheme.text}>{difficulty}</span></p>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateQuestion}
          disabled={isGeneratingQuestion || totalQuestions.length >= 200}
          className={`flex items-center gap-2 text-[10px] sm:text-xs font-black px-4 py-2.5 rounded-xl border border-white/5 transition-all disabled:opacity-30 tracking-wider ${currentTheme.btnAccent}`}
        >
          {isGeneratingQuestion ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {window.innerWidth < 640 ? "STREAM" : "AI QUESTION STREAM"}
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <section className={`lg:col-span-7 flex flex-col justify-between border rounded-3xl p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden shadow-2xl ${currentTheme.glowCard}`}>
          <div className={`absolute top-0 left-0 right-0 h-[2px] ${currentTheme.barGlow}`} />
          {currentQuestion ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className={`text-[9px] font-mono tracking-widest font-black uppercase px-3 py-1 rounded-lg border ${currentTheme.badge}`}>
                    PERSISTENT TRACK POINTER • NODE {currentIndex + 1} OF {totalQuestions.length}
                  </span>
                  {evaluations[currentQuestion.id] && (
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-black">
                      COMPLETED
                    </span>
                  )}
                </div>
                <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 relative overflow-hidden shadow-inner mb-6">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-transparent" />
                  <div className="flex gap-4 items-start">
                    <div className={`p-2.5 rounded-xl border shrink-0 bg-slate-900/50 ${currentTheme.badge}`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-slate-100 leading-relaxed font-sans">{currentQuestion.question}</h3>
                  </div>
                </div>
                {currentQuestion.tip && (
                  <div className="mt-4">
                    <button 
                      onClick={() => { setShowTip(!showTip); }}
                      className="flex items-center gap-2 text-[10px] font-black tracking-wider uppercase text-amber-400 bg-amber-500/5 border border-amber-500/20 px-4 py-2 rounded-xl hover:bg-amber-500/10 transition-all"
                    >
                      <Lightbulb className="w-3.5 h-3.5 animate-pulse" /> {showTip ? "CONCEAL CLUE" : "DECRYPT CLUE"}
                    </button>
                    {showTip && (
                      <div className="mt-3 p-5 bg-[#03060c] border border-amber-500/20 border-l-2 border-l-amber-500 rounded-xl text-slate-400 text-xs font-mono leading-relaxed shadow-lg">
                        {currentQuestion.tip}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-900/60 mt-10">
                <button
                  onClick={() => { if(currentIndex > 0) { updateIndex(currentIndex - 1); setShowTip(false); } }}
                  disabled={currentIndex === 0}
                  className="px-5 py-2.5 text-xs font-black border border-slate-800 text-slate-500 rounded-xl hover:text-white transition-all bg-slate-950/50"
                >
                  <ChevronLeft className="w-4 h-4 inline mr-1" /> PREV
                </button>
                <button
                  onClick={() => { if(currentIndex < totalQuestions.length - 1) { updateIndex(currentIndex + 1); setShowTip(false); } }}
                  disabled={currentIndex === totalQuestions.length - 1}
                  className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all disabled:opacity-5 ${currentTheme.btnAccent}`}
                >
                  NEXT <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-24 my-auto flex flex-col items-center justify-center gap-4">
              <Sparkles className="w-8 h-8 text-slate-700 animate-bounce" />
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-black">All Sector Base Elements Clear</p>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed">You have answered all initialized static indices. Hit "AI Question Stream" at the top right to populate more slots up to the 200 boundary.</p>
            </div>
          )}
        </section>
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="aspect-video bg-black/90 rounded-3xl border border-slate-900 relative overflow-hidden flex items-center justify-center shadow-2xl">
            <div className="absolute top-4 left-4 bg-slate-950/90 px-3 py-1 border border-slate-800 rounded-lg text-[9px] text-slate-400 font-mono flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="tracking-widest font-black uppercase">LIVE_CAPTURE_FEED</span>
            </div>
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover relative z-0 ${streamActive ? 'opacity-80 scale-105' : 'opacity-0 absolute'}`} />
            {!streamActive && <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">Awaiting Capture Stream Feed...</p>}
          </div>
          <div className="flex-1 flex flex-col bg-[#050814]/80 border border-slate-900 rounded-3xl p-5 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="response" className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase font-mono">Response Console Layer</label>
              <button
                onClick={handleEvaluate}
                disabled={isAiLoading || !currentQuestion || !(answers[currentQuestion.id] || '').trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-950 disabled:text-slate-700 text-white text-[11px] font-black px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {isAiLoading ? "EVALUATING..." : "SUBMIT RESPONSE"}
              </button>
            </div>
            <textarea
              id="response"
              disabled={!currentQuestion}
              value={currentQuestion ? (answers[currentQuestion.id] || '') : ''}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              placeholder="Compile technical justifications, execution formulas, or frameworks..."
              className="flex-1 min-h-[160px] w-full bg-black/60 border border-slate-900 rounded-2xl p-4 text-slate-300 text-xs focus:outline-none focus:border-slate-800 font-mono resize-none leading-relaxed mb-4 shadow-inner"
            />
            {evaluations[currentQuestion?.id] && (
              <div className="p-5 bg-gradient-to-br from-slate-950 via-black to-[#03060d] border border-slate-900/80 rounded-2xl shadow-xl border-l-2 border-l-emerald-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> EVALUATION INDICES FEEDBACK
                  </span>
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                    SCORE: {evaluations[currentQuestion.id].score}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{evaluations[currentQuestion.id].remarks}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}