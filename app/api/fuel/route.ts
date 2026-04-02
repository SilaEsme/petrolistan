export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  // Başlangıç için sabit EPDK verileri
  // (Go backend + gerçek scraping Faz 2'de gelecek)
  const data = [
    { name: 'Motorin', value: 68.05, unit: '₺/L', change: 0, barPercent: 76, source: 'EPDK' },
    { name: 'Benzin 95', value: 72.40, unit: '₺/L', change: 0, barPercent: 81, source: 'EPDK' },
    { name: 'LPG otogaz', value: 34.20, unit: '₺/L', change: 0, barPercent: 38, source: 'EPDK' },
    { name: 'Kalorifer', value: 62.80, unit: '₺/L', change: 0, barPercent: 70, source: 'EPDK' },
  ]

  return NextResponse.json(
    { data, updatedAt: new Date().toISOString(), note: 'EPDK haftalık veri' },
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  )
}
