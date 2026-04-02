export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  // Başlangıç için sabit EPDK verileri
  // (Go backend + gerçek scraping Faz 2'de gelecek)
  const data = [
    { name: 'Motorin', value: 43.85, unit: '₺/L', change: 0, barPercent: 84, source: 'EPDK' },
    { name: 'Benzin 95', value: 45.20, unit: '₺/L', change: 0, barPercent: 87, source: 'EPDK' },
    { name: 'LPG otogaz', value: 18.63, unit: '₺/L', change: 0.12, barPercent: 36, source: 'EPDK' },
    { name: 'Kalorifer', value: 40.10, unit: '₺/L', change: 0, barPercent: 77, source: 'EPDK' },
  ]

  return NextResponse.json(
    { data, updatedAt: new Date().toISOString(), note: 'EPDK haftalık veri' },
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  )
}
