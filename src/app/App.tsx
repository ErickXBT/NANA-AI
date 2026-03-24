import '../polyfills';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WalletProvider } from './context/wallet-context';

export default function App() {
  return (
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  );
}