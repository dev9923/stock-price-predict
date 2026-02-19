import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'StockSage Pro | AI-Powered Banking Stock Predictions',
  description: 'Advanced AI-powered banking stock predictions with live market data, smart trading signals, and professional forecasting tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
