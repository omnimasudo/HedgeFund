import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanda AI | Data Heavy Terminal",
  description: "Institutional-grade AI-powered analysis system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❇️</text></svg>" />
      </head>
      {/* Menggunakan font Inter sebagai default (font-sans) */}
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-full antialiased bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}