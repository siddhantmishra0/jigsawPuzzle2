import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';

export function FinalDashboard() {
  const navigate = useNavigate();
  const { xp, timeSpentSeconds, totalCorrectPlacements, mistakesMade, resetProgress } = useGameStore();

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F97316']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F97316']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const accuracy = totalCorrectPlacements === 0 
    ? 0 
    : Math.round((totalCorrectPlacements / (totalCorrectPlacements + mistakesMade)) * 100);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
      resetProgress();
      navigate('/');
    }
  };


  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 md:p-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center w-full"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ML Puzzle Champion!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          You have successfully mastered all four Machine Learning algorithms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <GlassCard className="flex flex-col items-center justify-center p-8 border-t-4 border-t-yellow-400">
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-3xl font-bold">{xp}</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold mt-1">Total XP</span>
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center p-8 border-t-4 border-t-ml-blue">
            <Target className="w-8 h-8 text-ml-blue mb-2" />
            <span className="text-3xl font-bold">{accuracy}%</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold mt-1">Accuracy</span>
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center p-8 border-t-4 border-t-ml-purple">
            <Clock className="w-8 h-8 text-ml-purple mb-2" />
            <span className="text-3xl font-bold">{formatTime(timeSpentSeconds)}</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold mt-1">Time Spent</span>
          </GlassCard>
        </div>

        <div className="flex justify-center">
          <Button size="lg" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-5 h-5 mr-2" /> Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
