import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "admin@farelsatrio.com";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "AdminSecure2026!";
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "antigravity-secret-key-change-this-in-production"
  );
}

/**
 * Validates admin email & password against environment variables.
 */
export function verifyCredentials(email: string, password: string): boolean {
  const expectedEmail = getAdminEmail().toLowerCase().trim();
  const expectedPassword = getAdminPassword();

  const inputEmail = email.toLowerCase().trim();
  return inputEmail === expectedEmail && password === expectedPassword;
}

/**
 * Creates an HMAC SHA-256 signed session token.
 */
export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = JSON.stringify({ email, exp: expiresAt });
  const base64Payload = Buffer.from(payload).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(base64Payload)
    .digest("base64url");

  return `${base64Payload}.${signature}`;
}

/**
 * Verifies HMAC SHA-256 signature and expiration timestamp of session token.
 */
export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes(".")) return false;

  try {
    const [base64Payload, signature] = token.split(".");
    const expectedSignature = crypto
      .createHmac("sha256", getSessionSecret())
      .update(base64Payload)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return false;
    }

    const payloadJson = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() > payload.exp) {
      return false; // Expired
    }

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Helper to check if request or cookies header contains a valid admin session.
 */
export async function isAuthenticated(request?: NextRequest | Request): Promise<boolean> {
  let token: string | undefined;

  if (request) {
    // Try header cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
      if (match) {
        token = match[1];
      }
    }
  }

  // Fallback to Next.js cookies() helper if available
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    } catch (e) {
      // ignore
    }
  }

  if (!token) return false;
  return verifySessionToken(token);
}

/**
 * Sets HTTP-Only admin_session cookie on a NextResponse object.
 */
export function setSessionCookie(response: NextResponse, email: string): void {
  const token = createSessionToken(email);
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

/**
 * Clears admin_session cookie on a NextResponse object.
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}
