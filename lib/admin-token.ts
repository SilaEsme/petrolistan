const MAX_AGE_MS = 24 * 60 * 60 * 1000
const enc = new TextEncoder()

function getSecret(): string {
  const s = process.env.ADMIN_SECRET
  if (!s) throw new Error('ADMIN_SECRET env var not set')
  return s
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBytes(hex: string): ArrayBuffer {
  const arr = new Uint8Array(hex.length / 2)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return arr.buffer as ArrayBuffer
}

export async function signToken(): Promise<string> {
  const ts = String(Date.now())
  const key = await getKey()
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(ts))
  return `${ts}.${bytesToHex(sig)}`
}

export async function verifyToken(token: string): Promise<boolean> {
  const dot = token.indexOf('.')
  if (dot === -1) return false
  const ts = token.slice(0, dot)
  const mac = token.slice(dot + 1)
  if (!ts || !mac || mac.length !== 64) return false

  try {
    const key = await getKey()
    const valid = await crypto.subtle.verify('HMAC', key, hexToBytes(mac), enc.encode(ts))
    if (!valid) return false
    const age = Date.now() - parseInt(ts, 10)
    return age > 0 && age < MAX_AGE_MS
  } catch {
    return false
  }
}
