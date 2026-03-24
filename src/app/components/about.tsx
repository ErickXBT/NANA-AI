import { motion } from "motion/react";
import { Heart, Zap, Users } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Heart,
      title: "Community First",
      description: "Built by the community, for the community. NANA is all about spreading joy and building together.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by Solana's high-performance blockchain for instant transactions and minimal fees.",
    },
    {
      icon: Users,
      title: "Real Utility",
      description: "More than just a meme—unlock exclusive features, launchpad access, and AI tools.",
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
            What is <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">NANA?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NANA is the cutest meme coin on Solana that combines viral appeal with genuine utility. 
            We're building a vibrant ecosystem where fun meets functionality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-pink-300/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
