import { AppThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
