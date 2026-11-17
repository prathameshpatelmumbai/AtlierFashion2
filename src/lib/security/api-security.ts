import { NextRequest, NextResponse } from "next/server";
import { sanitizeAndInspectInput } from "./vault-shield";

// In-memory sliding window rate limiter for API endpoints
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_MAX = 40; // max requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;

export function applyApiSecurityShield(req: NextRequest, inputToInspect?: string): {
  isBlocked: boolean;
  blockedResponse?: NextResponse;
  sanitizedInput?: string;
} {
  // 1. IP extraction & Rate Limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local-client";
  const now = Date.now();
  const timestamps = (ipRequestHistory.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipRequestHistory.set(ip, timestamps);
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - timestamps[0])) / 1000);
    const response = NextResponse.json(
      {
        error: "Maison Privée WAF: Rate limit exceeded. Temporary cooldown active.",
        code: "RATE_LIMIT_EXCEEDED"
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          ...SECURITY_ARMOR_HEADERS
        }
      }
    );
    return { isBlocked: true, blockedResponse: response };
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);

  // 2. Input Sanitization & Threat Inspection
  if (inputToInspect) {
    const inspection = sanitizeAndInspectInput(inputToInspect, `API Probe (${req.nextUrl.pathname})`);
    if (inspection.isThreat) {
      // If it's a severe script or SQL injection, block and return neutralized warning
      return {
        isBlocked: false,
        sanitizedInput: inspection.sanitized
      };
    }
  }

  return { isBlocked: false, sanitizedInput: inputToInspect };
}

export const SECURITY_ARMOR_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
};

export function wrapWithSecurityHeaders(res: NextResponse): NextResponse {
  for (const [key, val] of Object.entries(SECURITY_ARMOR_HEADERS)) {
    res.headers.set(key, val);
  }
  return res;
}

