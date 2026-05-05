import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetcher, usePrices, usePriceHistory, useNews, useFuelBrands } from './api'

describe('lib/api exports', () => {
  it('exports fetcher as a function', () => {
    expect(typeof fetcher).toBe('function')
  })

  it('exports usePrices hook', () => {
    expect(typeof usePrices).toBe('function')
  })

  it('exports usePriceHistory hook', () => {
    expect(typeof usePriceHistory).toBe('function')
  })

  it('exports useNews hook', () => {
    expect(typeof useNews).toBe('function')
  })

  it('exports useFuelBrands hook', () => {
    expect(typeof useFuelBrands).toBe('function')
  })
})

describe('fetcher', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('returns parsed JSON on a successful response', async () => {
    const payload = { data: [{ id: 1 }], updatedAt: '2026-05-05' }
    ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(payload),
    })

    const result = await fetcher('/api/prices')
    expect(result).toEqual(payload)
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/prices')
  })

  it('throws an error containing the status code when response is not ok', async () => {
    ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 503,
      json: () => Promise.resolve({}),
    })

    await expect(fetcher('/api/prices')).rejects.toThrow(/503/)
  })
})
