"use client";

import Link from "next/link";
import {
  Shield,
  Scan,
  AlertTriangle,
  CheckCircle,
  Zap,
  Lock,
  Eye,
  MessageSquare,
  QrCode,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Scam & Deepfake Detection
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            One Platform.
            <br />
            <span className="text-blue-500">Every Digital Threat.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Detect deepfakes, phishing emails, malicious QR codes, cloned
            voices, and scam SMS in seconds. Receive a clear Digital Trust Score
            with explanations and recommended actions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scan"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              Start Free Scan
            </Link>
            <Link
              href="/dashboard"
              className="border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Scans Completed", value: "12.8K+" },
          { label: "Threats Blocked", value: "2.1K+" },
          { label: "Detection Accuracy", value: "96.4%" },
          { label: "Avg. Response", value: "< 1.2s" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Unified Protection Across All Channels
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Existing tools usually solve only one problem. TrustShield brings
          deepfake, phishing, voice, and QR protection into a single workflow.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Eye className="w-6 h-6" />,
              title: "Deepfake Detection",
              desc: "Image & video analysis for artifacts, lighting, facial geometry, and temporal consistency.",
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "Phishing & Social Engineering",
              desc: "Email and SMS scanning for urgency language, spoofed domains, and known scam patterns.",
            },
            {
              icon: <QrCode className="w-6 h-6" />,
              title: "QR & Link Safety",
              desc: "Decode and reputation-check every QR code and short link before you scan or click.",
            },
            {
              icon: <Lock className="w-6 h-6" />,
              title: "Voice Cloning Defense",
              desc: "Spectral and prosody analysis to detect AI-generated or cloned voice messages.",
            },
            {
              icon: <AlertTriangle className="w-6 h-6" />,
              title: "Digital Trust Score",
              desc: "Clear 0–100 score with risk level, confidence, and human-readable explanations.",
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: "Actionable Recommendations",
              desc: "Every scan returns concrete next steps so users know exactly what to do.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Why TrustShield AI?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300">
            <div>
              <p className="mb-4">
                AI-generated scams are rising fast — deepfake videos, cloned
                voices, sophisticated phishing, and malicious QR codes.
                Traditional tools are siloed.
              </p>
              <p>
                TrustShield unifies detection across content types and returns a
                single, explainable Digital Trust Score so anyone can make a
                confident decision in seconds.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Production-ready UI built for real security teams</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Architecture ready for real ML model integration</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Fast mock responses for demos and hackathons</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Fully responsive dark cybersecurity theme</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-3xl p-10 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to protect your organization?
          </h2>
          <p className="text-slate-400 mb-8">
            Start scanning in seconds. No credit card required for the
            prototype.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition"
          >
            <Scan className="w-5 h-5" />
            Launch Scan Center
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        TrustShield AI • Hackathon Prototype • Ready for real model integration
      </footer>
    </div>
  );
}
