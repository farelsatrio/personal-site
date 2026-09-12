"use client";

import { useTranslations } from "next-intl";
import { achievements } from "@/data/achievements";
import AnimatedSection from "./AnimatedSection";
import { Award, Trophy, Medal, ExternalLink } from "lucide-react";

export default function Achievements() {
  const t = useTranslations("Achievements");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-5 w-5" />;
      case "Trophy":
        return <Trophy className="h-5 w-5" />;
      case "Medal":
        return <Medal className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <section id="achievements" className="px-6 py-28 md:py-40">
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

        {/* Compact rows — no bulky cards */}
        <div className="mt-12 md:mt-16">
          {achievements.map((item, index) => (
            <AnimatedSection
              key={item.titleKey}
              delay={index * 0.08}
              variant="fade-right"
            >
              <div className="group flex items-center gap-5 border-t border-border py-6 transition-colors last:border-b hover:bg-card/60">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-transform duration-200 group-hover:-translate-y-0.5">
                  {getIcon(item.iconName)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t(`categories.${item.category}`)} · {item.date}
                  </p>
                  <h3 className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.organization}
                  </p>
                </div>

                {item.credentialLink && (
                  <a
                    href={item.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    Verify
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
