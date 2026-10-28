"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface ScanResult {
  id: string;
  scan_type: string;
  trust_score: number;
  risk_level: string;
  confidence: number;
  explanation: string;
  recommendations: string[];
  timestamp: string;
  details: {
    signals_checked: number;
    model_version: string;
    processing_ms: number;
    engines?: string[];
  };
}

export default function ResultsPage() {
  const [result, setResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastScanResult");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        setResult(null);
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0B1120]">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No scan result found</h1>
          <p className="text-slate-400 mb-8">
            Run a scan from the Scan Center to see results here.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-medium transition"
          >
            Go to Scan Center
          </Link>
        </main>
      </div>
    );
  }

  const scoreColor =
    result.trust_score >= 75
      ? "text-green-400"
      : result.trust_score >= 50
      ? "text-orange-400"
      : "text-red-400";

  const riskBadge =
    result.risk_level === "High"
      ? "bg-red-500/15 text-red-400 border-red-500/30"
      : result.risk_level === "Medium"
      ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
      : "bg-green-500/15 text-green-400 border-green-500/30";

  const RiskIcon =
    result.risk_level === "High"
      ? AlertTriangle
      : result.risk_level === "Medium"
      ? Info
      : CheckCircle;

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Scan Center
        </Link>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1 capitalize">
                  {result.scan_type} Scan Result
                </p>
                <h1 className="text-xl font-bold font-mono">{result.id}</h1>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${riskBadge}`}
              >
                <RiskIcon className="w-4 h-4" />
                {result.risk_level} Risk
              </span>
            </div>
          </div>

          {/* Trust Score */}
          <div className="p-6 sm:p-8 text-center border-b border-slate-800">
            <p className="text-slate-400 text-sm mb-2">Digital Trust Score</p>
            <div className={`text-6xl sm:text-7xl font-bold ${scoreColor}`}>
              {result.trust_score}
            </div>
            <p className="text-slate-500 mt-2">
              Confidence: {(result.confidence * 100).toFixed(0)}%
            </p>

            {/* Score bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.trust_score >= 75
                      ? "bg-green-500"
                      : result.trust_score >= 50
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.trust_score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="p-6 sm:p-8 border-b border-slate-800">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              AI Explanation
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              {result.explanation}
            </p>
          </div>

          {/* Recommendations */}
          <div className="p-6 sm:p-8 border-b border-slate-800">
            <h2 className="font-semibold mb-4">Recommended Actions</h2>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-xs font-medium shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical details */}
          <div className="p-6 sm:p-8 bg-slate-900/40">
            <h2 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">
              Technical Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Signals Checked</p>
                <p className="font-medium">{result.details.signals_checked}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Processing Time</p>
                <p className="font-medium">{result.details.processing_ms} ms</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Model Version</p>
                <p className="font-medium font-mono text-xs">
                  {result.details.model_version}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Timestamp</p>
                <p className="font-medium text-xs">
                  {new Date(result.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-medium transition"
          >
            <RefreshCw className="w-4 h-4" />
            Run Another Scan
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl font-medium transition"
          >
            View Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
