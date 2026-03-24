import { motion } from "motion/react";
import { Twitter, Send, MessageCircle, Github, Heart } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: Send, label: "Telegram", href: "#", color: "hover:text-blue-500" },
    { icon: MessageCircle, label: "Discord", href: "#", color: "hover:text-indigo-500" },
    { icon: Github, label: "GitHub", href: "#", color: "hover:text-gray-700" },
  ];

  return (
    <footer className="relative py-12 px-6 bg-gradient-to-br from-pink-100/50 via-white to-pink-50/50 border-t border-pink-200/30">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-3">
              NANA
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The cutest meme coin on Solana with real utility and a vibrant community.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Tokenomics", "Utilities", "Roadmap"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-gray-800 mb-4">Join Our Community</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-600 ${social.color} shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200/50`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-pink-200/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 flex items-center justify-center gap-2 flex-wrap">
            <span>© 2026 NANA Coin. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </motion.span>
            <span>by the NANA community.</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cryptocurrency trading involves risk. Do your own research.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl -z-10" />
    </footer>
  );
}
