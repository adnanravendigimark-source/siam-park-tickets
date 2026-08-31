import Link from "next/link";
import Image from "next/image";

// Inline vector mark: a cresting wave over a Thai-inspired temple roofline —
// the site's brand icon.
function SiamWaveMarkSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sun halo */}
      <circle cx="50" cy="20" r="14" fill="#F0A93A" fillOpacity="0.18" />

      {/* Thai temple roofline silhouette */}
      <path
        d="M50 10L58 22H66L74 30H26L34 22H42Z"
        fill="#0A3D42"
        fillOpacity="0.85"
        stroke="#0A3D42"
        strokeWidth="1.6"
      />
      {/* Roof finial */}
      <path d="M50 10V4M47 6L50 3L53 6" stroke="#F0A93A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* Cresting wave below */}
      <path
        d="M4 46C14 38 22 42 30 34C38 26 44 36 52 30C60 24 66 38 74 32C82 26 90 36 96 30V58C96 58 84 66 68 66C52 66 44 58 30 58C16 58 4 66 4 66V46Z"
        fill="#0E7C86"
        stroke="#0A3D42"
        strokeWidth="1.6"
      />
      {/* Foam highlight */}
      <path d="M6 44Q30 32 50 40T96 32" stroke="#F5FAF9" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

      {/* Base water line */}
      <path d="M4 68H96" stroke="#0A3D42" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "compact",
  theme = "light",
  src = "",
  logoImage = "",
  alt = "Siam Park Tickets",
  logoAlt = "Siam Park Tickets",
  line1 = "SIAM PARK",
  line2 = "— TICKETS —",
}: {
  className?: string;
  variant?: "compact" | "stacked";
  theme?: "light" | "dark";
  src?: string;
  logoImage?: string;
  alt?: string;
  logoAlt?: string;
  line1?: string;
  line2?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = (logoImage || src)?.trim();
  const resolvedAlt = logoAlt || alt;

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <span className="relative block h-12 w-14 transition-transform duration-300 hover:scale-105">
          {customSrc ? (
            <Image src={customSrc} alt={resolvedAlt} fill sizes="80px" className="object-contain" priority />
          ) : (
            <SiamWaveMarkSvg className="h-full w-full" />
          )}
        </span>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-xl sm:text-2xl font-bold tracking-[0.1em] ${
              isDark ? "text-white" : "text-[#0A3D42]"
            }`}
          >
            {line1 || "SIAM PARK"}
          </span>
          <span className="block font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#F0A93A]">
            {line2 || "— TICKETS —"}
          </span>
        </div>
      </Link>
    );
  }

  const image = (
    <span className="relative block h-10 w-12 shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
      {customSrc ? (
        <Image src={customSrc} alt={resolvedAlt} fill priority sizes="48px" className="object-contain" />
      ) : (
        <SiamWaveMarkSvg className="h-full w-full" />
      )}
    </span>
  );

  const wordmark = (
    <div className="flex min-w-0 flex-col justify-center">
      <span
        className={`block truncate font-display text-xl sm:text-[1.35rem] font-bold tracking-[0.08em] leading-none ${
          isDark ? "text-white group-hover:text-[#F0A93A]" : "text-[#0A3D42] group-hover:text-[#0E7C86]"
        }`}
      >
        {line1 || "SIAM PARK"}
      </span>
      <span className="block truncate font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.28em] text-[#F0A93A] leading-none mt-1">
        {line2 || "— TICKETS —"}
      </span>
    </div>
  );

  return (
    <Link href="/" className={`group inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
