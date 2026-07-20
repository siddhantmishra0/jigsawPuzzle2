import { Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

export function PolynomialRegressionVis() {
  // Generate U-shape data
  const data = Array.from({ length: 30 }).map((_, i) => {
    const x = i * 2;
    // Parabola: y = a(x-h)^2 + k
    const trueY = 0.05 * Math.pow(x - 30, 2) + 10;
    return {
      x,
      y: trueY + (Math.random() * 15 - 7.5),
      curveY: trueY
    };
  });

  return (
    <div className="w-full h-64 bg-white dark:bg-black/20 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" dataKey="x" name="Input (X)" />
          <YAxis type="number" dataKey="y" name="Output (Y)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Data Points" data={data} fill="#8B5CF6" />
          <Line type="monotone" dataKey="curveY" stroke="#EF4444" strokeWidth={3} dot={false} activeDot={false} name="Polynomial Curve" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
