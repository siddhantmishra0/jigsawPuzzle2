import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { algorithms, AlgorithmId } from '../data/algorithms';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { LinearRegressionVis } from '../components/learn/LinearRegressionVis';
import { PolynomialRegressionVis } from '../components/learn/PolynomialRegressionVis';
import { LogisticRegressionVis } from '../components/learn/LogisticRegressionVis';
import { PCAVis } from '../components/learn/PCAVis';

export function LearnPage() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  
  const id = algorithmId as AlgorithmId;
  const algorithm = algorithms[id];

  if (!algorithm) {
    return <div className="p-8 text-center">Algorithm not found</div>;
  }

  const renderVisualization = () => {
    switch (id) {
      case 'linear': return <LinearRegressionVis />;
      case 'polynomial': return <PolynomialRegressionVis />;
      case 'logistic': return <LogisticRegressionVis />;
      case 'pca': return <PCAVis />;
      default: return null;
    }
  };

  const handleNext = () => {
    // Navigate back to home or dashboard
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back Home
        </Button>
        <div className="flex items-center text-ml-green font-semibold">
          <CheckCircle className="w-5 h-5 mr-2" />
          Puzzle Completed!
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">You've Mastered {algorithm.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Let's review what you've learned.</p>
        </div>

        <GlassCard className={`border-t-4 border-t-[${algorithm.color}] mb-8`}>
          <h2 className="text-2xl font-bold mb-4">Algorithm Summary</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-ml-blue">What it is:</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{algorithm.summary.whatItIs}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-ml-green">When to use it:</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{algorithm.summary.whenToUseIt}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-ml-purple">Advantages</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {algorithm.summary.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-ml-orange">Limitations</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {algorithm.summary.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Real World Examples</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {algorithm.summary.realWorldExamples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>

        <h2 className="text-2xl font-bold mb-4 px-2">Interactive Visualization</h2>
        <div className="mb-12">
          {renderVisualization()}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleNext}>
            Continue Journey <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
