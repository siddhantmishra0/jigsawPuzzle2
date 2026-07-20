import { Moon, Sun, BrainCircuit } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { theme, toggleTheme } = useGameStore();

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/20 bg-white/50 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <BrainCircuit className="w-8 h-8 text-ml-blue" />
          <span>ML Puzzle<span className="text-ml-blue">Verse</span></span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-10 h-10 p-0">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
