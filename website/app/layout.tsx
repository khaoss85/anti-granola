import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSoftwareSchema } from "@/lib/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Anti Granola — Detect & Block Invisible Meeting Transcription",
    template: "%s | Anti Granola",
  },
  description:
    "Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.",
  keywords: [
    "anti granola",
    "meeting privacy",
    "block meeting transcription",
    "detect meeting recording",
    "granola blocker",
    "otter.ai blocker",
    "meeting recording detector",
    "anti transcription tool",
    "speech to text blocker",
    "meeting privacy tool",
  ],
  authors: [{ name: "Anti Granola" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antigranola.com",
    siteName: "Anti Granola",
    title: "Anti Granola — Detect & Block Invisible Meeting Transcription",
    description:
      "Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anti Granola — Detect & Block Invisible Meeting Transcription",
    description:
      "Free open-source desktop app that detects hidden meeting transcription tools. Protect your meeting privacy.",
  },
  metadataBase: new URL("https://antigranola.com"),
  alternates: {
    canonical: "https://antigranola.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
