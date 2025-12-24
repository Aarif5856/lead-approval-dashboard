import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ResearchScoutAI - Premium SaaS Founder Leads",
  description: "Get instant access to 50 verified SaaS founders. Includes personal emails, LinkedIn profiles, and AI-generated personalized openers for high-conversion outreach.",
  keywords: ["SaaS leads", "B2B lead generation", "founder emails", "market research", "verified leads", "outreach dataset"],
  openGraph: {
    title: "ResearchScoutAI - 50 Verified SaaS Leads",
    description: "Unlock premium lead research. 50 verified SaaS founders with personalized openers ready for your outreach.",
    type: "website",
    locale: "en_US",
    siteName: "ResearchScoutAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchScoutAI - Premium SaaS Leads",
    description: "Instant access to 50 verified SaaS founders for your next outreach campaign.",
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen flex flex-col font-body bg-slate-950`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E9J0JB7JGB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E9J0JB7JGB');
          `}
        </Script>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="py-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} ResearchScoutAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
