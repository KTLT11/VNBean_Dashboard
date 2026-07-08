import { useMemo, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ChartCard from "../components/ChartCard";
import PageHeader from "../components/PageHeader";
import { buildChatbotContext, serializeChatbotContext, suggestedQuestions } from "../utils/chatbotContext";

export default function ChatbotPage({ data, filteredData }) {
  const [scope, setScope] = useState("filtered");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Xin chào, tôi là trợ lý phân tích VNBean. Hãy chọn một câu hỏi gợi ý hoặc nhập câu hỏi kinh doanh cần xem nhanh.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useMemo(() => buildChatbotContext(scope === "all" ? data : filteredData), [data, filteredData, scope]);

  const ask = async (question) => {
    const clean = question.trim();
    if (!clean) return;
    setMessages((current) => [...current, { role: "user", text: clean }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: clean,
          context: serializeChatbotContext(context),
          history: messages.slice(-6),
        }),
      });
      const payload = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", text: payload.answer || payload.error || "Chatbot chưa thể phản hồi lúc này." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "Chưa kết nối được API chatbot. Các trang dashboard vẫn hoạt động bình thường." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Chatbot phân tích"
        subtitle="Hỏi đáp nhanh dựa trên dữ liệu tóm tắt của VNBean, trả lời theo góc nhìn kinh doanh."
      />

      <div className="content-grid content-grid--wide">
        <ChartCard title="Trợ lý phân tích VNBean" subtitle="API key Groq chỉ được đọc ở backend qua biến môi trường GROQ_API_KEY.">
          <div className="chat-controls">
            <button className={scope === "filtered" ? "selected" : ""} onClick={() => setScope("filtered")} type="button">Dữ liệu sau filter</button>
            <button className={scope === "all" ? "selected" : ""} onClick={() => setScope("all")} type="button">Toàn bộ dữ liệu</button>
          </div>
          <ChatWindow
            messages={messages}
            input={input}
            onInputChange={setInput}
            loading={loading}
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          />
        </ChartCard>

        <section className="suggestion-card">
          <h2>Câu hỏi gợi ý</h2>
          <div>
            {suggestedQuestions.map((question) => (
              <button key={question} type="button" onClick={() => ask(question)}>
                {question}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
