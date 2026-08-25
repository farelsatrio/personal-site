"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

/** Navigation links configuration with translation keys */
const NAV_LINKS = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "achievements", href: "#achievements" },
  { key: "stack", href: "#stack" },
  { key: "contact", href: "#contact" },
] as const;

/**
 * Clean, professional navbar with logo, navigation links,
 * language toggle, CTA button, and responsive mobile menu.
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Backdrop on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeLocale = (nextLocale: "en" | "id") => {
    if (locale !== nextLocale) {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.replace(`${pathname}${hash}`, { locale: nextLocale, scroll: false });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* ─── Logo ─── */}
        <a
          href="#about"
          className="text-lg font-semibold tracking-tight text-foreground"
          aria-label="Home"
        >
          Farel<span className="text-accent">.</span>
        </a>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* ─── Desktop Right: Lang Toggle + CTA ─── */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language Toggle */}
          <div className="flex items-center overflow-hidden rounded-full border border-border text-xs">
            <button
              onClick={() => changeLocale("en")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "en"
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLocale("id")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "id"
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ID
            </button>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            {t("contact")}
          </a>
        </div>

        {/* ─── Mobile Controls ─── */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Toggle */}
          <div className="flex items-center overflow-hidden rounded-full border border-border text-xs">
            <button
              onClick={() => changeLocale("en")}
              className={`px-2.5 py-1 transition-colors ${
                locale === "en"
                  ? "bg-accent text-white"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLocale("id")}
              className={`px-2.5 py-1 transition-colors ${
                locale === "id"
                  ? "bg-accent text-white"
                  : "text-muted-foreground"
              }`}
            >
              ID
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      {isMobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 pb-6 pt-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-border/50 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground last:border-0"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
