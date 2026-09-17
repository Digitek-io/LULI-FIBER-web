import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/ui/LegalDocument";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Lulifiber Telecom's Terms and Conditions.",
};

const SECTIONS: LegalSection[] = [
  {
    number: 1,
    title: "Definitions",
    content: [
      [
        "\u201CLulifiber Telecom\u201D \u2013 The company providing telecommunications and internet services.",
        "\u201CUser\u201D \u2013 Any person or entity using Lulifiber Telecom\u2019s services.",
        "\u201CServices\u201D \u2013 Includes internet connectivity, telecom services, and related support offered by Lulifiber Telecom.",
        "\u201CWebsite\u201D \u2013 The official website operated by Lulifiber Telecom.",
      ],
    ],
  },
  {
    number: 2,
    title: "Acceptance of Terms",
    content: [
      "By using our services, you confirm that you:",
      [
        "Have read, understood, and agreed to these T&C.",
        "Are of legal age to form a binding contract.",
        "Comply with all applicable laws, regulations, and the Acceptable Use Policy.",
      ],
    ],
  },
  {
    number: 3,
    title: "Changes to Terms",
    content: [
      "Lulifiber Telecom reserves the right to modify these T&C at any time. Updates will be posted on our website, and continued use of our services after changes signifies acceptance of the updated terms.",
    ],
  },
  {
    number: 4,
    title: "Services Provided",
    content: [
      "Lulifiber Telecom offers the following services:",
      ["High-speed internet connectivity.", "Telecom services, including voice and data plans.", "Customer support for technical assistance."],
      "Service availability, speed, and quality may vary based on location and network conditions.",
    ],
  },
  {
    number: 5,
    title: "User Responsibilities",
    content: [
      "Users agree to:",
      [
        "Provide accurate and complete information during registration.",
        "Keep login credentials confidential.",
        "Notify Lulifiber Telecom immediately if unauthorized access or suspicious activity is detected.",
        "Adhere strictly to the Acceptable Use Policy (AUP).",
      ],
      "Users must not:",
      [
        "Use our services for illegal activities.",
        "Interfere with or disrupt the Lulifiber network.",
        "Misuse or resell our services without authorization.",
      ],
    ],
  },
  {
    number: 6,
    title: "Payments and Billing",
    content: [
      "Users agree to pay all charges associated with the chosen service plan.",
      "Payments are due on the billing date specified in the subscription plan.",
      "Failure to pay may result in service suspension or termination.",
      "Lulifiber Telecom reserves the right to charge interest on overdue accounts and additional fees for reconnection.",
      "Payment Methods: Payments can be made via:",
      ["Bank Transfer", "Online Payment Gateways", "Direct Deposit"],
    ],
  },
  {
    number: 7,
    title: "Termination and Suspension",
    content: [
      "Lulifiber Telecom reserves the right to suspend or terminate services without prior notice if:",
      [
        "Users violate these T&C or the AUP.",
        "Non-payment or overdue charges are not settled.",
        "Activities that jeopardize network integrity are detected.",
      ],
      "Users may terminate the service by providing written notice to our support team. Upon termination, users remain responsible for any outstanding charges.",
    ],
  },
  {
    number: 8,
    title: "Service Availability and Maintenance",
    content: [
      "While we strive to provide uninterrupted service, we do not guarantee 100% uptime. Services may be unavailable due to:",
      ["Scheduled maintenance", "Technical issues beyond our control", "Force majeure events (e.g., natural disasters)"],
      "In such cases, Lulifiber Telecom will make reasonable efforts to restore service promptly.",
    ],
  },
  {
    number: 9,
    title: "Limitation of Liability",
    content: [
      "Lulifiber Telecom shall not be liable for:",
      [
        "Loss of data, revenue, or profits resulting from service disruptions.",
        "Unauthorized access to user data or the network.",
        "Third-party actions or content accessed through our network.",
        "Direct, indirect, or consequential damages arising from service use or the inability to use it.",
      ],
      "The maximum liability under any claim will not exceed the total charges paid by the user in the past three months.",
    ],
  },
  {
    number: 10,
    title: "Intellectual Property Rights",
    content: [
      "All content, logos, and trademarks on the Lulifiber website and services are owned by Lulifiber Telecom. Unauthorized use, reproduction, or distribution is prohibited.",
    ],
  },
  {
    number: 11,
    title: "Privacy and Data Protection",
    content: [
      "Lulifiber Telecom respects user privacy and complies with data protection laws. Personal information collected during service registration and use will be processed according to our Privacy Policy.",
      "Users consent to the collection and processing of data for service delivery, billing, and support.",
    ],
  },
  {
    number: 12,
    title: "Indemnification",
    content: [
      "Users agree to indemnify and hold Lulifiber Telecom harmless from any claims, damages, or liabilities arising from:",
      [
        "Violations of these T&C or the AUP.",
        "Misuse of the services.",
        "Infringement of intellectual property rights by the user.",
      ],
    ],
  },
  {
    number: 13,
    title: "Dispute Resolution",
    content: [
      "Disputes will be resolved through negotiation. If unresolved, the matter will be referred to arbitration in Lagos, Nigeria, under the laws of the Federal Republic of Nigeria.",
    ],
  },
  {
    number: 14,
    title: "Third-Party Links",
    content: [
      "Lulifiber Telecom\u2019s website may contain links to external sites. These links are provided for convenience and do not imply endorsement. We are not responsible for the content or practices of third-party websites.",
    ],
  },
  {
    number: 15,
    title: "Governing Law",
    content: [
      "These T&C are governed by the laws of the Federal Republic of Nigeria. Any legal actions or proceedings will be conducted in the courts of Lagos, Nigeria.",
    ],
  },
  {
    number: 16,
    title: "Contact Information",
    content: [`For questions, complaints, or support, please contact: ${CONTACT.supportEmail} / ${CONTACT.supportPhoneLocal}`],
  },
  {
    number: 17,
    title: "Final Provisions",
    content: [
      "If any provision of these T&C is deemed unenforceable, the remaining provisions will remain in full force and effect. Failure to enforce any part of these T&C does not constitute a waiver of our rights.",
      "By using Lulifiber Telecom\u2019s services, you acknowledge that you have read, understood, and agreed to these terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Legal</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Lulifiber Telecom \u2013 Terms and Conditions (T&C)</p>

        <div className="glass mt-8 rounded-2xl p-6">
          <p className="text-sm leading-relaxed text-muted">
            Welcome to Lulifiber Telecom. By accessing or using our services, you agree to
            comply with these Terms and Conditions (T&C). Please read them carefully. If
            you disagree with any part, you must discontinue the use of our services.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            These T&C, along with our Acceptable Use Policy (AUP) and Privacy Policy,
            govern your relationship with Lulifiber Telecom and outline your rights and
            responsibilities when using our services.
          </p>
          <p className="mt-3 text-sm text-muted">
            Questions?{" "}
            <a href={`mailto:${CONTACT.supportEmail}`} className="text-signal hover:underline">
              {CONTACT.supportEmail}
            </a>{" "}
            &middot;{" "}
            <a href={`tel:${CONTACT.supportPhoneLocal}`} className="tabular-nums text-signal hover:underline">
              {CONTACT.supportPhoneLocal}
            </a>
          </p>
        </div>

        <div className="mt-12">
          <LegalDocument sections={SECTIONS} />
        </div>
      </div>
    </main>
  );
}