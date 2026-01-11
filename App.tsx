
import React, { useState, useEffect } from 'react';
import { Grade, MathTopic, Worksheet } from './types';
import { GRADE_TOPICS, getIcon } from './constants';
import GradeCard from './components/GradeCard';
import WorksheetDisplay from './components/WorksheetDisplay';
import MathTutor from './components/MathTutor';
import Login from './components/Login';
import TopicDetail from './components/TopicDetail';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import TeachersGuide from './components/TeachersGuide';
import PrivacyPolicy from './components/PrivacyPolicy';
import Support from './components/Support';
import { generateWorksheet } from './services/geminiService';
import { Sparkles, ArrowLeft, Loader2, LogOut, User, X, ShieldCheck, GraduationCap } from 'lucide-react';

const Logo = ({ className = "", showTagline = false, isLight = false }: { className?: string, showTagline?: boolean, isLight?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Head Silhouette + Bulb Shape */}
        <path d="M45 110C45 110 40 105 35 95C30 85 25 75 25 60C25 35 45 15 70 15C95 15 115 35 115 60C115 85 95 105 70 105H45" fill="#F59E0B" transform="translate(-25, 0)" />
        {/* Lightbulb Screw Base */}
        <rect x="38" y="95" width="24" height="4" rx="2" fill="#D97706" />
        <rect x="40" y="101" width="20" height="4" rx="2" fill="#D97706" />
        <rect x="42" y="107" width="16" height="4" rx="2" fill="#D97706" />
        {/* Brain Circuit Patterns */}
        <circle cx="50" cy="40" r="3" fill="white" />
        <circle cx="35" cy="55" r="3" fill="white" />
        <circle cx="65" cy="55" r="3" fill="white" />
        <circle cx="50" cy="70" r="3" fill="white" />
        <path d="M50 40V70M35 55H65M50 40L35 55M50 40L65 55M50 70L35 55M50 70L65 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className={`text-3xl font-black leading-none tracking-tight ${isLight ? 'text-white' : 'text-[#4b2c85]'}`}>JuniorMath</span>
      {showTagline && (
        <span className={`text-[10px] font-bold tracking-[0.15em] uppercase mt-1 ${isLight ? 'text-white/90' : 'text-[#4b2c85]'}`}>Helping child to grow in maths</span>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('mathmagic_user'));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<'home' | 'admin' | 'teachers-guide' | 'privacy' | 'support'>('home');

  const handleLogin = (email: string) => {
    localStorage.setItem('mathmagic_user', email);
    setUserEmail(email);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('mathmagic_user');
    setUserEmail(null);
    reset();
  };

  const handleAdminAuth = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setView('admin');
  };

  const handleAdminPanelClick = () => {
    if (isAdminAuthenticated) {
      setView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    const firstTopic = GRADE_TOPICS[grade][0];
    setSelectedTopic(firstTopic);
    setWorksheet(null);
    setView('home');
  };

  const handleTopicSelect = (topic: MathTopic) => {
    setSelectedTopic(topic);
    setWorksheet(null);
    setView('home');
  };

  const handleGenerateWorksheet = async (variant: number = 1) => {
    if (!selectedGrade || !selectedTopic) return;
    setIsGenerating(true);
    
    try {
      const result = await generateWorksheet(selectedGrade, `${selectedTopic.name} (Version ${variant})`);
      setWorksheet(result);
    } catch (err) {
      console.error("Failed to generate worksheet", err);
      alert("Oops! The magic wand stalled. Try again?");
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setSelectedGrade(null);
    setSelectedTopic(null);
    setWorksheet(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 relative">
      {/* Login Modal Overlay */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsLoginModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-blue-200 flex items-center gap-1 font-bold transition-colors"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <AdminLogin 
          onLogin={handleAdminAuth} 
          onClose={() => setIsAdminLoginOpen(false)} 
        />
      )}

      {/* Navigation / Header */}
      <nav className="no-print bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={reset}
            className="cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <Logo showTagline={true} />
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
               <button onClick={handleAdminPanelClick} className="flex items-center gap-2 hover:text-[#4b2c85] transition-colors font-bold text-sm">
                 <ShieldCheck className="w-4 h-4" />
                 Admin Panel
               </button>
            </div>

            {userEmail ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700 max-w-[120px] truncate">{userEmail}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#4b2c85] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#3a2267] transition-all shadow-lg shadow-purple-100"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-40 animate-in fade-in zoom-in duration-500">
             <div className="relative">
               <Loader2 className="w-20 h-20 text-[#4b2c85] animate-spin" strokeWidth={1.5} />
               <Sparkles className="w-8 h-8 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
             </div>
             <h2 className="text-3xl font-black text-[#4b2c85] mt-8">Generating Math Magic...</h2>
             <p className="text-slate-500 mt-2 font-medium">We're crafting the perfect problems just for you.</p>
          </div>
        ) : view === 'admin' ? (
          <AdminPanel onBack={() => setView('home')} onLogout={handleAdminLogout} />
        ) : view === 'teachers-guide' ? (
          <TeachersGuide onBack={() => setView('home')} />
        ) : view === 'privacy' ? (
          <PrivacyPolicy onBack={() => setView('home')} />
        ) : view === 'support' ? (
          <Support onBack={() => setView('home')} />
        ) : worksheet ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setWorksheet(null)}
              className="no-print flex items-center gap-2 text-slate-500 hover:text-[#4b2c85] font-bold mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Change Topic
            </button>
            <WorksheetDisplay worksheet={worksheet} />
          </div>
        ) : selectedGrade && selectedTopic ? (
          <TopicDetail 
            grade={selectedGrade} 
            topic={selectedTopic}
            onSelectGrade={handleGradeSelect}
            onSelectTopic={handleTopicSelect}
            onGenerateWorksheet={handleGenerateWorksheet}
            onBack={reset}
          />
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-[#4b2c85] mb-6 leading-tight">
                Unlock Your <span className="text-amber-500">Math Potential</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Choose your grade level to start generating personalized math worksheets 
                and interactive lessons designed by educators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {([1, 2, 3, 4, 5, 6] as Grade[]).map((grade) => (
                <GradeCard 
                  key={grade} 
                  grade={grade} 
                  isSelected={selectedGrade === grade}
                  onClick={handleGradeSelect}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Math Tutor Button is handled within MathTutor component */}
      <MathTutor grade={selectedGrade || 1} />
      
      {/* Global Footer */}
      <footer className="no-print mt-20 border-t border-blue-200 py-12 px-6 bg-gradient-to-br from-blue-100 via-sky-100 to-blue-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div onClick={reset} className="cursor-pointer">
            <Logo showTagline={true} />
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
            <button onClick={() => setView('teachers-guide')} className="hover:text-[#4b2c85] transition-colors">Teacher's Guide</button>
            <button onClick={() => setView('privacy')} className="hover:text-[#4b2c85] transition-colors">Privacy Policy</button>
            <button onClick={() => setView('support')} className="hover:text-[#4b2c85] transition-colors">Support</button>
            <button onClick={handleAdminPanelClick} className="hover:text-[#4b2c85] transition-colors">Admin</button>
          </div>
          <div className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} JuniorMath AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
