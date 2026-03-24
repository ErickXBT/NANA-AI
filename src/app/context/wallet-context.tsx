import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";

// Phantom wallet types
interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  publicKey: PublicKey | null;
  signTransaction: (transaction: any) => Promise<any>;
  on: (event: string, callback: () => void) => void;
  removeAllListeners: (event: string) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

interface WalletContextType {
  walletAddress: PublicKey | null;
  solBalance: number;
  isConnecting: boolean;
  isConnected: boolean;
  connection: Connection;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  getProvider: () => PhantomProvider | undefined;
  fetchBalance: (publicKey: PublicKey) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Solana connection (devnet for development - no rate limits)
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Check if Phantom is installed
  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app/", "_blank");
  };

  // Fetch SOL balance
  const fetchBalance = async (publicKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      const provider = getProvider();
      if (!provider) {
        toast.error("Phantom wallet not found! Please install Phantom.");
        setIsConnecting(false);
        return;
      }

      const response = await provider.connect();
      setWalletAddress(response.publicKey);
      await fetchBalance(response.publicKey);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      const provider = getProvider();
      if (provider) {
        await provider.disconnect();
      }
      setWalletAddress(null);
      setSolBalance(0);
      toast.info("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  // Listen for wallet changes
  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.on("accountChanged", () => {
        if (provider.publicKey) {
          setWalletAddress(provider.publicKey);
          fetchBalance(provider.publicKey);
        } else {
          setWalletAddress(null);
          setSolBalance(0);
        }
      });

      // Check if already connected
      if (provider.publicKey) {
        setWalletAddress(provider.publicKey);
        fetchBalance(provider.publicKey);
      }
    }

    return () => {
      if (provider) {
        provider.removeAllListeners("accountChanged");
      }
    };
  }, []);

  const value: WalletContextType = {
    walletAddress,
    solBalance,
    isConnecting,
    isConnected: walletAddress !== null,
    connection,
    connectWallet,
    disconnectWallet,
    getProvider,
    fetchBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}