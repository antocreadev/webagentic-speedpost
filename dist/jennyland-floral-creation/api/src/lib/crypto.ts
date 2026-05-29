// Web Crypto helpers — runs on Cloudflare Workers without any native deps.

const PBKDF2_ITERATIONS = 200_000;
const KEY_LEN_BYTES = 32;
const SALT_LEN_BYTES = 16;

const enc = new TextEncoder();
const dec = new TextDecoder();

export function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin);
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function randomBytes(len: number): Uint8Array {
  const out = new Uint8Array(len);
  crypto.getRandomValues(out);
  return out;
}

export function randomToken(len = 32): string {
  return bytesToBase64(randomBytes(len)).replace(/[^A-Za-z0-9]/g, "").slice(0, len);
}

export function generateReference(): string {
  // JL-YYMM-XXXXX
  const now = new Date();
  const yy = now.getUTCFullYear().toString().slice(-2);
  const mm = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const code = randomToken(5).toUpperCase();
  return `JL-${yy}${mm}-${code}`;
}

export async function pbkdf2(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LEN_BYTES * 8
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = randomBytes(SALT_LEN_BYTES);
  const hash = await pbkdf2(password, salt);
  return { hash: bytesToBase64(hash), salt: bytesToBase64(salt) };
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string
): Promise<boolean> {
  const salt = base64ToBytes(storedSalt);
  const hash = await pbkdf2(password, salt);
  const expected = base64ToBytes(storedHash);
  if (hash.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash[i]! ^ expected[i]!;
  return diff === 0;
}

// Tiny JWT (HS256) implementation — avoid pulling jose as the api worker stays lean.
function b64urlEncode(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  return base64ToBytes(padded);
}

export async function signJWT(payload: Record<string, unknown>, secret: string, expiresInSec = 60 * 60 * 24 * 7): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { iat: now, exp: now + expiresInSec, ...payload };

  const headerB64 = b64urlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = b64urlEncode(enc.encode(JSON.stringify(fullPayload)));
  const data = `${headerB64}.${payloadB64}`;

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return `${data}.${b64urlEncode(new Uint8Array(sig))}`;
}

export async function verifyJWT<T = unknown>(token: string, secret: string): Promise<T | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts as [string, string, string];
  const data = `${headerB64}.${payloadB64}`;

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const ok = await crypto.subtle.verify("HMAC", key, b64urlDecode(sigB64), enc.encode(data));
  if (!ok) return null;

  try {
    const payload = JSON.parse(dec.decode(b64urlDecode(payloadB64)));
    if (typeof payload === "object" && payload && typeof payload.exp === "number") {
      if (Date.now() / 1000 > payload.exp) return null;
    }
    return payload as T;
  } catch {
    return null;
  }
}
