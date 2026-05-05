interface Props {
  title: string;
  description: string;
  datePublished: string; // ISO 8601, örn. "2026-04-16"
  url: string;
}

export function ArticleSchema({ title, description, datePublished, url }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    url,
    author: {
      '@type': 'Organization',
      name: 'Petrolistan Editöryal',
      url: 'https://petrolistan.com/hakkimizda',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Petrolistan',
      url: 'https://petrolistan.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://petrolistan.com/favicon.ico',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
