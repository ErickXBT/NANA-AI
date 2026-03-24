import { Buffer } from 'buffer/';

// Make Buffer available globally for Solana libraries
(window as any).Buffer = Buffer;
(globalThis as any).Buffer = Buffer;
(global as any).Buffer = Buffer;

export {};
