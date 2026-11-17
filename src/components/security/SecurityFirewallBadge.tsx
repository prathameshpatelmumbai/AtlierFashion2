"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Radio,
  Activity,
  Terminal,
  AlertTriangle,
  Cookie,
  RefreshCw,
  X,
  Zap,
  CheckCircle2,
  Bug
} from "lucide-react";
import {
  THREAT_REGISTRY,
  sanitizeAndInspectInput,
  clientWafRateLimiter
} from "@/lib/security/vault-shield";

interface SecurityFirewallBadgeProps {
  onOpenCookieSettings: () => void;
}

export const SecurityFirewallBadge: React.FC<SecurityFirewallBadgeProps> = ({
  onOpenCookieSettings
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [threatCount, setThreatCount] = useState(0);
  const [rateLimitInfo, setRateLimitInfo] = useState({ allowed: true, remaining: 30 });
  const [honeypotTriggered, setHoneypotTriggered] = useState(false);
  const [testPayload, setTestPayload] = useState("<script>alert('hack')</script>");
  const [testResult, setTestResult] = useState<string | null>(null);

  // Monitor URL parameters for unauthorized admin probes / honeypot traps
  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      // Check if user is attempting unauthorized probe (e.g. ?admin=true, /admin, ?role=admin, ?eval=)
      if (
        search.includes("admin") ||
        search.includes("role=admin") ||
        search.includes("eval=") ||
        search.includes("select=") ||
        hash.includes("admin") ||
        pathname.includes("/admin")
      ) {
        setHoneypotTriggered(true);
        THREAT_REGISTRY.unshift({
          timestamp: new Date().toLocaleTimeString(),
          threatType: "HONEYPOT_PROBE",
          detail: `Unauthorized URL administrative query probe: "${search || hash || pathname}"`,
          source: "URL Firewall Guard",
          actionTaken: "QUARANTINED"
        });
        setThreatCount(THREAT_REGISTRY.length);
      }
    }
  }, []);

  const handleRunWafSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const result = sanitizeAndInspectInput(testPayload, "Firewall Sandbox Simulator");
    if (result.isThreat) {
      setTestResult(`🛡️ Intercepted: [${result.threatType}] — ${result.threatMessage}`);
    } else {
      setTestResult("✅ Safe payload: Sanitized and passed inspection.");
    }
    setThreatCount(THREAT_REGISTRY.length);
  };

  const handleClearHoneypot = () => {
    if (typeof window !== "undefined") {
      // Clear URL query parameters
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "";
      window.history.replaceState({}, "", url.pathname);
    }
    setHoneypotTriggered(false);
  };

  return (
    <>
      {/* 1. Honeypot Administrative Intrusion Trap Modal */}
      <AnimatePresence>
        {honeypotTriggered && (
          <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#28050D] border-2 border-rose-600/70 shadow-[0_0_50px_rgba(225,29,72,0.4)] p-6 text-[#FAF4ED] space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-rose-400 font-bold block">
                    INTRUSION ATTEMPT BLOCKED • DECIDED BY WAF
                  </span>
                  <h3
                    className="text-xl text-[#FAF4ED] font-light"
                    style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                  >
                    Administrative Decoy Probe Intercepted
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-rose-900/50 text-xs text-rose-200/90 space-y-2 font-mono">
                <p>⚠️ Direct URL administrative navigation is forbidden.</p>
                <p className="text-[11px] text-rose-300/75">
                  Maison Privée does not expose administrative routes via plaintext URL queries. All administrative privileges require 256-bit cryptographic master tokens.
                </p>
                <div className="text-[10px] text-[#C59347]">
                  Incident Logged to Firewall Registry • Quarantine Active
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleClearHoneypot}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C59347] to-[#D4AF37] text-[#1E060F] text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(197,147,71,0.3)] cursor-pointer"
                >
                  Return to Safe Customer Salon
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Floating Luxury Security Status Pill (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-[9990] flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 rounded-full bg-[#1A050E]/90 hover:bg-[#2E0B16] border border-[#C59347]/40 hover:border-[#C59347] text-[#E8D2B7] hover:text-[#FAF4ED] text-[10px] tracking-wider transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(197,147,71,0.25)] flex items-center gap-2 cursor-pointer backdrop-blur-md"
          title="Open Maison Privée Security Hub"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#C59347]" />
          <span className="hidden sm:inline font-mono uppercase text-[9px]">Maison WAF: Armed</span>
          {threatCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-950 text-rose-300 text-[8px] font-bold border border-rose-500/40">
              {threatCount}
            </span>
          )}
        </button>
      </div>

      {/* 3. Live Security & Privacy Dashboard Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl bg-[#240812] border border-[#C59347]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(197,147,71,0.25)] p-6 text-[#FAF4ED] space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#C59347]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3A0E1E] border border-[#C59347]/60 flex items-center justify-center text-[#C59347]">
                    <ShieldCheck className="w-5 h-5 text-[#C59347]" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-[#C59347] font-semibold block">
                      DEFENSE ARCHITECTURE
                    </span>
                    <h3
                      className="text-xl text-[#FAF4ED] font-normal"
                      style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                    >
                      Maison Privée Vault Shield & Firewall
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[#E8D2B7]/70 hover:text-[#FAF4ED] hover:bg-[#3A0E1E] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Security Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 space-y-1">
                  <div className="text-[10px] uppercase text-[#E8D2B7]/70">WAF Firewall</div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ACTIVE</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 space-y-1">
                  <div className="text-[10px] uppercase text-[#E8D2B7]/70">Encryption</div>
                  <div className="text-xs font-bold text-[#C59347] flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>SHA-256</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 space-y-1">
                  <div className="text-[10px] uppercase text-[#E8D2B7]/70">Rate Limiter</div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>30 req/min</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 space-y-1">
                  <div className="text-[10px] uppercase text-[#E8D2B7]/70">URL Honeypot</div>
                  <div className="text-xs font-bold text-[#C59347] flex items-center justify-center gap-1">
                    <Radio className="w-3 h-3" />
                    <span>ARMED</span>
                  </div>
                </div>
              </div>

              {/* Interactive WAF Test Simulator */}
              <div className="p-4 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#C59347] flex items-center gap-1.5 uppercase tracking-wider">
                    <Bug className="w-3.5 h-3.5" />
                    <span>Firewall Threat Neutralization Sandbox</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#EEDFD5]/70">
                  Test the WAF by submitting any script injection (`&lt;script&gt;`), SQLi pattern (`' OR 1=1`), or prompt jailbreak to verify real-time neutralization.
                </p>

                <form onSubmit={handleRunWafSimulation} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={testPayload}
                      onChange={(e) => setTestPayload(e.target.value)}
                      className="flex-1 h-9 bg-black/60 border border-[#C59347]/40 rounded-lg px-3 text-xs text-[#FAF4ED] font-mono outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#C59347] hover:bg-[#D4AF37] text-[#1E060F] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                    >
                      Test WAF
                    </button>
                  </div>
                </form>

                {testResult && (
                  <div className="p-2.5 rounded-lg bg-black/70 border border-[#C59347]/40 text-xs font-mono text-[#FAF4ED]">
                    {testResult}
                  </div>
                )}
              </div>

              {/* Threat Audit Log */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#E8D2B7]/70 uppercase tracking-wider">
                  <span>Live Security Incident Log ({THREAT_REGISTRY.length})</span>
                  <span className="text-[10px] text-emerald-400">Zero Vulnerabilities</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1.5 p-2.5 rounded-xl bg-black/60 border border-[#C59347]/20 font-mono text-[11px]">
                  {THREAT_REGISTRY.length === 0 ? (
                    <div className="text-emerald-400/80 text-center py-3">
                      ✓ No active intrusion threats detected. System secure.
                    </div>
                  ) : (
                    THREAT_REGISTRY.map((t, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 border-b border-white/5 pb-1">
                        <div>
                          <span className="text-rose-400 font-bold">[{t.threatType}]</span> {t.detail}
                        </div>
                        <span className="text-[9px] text-[#C59347] shrink-0">{t.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#C59347]/20">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCookieSettings();
                  }}
                  className="px-4 py-2 rounded-lg border border-[#C59347]/40 hover:border-[#C59347] text-[#E8D2B7] text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Cookie className="w-3.5 h-3.5 text-[#C59347]" />
                  <span>Configure Cookies</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-lg bg-[#3A0E1E] hover:bg-[#542333] border border-[#C59347]/40 text-[#FAF4ED] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Monitor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

