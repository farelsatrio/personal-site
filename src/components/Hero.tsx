"use client";

import { Download, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="about"
      className="relative flex min-h-[90vh] items-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between">
          {/* ─── Text Content ─── */}
          <div className="max-w-xl text-center md:text-left">
            <AnimatedSection>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
                {t("title")}
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t("greeting")}{" "}
                <span className="text-accent">Farel Satrio Pratama</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
                {t("bio")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <Download size={16} />
                  {t("downloadResume")}
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t("contactMe")}
                  <ArrowRight size={16} />
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* ─── Profile Picture ─── */}
          <AnimatedSection className="shrink-0">
            <div className="h-48 w-48 overflow-hidden rounded-2xl border border-border bg-muted lg:h-64 lg:w-64">
              <Image
                src="/profil.jpg"
                alt="Farel Satrio Pratama"
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}