"use client";

import { useTranslations } from "next-intl";
import { experiences } from "@/data/experiences";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header — left-aligned for editorial feel */}
        <AnimatedSection>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:mb-16 md:text-4xl">
            {t("title")}
          </h2>
        </AnimatedSection>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.company} delay={index * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-accent/30 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent">
                      {exp.company}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">
                      {t(exp.positionKey)}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-muted-foreground">
                      {exp.duration}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* Bullet Points — custom dot instead of list-disc */}
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {exp.bulletKeys.map((key) => (
                    <li key={key} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tags — font-mono only here, no border */}
                <div className="mt-6 flex flex-wrap gap-2">
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
    </section>
  );
}
