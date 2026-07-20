import { Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

export function PCAVis() {
  // Generate a cluster of data points stretched along a diagonal (high variance direction)
  const data = Array.from({ length: 50 }).map(() => {
    // Generate point along a diagonal line
    const base = Math.random() * 100;
    // Add some noise orthogonal to the line
    const noise = (Math.random() - 0.5) * 20;
    
    return {
      x: base + noise,
      y: base - noise,
    };
  });

  // The first principal component (the direction of maximum variance)
  const pc1 = [
    { pcX: 0, pcY: 0 },
    { pcX: 100, pcY: 100 }
  ];

  return (
    <div className="w-full h-64 bg-white dark:bg-black/20 rounded-xl p-4 relative overflow-hidden">
      <div className="absolute top-2 right-4 text-xs font-semibold text-ml-orange bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
        Red Line = 1st Principal Component
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 20, right: 20, bottom: 10, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" dataKey="x" name="Feature 1" domain={[0, 100]} />
          <YAxis type="number" dataKey="y" name="Feature 2" domain={[0, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Data Points" data={data} fill="#F97316" opacity={0.7} />
          <Line data={pc1} type="linear" dataKey="pcY" stroke="#EF4444" strokeWidth={4} dot={false} activeDot={false} name="Principal Component 1" xAxisId={0} />
          <XAxis xAxisId={0} dataKey="pcX" type="number" hide domain={[0, 100]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
