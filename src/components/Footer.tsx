import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Farel Satrio Pratama. {t("copyright")}
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {tNav("about")}
          </a>
          <a href="#experience" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {tNav("experience")}
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {tNav("contact")}
          </a>
        </nav>
      </div>
    </footer>
  );
}
