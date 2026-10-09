import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "VINAYAK — Software Engineer · Builder · AI / Systems",
  description:
    "Personal engineering portfolio of Vinayak. I build things that actually run — across AI, C++ systems, backend infrastructure, and developer tools.",
  keywords: [
    "Vinayak",
    "Vinayak Dhemare",
    "Software Engineer",
    "AI Systems",
    "C++ Inference Engine",
    "GPT-2 from Scratch",
    "Developer Tools",
    "Backend Infrastructure",
    "Linux",
  ],
  authors: [{ name: "Vinayak" }],
  openGraph: {
    title: "VINAYAK — Software Engineer · Builder · AI / Systems",
    description: "I build things that actually run. AI, systems, and backend infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Vinayak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "VINAYAK — Software Engineer · Builder",
    description: "I build things that actually run. AI, systems, and backend infrastructure.",
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
      <body className="min-h-screen bg-[#F5F5F0] text-[#050505] font-sans antialiased selection:bg-[#00F0FF] selection:text-black">
        {children}
      </body>
    </html>
  );
}
