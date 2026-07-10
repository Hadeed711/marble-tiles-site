import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { retrieve, detectIntent } from "../chatbot/retriever";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "923206040196";
// PLACEHOLDER — set the real receiving inbox in .env when decided
const RECEIVER_EMAIL = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || "owner-email-here@example.com";

const GREETING =
  "Assalam-o-Alaikum! 👋 I'm the Sundar Marbles assistant. Ask me about marble types, prices, locations, delivery or services — or I can send a WhatsApp message or email to our team for you.";

const CONTACT_SUGGESTION =
  "I don't have that information right now. I can connect you with our team instead — choose an option below:";

// phone: accepts 03001234567, 0300-1234567, +923001234567, 923001234567
const PHONE_REGEX = /^(\+?92|0)3\d{2}-?\d{7}$/;

let msgId = 0;
const bot = (text, suggestions) => ({ id: ++msgId, from: "bot", text, suggestions });
const user = (text) => ({ id: ++msgId, from: "user", text });

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    bot(GREETING, ["💬 Marble prices", "📍 Store location", "📱 Send WhatsApp", "📧 Send Email"]),
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Contact-collection flow: channel = whatsapp | email, step = name | phone | message
  const [flow, setFlow] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const push = (...msgs) => setMessages((prev) => [...prev, ...msgs]);

  const startFlow = (channel) => {
    setFlow({ channel, step: "name", lead: { name: "", phone: "", message: "" } });
    const label = channel === "whatsapp" ? "WhatsApp message" : "email";
    push(
      bot(
        `Great — I'll prepare a ${label} for our team. First, what's your name? (Type "cancel" anytime to stop.)`
      )
    );
  };

  const sendWhatsApp = (lead) => {
    const text = `New inquiry from Sundar Marbles website chatbot%0A%0AName: ${encodeURIComponent(
      lead.name
    )}%0APhone: ${encodeURIComponent(lead.phone)}%0A%0AMessage:%0A${encodeURIComponent(lead.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
    push(
      bot(
        "📱 I've opened WhatsApp with your message ready — just press Send there and our team will reply soon. Anything else I can help with?",
        ["💬 Marble prices", "📧 Send Email"]
      )
    );
  };

  const sendEmail = async (lead) => {
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: lead.name,
          from_email: "chatbot@sundarmarbles.tech",
          reply_to: "",
          to_email: RECEIVER_EMAIL,
          message: `New inquiry from website chatbot\n\nName: ${lead.name}\nPhone: ${lead.phone}\n\nMessage:\n${lead.message}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      push(
        bot(
          "📧 Your email has been sent to our team! We'll get back to you soon. Anything else I can help with?",
          ["💬 Marble prices", "📱 Send WhatsApp"]
        )
      );
    } catch (err) {
      console.error("Chatbot email error:", err);
      push(
        bot(
          "⚠️ Sorry, the email could not be sent right now. You can try WhatsApp instead, or call us at 041-8816900.",
          ["📱 Send WhatsApp"]
        )
      );
    }
    setSending(false);
  };

  const handleFlowInput = async (text) => {
    if (text.toLowerCase().trim() === "cancel") {
      setFlow(null);
      push(bot("No problem, cancelled. ✅ Ask me anything else about Sundar Marbles!"));
      return;
    }

    const { channel, step, lead } = flow;

    if (step === "name") {
      if (text.trim().length < 2) {
        push(bot("Please enter your name (at least 2 letters)."));
        return;
      }
      setFlow({ channel, step: "phone", lead: { ...lead, name: text.trim() } });
      push(bot(`Thanks, ${text.trim()}! 📱 Now please enter your mobile number (e.g. 03001234567).`));
      return;
    }

    if (step === "phone") {
      const cleaned = text.replace(/[\s-]/g, "");
      if (!PHONE_REGEX.test(cleaned)) {
        push(bot("That doesn't look like a valid Pakistani mobile number. Please enter it like 03001234567."));
        return;
      }
      setFlow({ channel, step: "message", lead: { ...lead, phone: cleaned } });
      push(bot("Got it! ✍️ Finally, type the message you want to send to our team."));
      return;
    }

    if (step === "message") {
      if (text.trim().length < 5) {
        push(bot("Please write a slightly longer message so our team understands your inquiry."));
        return;
      }
      const finalLead = { ...lead, message: text.trim() };
      setFlow(null);
      if (channel === "whatsapp") {
        sendWhatsApp(finalLead);
      } else {
        await sendEmail(finalLead);
      }
    }
  };

  const handleQuestion = (text) => {
    // Explicit intent to contact via WhatsApp / email / human
    const intent = detectIntent(text);
    if (intent === "whatsapp") return startFlow("whatsapp");
    if (intent === "email") return startFlow("email");
    if (intent === "human") {
      push(bot(CONTACT_SUGGESTION, ["📱 Send WhatsApp", "📧 Send Email"]));
      return;
    }

    const result = retrieve(text);
    if (result) {
      push(bot(result.doc.answer));
    } else {
      push(bot(CONTACT_SUGGESTION, ["📱 Send WhatsApp", "📧 Send Email"]));
    }
  };

  const handleSuggestion = (label) => {
    push(user(label));
    if (label.includes("WhatsApp")) return startFlow("whatsapp");
    if (label.includes("Email")) return startFlow("email");
    handleQuestion(label);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    push(user(text));
    if (flow) {
      await handleFlowInput(text);
    } else {
      handleQuestion(text);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#00796b] text-white shadow-2xl flex items-center justify-center text-2xl hover:bg-[#d4af37] transition-colors"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[92vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ height: "min(560px, 75vh)" }}
          >
            {/* Header */}
            <div className="bg-[#00796b] text-white px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <p className="font-semibold leading-tight">Sundar Marbles Assistant</p>
                <p className="text-xs text-white/80">Usually replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#f7f9f9]">
              {messages.map((m) => (
                <div key={m.id}>
                  <div className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${
                        m.from === "user"
                          ? "bg-[#00796b] text-white rounded-br-sm"
                          : "bg-white text-[#333] shadow rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                  {m.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestion(s)}
                          disabled={sending}
                          className="text-xs border border-[#00796b] text-[#00796b] px-3 py-1.5 rounded-full hover:bg-[#00796b] hover:text-white transition-colors disabled:opacity-50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="bg-white shadow px-3 py-2 rounded-2xl text-sm text-gray-500">
                    Sending…
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-gray-200 bg-white p-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  flow
                    ? flow.step === "name"
                      ? "Your name…"
                      : flow.step === "phone"
                      ? "03001234567"
                      : "Your message…"
                    : "Ask about marble, prices, delivery…"
                }
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-[#00796b] text-white px-4 rounded-full text-sm font-medium hover:bg-[#d4af37] transition-colors disabled:opacity-50"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
