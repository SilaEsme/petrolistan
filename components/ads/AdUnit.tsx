'use client';
import { useEffect } from 'react';

// Slot ID'leri AdSense panelinden alın: Reklamlar > Reklam Birimi > Yeni reklam birimi
// .env.local (ve sunucu .env'inde) şu değişkenleri doldurun:
//   NEXT_PUBLIC_ADSENSE_SLOT_INLINE   ← 300×250 dikdörtgen
//   NEXT_PUBLIC_ADSENSE_SLOT_TOP      ← 728×90 yatay banner
//   NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM   ← sayfa sonu
// Boş bırakıldığında AdUnit hiçbir şey render etmez.
export const AD_SLOTS = {
  /** Makale içi dikdörtgen (300×250) */
  articleInContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE ?? '',
  /** Sayfa üstü yatay banner (728×90) */
  pageTop:          process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP    ?? '',
  /** Sayfa sonu otomatik */
  pageBottom:       process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM ?? '',
};

type Format = 'auto' | 'rectangle' | 'horizontal';

interface AdUnitProps {
  slot: string;
  format?: Format;
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', className }: AdUnitProps) {
  if (!slot) return null

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'ca-pub-5969246291079798';

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
