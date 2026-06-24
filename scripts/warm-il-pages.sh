#!/usr/bin/env bash
# Deploy sonrası 81 il karşılaştırma sayfasının ISR cache'ini ısıtır.
# Repo kökünden çalıştır (lib/provinces.ts yolu için gerekli).
# Kullanım: bash scripts/warm-il-pages.sh [BASE_URL]
# Varsayılan BASE_URL: http://localhost:3000
# Arka planda çalıştırmak için:
#   nohup bash scripts/warm-il-pages.sh >/tmp/warm-il.log 2>&1 &
set -u

BASE="${1:-http://localhost:3000}"
SLUGS=$(grep -oE "'[a-z-]+':" lib/provinces.ts | tr -d "':")

echo "Isınıyor: $BASE — $(echo "$SLUGS" | wc -l | tr -d ' ') il"
while IFS= read -r slug; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/akaryakit/karsilastirma/$slug")
  echo "$code  $slug"
done <<< "$SLUGS"
echo "Tamamlandı."
