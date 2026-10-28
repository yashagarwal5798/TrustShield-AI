import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrustShield AI – Digital Scam & Deepfake Detection",
  description:
    "AI-powered platform to detect deepfakes, phishing, malicious QR codes, cloned voices and scam messages. Get a clear Digital Trust Score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0B1120] text-slate-100">
        {children}
      </body>
    </html>
  );
}
