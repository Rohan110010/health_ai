import { useState } from "react";
import { motion } from "framer-motion";

export default function Analyze() {
  const [symptoms, setSymptoms] = useState("");
  const [report, setReport] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms, report }),
    });

    const data = await res.json();
    setResult(data);

    setLoading(false);
  };

  return (
    <div>
      <h2>📊 Analysis</h2>

      <textarea
        placeholder="Symptoms"
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Medical report"
        onChange={(e) => setReport(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleAnalyze} style={styles.button}>
        Analyze
      </button>

      {loading && <p>⏳ Analyzing...</p>}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.result}>
          <p>{result.summary}</p>
        </motion.div>
      )}
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  button: {
    background: "linear-gradient(45deg, #3b82f6, #06b6d4)",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px"
  },
  result: {
    marginTop: "10px",
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px"
  }
};