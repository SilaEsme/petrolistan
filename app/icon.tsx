import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C447C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <svg
          width="24"
          height="24"
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
      </div>
    ),
    { ...size }
  );
}
