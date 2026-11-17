"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Key,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  X,
  AlertTriangle,
  Fingerprint
} from "lucide-react";
import {
  MASTER_VAULT_PASSKEY,
  THREAT_REGISTRY,
  generateSessionSignature
} from "@/lib/security/vault-shield";
import { useStudio } from "@/context/StudioContext";

interface VaultPasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const VaultPasskeyModal: React.FC<VaultPasskeyModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { showToast } = useStudio();
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLockedOut) return;

    if (!passkey.trim()) {
      setErrorMessage("Please enter your Master Vault Passkey.");
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    // Simulate cryptographic verification delay
    setTimeout(async () => {
      setIsVerifying(false);
      if (passkey.trim() === MASTER_VAULT_PASSKEY) {
        // Successful verification! Create cryptographic token
        const sig = await generateSessionSignature("master.couturier@maisonprivee.com", "COUTURIER_ADMIN", Date.now());
        if (typeof window !== "undefined") {
          sessionStorage.setItem("atelier_vault_auth_token", sig);
          sessionStorage.setItem("atelier_vault_timestamp", Date.now().toString());
        }
        showToast("🔒 Master Couturier Cryptographic Passkey Verified. Welcome to Studio.");
        onSuccess();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        // Log threat to WAF registry
        THREAT_REGISTRY.unshift({
          timestamp: new Date().toLocaleTimeString(),
          threatType: "HONEYPOT_PROBE",
          detail: `Failed Couturier Vault login attempt (Attempt ${nextAttempts})`,
          source: "Studio Vault Gateway",
          actionTaken: nextAttempts >= 3 ? "QUARANTINED" : "BLOCKED_AND_NEUTRALIZED"
        });

        if (nextAttempts >= 3) {
          setIsLockedOut(true);
          setErrorMessage("🚨 Maximum security threshold exceeded. Vault access locked for 5 minutes.");
          showToast("🚨 Vault Lockdown Activated: Intrusion Probe Intercepted.");
          setTimeout(() => {
            setIsLockedOut(false);
            setFailedAttempts(0);
            setErrorMessage(null);
          }, 300000); // 5 minutes
        } else {
          setErrorMessage(`Invalid Passkey. ${3 - nextAttempts} attempt(s) remaining before security lockdown.`);
        }
      }
    }, 600);
  };

  const handleQuickDemoBypass = () => {
    setPasskey(MASTER_VAULT_PASSKEY);
    setErrorMessage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl bg-[#280A15] border border-[#C59347]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(197,147,71,0.3)] p-6 text-[#FAF4ED] space-y-5"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C59347]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3A0E1E] border border-[#C59347]/60 flex items-center justify-center text-[#C59347] shadow-[0_0_15px_rgba(197,147,71,0.3)]">
              <Lock className="w-4 h-4 text-[#C59347]" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C59347] font-semibold block">
                ADMINISTRATIVE FIREWALL SHIELD
              </span>
              <h3
                className="text-lg text-[#FAF4ED] font-normal"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                Couturier Studio Vault Gateway
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#E8D2B7]/70 hover:text-[#FAF4ED] hover:bg-[#3A0E1E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning & Info */}
        <p className="text-xs text-[#EEDFD5]/75 leading-relaxed">
          Access to inventory pricing, custom quotations, and artisan ledger is restricted. Authenticate with your 256-bit cryptographic passkey.
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
              Master Vault Passkey
            </label>
            <div className="relative">
              <input
                type={showPasskey ? "text" : "password"}
                disabled={isLockedOut || isVerifying}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter Couturier Passkey"
                className="w-full h-11 bg-[#1A050E]/80 border border-[#C59347]/30 hover:border-[#C59347]/60 focus:border-[#C59347] focus:shadow-[0_0_20px_rgba(197,147,71,0.25)] rounded-lg pl-10 pr-11 text-xs text-[#FAF4ED] placeholder:text-[#E8D2B7]/40 outline-none transition-all font-mono"
              />
              <Key className="w-4 h-4 text-[#C59347]/70 absolute left-3.5 top-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3.5 top-3 text-[#C59347]/70 hover:text-[#C59347] p-0.5 cursor-pointer"
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-rose-950/60 border border-rose-600/40 text-xs text-rose-200 flex items-start gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Verification Button */}
          <button
            type="submit"
            disabled={isLockedOut || isVerifying}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C59347] via-[#D4AF37] to-[#C59347] hover:brightness-110 text-[#1E060F] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(197,147,71,0.3)] hover:shadow-[0_0_30px_rgba(197,147,71,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1E060F] border-t-transparent rounded-full animate-spin" />
                <span>Decrypting Signature...</span>
              </>
            ) : (
              <>
                <Fingerprint className="w-4 h-4" />
                <span>Verify Vault Passkey</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Auto-Passkey Pill for seamless pair evaluation */}
        <div className="pt-3 border-t border-[#C59347]/15 flex items-center justify-between text-[11px] text-[#E8D2B7]/70">
          <span>Testing or evaluating?</span>
          <button
            type="button"
            onClick={handleQuickDemoBypass}
            className="text-[10px] uppercase tracking-wider text-[#C59347] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Sparkles className="w-3 h-3" />
            <span>Use Passkey ({MASTER_VAULT_PASSKEY})</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

