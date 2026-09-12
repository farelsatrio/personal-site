"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/routing";

/** Navigation links configuration with translation keys and route types */
const NAV_LINKS = [
  { key: "about", href: "#about", isHash: true },
  { key: "experience", href: "#experience", isHash: true },
  { key: "stack", href: "#stack", isHash: true },
  { key: "blog", href: "/blog", isHash: false },
] as const;

/** Homepage section ids tracked for scroll-spy */
const SPY_IDS = ["about", "experience", "stack"] as const;

/**
 * Clean, professional navbar with logo, navigation links,
 * language toggle, CTA button, and responsive mobile menu.
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "";

  // Backdrop on scroll + scroll-spy + hide-on-scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsHidden(y > lastScrollY.current && y > 160);
      lastScrollY.current = y;

      if (!isHomePage) return;
      let current = "";
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      if (current) setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

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

  const getLinkHref = (link: (typeof NAV_LINKS)[number]) => {
    if (link.isHash) {
      return isHomePage ? link.href : `/${locale}${link.href}`;
    }
    return link.href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHidden && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled || !isHomePage
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
          aria-label="Home"
        >
          Farel<span className="text-accent">.</span>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const href = getLinkHref(link);
            const isActive = !link.isHash && pathname.startsWith(link.href);

            if (!link.isHash) {
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-sm transition-colors hover:text-foreground ${
                    isActive
                      ? "font-semibold text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            }

            return (
              <a
                key={link.key}
                href={href}
                aria-current={
                  isHomePage && activeSection === link.href.slice(1)
                    ? "true"
                    : undefined
                }
                className={`text-sm transition-colors hover:text-foreground ${
                  isHomePage && activeSection === link.href.slice(1)
                    ? "font-medium text-foreground underline underline-offset-8 decoration-1"
                    : "text-muted-foreground"
                }`}
              >
                {t(link.key)}
              </a>
            );
          })}
        </div>

        {/* ─── Desktop Right: Lang Toggle + CTA ─── */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language Toggle */}
          <div className="flex items-center overflow-hidden rounded-full border border-border text-xs">
            <button
              onClick={() => changeLocale("en")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "en"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLocale("id")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "id"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ID
            </button>
          </div>

          <a
            href={isHomePage ? "#contact" : `/${locale}#contact`}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
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
                  ? "bg-foreground text-background"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLocale("id")}
              className={`px-2.5 py-1 transition-colors ${
                locale === "id"
                  ? "bg-foreground text-background"
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
            {NAV_LINKS.map((link) => {
              const href = getLinkHref(link);
              if (!link.isHash) {
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-border/50 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground last:border-0"
                  >
                    {t(link.key)}
                  </Link>
                );
              }
              return (
                <a
                  key={link.key}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-border/50 py-3.5 text-sm transition-colors hover:text-foreground last:border-0 ${
                    isHomePage && activeSection === link.href.slice(1)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {t(link.key)}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
