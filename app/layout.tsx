import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";
import PromoPopup from "@/components/ui/PromoPopup";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lulifiber.com"),

  title: {
    default: "Lulifiber | Fast & Reliable Fiber Internet in Nigeria",
    template: "%s | Lulifiber",
  },

  description:
    "Experience reliable, high-speed fiber internet across Nigeria. Stream, game, work, and connect seamlessly with unlimited data and 24/7 local support.",

  openGraph: {
    type: "website",
    siteName: "Lulifiber",
    locale: "en_NG",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />

          <main>{children}</main>

          <Footer />
          <FloatingWhatsapp />
          <PromoPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}