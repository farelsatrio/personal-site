"use client";

import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="about"
      className="relative flex min-h-[90vh] items-center px-6 pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
          {/* ─── Text Content ─── */}
          <div className="max-w-xl text-center md:text-left">
            <AnimatedSection>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#16A34A]" />
            </span>
            {t("availability")}
          </span>

              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Farel Satrio Pratama
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                {t("title")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                {t("bio")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start sm:justify-center">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
                >
                  {t("primaryCta")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {t("secondaryLink")}
                </a>
              </div>

              {/* Bukti ringkas — mono, muted */}
              <p className="mt-8 font-mono text-xs tracking-wide text-muted-foreground">
                AWS · Docker · Kubernetes · Terraform · CI/CD
              </p>
            </AnimatedSection>
          </div>

          {/* ─── Profile Picture ─── */}
          <AnimatedSection
            className="shrink-0"
            delay={0.15}
            variant="scale-in"
          >
            <div className="h-64 w-64 overflow-hidden rounded-3xl border border-border bg-muted shadow-xl shadow-foreground/5 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <Image
                src="/profil.jpg"
                alt="Farel Satrio Pratama"
                width={320}
                height={320}
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
