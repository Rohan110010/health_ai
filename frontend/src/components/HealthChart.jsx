import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function HealthChart({ refresh }) {
  const [data, setData] = useState([]);

  // 🔥 Fetch history
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/history");
      const json = await res.json();

      // ✅ Transform data for chart
      const formatted = json.map((item, index) => ({
        name: `Check ${index + 1}`,       // X-axis label
        confidence: item.confidence,      // numeric value
        disease: item.disease
      }));

      setData(formatted);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // 🔥 Reset graph
  const handleReset = async () => {
    await fetch("http://localhost:8000/reset", {
      method: "DELETE",
    });

    setData([]);
  };

  return (
    <div>
      <h3>📊 Health Trend</h3>

      <button
        onClick={handleReset}
        style={{
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "6px",
          background: "#ef4444",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
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
            dataKey="confidence"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      )}
    </div>
  );
}