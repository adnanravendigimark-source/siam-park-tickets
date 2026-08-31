import Link from "next/link";
import Logo from "./Logo";
import { getSiteChrome } from "@/lib/homepage";

export default async function Footer() {
  const { header, footer } = await getSiteChrome();
  return (
    <footer className="bg-[#07575B] border-t border-white/10 py-16 text-white/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Logo
              variant="compact"
              theme="dark"
              src={header.logoImage}
              alt={header.logoAlt}
              line1={header.logoLine1}
              line2={header.logoLine2}
            />
            <p
              className="mt-4 text-sm text-white/70 leading-relaxed [&_strong]:text-white [&_a]:text-[#E8B84A] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: footer.tagline }}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="font-semibold text-white tracking-wide">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="transition-colors hover:text-[#E8B84A]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-semibold text-white tracking-wide">{footer.addressHeading}</p>
              <p className="mt-3 whitespace-pre-line text-white/50 leading-relaxed">
                {footer.addressLine1}
                {footer.addressLine2 ? `\n${footer.addressLine2}` : ""}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} {footer.copyrightText}
        </p>
      </div>
    </footer>
  );
}
