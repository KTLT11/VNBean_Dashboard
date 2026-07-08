const SYSTEM_PROMPT = `Bạn là trợ lý phân tích kinh doanh cho Giám đốc chuỗi cà phê VNBean. Chỉ được trả lời dựa trên dữ liệu tóm tắt được cung cấp. Không bịa số liệu. Nếu câu hỏi vượt ngoài phạm vi dữ liệu, hãy nói rõ là chưa đủ dữ liệu để trả lời. Trả lời ngắn gọn, có số liệu minh chứng và hàm ý quản trị.`;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Chỉ hỗ trợ POST." });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    response.status(200).json({
      answer: "Chatbot chưa được bật vì thiếu biến môi trường GROQ_API_KEY. Dashboard vẫn hoạt động bình thường; hãy thêm key trên Vercel hoặc môi trường server để dùng phân tích AI.",
    });
    return;
  }

  const { question, context, history = [] } = request.body || {};
  if (!question || !context) {
    response.status(400).json({ error: "Thiếu câu hỏi hoặc context dữ liệu." });
    return;
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Dữ liệu tóm tắt VNBean:\n${context}` },
          ...history.map((item) => ({
            role: item.role === "user" ? "user" : "assistant",
            content: item.text,
          })),
          { role: "user", content: question },
        ],
      }),
    });

    if (!groqResponse.ok) {
      const detail = await groqResponse.text();
      response.status(200).json({ answer: `Chatbot chưa phản hồi được từ Groq. Chi tiết kỹ thuật: ${detail.slice(0, 160)}` });
      return;
    }

    const data = await groqResponse.json();
    response.status(200).json({ answer: data.choices?.[0]?.message?.content || "Không có nội dung phản hồi." });
  } catch (error) {
    response.status(200).json({ answer: `Chatbot gặp lỗi kết nối: ${error.message}` });
  }
}
