import { useState } from "react";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);

    setLoading(false);
  };

  return (
    <div>
      <h2>💬 Chatbot</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={styles.input}
      />

      <button onClick={handleSend} style={styles.button}>
        Send
      </button>

      {loading && <p>⏳ Thinking...</p>}

      {reply && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.result}>
          {reply}
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