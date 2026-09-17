import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/ui/LegalDocument";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "Lulifiber Telecom's Acceptable Use Policy (AUP).",
};

const SECTIONS: LegalSection[] = [
  {
    number: 1,
    title: "Unlawful Use",
    content: [
      "Lulifiber Telecom\u2019s services may only be used for lawful activities. The following uses of our services are strictly prohibited:",
      [
        "Illegal Content and Activities: Any use that violates the laws of the Federal Republic of Nigeria, including child exploitation, obscenity, hate speech, defamation, harassment, or threats.",
        "Intellectual Property Violations: Uploading, sharing, or distributing copyrighted materials without authorization.",
        "Fraud and Identity Theft: Engaging in fraudulent activities, including phishing, impersonation, and pyramid schemes.",
        "Privacy Infringement: Collecting or storing personal data of others without consent.",
        "Harm to Minors: Hosting or distributing content that exploits or harms minors.",
        "Financial Misconduct: Involvement in financial scams, fraudulent transactions, or illegal financial practices.",
        "Unauthorized Access: Gaining access to or attempting to breach the security of any systems, networks, or data without permission.",
        "Distribution of Malicious Software: Sharing or transmitting viruses, worms, malware, or other harmful software.",
      ],
      "Violations of these rules may result in immediate suspension or termination of services, as well as legal action when applicable.",
    ],
  },
  {
    number: 2,
    title: "Prohibited Activities",
    content: [
      "Any activity that threatens the integrity, security, or functionality of Lulifiber Telecom\u2019s network is strictly prohibited, including but not limited to:",
      [
        "Hacking and Cracking: Unauthorized access to our network or systems.",
        "Network Disruption: Activities that disrupt our services, such as denial-of-service attacks.",
        "Misuse of Network Resources: Excessive consumption of bandwidth or engaging in activities that overload the network.",
        "Mass Mailing and Spam: Sending unsolicited bulk emails, chain letters, or spam through our network.",
        "Misrepresentation: Falsifying data, forging headers, or disguising the origin of any transmission.",
        "Monitoring and Interception: Unauthorized monitoring or interception of data without proper authorization.",
      ],
      "Any violations will result in suspension or termination of access, and we may involve legal authorities if necessary.",
    ],
  },
  {
    number: 3,
    title: "Security and Network Integrity",
    content: [
      "Lulifiber Telecom takes network security seriously. Any actions that compromise the security or performance of our network, including unauthorized access, data interception, or introducing malicious code, will be dealt with swiftly.",
      [
        "Monitoring and Response: We reserve the right to monitor traffic and data flow to ensure network stability.",
        "Security Measures: Implementing firewalls, encryption, and other protective technologies to secure our systems.",
        "User Responsibilities: Customers must ensure that their devices and networks do not become a source of security vulnerabilities or attacks.",
      ],
    ],
  },
  {
    number: 4,
    title: "Unsolicited, Spam, and Bulk Emails",
    content: [
      "Spam and unsolicited bulk messages negatively impact the performance and reputation of our network. Therefore, we prohibit:",
      [
        "Sending unsolicited bulk messages for any purpose, including commercial, religious, or political.",
        "Operating mailing lists without proper opt-in consent.",
        "Failing to honor requests for removal from mailing lists.",
        "Using Lulifiber Telecom\u2019s infrastructure to support unsolicited messages sent via other networks.",
      ],
      "Violating these provisions may lead to the suspension of your account or legal action.",
    ],
  },
  {
    number: 5,
    title: "Fair Usage Policy (FUP)",
    content: [
      "To ensure fair and reliable service for all users, Lulifiber Telecom maintains a Fair Usage Policy:",
      [
        "Bandwidth Usage: Excessive or abusive use of bandwidth that disrupts other users\u2019 experiences may result in traffic shaping or temporary throttling.",
        "Performance Management: We may implement technical measures to ensure equitable resource distribution.",
        "Service Integrity: Users must avoid activities that compromise service quality for others, including using automated tools for data extraction.",
      ],
    ],
  },
  {
    number: 6,
    title: "Public Spaces and Third-Party Content",
    content: [
      "Our services may include access to third-party websites or content. Lulifiber Telecom does not control or endorse these external resources, and users access them at their own risk. We are not responsible for the content, accuracy, or practices of third-party sites.",
      "Users should exercise caution when engaging with public forums, chat rooms, or interactive services through our network.",
    ],
  },
  {
    number: 7,
    title: "Reporting Violations",
    content: [
      `If you suspect a violation of this AUP, please report it to our support team: ${CONTACT.supportEmail} / ${CONTACT.supportPhoneLocal}`,
      "Provide detailed information about the incident, including timestamps, IP addresses, and relevant logs. We will investigate promptly and take appropriate action.",
    ],
  },
  {
    number: 8,
    title: "Consequences of Violation",
    content: [
      "Breaching this AUP may result in:",
      [
        "Suspension or termination of your account",
        "Legal action, including prosecution",
        "Billing of administrative costs incurred due to the violation",
        "Reporting to law enforcement agencies, if required",
      ],
      "Lulifiber Telecom reserves the right to amend this policy at any time and to take necessary action to enforce it.",
    ],
  },
  {
    number: 9,
    title: "Final Remarks",
    content: [
      "We are dedicated to providing a safe and reliable network for all users. This AUP is designed to maintain the integrity of our services and ensure compliance with applicable laws. By adhering to this policy, you help us maintain a robust and secure telecom network.",
      "For questions or feedback, feel free to reach out to us via the contact details provided.",
    ],
  },
];

export default function AcceptableUsePage() {
  return (
    <main className="px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Legal</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Acceptable Use Policy</h1>
        <p className="mt-2 text-sm text-muted">Lulifiber Telecom \u2013 Acceptable Use Policy (AUP)</p>

        <div className="glass mt-8 rounded-2xl p-6">
          <p className="text-sm leading-relaxed text-muted">
            By accessing or using the services provided by Lulifiber Telecom, you agree to
            be bound by this Acceptable Use Policy (AUP) and any additional terms,
            conditions, rules, or policies presented to you in connection with our
            services. This AUP aims to comply with the laws of the Federal Republic of
            Nigeria and outlines the acceptable and unacceptable uses of our services.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Lulifiber Telecom is committed to respecting your rights, including freedom of
            speech, privacy, human dignity, and access to information, as long as they are
            exercised lawfully. We will only intervene in such rights when required by law
            or when those rights threaten the safety, security, or integrity of our
            network.
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