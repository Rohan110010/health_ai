import { useState } from "react";
import { motion } from "framer-motion";
import SymptomChecker from "./pages/SymptomChecker";
import HealthChart from "./components/HealthChart";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 AI Health Assistant</h1>

      {/* 🔥 SYSTEM EXPLANATION */}
      <div style={styles.infoBox}>
        <h3>⚙️ How it works</h3>
        <p>
          Input → NLP processing → Feature extraction → Machine Learning prediction → Confidence scoring
        </p>
      </div>

      {/* 🔥 MAIN GRID */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <SymptomChecker setRefresh={setRefresh} />
        </div>

        <div style={styles.card}>
          <HealthChart refresh={refresh} />
        </div>
      </div>

      {/* 🔥 LIMITATION SECTION */}
      <div style={styles.warning}>
        ⚠️ This system provides AI-based predictions using trained data and may not cover all real-world medical cases.
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "1000px",
    margin: "auto"
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)"
  },
  infoBox: {
    maxWidth: "800px",
    margin: "auto",
    marginBottom: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "#1e293b",
    textAlign: "center"
  },
  warning: {
    marginTop: "20px",
    textAlign: "center",
    color: "orange"
  }
};

export default App;