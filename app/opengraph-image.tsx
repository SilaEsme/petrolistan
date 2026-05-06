import { ImageResponse } from "next/og";

export const alt = "Petrolistan — Türkiye Akaryakıt & Petrol Fiyatları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#042C53",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: "0px",
        }}
      >
        {/* Oil drop icon */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2 C21 8 26 15 26 21 A10 10 0 0 1 6 21 C6 15 11 8 16 2Z"
            fill="white"
          />
          <path
            d="M16 11 C19 15 23 18 23 21 A7 7 0 0 1 9 21 C9 18 13 15 16 11Z"
            fill="#BA7517"
          />
        </svg>

        {/* Site name */}
        <div
          style={{
            color: "white",
            fontSize: "96px",
            fontWeight: "bold",
            letterSpacing: "-4px",
            lineHeight: "1",
            marginTop: "24px",
          }}
        >
          petrolistan
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#BA7517",
            fontSize: "32px",
            marginTop: "20px",
            fontWeight: "500",
          }}
        >
          Türkiye Akaryakıt &amp; Petrol Fiyatları
        </div>

        {/* URL */}
        <div
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "22px",
            marginTop: "28px",
          }}
        >
          petrolistan.com
        </div>
      </div>
    ),
    { ...size }
  );
}
