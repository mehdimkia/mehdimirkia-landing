import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mehdimirkia.com"),
  title: {
    default: "Mehdi Mirkia — Public Health × AI",
    template: "%s · Mehdi Mirkia",
  },
  description:
    "Portfolio showcasing machine learning + public health projects, including depression-risk modeling and full-stack demos.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: "https://mehdimirkia.com",
    siteName: "Mehdi Mirkia",
    title: "Mehdi Mirkia — Public Health × AI",
    description:
      "Portfolio showcasing ML + public health projects, including depression-risk modeling and full-stack demos.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mehdi Mirkia — Public Health × AI",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehdi Mirkia — Public Health × AI",
    description:
      "Portfolio showcasing ML + public health projects, including depression-risk modeling and full-stack demos.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
  authors: [{ name: "Mehdi Mirkia" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" }, // emerald-500
    { media: "(prefers-color-scheme: dark)", color: "#065f46" },  // emerald-800
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {children}

        {/* Minimal JSON-LD for richer result cards */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mehdi Mirkia",
              url: "https://mehdimirkia.com",
              jobTitle: "Machine Learning / Public Health",
              sameAs: [
                "https://www.linkedin.com/in/mehdimirkia",
                "https://github.com/mehdimkia",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
