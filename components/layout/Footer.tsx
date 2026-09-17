import Link from "next/link";
import { CONTACT, SOCIALS, COMPANY_LINKS, SELF_SERVICE_LINKS, LEGAL_LINKS, LINKS } from "@/lib/constants";
import NewsletterForm from "@/components/ui/NewsletterForm";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      {/* Newsletter band -- verbatim copy from the live site's footer */}
      <div className="border-b border-line bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Stay Connected
            </p>
            <h3 className="mt-2 text-xl font-bold text-fiber sm:text-2xl">
              We&apos;re Here to Power Your Digital Life.
            </h3>
            <p className="mt-1 text-sm text-muted">
              Internet tips, network updates, and exclusive offers — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={LINKS.home} className="flex items-center gap-2 font-display text-lg font-bold text-fiber">
              <Image src="/lulifiber2.png" alt="lulifiber icon" width={70} height={70} priority/>
              Lulifiber
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A trusted fiber internet provider committed to delivering speed, stability,
              and responsive customer support across Nigeria.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="blank"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fiber/70 transition-colors hover:border-signal/60 hover:text-signal"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <p className="text-sm font-semibold text-fiber">Useful Links</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href={LINKS.pricing} className="text-sm text-muted transition-colors hover:text-signal">
                  Our Plans
                </Link>
              </li>
              <li>
                <Link href={LINKS.shop} className="text-sm text-muted transition-colors hover:text-signal">
                  Shop
                </Link>
              </li>
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted transition-colors hover:text-signal">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Self service */}
          <div>
            <p className="text-sm font-semibold text-fiber">Self Service</p>
            <ul className="mt-4 space-y-3">
              {SELF_SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} target="blank" className="text-sm text-muted transition-colors hover:text-signal">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-semibold text-fiber">Legal</p>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted transition-colors hover:text-signal">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-fiber">Contact</p>
            <ul className="mt-4 space-y-3">
              <li className="text-sm leading-relaxed text-muted">{CONTACT.address}</li>
              <li>
                <a href={`mailto:${CONTACT.supportEmail}`} className="text-sm text-muted transition-colors hover:text-signal">
                  {CONTACT.supportEmail}
                </a>
              </li>
              <li className="text-sm text-muted">
                <span className="text-fiber/70">Call only:</span>{" "}
                <span className="tabular-nums">{CONTACT.phones.join(", ")}</span>
              </li>
              <li className="text-sm text-muted">
                <span className="text-fiber/70">WhatsApp only:</span>{" "}
                <a href={CONTACT.whatsappHref} className="tabular-nums transition-colors hover:text-signal">
                  {CONTACT.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} Lulifiber. All rights reserved.
          </p>
          <p className="text-xs text-muted">Powered by Lulifiber</p>
        </div>
      </div>
    </footer>
  );
}