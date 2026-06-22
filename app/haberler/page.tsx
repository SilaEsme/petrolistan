import type { Metadata } from 'next';
import type { NewsItem } from '@/types';
import HaberlerClient from './HaberlerClient';

export const metadata: Metadata = {
  title: 'Enerji & Petrol Haberleri | Petrolistan',
  description:
    'Güncel petrol, doğalgaz ve akaryakıt haberleri. OPEC+, Türkiye enerji piyasası ve küresel enerji gelişmeleri.',
  alternates: { canonical: 'https://petrolistan.com/haberler' },
};

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080';
    const res = await fetch(`${goUrl}/news`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function HaberlerPage() {
  const news = await fetchNews();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Haberler</h1>
      <HaberlerClient initialNews={news} />
    </main>
  );
}
