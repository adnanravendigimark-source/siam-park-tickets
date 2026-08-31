import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #07575B 0%, #042022 100%)",
          borderRadius: "16px",
          border: "2.5px solid #E8B84A",
          boxSizing: "border-box",
        }}
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 64 64"
          fill="none"
        >
          {/* Sun Halo */}
          <circle cx="32" cy="24" r="14" fill="#E8B84A" fillOpacity="0.25" />

          {/* Thai Dragon Crest */}
          <path
            d="M32 8C33.5 12 37 14 36 18C35.2 21.2 38 23 37 26C35.5 30.5 30 29 29.5 25C29.2 22.5 31.5 21 31 18C30.5 15 28 13.5 32 8Z"
            fill="#F15A24"
          />
          <path
            d="M32 11C33 14 35 15.5 34.5 18C34 20 35.5 21.5 35 23.5C34 26 31 25.5 30.8 23C30.5 21.5 31.8 20.5 31.5 18.5C31.2 16.5 29.5 15 32 11Z"
            fill="#E8B84A"
          />

          {/* Ocean Wave */}
          <path
            d="M10 42C16 34 24 38 32 32C40 26 48 36 54 30V48C54 52 50 54 46 54H18C14 54 10 52 10 48V42Z"
            fill="#08A6A6"
          />
          <path
            d="M12 40C18 33 26 37 34 31C42 25 50 35 54 29"
            stroke="#E3F5F3"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}

