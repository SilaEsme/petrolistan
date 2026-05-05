import { describe, it, expect } from 'vitest'
import { provinceSlugToCode, provinceCodeToSlug, PROVINCES } from './provinces'

const ASCII_ONLY = /^[a-z0-9-]+$/
const TURKISH_CHARS = /[ıüşğçöİÜŞĞÇÖ]/

describe('provinceSlugToCode', () => {
  it('contains exactly 81 entries', () => {
    expect(Object.keys(provinceSlugToCode)).toHaveLength(81)
  })

  it('every slug is ASCII-only (no Turkish characters)', () => {
    for (const slug of Object.keys(provinceSlugToCode)) {
      expect(slug, `slug "${slug}" must be ASCII-only`).toMatch(ASCII_ONLY)
      expect(slug, `slug "${slug}" must not contain Turkish characters`).not.toMatch(TURKISH_CHARS)
    }
  })

  it('every code is a unique integer between 1 and 81', () => {
    const codes = Object.values(provinceSlugToCode)
    expect(codes).toHaveLength(81)
    expect(new Set(codes).size).toBe(81)
    for (const code of codes) {
      expect(Number.isInteger(code)).toBe(true)
      expect(code).toBeGreaterThanOrEqual(1)
      expect(code).toBeLessThanOrEqual(81)
    }
  })

  it('contains expected canonical slugs', () => {
    expect(provinceSlugToCode['istanbul']).toBe(34)
    expect(provinceSlugToCode['ankara']).toBe(6)
    expect(provinceSlugToCode['izmir']).toBe(35)
    expect(provinceSlugToCode['sanliurfa']).toBe(63)
  })
})

describe('provinceCodeToSlug', () => {
  it('is the inverse of provinceSlugToCode', () => {
    for (const [slug, code] of Object.entries(provinceSlugToCode)) {
      expect(provinceCodeToSlug[code]).toBe(slug)
    }
  })

  it('has 81 entries', () => {
    expect(Object.keys(provinceCodeToSlug)).toHaveLength(81)
  })
})

describe('PROVINCES (display names)', () => {
  it('has exactly 81 entries', () => {
    expect(Object.keys(PROVINCES)).toHaveLength(81)
  })

  it('every entry has a non-empty name', () => {
    for (const [code, name] of Object.entries(PROVINCES)) {
      expect(name, `province ${code} must have a non-empty name`).toBeTruthy()
      expect(name.trim().length).toBeGreaterThan(0)
    }
  })

  it('keys are zero-padded codes 01-81', () => {
    const codes = Object.keys(PROVINCES)
    for (const code of codes) {
      expect(code).toMatch(/^\d{2}$/)
      const n = parseInt(code, 10)
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(81)
    }
  })
})
