import "./globals.css";
export const metadata = {
  title: "Mehdi Mirkia — Public Health × AI",
  description: "Portfolio showcasing ML, software engineering, and research projects.",
  metadataBase: new URL("https://mehdimirkia.com"),
  openGraph: {
    title: "Mehdi Mirkia — Public Health × AI",
    description: "ML + Public Health portfolio",
    url: "https://mehdimirkia.com",
    siteName: "Mehdi Mirkia",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
