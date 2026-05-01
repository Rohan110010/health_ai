import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function HealthChart({ refresh }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8000/history");
    const json = await res.json();

    console.log("GRAPH DATA:", json); // 🔥 debug

    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleReset = async () => {
    await fetch("http://127.0.0.1:8000/reset", {
      method: "DELETE",
    });
    setData([]);
  };

  return (
    <div>
      <h3>📊 Health Trend</h3>

      <button onClick={handleReset}>
        Reset Graph
      </button>

      {data.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <LineChart width={320} height={220} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="confidence"   // 🔥 MUST BE THIS
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      )}
    </div>
  );
}