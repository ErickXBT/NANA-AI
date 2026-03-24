import { motion } from "motion/react";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";

export function Roadmap() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Launch & Community",
      status: "completed",
      items: [
        "Token Launch on Solana",
        "Website & Social Media",
        "Community Building",
        "Initial Marketing Campaign",
      ],
    },
    {
      phase: "Phase 2",
      title: "Utility Development",
      status: "current",
      items: [
        "NANA Launchpad Beta",
        "AI Chat Bot Development",
        "Partnership Announcements",
        "CEX Listings",
      ],
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Expansion",
      status: "upcoming",
      items: [
        "Full Launchpad Launch",
        "AI Bot Public Release",
        "NFT Collection",
        "Staking Platform",
      ],
    },
    {
      phase: "Phase 4",
      title: "Global Adoption",
      status: "upcoming",
      items: [
        "Major Exchange Listings",
        "Mobile App Launch",
        "International Marketing",
        "DAO Governance",
      ],
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-pink-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our journey to becoming the most beloved and useful meme coin on Solana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-300 ${
                  phase.status === "completed"
                    ? "bg-green-200/50"
                    : phase.status === "current"
                    ? "bg-pink-300/50 group-hover:blur-2xl"
                    : "bg-gray-200/30"
                }`}
              />
              
              {/* Card */}
              <div
                className={`relative rounded-3xl p-6 border shadow-lg transition-all duration-300 h-full ${
                  phase.status === "completed"
                    ? "bg-green-50/70 border-green-200/50"
                    : phase.status === "current"
                    ? "bg-white/70 border-pink-200/50 shadow-xl"
                    : "bg-white/50 border-gray-200/50"
                } backdrop-blur-lg`}
              >
                {/* Phase badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                    phase.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : phase.status === "current"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {phase.status === "current" && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                  {phase.phase}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {phase.title}
                </h3>

                {/* Items */}
                <div className="space-y-3">
                  {phase.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {phase.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm leading-relaxed ${
                          phase.status === "completed"
                            ? "text-gray-700"
                            : "text-gray-600"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
