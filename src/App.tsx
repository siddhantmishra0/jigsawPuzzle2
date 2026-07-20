import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { LandingPage } from './pages/LandingPage';
import { PuzzlePage } from './pages/PuzzlePage';
import { LearnPage } from './pages/LearnPage';
import { FinalDashboard } from './pages/FinalDashboard';
import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { algorithms } from './data/algorithms';

function App() {
  const { theme, completedAlgorithms } = useGameStore();

  // Ensure theme class is applied on root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check if all algorithms are completed
  const allCompleted = completedAlgorithms.length === Object.keys(algorithms).length;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-ml-blue/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-ml-purple/10 blur-[120px] rounded-full" />
        </div>
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={allCompleted ? <FinalDashboard /> : <LandingPage />} />
            <Route path="/puzzle/:algorithmId" element={<PuzzlePage />} />
            <Route path="/learn/:algorithmId" element={<LearnPage />} />
            <Route path="/dashboard" element={<FinalDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
