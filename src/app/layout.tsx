import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FYP-BS30-BLOG | Project Updates",
  description:
    "Official blog for Final Year Project Group BS30. Track our progress, insights, and milestones.",
  keywords: [
    "final year project",
    "FYP",
    "BS30",
    "university blog",
    "tech updates",
  ],
  openGraph: {
    type: "website",
    url: "https://fyp-30-blog.vercel.app",
    title: "FYP-BS30-BLOG",
    description: "Follow our final year project journey.",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
