import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "cracked developer",
  description:
    "Personal engineering portfolio of Vinayak Dhemare. Building web applications, SaaS products, and backend systems, while exploring AI and systems from first principles.",
  keywords: [
    "Vinayak",
    "Vinayak Dhemare",
    "Software Engineer",
    "Full-Stack Developer",
    "SaaS Engineer",
    "Web Applications",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Systems",
    "C++ Inference Engine",
    "GPT-2 from Scratch",
  ],
  authors: [{ name: "Vinayak" }],
  openGraph: {
    title: "cracked developer",
    description:
      "I build web applications, SaaS products, and backend systems. Along the way, I explore how AI works from the ground up.",
    type: "website",
    locale: "en_US",
    siteName: "Vinayak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "cracked developer",
    description:
      "Building web applications, SaaS products, and backend systems, while exploring AI from first principles.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Ndot57-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) { r.unregister(); }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var n of names) { caches.delete(n); }
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F5F5F0] text-[#050505] font-sans antialiased selection:bg-[#00F0FF] selection:text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
