import type { Metadata } from "next";
import { FiMapPin, FiPhone, FiClock, FiMail } from "react-icons/fi";
import ContactForm from "@/components/ui/ContactForm";
import CTABanner from "@/components/sections/CTABanner";
import { CONTACT, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | Lulifiber",
  description:
    "Get in touch with Lulifiber. Interested in Lulifiber for your home or business? Send us a message and our team will respond promptly.",
};

const INFO_CARDS = [
  {
    Icon: FiMapPin,
    label: "Address",
    lines: [CONTACT.address],
  },
  {
    Icon: FiPhone,
    label: "Phone",
    lines: [...CONTACT.phones, `WhatsApp: ${CONTACT.whatsapp}`],
  },
  {
    Icon: FiClock,
    label: "Working Hours",
    lines: [CONTACT.hours.support, CONTACT.hours.installation],
  },
  {
    Icon: FiMail,
    label: "Email Address",
    lines: [CONTACT.supportEmail, CONTACT.salesEmail],
  },
];

export default function ContactPage() {
  return (
    <main className="pt-32 lg:pt-40">
      <section className="px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Get in Touch</h1>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {INFO_CARDS.map(({ Icon, label, lines }) => (
            <div key={label} className="glass rounded-2xl p-5">
              <Icon className="text-signal" size={18} />
              <p className="mt-3 text-sm font-semibold text-fiber">{label}</p>
              {lines.map((line) => (
                <p key={line} className="mt-1 text-sm leading-relaxed text-muted">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s Talk</h2>
            <p className="mt-3 text-base text-muted">
              Interested in Lulifiber for your home or business? Please send us a message.
              Our team will respond promptly to guide you through installation, plans, and
              support options.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to experience better internet connectivity?"
        body="Lulifiber delivers fast, stable fiber connectivity to keep your home and business running smoothly."
        primaryCta={{ label: "Contact Support", href: LINKS.contact }}
        secondaryCta={null}
      />
    </main>
  );
}