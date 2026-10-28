"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Image,
  Video,
  Mic,
  Globe,
  Mail,
  MessageSquare,
  QrCode,
  Upload,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { performScan } from "@/lib/api";

const SCAN_TYPES = [
  {
    id: "image",
    label: "Image Scan",
    description: "Detect deepfake images and manipulated photos",
    icon: Image,
    accepts: "image/*",
    needsFile: true,
  },
  {
    id: "video",
    label: "Video Scan",
    description: "Analyze videos for deepfake artifacts and sync issues",
    icon: Video,
    accepts: "video/*",
    needsFile: true,
  },
  {
    id: "voice",
    label: "Voice Scan",
    description: "Detect AI-cloned or synthetic voice audio",
    icon: Mic,
    accepts: "audio/*",
    needsFile: true,
  },
  {
    id: "url",
    label: "Website URL",
    description: "Check domain reputation, redirects and phishing signals",
    icon: Globe,
    needsFile: false,
    placeholder: "https://example.com",
  },
  {
    id: "email",
    label: "Email Content",
    description: "Analyze email body for social engineering & phishing",
    icon: Mail,
    needsFile: false,
    placeholder: "Paste the full email content here...",
    multiline: true,
  },
  {
    id: "sms",
    label: "SMS Message",
    description: "Scan text messages for scam patterns and malicious links",
    icon: MessageSquare,
    needsFile: false,
    placeholder: "Paste the SMS text here...",
  },
  {
    id: "qr",
    label: "QR Code",
    description: "Decode QR and check destination for threats",
    icon: QrCode,
    accepts: "image/*",
    needsFile: true,
  },
];

export default function ScanPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = SCAN_TYPES.find((t) => t.id === selected);

  async function handleScan() {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("scan_type", selected);

      if (current?.needsFile && file) {
        formData.append("file", file);
      } else if (content) {
        if (selected === "url") {
          formData.append("url", content);
        } else {
          formData.append("content", content);
        }
      }

      const result = await performScan(formData);

      // Store result in sessionStorage for the results page
      sessionStorage.setItem("lastScanResult", JSON.stringify(result));
      router.push("/results");
    } catch (err: any) {
      setError(err.message || "Scan failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Scan Center</h1>
          <p className="text-slate-400 mt-1">
            Choose a content type and run a Digital Trust analysis
          </p>
        </div>

        {/* Scan type grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {SCAN_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = selected === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setSelected(type.id);
                  setContent("");
                  setFile(null);
                  setError(null);
                }}
                className={`text-left p-5 rounded-2xl border transition ${
                  isActive
                    ? "bg-blue-600/15 border-blue-500/50 ring-1 ring-blue-500/30"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-600"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    isActive ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">{type.label}</h3>
                <p className="text-sm text-slate-400 leading-snug">
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Input panel */}
        {current && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl">
            <h2 className="text-lg font-semibold mb-1">{current.label}</h2>
            <p className="text-slate-400 text-sm mb-6">{current.description}</p>

            {current.needsFile ? (
              <div className="mb-6">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500/50 transition bg-slate-900/30">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-400">
                      {file ? file.name : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {current.accepts}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={current.accepts}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            ) : (
              <div className="mb-6">
                {current.multiline ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={current.placeholder}
                    rows={6}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={current.placeholder}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                )}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleScan}
              disabled={
                loading ||
                (current.needsFile ? !file : !content.trim())
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Run Trust Analysis
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
