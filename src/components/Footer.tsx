import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-4xl items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Farel Satrio Pratama. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
