interface Props {
  title: string;
  description: string;
  datePublished: string; // ISO 8601, örn. "2026-04-16"
  dateModified?: string; // ISO 8601
  url: string;
  articleBody?: string; // HTML or plain text
  imageUrl?: string; // Featured image URL
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  articleBody,
  imageUrl,
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    ...(dateModified && { dateModified }),
    url,
    ...(imageUrl && { image: { '@type': 'ImageObject', url: imageUrl } }),
    ...(articleBody && { articleBody }),
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
