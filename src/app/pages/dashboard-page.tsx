import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wallet, Send, CheckCircle, AlertCircle, X, Copy, ExternalLink, Loader2 } from "lucide-react";

type WalletState = "disconnected" | "connected" | "authenticated";

export function DashboardPage() {
  const [walletState, setWalletState] = useState<WalletState>("disconnected");
  const [publicKey, setPublicKey] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0.001");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [txSignature, setTxSignature] = useState("");
  const [error, setError] = useState("");

  // Mock wallet connection
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError("");
    
    setTimeout(() => {
      const mockPublicKey = "7xKXtg2CW87d9wez3kQ9pWjRqFD8z5kT9YjFBp2Zy6nQ";
      setPublicKey(mockPublicKey);
      setWalletState("connected");
      setIsConnecting(false);
    }, 1500);
  };

  // Mock disconnect
  const handleDisconnect = () => {
    setWalletState("disconnected");
    setPublicKey("");
    setRecipient("");
    setAmount("0.001");
    setError("");
  };

  // Mock sign message
  const handleSignMessage = async () => {
    setIsSigning(true);
    setError("");
    
    setTimeout(() => {
      setWalletState("authenticated");
      setIsSigning(false);
    }, 2000);
  };

  // Mock send transaction
  const handleSendTransaction = async () => {
    setError("");
    
    if (!recipient) {
      setError("Please enter a recipient address");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsSending(true);
    
    setTimeout(() => {
      const mockSignature = "5j7s8K2L9mN4pQrS3tU6vW8xY9zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6fG7hI8jK9";
      setTxSignature(mockSignature);
      setIsSending(false);
      setShowSuccessModal(true);
      setRecipient("");
      setAmount("0.001");
    }, 2500);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Solana Dashboard</span>
            </div>

            {/* Wallet Button */}
            {walletState === "disconnected" ? (
              <motion.button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white font-mono text-sm">{truncateAddress(publicKey)}</span>
                    <button
                      onClick={() => copyToClipboard(publicKey)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <motion.button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Disconnect
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Authentication */}
          <div className="space-y-6">
            {/* Login Card */}
            {walletState === "connected" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Sign In</h2>
                    <p className="text-gray-400 text-sm">Authenticate your wallet</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-gray-300 text-sm mb-2">
                      To verify wallet ownership, please sign the following message:
                    </p>
                    <p className="text-purple-300 font-mono text-xs bg-black/30 p-3 rounded">
                      Welcome to Solana Dashboard! Sign this message to authenticate.
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={handleSignMessage}
                  disabled={isSigning}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSigning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing Message...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Sign Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* Success State */}
            {walletState === "authenticated" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 shadow-2xl"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Authentication Successful!</h3>
                  <p className="text-gray-300">Your wallet is now authenticated and ready to use.</p>
                  <div className="mt-6 p-4 bg-black/30 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Connected Wallet</p>
                    <p className="text-white font-mono">{publicKey}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-300 text-sm">Connect your Phantom wallet</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-300 text-sm">Sign authentication message</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-300 text-sm">Send SOL transactions securely</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Send Transaction */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl ${
                walletState !== "authenticated" ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Send SOL</h2>
                  <p className="text-gray-400 text-sm">Transfer SOL to any wallet</p>
                </div>
              </div>

              {walletState !== "authenticated" && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-300 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Please connect and authenticate your wallet first
                  </p>
                </div>
              )}

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-300 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                {/* Recipient Address */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Solana wallet address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono text-sm"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Amount (SOL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.001"
                      placeholder="0.001"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                      SOL
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    ≈ ${(parseFloat(amount || "0") * 142.5).toFixed(2)} USD
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2">
                  {["0.001", "0.01", "0.1", "1"].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className="flex-1 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all text-sm"
                    >
                      {preset} SOL
                    </button>
                  ))}
                </div>

                {/* Send Button */}
                <motion.button
                  onClick={handleSendTransaction}
                  disabled={isSending || walletState !== "authenticated"}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Transaction...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Transaction
                    </>
                  )}
                </motion.button>
              </div>

              {/* Transaction Details Preview */}
              {walletState === "authenticated" && (
                <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="text-gray-400 text-xs mb-3">Transaction Preview</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">From:</span>
                      <span className="text-white font-mono">{truncateAddress(publicKey)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">To:</span>
                      <span className="text-white font-mono">
                        {recipient ? truncateAddress(recipient) : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-semibold">{amount || "0"} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network Fee:</span>
                      <span className="text-white">~0.000005 SOL</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Transaction Successful!</h3>
                    <p className="text-gray-400 text-sm">Your SOL has been sent</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <p className="text-gray-400 text-xs mb-2">Transaction Signature</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-mono text-xs break-all flex-1">
                      {txSignature}
                    </p>
                    <button
                      onClick={() => copyToClipboard(txSignature)}
                      className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Amount</p>
                    <p className="text-white font-semibold">{amount} SOL</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Network Fee</p>
                    <p className="text-white font-semibold">0.000005 SOL</p>
                  </div>
                </div>

                <a
                  href={`https://solscan.io/tx/${txSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Solscan
                </a>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
