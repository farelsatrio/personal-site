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
    <section id="stack" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header — left-aligned with description */}
        <AnimatedSection>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mb-12 max-w-lg text-muted-foreground md:mb-16">
            {t("description")}
          </p>
        </AnimatedSection>

        {/* Stack Categories */}
        <div className="space-y-10">
          {TECH_STACK.map((cat, catIndex) => (
            <AnimatedSection key={cat.category} delay={catIndex * 0.06}>
              <div>
                {/* Category Label — subtle, muted */}
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat.category}
                </h3>

                {/* Tool Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 transition-colors duration-200 hover:border-accent/30"
                    >
                      <Devicon
                        name={tool.iconName}
                        logoStyle="plain"
                        colored={true}
                        size="2rem"
                      />
                      <span className="mt-2 text-xs text-muted-foreground">
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
