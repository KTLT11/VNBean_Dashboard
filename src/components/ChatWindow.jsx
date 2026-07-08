import { Send } from "lucide-react";

export default function ChatWindow({ messages, input, onInputChange, onSubmit, loading }) {
  return (
    <div className="chat-window">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`chat-message chat-message--${message.role}`}>
            <span>{message.role === "user" ? "Bạn" : "VNBean AI"}</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Nhập câu hỏi phân tích..."
        />
        <button type="submit" disabled={loading || !input.trim()}>
          <Send size={16} />
          Gửi câu hỏi
        </button>
      </form>
    </div>
  );
}
