import { NextResponse } from "next/server";

interface EiaRow {
  period: string;
  value: number | null;
}

interface EiaResponse {
  response: { data: EiaRow[] };
}

export async function GET() {
  const key = process.env.EIA_API_KEY ?? "";
  const url =
    `https://api.eia.gov/v2/petroleum/pri/spt/data/` +
    `?api_key=${key}` +
    `&frequency=daily` +
    `&data[0]=value` +
    `&facets[product][]=EPCBRENT` +
    `&sort[0][column]=period` +
    `&sort[0][direction]=desc` +
    `&length=30`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`EIA: HTTP ${res.status}`);

    const json: EiaResponse = await res.json();

    const data = json.response.data
      .filter((row): row is EiaRow & { value: number } => row.value !== null)
      .map((row) => ({ date: row.period, value: row.value }))
      .reverse(); // kronolojik sıra (eski → yeni)

    return NextResponse.json({ data });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error }, { status: 500 });
  }
}
