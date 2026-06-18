"use client";

import { useTranslations } from "next-intl";
import { experiences } from "@/data/experiences";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 font-mono text-sm text-accent">{t("section")}</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative border-l border-border ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.company} delay={index * 0.1}>
              <div className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-background transition-colors duration-300 group-hover:bg-accent" />

                {/* Content Card */}
                <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                        {t(exp.positionKey)}
                      </h3>
                      <p className="font-mono text-sm text-accent font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-xs text-muted-foreground">
                        {exp.duration}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="mt-4 space-y-2 list-disc list-inside text-sm text-muted-foreground">
                    {exp.bulletKeys.map((key) => (
                      <li key={key} className="leading-relaxed">
                        {t(key)}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground border border-border transition-colors duration-300 group-hover:border-accent/20 group-hover:bg-accent/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
