"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: Twitter,
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
];

/**
 * Contact section with social media icon links and a clear heading.
 */
export default function SocialLinks() {
  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="text-center">
            <p className="mb-3 font-mono text-sm text-accent">~/contact</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Get in Touch
            </h2>
            <p className="mx-auto mb-10 max-w-md text-muted-foreground">
              Open to discussing new opportunities, collaborations, or just
              chatting about cloud infrastructure and DevOps best practices.
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
            or drop me an email at{" "}
            <a
              href="mailto:hello@example.com"
              className="text-accent transition-colors hover:text-accent-foreground"
            >
              hello@example.com
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
