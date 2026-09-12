import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import ScrollManager from "@/components/ScrollManager";

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
  title: "Farel Satrio Pratama",
  description:
    "Personal portfolio of Farel Satrio Pratama, a DevOps & Cloud Engineer specializing in scalable cloud infrastructure, CI/CD pipelines, and container orchestration.",
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
  authors: [{ name: "Farel Satrio Pratama" }],
  icons: {
    icon: "/window.svg",
    shortcut: "/window.svg",
    apple: "/window.svg",
  },
  openGraph: {
    title: "Farel Satrio Pratama — DevOps & Cloud Engineer",
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Obtain messages for the locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ScrollManager />
        
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}