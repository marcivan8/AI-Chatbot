import React, { useState, useEffect, useRef } from "react";
import { X, Send, Maximize2, Minimize2, MessageSquare, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiService } from "../../services/api";
import ReactMarkdown from "react-markdown";


function EddyChatbot({ isOpen, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false); // Sidebar mode
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis Eddy, votre assistant éducatif. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isExpanded]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    const newMessage = { id: Date.now(), text: userMessage, isBot: false, timestamp: new Date() };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Prepare History
    const history = messages.map(msg => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text
    }));

    // Call Backend API
    try {
      const data = await apiService.sendChatMessage(userMessage, history);
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Erreur de connexion.",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const getBotResponse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes("école") || lower.includes("ecole")) {
      return "Je peux vous aider à trouver des écoles ! Utilisez les filtres pour affiner votre recherche par ville, domaine ou type d'établissement. Que recherchez-vous précisément ?";
    }
    if (lower.includes("métier") || lower.includes("metier")) {
      return "Consultez la section Métiers pour découvrir les carrières disponibles avec leurs compétences requises et formations associées !";
    }
    if (lower.includes("comparer")) {
      return "La section Comparateur vous permet de comparer jusqu'à 3 écoles côte à côte. Très utile pour faire votre choix !";
    }
    if (lower.includes("alternance")) {
      return "L'alternance est un excellent moyen de se former ! Utilisez le filtre 'Alternance' pour voir uniquement les écoles qui proposent cette option.";
    }
    if (lower.includes("aide") || lower.includes("help")) {
      return "Je peux vous aider avec : la recherche d'écoles, les métiers, la comparaison d'établissements, ou répondre à vos questions générales sur l'orientation !";
    }
    return "Intéressant ! N'hésitez pas à utiliser la barre de recherche et les filtres pour trouver ce que vous cherchez. Puis-je vous aider avec autre chose ?";
  };

  // Quick replies
  const suggestions = ["Chercher une école", "Trouver un métier", "Mode alternance", "Comparer des écoles"];

  const handleSuggestionClick = (text) => {
    setInput(text);
    // Optional: Auto-send or just fill input. Let's auto-send for smoother UX
    setTimeout(() => {
      // We set input but need to pass the text directly since state update is async
      const userMessage = text;
      const newMessage = { id: Date.now(), text: userMessage, isBot: false, timestamp: new Date() };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setTimeout(() => {
        const botResponseText = getBotResponse(userMessage);
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          text: botResponseText,
          isBot: true,
          timestamp: new Date()
        }]);
      }, 600);
    }, 50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for Expanded Sidebar Mode */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
          )}

          <motion.div
            initial={isExpanded ? { x: "100%" } : { opacity: 0, y: 100, scale: 0.9 }}
            animate={isExpanded ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isExpanded ? { x: "100%" } : { opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed z-50 bg-white shadow-2xl overflow-hidden flex flex-col border border-gray-100
              ${isExpanded
                ? "top-0 right-0 w-full sm:w-[400px] h-full rounded-l-2xl border-l"
                : "bottom-[100px] left-4 right-4 sm:left-auto sm:right-6 sm:w-96 rounded-2xl max-h-[60vh] sm:max-h-[600px]"
              }
            `}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-4 sm:p-5 flex items-center justify-between shadow-sm shrink-0">

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 relative overflow-hidden bg-white/10">
                    <img src="/eddy-avatar-3d.png" className="w-full h-full object-cover" alt="Eddy Avatar" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full z-10"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Eddy</h3>
                  <p className="text-blue-100 text-xs flex items-center gap-1">
                    Assistant d'orientation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block"
                  title={isExpanded ? "Réduire" : "Agrandir"}
                >
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative">
              <div className="text-center py-4">
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  Aujourd'hui
                </span>
              </div>

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"} items-end gap-2`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 overflow-hidden flex-shrink-0 p-0.5">
                      <img src="/eddy-avatar-3d.png" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${message.isBot
                        ? "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                        : "bg-blue-600 text-white rounded-tr-none"
                      }`}
                  >
                    {message.isBot ? (
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ul:pl-4 prose-a:text-blue-600">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    ) : (
                      message.text
                    )}
                    <div className={`text-[10px] mt-1 opacity-70 ${message.isBot ? "text-gray-400" : "text-blue-100/80"} flex justify-end`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - Only show if conversation hasn't started */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto no-scrollbar">
                <div className="flex gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="flex-shrink-0 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm p-2 max-h-32 min-h-[40px]"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-95 flex-shrink-0 mb-0.5"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">
                  Eddy peut faire des erreurs. Vérifiez les informations importantes.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export {
  EddyChatbot
};
