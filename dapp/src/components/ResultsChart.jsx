import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF",
  "#FF4560", "#1E90FF", "#32CD32", "#FFD700", "#FF69B4",
  "#A52A2A", "#7B68EE", "#20B2AA", "#DC143C", "#00CED1",
  "#8A2BE2", "#FF8C00", "#ADFF2F", "#FF1493", "#4B0082"
];

const ResultsChart = ({ proposals }) => {
  const data = proposals.map((proposal) => ({
    name: proposal.description,
    value: proposal.voteCount,
  }));

  console.log("Données du graphe :", proposals.map(p => ({ name: p.description, value: p.voteCount }))); //verification sur la console
  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2>Résultats du vote</h2>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            if (percent === 0) return null;
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ResultsChart;