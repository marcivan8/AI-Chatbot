var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook, FiX, FiSend, FiMinimize2 } from "react-icons/fi";
const ChatWidget = /* @__PURE__ */ __name2(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Salut! I'm Eddy. Ask me anything about studying in France! \u{1F1EB}\u{1F1F7}", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const toggleChat = /* @__PURE__ */ __name2(() => setIsOpen(!isOpen), "toggleChat");
  const scrollToBottom = /* @__PURE__ */ __name2(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, "scrollToBottom");
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const handleSend = /* @__PURE__ */ __name2(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botResponses = [
        "That's a great question about tuition! Generally, public universities in France are very affordable, around \u20AC170-\u20AC600 per year.",
        "Paris is amazing, but have you considered Lyon or Toulouse? They are very student-friendly cities! \u{1F3D9}\uFE0F",
        "For student visas, you'll need to check the Campus France website. I can guide you through the documents if you like.",
        "Most Master's programs are taught in English, but learning a little French helps with daily life! \u{1F950}"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: randomResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1500);
  }, "handleSend");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    motion.button,
    {
      className: "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 z-50 hover:scale-110 transition-transform",
      onClick: toggleChat,
      whileHover: { rotate: 10 },
      whileTap: { scale: 0.9 }
    },
    isOpen ? /* @__PURE__ */ React.createElement(FiX, { size: 24 }) : /* @__PURE__ */ React.createElement(FiBook, { size: 24 })
  ), /* @__PURE__ */ React.createElement(AnimatePresence, null, isOpen && /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 50, scale: 0.9 },
      className: "fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden z-50 border border-gray-700 shadow-2xl"
    },
    /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xs" }, "AI"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm" }, "Eddy"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-blue-100 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), "Online"))), /* @__PURE__ */ React.createElement("button", { onClick: toggleChat, className: "text-white hover:bg-white/20 p-1 rounded" }, /* @__PURE__ */ React.createElement(FiMinimize2, null))),
    /* @__PURE__ */ React.createElement("div", { className: "flex-grow overflow-y-auto p-4 space-y-4 bg-gray-900 bg-opacity-80" }, messages.map((msg) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: msg.id,
        className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-700 text-gray-100 rounded-tl-none border border-gray-600"}`
        },
        msg.text
      )
    )), isTyping && /* @__PURE__ */ React.createElement("div", { className: "flex justify-start" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-700 rounded-2xl px-4 py-3 rounded-tl-none border border-gray-600 flex gap-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" }), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" }))), /* @__PURE__ */ React.createElement("div", { ref: messagesEndRef })),
    /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-gray-800 border-t border-gray-700" }, /* @__PURE__ */ React.createElement("form", { onSubmit: handleSend, className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: input,
        onChange: /* @__PURE__ */ __name((e) => setInput(e.target.value), "onChange"),
        placeholder: "Ask about schools...",
        className: "bg-gray-900 border-gray-600 text-white text-sm"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        disabled: !input.trim(),
        className: "bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      },
      /* @__PURE__ */ React.createElement(FiSend, null)
    )))
  )));
}, "ChatWidget");
var stdin_default = ChatWidget;
export {
  stdin_default as default
};
