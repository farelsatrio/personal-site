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
 * Minimalist navbar with logo, navigation links, dark mode toggle,
 * language toggle (EN/ID), and responsive mobile hamburger menu.
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Add subtle backdrop blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change / resize
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
      router.replace(pathname, { locale: nextLocale, scroll: false });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        {/* ─── Logo / Name ─── */}
        <a
          href="#about"
          className="font-mono text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
          aria-label="Home"
        >
          {"Farel"}
        </a>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </a>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center gap-1 font-mono text-xs border-l border-border pl-4">
            <button
              onClick={() => changeLocale("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "en"
                  ? "text-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => changeLocale("id")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "id"
                  ? "text-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ID
            </button>
          </div>
        </div>

        {/* ─── Mobile Controls ─── */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Language Toggle for Mobile */}
          <div className="flex items-center gap-1 font-mono text-xs border-r border-border pr-2 mr-1">
            <button
              onClick={() => changeLocale("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "en"
                  ? "text-accent font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => changeLocale("id")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "id"
                  ? "text-accent font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              ID
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Dropdown ─── */}
      {isMobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-4xl flex-col gap-1 px-6 pb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
