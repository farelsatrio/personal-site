import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

/* ─── Font Configuration ─── */
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

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: "Alex Chen — DevOps & Cloud Engineer",
  description:
    "Personal portfolio of Alex Chen, a DevOps & Cloud Engineer specializing in scalable cloud infrastructure, CI/CD pipelines, and container orchestration.",
  keywords: [
    "DevOps",
    "Cloud Engineer",
    "AWS",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "Infrastructure as Code",
  ],
  authors: [{ name: "Alex Chen" }],
  openGraph: {
    title: "Alex Chen — DevOps & Cloud Engineer",
    description:
      "Building scalable cloud infrastructure and robust CI/CD pipelines.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
