'use client';

import './globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GlobalContextProvider } from '@/contexts/AppContext';
import ReactQueryPvorider from '@/contexts/ReactQueryPvorider';
import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ReactQueryPvorider>
          <SessionProvider>
            <ThemeProvider>
              <AuthProvider>
                <GlobalContextProvider>
                  <div className="layout">
                    <Header />
                    <main className="main">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </GlobalContextProvider>
              </AuthProvider>
            </ThemeProvider>
          </SessionProvider>
        </ReactQueryPvorider>
      </body>
    </html>
  );
}
