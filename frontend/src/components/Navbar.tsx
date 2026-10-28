"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/scan", label: "Scan Center" },
  ];

  return (
    <nav className="border-b border-slate-800/60 bg-[#0B1120]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Shield className="w-7 h-7 text-blue-500" />
          <span>TrustShield AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/scan"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Start Scan
        </Link>
      </div>
    </nav>
  );
}
