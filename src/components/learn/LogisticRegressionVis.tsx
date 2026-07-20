import { Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

export function LogisticRegressionVis() {
  const data = Array.from({ length: 40 }).map((_, i) => {
    const x = (i - 20) * 0.5; // -10 to 10
    const trueProb = 1 / (1 + Math.exp(-x));
    
    // Class 0 or 1 based on probability + some noise
    const yClass = Math.random() < trueProb ? 1 : 0;
    
    return {
      x,
      y: yClass,
      sigmoidY: trueProb
    };
  });

  return (
    <div className="w-full h-64 bg-white dark:bg-black/20 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" dataKey="x" name="Feature (X)" />
          <YAxis type="number" dataKey="y" name="Class (Y)" domain={[-0.1, 1.1]} ticks={[0, 1]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Instances" data={data} fill="#10B981" />
          <Line type="monotone" dataKey="sigmoidY" stroke="#EF4444" strokeWidth={3} dot={false} activeDot={false} name="Sigmoid Probability" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
