import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { algorithms, AlgorithmId } from '../data/algorithms';
import { useGameStore } from '../store/useGameStore';

export function LandingPage() {
  const navigate = useNavigate();
  const { unlockedAlgorithms, completedAlgorithms } = useGameStore();

  const handleStartAlgorithm = (id: AlgorithmId) => {
    if (unlockedAlgorithms.includes(id)) {
      navigate(`/puzzle/${id}`);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 md:p-12 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center justify-center p-3 bg-ml-blue/10 rounded-full mb-4">
          <GraduationCap className="w-10 h-10 text-ml-blue" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Learn Machine Learning
          <br className="hidden md:block" /> Through <span className="text-ml-blue">Interactive Puzzles</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Master the fundamentals of Linear Regression, Polynomial Regression, Logistic Regression, and PCA by solving jigsaw-style concept maps.
        </p>
        <div className="pt-4 flex gap-4 justify-center">
          <Button size="lg" onClick={() => handleStartAlgorithm('linear')} className="rounded-full px-8">
            Start Learning <Play className="w-4 h-4 ml-2 fill-current" />
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        {(Object.keys(algorithms) as AlgorithmId[]).map((key) => {
          const alg = algorithms[key];
          const isUnlocked = unlockedAlgorithms.includes(key);
          const isCompleted = completedAlgorithms.includes(key);

          return (
            <motion.div key={key} variants={item} className="h-full">
              <GlassCard 
                interactive={isUnlocked}
                onClick={() => handleStartAlgorithm(key)}
                className={`h-full flex flex-col transition-all ${
                  !isUnlocked ? 'opacity-70 grayscale-[0.5]' : ''
                } ${isCompleted ? 'border-ml-green/50' : ''}`}
                style={{
                  background: isUnlocked ? `linear-gradient(145deg, ${alg.color}15, transparent)` : undefined,
                  borderColor: isUnlocked ? `${alg.color}40` : undefined,
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${alg.color}20`, color: alg.color }}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
                     isUnlocked ? <Play className="w-5 h-5 ml-1" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <Badge variant={isCompleted ? 'success' : isUnlocked ? 'default' : 'outline'}>
                    {alg.difficulty}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{alg.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
                  {alg.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-500">Status</span>
                    {isCompleted ? (
                      <span className="text-ml-green flex items-center gap-1">
                        Mastered <CheckCircle2 className="w-3 h-3" />
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-ml-blue">In Progress</span>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-1">
                        Locked <Lock className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
