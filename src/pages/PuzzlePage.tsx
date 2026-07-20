import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { algorithms, AlgorithmId } from '../data/algorithms';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { PuzzleBoard } from '../components/puzzle/PuzzleBoard';
import { Badge } from '../components/ui/Badge';

export function PuzzlePage() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  
  const { 
    unlockedAlgorithms, 
    completeAlgorithm, 
    useHint,
    addTime,
    xp
  } = useGameStore();

  const id = algorithmId as AlgorithmId;
  const algorithm = algorithms[id];

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      addTime(seconds); // Save time when leaving
    };
  }, [addTime, seconds]);

  if (!algorithm) {
    return <div className="p-8 text-center">Algorithm not found</div>;
  }

  if (!unlockedAlgorithms.includes(id)) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Level Locked</h2>
        <p className="mb-6">You need to complete the previous algorithms first.</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  const handleComplete = () => {
    completeAlgorithm(id);
    navigate(`/learn/${id}`);
  };

  const handleHint = () => {
    useHint();
    alert("Hint used! Look at the available pieces carefully. Think about the definitions.");
    // In a full implementation, this could highlight a correct piece or give a specific text hint.
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="px-2">
            <ArrowLeft className="w-5 h-5 mr-1" /> Back
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold">{algorithm.name}</h1>
              <Badge variant="outline" className="hidden sm:inline-flex">{algorithm.difficulty}</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{algorithm.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-white/50 dark:bg-black/20 p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-mono font-medium">{formatTime(seconds)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-yellow-600 dark:text-yellow-400">{xp} XP</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleHint} className="h-8 text-xs flex gap-1">
            <Lightbulb className="w-3 h-3" /> Hint (-10 XP)
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <PuzzleBoard algorithm={algorithm} onComplete={handleComplete} />
      </motion.div>
    </div>
  );
}
