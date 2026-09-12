"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";
import Devicon from "./Devicon";

/** Tech tool/skill definition */
interface Tool {
  name: string;
  iconName: string;
}

/** Category of tools with a label and list of tools */
interface StackCategory {
  category: string;
  tools: Tool[];
}

/**
 * DevOps & Cloud technology stack organized by category.
 */
const TECH_STACK: StackCategory[] = [
  {
    category: "Cloud Providers",
    tools: [
      { name: "AWS", iconName: "amazonwebservices" },
      { name: "OpenStack", iconName: "openstack" },
    ],
  },
  {
    category: "Containerization",
    tools: [
      { name: "Docker", iconName: "docker" },
      { name: "Kubernetes", iconName: "kubernetes" },
    ],
  },
  {
    category: "CI/CD",
    tools: [
      { name: "GitHub Actions", iconName: "github" },
      { name: "Jenkins", iconName: "jenkins" },
      { name: "Git", iconName: "git" },
    ],
  },
  {
    category: "Infrastructure as Code",
    tools: [
      { name: "Terraform", iconName: "terraform" },
      { name: "Ansible", iconName: "ansible" },
    ],
  },
  {
    category: "Monitoring & Logging",
    tools: [
      { name: "Prometheus", iconName: "prometheus" },
      { name: "Grafana", iconName: "grafana" },
    ],
  },
  {
    category: "Operating Systems",
    tools: [
      { name: "Linux", iconName: "linux" },
      { name: "Bash", iconName: "bash" },
    ],
  },
];

/**
 * Tech Stack section — clean category-based grid without
 * excessive hover effects.
 */
export default function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section id="stack" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        {/* Section Header — centered */}
        <AnimatedSection>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Stack Categories */}
        <div className="mt-16 space-y-12">
          {TECH_STACK.map((cat, catIndex) => (
            <AnimatedSection key={cat.category} delay={catIndex * 0.06}>
              <div>
                {/* Category Label — subtle, muted */}
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat.category}
                </h3>

                {/* Tool Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
                    >
                      <Devicon
                        name={tool.iconName}
                        logoStyle="plain"
                        colored={true}
                        size="2.25rem"
                      />
                      <span className="mt-3 text-xs text-muted-foreground">
                        {tool.name}
                      </span>
                    </div>
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
