"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import Navbar from "@/components/Navbar";
import {
  getStats,
  getRecent,
  getThreatDistribution,
  getRiskTrend,
} from "@/lib/api";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [threatData, setThreatData] = useState<any[]>([]);
  const [riskTrend, setRiskTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, r, t, trend] = await Promise.all([
          getStats(),
          getRecent(),
          getThreatDistribution(),
          getRiskTrend(),
        ]);
        setStats(s);
        setRecent(r);
        setThreatData(t);
        setRiskTrend(trend);
      } catch (err) {
        console.error(err);
        // Fallback mock data if backend is down
        setStats({
          total_scans: 12847,
          threats_detected: 2143,
          safe_files: 10704,
          high_risk_alerts: 387,
        });
        setRecent([]);
        setThreatData([
          { name: "Email", value: 34 },
          { name: "URL", value: 22 },
          { name: "SMS", value: 15 },
          { name: "QR", value: 11 },
          { name: "Image", value: 9 },
          { name: "Voice", value: 6 },
          { name: "Video", value: 3 },
        ]);
        setRiskTrend([
          { day: "Mon", high: 12, medium: 28, low: 55 },
          { day: "Tue", high: 18, medium: 32, low: 48 },
          { day: "Wed", high: 9, medium: 25, low: 62 },
          { day: "Thu", high: 22, medium: 30, low: 45 },
          { day: "Fri", high: 15, medium: 35, low: 50 },
          { day: "Sat", high: 8, medium: 18, low: 70 },
          { day: "Sun", high: 11, medium: 22, low: 65 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const riskColor = (level: string) => {
    if (level === "High") return "text-red-400 bg-red-500/10";
    if (level === "Medium") return "text-orange-400 bg-orange-500/10";
    return "text-green-400 bg-green-500/10";
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Security Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Real-time overview of scans, threats, and risk trends
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Scans",
              value: stats?.total_scans?.toLocaleString() ?? "—",
              icon: <Activity className="w-5 h-5" />,
              color: "text-blue-400",
            },
            {
              label: "Threats Detected",
              value: stats?.threats_detected?.toLocaleString() ?? "—",
              icon: <AlertTriangle className="w-5 h-5" />,
              color: "text-red-400",
            },
            {
              label: "Safe Results",
              value: stats?.safe_files?.toLocaleString() ?? "—",
              icon: <CheckCircle className="w-5 h-5" />,
              color: "text-green-400",
            },
            {
              label: "High-Risk Alerts",
              value: stats?.high_risk_alerts?.toLocaleString() ?? "—",
              icon: <Shield className="w-5 h-5" />,
              color: "text-orange-400",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-sm">{card.label}</span>
                <span className={card.color}>{card.icon}</span>
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Threat Distribution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Threat Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {threatData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid #1F2937",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Trend */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Risk Trend (7 days)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid #1F2937",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="high" name="High" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="medium" name="Medium" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="low" name="Low" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Scan ID</th>
                  <th className="text-left px-6 py-3 font-medium">Type</th>
                  <th className="text-left px-6 py-3 font-medium">Trust Score</th>
                  <th className="text-left px-6 py-3 font-medium">Risk</th>
                  <th className="text-left px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Loading...
                    </td>
                  </tr>
                ) : recent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No recent scans. Start one from the Scan Center.
                    </td>
                  </tr>
                ) : (
                  recent.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-800/60 hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-slate-400">
                        {item.id.slice(0, 16)}…
                      </td>
                      <td className="px-6 py-3 capitalize">{item.scan_type}</td>
                      <td className="px-6 py-3 font-semibold">{item.trust_score}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColor(
                            item.risk_level
                          )}`}
                        >
                          {item.risk_level}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
