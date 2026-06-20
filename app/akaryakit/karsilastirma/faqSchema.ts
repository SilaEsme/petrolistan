import type { BrandsResponse } from '@/types'

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function buildFaqSchema(cityName: string, initialData: BrandsResponse | null) {
  if (!initialData?.data) return null
  const eligible = initialData.data.filter((b) => b.brand !== 'Moil')

  const withGas = eligible.filter((b) => b.gasoline > 0).sort((a, b) => a.gasoline - b.gasoline)
  const withDiesel = eligible.filter((b) => b.diesel > 0).sort((a, b) => a.diesel - b.diesel)

  if (!withGas.length) return null

  const cheapestG = withGas[0]
  const priceyG = withGas[withGas.length - 1]
  const cheapestD = withDiesel[0]
  const priceyD = withDiesel[withDiesel.length - 1]

  const questions: { name: string; text: string }[] = [
    {
      name: `${cityName}'da benzin 95 kaç lira?`,
      text: `${cityName}'da güncel benzin 95 fiyatları ${fmt(cheapestG.gasoline)} ile ${fmt(priceyG.gasoline)} ₺/L arasındadır. En ucuz benzin ${cheapestG.brand} istasyonlarında ${fmt(cheapestG.gasoline)} ₺/L olarak uygulanmaktadır.`,
    },
  ]

  if (cheapestD && priceyD) {
    questions.push({
      name: `${cityName}'da motorin fiyatı ne kadar?`,
      text: `${cityName}'da motorin fiyatları ${fmt(cheapestD.diesel)} ile ${fmt(priceyD.diesel)} ₺/L arasında değişmektedir. En uygun motorin ${cheapestD.brand} istasyonlarında ${fmt(cheapestD.diesel)} ₺/L olarak bulunmaktadır.`,
    })
  }

  questions.push({
    name: `${cityName}'da en ucuz akaryakıt hangi markada?`,
    text: cheapestD
      ? `${cityName}'da en ucuz benzin 95 ${cheapestG.brand} (${fmt(cheapestG.gasoline)} ₺/L), en ucuz motorin ise ${cheapestD.brand} (${fmt(cheapestD.diesel)} ₺/L) istasyonlarında uygulanmaktadır. Fiyatlar saatlik güncellenmektedir.`
      : `${cityName}'da en ucuz benzin 95 ${cheapestG.brand} istasyonlarında ${fmt(cheapestG.gasoline)} ₺/L olarak uygulanmaktadır.`,
  })

  if (priceyG.brand !== cheapestG.brand) {
    const savingAmt = Math.round((priceyG.gasoline - cheapestG.gasoline) * 50)
    questions.push({
      name: `${cityName}'da doğru markayı seçersem ne kadar tasarruf ederim?`,
      text: `${cityName}'da benzin 95 için en ucuz marka (${cheapestG.brand}, ${fmt(cheapestG.gasoline)} ₺/L) ile en pahalı marka arasında ${fmt(priceyG.gasoline - cheapestG.gasoline)} ₺/L fark bulunmaktadır. 50 litrelik bir dolum için bu fark ${savingAmt.toLocaleString('tr-TR')} ₺'ye ulaşmaktadır.`,
    })
  }

  questions.push({
    name: 'Akaryakıt fiyatları ne zaman güncellenir?',
    text: 'EPDK akaryakıt tavan fiyatlarını her hafta Salı veya Çarşamba günü açıklar; yeni fiyatlar gece yarısından itibaren geçerli olur. Markalar bu tavan fiyatın altında kalmak koşuluyla kendi pompa fiyatlarını belirleyebilir. Petrolistan fiyatları saatlik olarak günceller.',
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ name, text }) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text },
    })),
  }
}
