import { useEffect, useRef, useState } from "react";
import { Send, Square, Trash2, ChevronDown, ChevronUp, Bot, User } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import { getSuggestedQueries, sendChatQuery } from "../services/chatService";

const AGENT_PIPELINE = ["Query Router", "Analytics Agent", "Risk Agent", "Network Agent", "Recommendation Agent", "Llama LLM"];

const RISK_STYLE = {
  HIGH: "text-risk-high bg-risk-high-bg",
  MEDIUM: "text-risk-medium bg-risk-medium-bg",
  LOW: "text-risk-low bg-risk-low-bg",
};

function AgentTrace({ steps, expanded, onToggle }) {
  return (
    <div className="mt-2 border border-slate-100 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-500 bg-slate-50">
        Multi-agent execution trace
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {expanded && (
        <div className="p-3 space-y-1.5">
          {AGENT_PIPELINE.map((agent) => (
            <div key={agent} className="flex items-center gap-2 text-xs">
              <span className={steps.includes(agent) ? "text-risk-low" : "text-slate-300"}>
                {steps.includes(agent) ? "✓" : "○"}
              </span>
              <span className={steps.includes(agent) ? "text-slate-600" : "text-slate-300"}>{agent}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentSteps, setAgentSteps] = useState([]);
  const [traceOpen, setTraceOpen] = useState({});
  const suggested = getSuggestedQueries();
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, agentSteps]);

  async function handleSend(text) {
    const query = text ?? input;
    if (!query.trim() || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: query, id: Date.now() }]);
    setLoading(true);
    setAgentSteps([]);
    const responseId = Date.now() + 1;
    try {
      const result = await sendChatQuery(query, (agent) => setAgentSteps((s) => [...s, agent]));
      setMessages((m) => [...m, { role: "ai", id: responseId, steps: AGENT_PIPELINE, ...result }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer title="AI Assistant">
      <Card padded={false} className="flex flex-col h-[calc(100vh-140px)]">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">SupplyChainAI AI Assistant</h3>
          <p className="text-xs text-slate-400 mt-0.5">Ask questions about your supply chain data.</p>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {suggested.map((q) => (
                <button key={q} onClick={() => handleSend(q)} className="text-xs border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:border-accent-400 hover:text-accent-600">
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ai" && <div className="w-7 h-7 rounded-full bg-navy-900 text-white flex items-center justify-center shrink-0"><Bot size={14} /></div>}
              <div className={`max-w-[75%] ${m.role === "user" ? "order-1" : ""}`}>
                {m.role === "user" ? (
                  <div className="bg-accent-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">{m.text}</div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 text-sm space-y-3">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${RISK_STYLE[m.riskLevel]}`}>Risk Level: {m.riskLevel}</span>
                    <p className="text-slate-700 leading-relaxed">{m.text}</p>
                    {m.data && (
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-1">Supporting data</p>
                        <ul className="text-xs text-slate-500 space-y-0.5">
                          {m.data.map((d, i) => <li key={i}>• {d}</li>)}
                        </ul>
                      </div>
                    )}
                    {m.recommendation && (
                      <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                        <p className="text-xs font-medium text-slate-400 mb-0.5">Recommendation</p>
                        <p className="text-xs text-slate-600">{m.recommendation}</p>
                      </div>
                    )}
                    <AgentTrace steps={m.steps} expanded={!!traceOpen[m.id]} onToggle={() => setTraceOpen((t) => ({ ...t, [m.id]: !t[m.id] }))} />
                  </div>
                )}
              </div>
              {m.role === "user" && <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 order-2"><User size={14} /></div>}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-navy-900 text-white flex items-center justify-center shrink-0"><Bot size={14} /></div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-slate-500 space-y-1.5">
                {AGENT_PIPELINE.map((agent) => (
                  <div key={agent} className="flex items-center gap-2">
                    <span className={agentSteps.includes(agent) ? "text-risk-low" : "text-slate-300 animate-pulse-soft"}>
                      {agentSteps.includes(agent) ? "✓" : "○"}
                    </span>
                    {agent}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about suppliers, inventory, risk, or forecasts…"
              className="flex-1 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent-100 focus:border-accent-500"
            />
            {loading ? (
              <button className="p-2.5 rounded-lg bg-slate-100 text-slate-500"><Square size={16} /></button>
            ) : (
              <button onClick={() => handleSend()} className="p-2.5 rounded-lg bg-accent-600 text-white hover:bg-accent-500"><Send size={16} /></button>
            )}
            <button onClick={() => setMessages([])} className="p-2.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><Trash2 size={16} /></button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
