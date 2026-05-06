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
        {/* Pump icon */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="6" width="17" height="23" rx="2" fill="white" />
          <rect x="2" y="4" width="19" height="3" rx="1.5" fill="white" />
          <rect x="6" y="11" width="10" height="7" rx="1" fill="#0C447C" />
          <rect x="8" y="13" width="6" height="1.5" rx=".75" fill="#BA7517" />
          <rect x="8" y="15.5" width="4" height="1" rx=".5" fill="#BA7517" />
          <path
            d="M20 9H27V18"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="24" y="18" width="4" height="3" rx="1.5" fill="white" />
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
