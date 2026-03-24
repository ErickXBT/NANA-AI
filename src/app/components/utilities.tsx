import { motion } from "motion/react";
import { Rocket, MessageCircle, ArrowRight } from "lucide-react";

export function Utilities() {
  const utilities = [
    {
      icon: Rocket,
      title: "NANA Launchpad",
      description: "Launch your Solana projects with confidence. Our launchpad provides a secure and fair platform for new token launches.",
      features: ["Vetted Projects", "Fair Launch Mechanisms", "Community Voting", "Staking Rewards"],
      gradient: "from-pink-500 to-pink-600",
      glowColor: "pink-500/50",
    },
    {
      icon: MessageCircle,
      title: "NANA AI Chat Bot",
      description: "Your personal Web3 assistant powered by advanced AI. Get instant answers about crypto, market insights, and more.",
      features: ["24/7 Availability", "Market Analysis", "Portfolio Tracking", "Educational Content"],
      gradient: "from-pink-400 to-pink-500",
      glowColor: "pink-400/50",
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Utilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NANA isn't just cute—it's powerful. Unlock exclusive tools and features designed for the Web3 community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {utilities.map((utility, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-pink-200/50 to-pink-300/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300`} />
              <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-pink-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${utility.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <utility.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {utility.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {utility.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {utility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${utility.gradient} rounded-full`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className={`w-full px-6 py-3 bg-gradient-to-r ${utility.gradient} text-white rounded-xl font-semibold shadow-md hover:shadow-${utility.glowColor} transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
