import Link from "next/link";
import Image from "next/image";

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
  const logoSrc = customSrc || "/images/siam-park-logo.png";
  const resolvedAlt = logoAlt || alt;

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-1 ${className}`}>
        <Image
          src={logoSrc}
          alt={resolvedAlt}
          width={220}
          height={125}
          className={`h-14 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 ${
            isDark ? "brightness-125 contrast-125 drop-shadow-md" : ""
          }`}
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`group inline-flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt={resolvedAlt}
        width={220}
        height={125}
        className={`h-12 sm:h-14 md:h-15 w-auto max-h-[58px] object-contain transition-transform duration-300 group-hover:scale-105 ${
          isDark ? "brightness-125 contrast-125 drop-shadow-md" : ""
        }`}
        priority
      />
    </Link>
  );
}


