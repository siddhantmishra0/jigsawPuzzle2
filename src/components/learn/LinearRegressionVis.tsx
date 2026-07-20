import { Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

export function LinearRegressionVis() {
  // Generate some dummy scatter data with a linear trend
  const data = Array.from({ length: 20 }).map((_, i) => ({
    x: i * 5 + Math.random() * 10,
    y: i * 3 + Math.random() * 20 + 10,
  }));

  // Line of best fit data points
  const lineData = [
    { x: 0, lineY: 10 },
    { x: 100, lineY: 100 * 0.6 + 10 } // approx
  ];

  const mergedData = [...data, ...lineData].sort((a, b) => a.x - b.x);

  return (
    <div className="w-full h-64 bg-white dark:bg-black/20 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={mergedData} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" dataKey="x" name="Input (X)" domain={[0, 100]} />
          <YAxis type="number" dataKey="y" name="Output (Y)" domain={[0, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Data Points" data={data} fill="#3B82F6" />
          <Line type="linear" dataKey="lineY" stroke="#EF4444" strokeWidth={3} dot={false} activeDot={false} name="Best Fit Line" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
