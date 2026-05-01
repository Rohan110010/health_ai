import { useState } from "react";
import { motion } from "framer-motion";

export default function SymptomChecker({ setRefresh }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input) return;

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: input }),
      });

      const data = await res.json();
      setResult(data);

      if (setRefresh) setRefresh(prev => prev + 1);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>🧠 Symptom Checker</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your symptoms..."
        style={styles.input}
      />

      <button onClick={handleCheck} style={styles.button}>
        Analyze
      </button>

      {loading && <p>⏳ Analyzing...</p>}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.card}
        >
          <h3>🩺 Prediction</h3>

          <p><b>Disease:</b> {result.disease}</p>

          <p>
            <b>Confidence:</b>{" "}
            <span style={getConfidenceColor(result.confidence)}>
              {result.confidence}%
            </span>
          </p>

          <p><b>Risk:</b> {result.risk}</p>
          <p><b>Advice:</b> {result.advice}</p>

          {/* 🔥 SMART EXPLANATION */}
          <p style={styles.explanation}>
            The prediction is based on similarity between your symptoms and patterns learned from medical data.
            Higher confidence indicates a closer match.
          </p>

          {/* 🔥 LOW CONFIDENCE WARNING */}
          {result.confidence < 40 && (
            <p style={styles.warning}>
              ⚠️ Low confidence: Try adding more symptoms for better accuracy.
            </p>
          )}

          {/* 🔥 TOP PREDICTIONS */}
          {result.top_predictions && result.top_predictions.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <b>Other possibilities:</b>
              {result.top_predictions.map((item, i) => (
                <p key={i}>
                  {item[0]} ({(item[1] * 100).toFixed(1)}%)
                </p>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// 🎨 styles
const styles = {
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "none"
  },
  button: {
    background: "linear-gradient(45deg, #6366f1, #06b6d4)",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  card: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "12px",
    background: "#1e293b"
  },
  explanation: {
    marginTop: "10px",
    fontStyle: "italic",
    color: "#cbd5f5"
  },
  warning: {
    marginTop: "10px",
    color: "orange",
    fontWeight: "bold"
  }
};

// 🎯 dynamic color
function getConfidenceColor(value) {
  if (value > 70) return { color: "limegreen" };
  if (value > 40) return { color: "orange" };
  return { color: "red" };
}