import type { Metadata } from "next";
import { FiZap, FiWifi, FiHeadphones } from "react-icons/fi";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/sections/CTABanner";
import { LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About | Lulifiber",
  description:
    "About Lulifiber — Reliable Fiber Internet in Nigeria. Lulifiber is a high-speed fiber internet service provider delivering reliable, affordable, and uninterrupted broadband connectivity to homes and businesses in Nigeria.",
};

const FEATURES = [
  {
    Icon: FiZap,
    title: "Fast & Professional Installation Process",
    body: "Quick and seamless fiber setup with minimal disruption.",
  },
  {
    Icon: FiWifi,
    title: "Unlimited Data",
    body: "Lulifiber offers unlimited high-speed fiber internet with no data caps or throttling for fast, reliable connectivity.",
  },
  {
    Icon: FiHeadphones,
    title: "24/7 Support",
    body: "Always available to assist you anytime, any day.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-32 lg:pt-40">
      {/* Intro */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
            About Lulifiber
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Reliable Fiber Internet in Nigeria
          </h1>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
            <p>
              Lulifiber is a high-speed fiber internet service provider delivering reliable,
              affordable, and uninterrupted broadband connectivity to homes and businesses
              in Nigeria.
            </p>
            <p>
              We specialize in fiber-to-the-home (FTTH) and enterprise-grade connectivity
              solutions designed for speed, stability, and scalability. Our mission is
              simple: <span className="font-medium text-fiber">connect Nigerians to a faster digital future.</span>
            </p>
            <p>
              Currently serving <span className="font-medium text-fiber">Lagos State and Owerri (Imo State)</span>,
              we are expanding rapidly to bring world-class internet access to more communities.
            </p>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-6 text-center">
              <Icon className="mx-auto text-signal" size={22} />
              <p className="mt-3 text-sm font-semibold text-fiber">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What makes us different -- video placeholder */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
            What Makes Us Different?
          </p>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Modern Infrastructure. Exceptional Service.
          </h2>
        </div>
        {/* TODO: live site embeds a Vimeo video here (id 1165356243).
            Placeholder panel until you provide the real embed or a
            replacement asset. */}
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl shadow-xl">
    <div className="relative aspect-video">
      <iframe
        src="https://player.vimeo.com/video/1165356243?h=811991f6f7"
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Lulifiber"
      />
    </div>
  </div>
      </section>

      {/* Mission */}
      <section className="border-t border-line px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Our Mission
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              To deliver fast, reliable, and future-ready fiber connectivity that empowers
              individuals, businesses, and communities to thrive in a digital world.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            <p>
              At Lulifiber, our mission goes beyond providing internet access, we are
              committed to building a resilient digital infrastructure that eliminates
              connectivity barriers and unlocks opportunities for growth, innovation,
              education, and economic development.
            </p>
            <p>
              We strive to provide consistent uptime, responsive 24/7 customer support,
              and scalable broadband solutions designed to meet the evolving needs of
              modern homes and enterprises. Through cutting-edge Fiber-to-the-Home (FTTH)
              technology and customer-first service, we aim to set a new benchmark for
              internet excellence in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-t border-line px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Our Vision
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              To become Nigeria&apos;s most trusted and innovative fiber broadband provider,
              recognized for reliability, technological leadership, and customer
              satisfaction.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            <p>
              We envision a future where every home, estate, and business has access to
              seamless high-speed connectivity that powers smart living, digital
              transformation, and global competitiveness.
            </p>
            <p>
              By continuously expanding our fiber infrastructure and embracing emerging
              technologies, Lulifiber seeks to shape a digitally connected nation where
              speed, stability, and service excellence are the standard, not the exception.
            </p>
          </div>
        </div>
      </section>

      {/* Reused from the homepage -- identical section on the live site too */}
      <HowItWorks />

      <CTABanner
        heading="Ready to experience better internet connectivity?"
        body="Lulifiber delivers fast, stable fiber connectivity to keep your home and business running smoothly."
        primaryCta={{ label: "Contact Support", href: LINKS.contact }}
        secondaryCta={null}
      />
    </main>
  );
}