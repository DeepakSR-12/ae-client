"use client";

import "./globals.scss";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="layout">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
