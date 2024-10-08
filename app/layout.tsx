"use client";

import "./globals.scss";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToasterProvider } from "@/components/ui/toaster-provider";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToasterProvider />
          <ThemeProvider>
            <div className="layout">
              <Header />
              <main className="main">{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
