export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeoutMs?: number; next?: { revalidate?: number } } = {}
): Promise<Response> {
  const { timeoutMs = 8000, ...fetchOptions } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}
