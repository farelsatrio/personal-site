"use client";

import { Download, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Profile Picture - DENGAN AnimatedSection */}
          <AnimatedSection className="shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-sm" />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-border bg-muted md:h-48 md:w-48">
                <Image
                  src="/profil.jpg"
                  alt="Profile picture"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text Content - DENGAN AnimatedSection */}
          <div className="text-center md:text-left">
            <AnimatedSection delay={0.1}>
              <p className="mb-3 font-mono text-sm text-accent">
                {t("welcome")}
              </p>

              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {t("greeting")}{" "}
                <span className="bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
                  Farel Satrio Pratama
                </span>
              </h1>

              <p className="mb-4 font-mono text-lg text-muted-foreground md:text-xl">
                {t("title")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("bio")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
                >
                  <Download size={16} />
                  {t("downloadResume")}
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
                >
                  <Mail size={16} />
                  {t("contactMe")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}