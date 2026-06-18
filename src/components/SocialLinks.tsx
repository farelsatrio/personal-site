"use client";

import { Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTranslations } from "next-intl";

/* ─── Custom SVG Brand Icons ─── */
/* Lucide v1+ removed brand icons, so we use inline SVGs from Simple Icons */

function GitHubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

/** Social link definition */
interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

/**
 * Social media links. Update the URLs with your actual profiles.
 */
const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/farelsatrio",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/farelsatriopratama",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/farelstrio_",
    icon: InstagramIcon,
  },
  {
    label: "Email",
    href: "mailto:farelsatriop@gmail.com",
    icon: Mail,
  },
];

/**
 * Contact section with social media icon links and a clear heading.
 */
export default function SocialLinks() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="text-center">
            <p className="mb-3 font-mono text-sm text-accent">{t("section")}</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mb-10 max-w-md text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Social Icons */}
        <AnimatedSection delay={0.15}>
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-lg hover:shadow-accent/5"
                  aria-label={`Visit ${link.label} profile`}
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Direct email text */}
        <AnimatedSection delay={0.25}>
          <p className="mt-8 text-center font-mono text-sm text-muted-foreground">
            {t("orEmail")}{" "}
            <a
              href="mailto:farelsatriop@gmail.com"
              className="text-accent transition-colors hover:text-accent-foreground"
            >
              farelsatriop@gmail.com
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
