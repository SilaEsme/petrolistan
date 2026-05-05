'use client';
import { useEffect } from 'react';

// Slot ID'leri AdSense hesabınızdan alın: Reklamlar > Reklam Birimi > Yeni reklam birimi
// Onay sonrası buradaki placeholder değerleri gerçek slot ID'leriyle değiştirin.
export const AD_SLOTS = {
  /** Makale içi dikdörtgen (300×250) */
  articleInContent: 'SLOT_ARTICLE_CONTENT',
  /** Sayfa üstü yatay banner (728×90) */
  pageTop: 'SLOT_PAGE_TOP',
  /** Sayfa sonu otomatik */
  pageBottom: 'SLOT_PAGE_BOTTOM',
};

type Format = 'auto' | 'rectangle' | 'horizontal';

interface AdUnitProps {
  slot: string;
  format?: Format;
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', className }: AdUnitProps) {
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
