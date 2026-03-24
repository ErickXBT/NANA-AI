import { motion } from "motion/react";
import { Home, Rocket, Sparkles, Wallet, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useWallet } from "../context/wallet-context";

export function Navbar() {
  const { walletAddress, solBalance, isConnecting, isConnected, connectWallet, disconnectWallet } = useWallet();

  const navLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Rocket, label: "Launchpad", href: "/launchpad" },
    { icon: Sparkles, label: "NANA AI", href: "/ai-chat" },
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-pink-50/80 backdrop-blur-lg border-b border-pink-200/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/80">
                <img
                  src="https://i.imgur.com/KZEbjMH.png"
                  alt="NANA"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                NANA
              </span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.href}>
                <motion.div
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          {!isConnected ? (
            <motion.button
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </>
              )}
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Balance Display */}
              <div className="px-4 py-2 bg-white border border-pink-200 rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">◎</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">{solBalance.toFixed(4)} SOL</span>
                </div>
              </div>

              {/* Wallet Address with Disconnect */}
              <div className="relative group">
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg cursor-pointer hover:shadow-purple-500/50 transition-all">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    <span className="font-mono text-sm">{truncateAddress(walletAddress!.toString())}</span>
                  </div>
                </div>
                {/* Disconnect Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <button
                    onClick={disconnectWallet}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}