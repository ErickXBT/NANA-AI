import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, Plus, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export function AIChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: "1", title: "New Chat", messages: [] },
  ]);
  const [activeSessionId, setActiveSessionId] = useState("1");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Crypto Analysis
    if (message.includes("price") || message.includes("market") || message.includes("analysis")) {
      return "📊 Based on current market trends, Solana (SOL) is showing strong momentum. The network's high throughput and low fees continue to attract developers. However, always DYOR (Do Your Own Research) before investing! 💎";
    }

    if (message.includes("solana") || message.includes("sol")) {
      return "🚀 Solana is one of the fastest blockchains in the crypto space! With ~65,000 TPS capability and sub-second finality, it's perfect for DeFi, NFTs, and meme coins like NANA! Currently, Solana's ecosystem is growing rapidly with innovative projects launching daily. ⚡";
    }

    if (message.includes("nana")) {
      return "🍌 NANA is not just another meme coin - it's a utility-first project! We offer a premium Launchpad for token creation and an AI Chat Bot (that's me! 😊). Our tokenomics: 1B supply, 95% public, 5% dev. Join the cute revolution! 💖";
    }

    if (message.includes("launchpad") || message.includes("launch")) {
      return "🚀 NANA Launchpad makes token creation super easy! You can create your own Solana token in minutes with custom supply, decimals, and even upload your logo. Try it on mainnet for real deployments. Want to try it? Click 'Launch on NANA' on our homepage! ✨";
    }

    if (message.includes("tokenomics") || message.includes("supply")) {
      return "💰 NANA Tokenomics:\n• Total Supply: 1,000,000,000 NANA\n• Public Allocation: 95% (950M NANA)\n• Development Fund: 5% (50M NANA)\n\nFair distribution ensures community-driven growth! 🌟";
    }

    if (message.includes("buy") || message.includes("purchase")) {
      return "💎 To buy NANA tokens:\n1. Get a Phantom wallet\n2. Buy SOL on an exchange\n3. Connect to NANA DEX (coming soon!)\n4. Swap SOL for NANA\n\nAlways verify contract addresses and be cautious of scams! 🔒";
    }

    if (message.includes("wallet") || message.includes("phantom")) {
      return "👛 Phantom is the #1 wallet for Solana! Download it from phantom.app, create your wallet, and securely store your seed phrase. You can connect it to our dashboard to interact with NANA ecosystem. Never share your seed phrase with anyone! 🔐";
    }

    if (message.includes("roadmap") || message.includes("future") || message.includes("plan")) {
      return "🗺️ NANA Roadmap:\n✅ Phase 1: Token Launch & Community Building\n✅ Phase 2: Launchpad Release\n✅ Phase 3: AI Chat Bot (You're using it! 🎉)\n🔜 Phase 4: DEX Integration\n futuro Phase 5: NFT Collection\n futuro Phase 6: Mobile App\n\nStay tuned for more updates! 🚀";
    }

    if (message.includes("defi") || message.includes("staking") || message.includes("yield")) {
      return "💸 DeFi opportunities with NANA:\n• Staking (Coming Q2 2026)\n• Liquidity Pools (Planning phase)\n• Yield Farming (Under development)\n\nOur goal is to provide sustainable yields while maintaining community value! 📈";
    }

    if (message.includes("team") || message.includes("developer")) {
      return "👨‍💻 NANA is built by a passionate team of blockchain developers, designers, and crypto enthusiasts! We're committed to transparency and community-driven development. Join our Discord/Telegram to connect with the team! 🤝";
    }

    // Greetings
    if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
      return "👋 Hey there! I'm NANA AI, your friendly crypto assistant! I can help you with:\n• Solana & crypto analysis 📊\n• NANA tokenomics 💰\n• Launchpad guides 🚀\n• Market insights 📈\n\nWhat would you like to know? 🍌";
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! 💖 Happy to help! Feel free to ask me anything about crypto, Solana, or NANA anytime! 🍌✨";
    }

    // Default response
    return "🤔 That's an interesting question! While I'm still learning, I can help you with crypto analysis, Solana insights, NANA tokenomics, and launchpad guides. Try asking me about market trends, Solana, or how to use our Launchpad! 💡";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message
    const updatedSessions = sessions.map((session) => {
      if (session.id === activeSessionId) {
        return {
          ...session,
          messages: [...session.messages, userMessage],
          title: session.messages.length === 0 ? inputMessage.slice(0, 30) + "..." : session.title,
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, botResponse],
            };
          }
          return session;
        })
      );
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gradient-to-br from-pink-50 to-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-pink-100 flex flex-col">
        {/* New Conversation Button */}
        <div className="p-4">
          <motion.button
            onClick={createNewChat}
            className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </motion.button>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto px-2">
          {sessions.map((session, index) => (
            <motion.button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full px-4 py-3 mb-2 rounded-lg text-left transition-all ${
                activeSessionId === session.id
                  ? "bg-pink-100 text-pink-600"
                  : "text-gray-600 hover:bg-pink-50"
              }`}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{session.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-pink-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">NANA Assistant</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {activeSession?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6"
              >
                <Bot className="w-10 h-10 text-pink-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Say hi to NANA!</h3>
              <p className="text-gray-500 max-w-md">
                Ask me about Solana, launchpad metrics, or just chat.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {activeSession?.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                        : "bg-white border border-pink-100 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-pink-100" : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-pink-100 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-pink-100 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-pink-50 rounded-full px-4 py-2 border border-pink-100 focus-within:border-pink-300 transition-colors">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask NANA anything..."
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  inputMessage.trim()
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                    : "bg-gray-200 text-gray-400"
                }`}
                whileHover={inputMessage.trim() ? { scale: 1.1 } : {}}
                whileTap={inputMessage.trim() ? { scale: 0.9 } : {}}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              NANA AI can make mistakes. Consider verifying important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}