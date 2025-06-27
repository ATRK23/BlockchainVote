import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560"];

const ResultsChart = ({ proposals }) => {
  const data = proposals.map((proposal) => ({
    name: proposal.description,
    value: proposal.voteCount,
  }));

  console.log("Données du graphe :", proposals.map(p => ({ name: p.description, value: p.voteCount }))); //verification sur la console
  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2>Résultats du vote</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
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
