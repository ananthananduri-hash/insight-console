import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConsentBanner from "@/components/ConsentBanner";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Insight Console",
    template: "%s | Insight Console",
  },
  description:
    "Marketing analytics tutorials, career notes from a job search in analytics, and healthcare marketing analytics — written in public.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fraunces.variable} ${plexMono.variable} ${plexSans.variable}`}
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
