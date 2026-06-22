'use client';

import { useState } from 'react';
import type { NewsItem } from '@/types';
import NewsList from '@/components/news/NewsList';

const CATEGORIES = ['Tümü', 'OPEC+', 'TÜRKİYE', 'ANALİZ', 'PAZAR', 'DÜNYA'];

interface Props {
  initialNews: NewsItem[];
}

export default function HaberlerClient({ initialNews }: Props) {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered =
    activeCategory === 'Tümü'
      ? initialNews
      : initialNews.filter((n) => n.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? 'bg-[#0C447C] text-white'
                : 'bg-white dark:bg-[#0F1829] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <NewsList items={filtered} isLoading={false} />
    </>
  );
}
