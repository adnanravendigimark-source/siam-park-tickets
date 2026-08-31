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
          background: "linear-gradient(135deg, #0A3D42 0%, #042017 100%)",
          borderRadius: "14px",
          border: "2.5px solid #F0A93A",
          boxSizing: "border-box",
        }}
      >
        <svg
          width="54"
          height="54"
          viewBox="0 0 64 64"
          fill="none"
        >
          {/* Sun Radiance */}
          <circle cx="32" cy="18" r="9" fill="#F0A93A" fillOpacity="0.25" />
          <path d="M32 6V9M24 8L25.5 11M40 8L38.5 11M17 13L20 15M47 13L44 15" stroke="#F0A93A" strokeWidth="1.5" strokeLinecap="round" />

          {/* Temple Summit Chamber */}
          <rect x="27" y="18" width="10" height="6" rx="0.5" fill="#F0A93A" stroke="#F0A93A" strokeWidth="1" />
          <rect x="30" y="20" width="4" height="4" fill="#0A3D42" />

          {/* Terraced Stepped Pyramid Tiers */}
          <path d="M23 24L20 29H44L41 24H23Z" fill="#F0A93A" fillOpacity="0.45" stroke="#F0A93A" strokeWidth="1.2" />
          <path d="M19 29L16 35H48L45 29H19Z" fill="#F0A93A" fillOpacity="0.6" stroke="#F0A93A" strokeWidth="1.2" />
          <path d="M15 35L11 42H53L49 35H15Z" fill="#F0A93A" fillOpacity="0.75" stroke="#F0A93A" strokeWidth="1.2" />
          <path d="M10 42L6 50H58L54 42H10Z" fill="#F0A93A" stroke="#F0A93A" strokeWidth="1.4" />

          {/* Central Grand Ceremonial Staircase */}
          <path d="M28 24L26 50H38L36 24H28Z" fill="#F0A93A" stroke="#0A3D42" strokeWidth="1.2" />
          <line x1="27.5" y1="29" x2="36.5" y2="29" stroke="#0A3D42" strokeWidth="1" />
          <line x1="27" y1="34" x2="37" y2="34" stroke="#0A3D42" strokeWidth="1" />
          <line x1="26.5" y1="39" x2="37.5" y2="39" stroke="#0A3D42" strokeWidth="1" />
          <line x1="26" y1="44" x2="38" y2="44" stroke="#0A3D42" strokeWidth="1" />

          {/* Base Ground Line */}
          <path d="M4 51H60" stroke="#F0A93A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
