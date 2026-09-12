"use client";

import { useTranslations } from "next-intl";
import { experiences } from "@/data/experiences";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        {/* Section Header — editorial, left-aligned */}
        <AnimatedSection>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mt-12 md:mt-16">
          <div
            className="absolute bottom-2 left-[5px] top-2 w-px bg-border"
            aria-hidden="true"
          />
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <AnimatedSection
                key={exp.company}
                delay={index * 0.1}
                variant="fade-right"
              >
                <div className="relative max-w-3xl pl-10">
                  <span
                    className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-foreground bg-background"
                    aria-hidden="true"
                  />

                  {/* Date & location — mono, muted */}
                  <p className="font-mono text-xs text-muted-foreground">
                    {exp.duration} · {exp.location}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {t(exp.positionKey)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {exp.company}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.bulletKeys.map((key) => (
                      <li key={key} className="flex gap-3">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
                          aria-hidden="true"
                        />
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
