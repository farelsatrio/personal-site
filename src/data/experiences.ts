export interface Experience {
  company: string;
  positionKey: string;     // Key to translate the position title
  duration: string;        // Text representing duration (will be localized or kept standard)
  location: string;
  bulletKeys: string[];    // Keys to translate bullet points
  techTags: string[];
}

export const experiences: Experience[] = [
  {
    company: "Boer Technology",
    positionKey: "position.studentIntern",
    duration: "Jun 2025 - Oct 2025",
    location: "Remote / Bogor",
    bulletKeys: [
      "bullets.btech.bullet1",
      "bullets.btech.bullet2",
      "bullets.btech.bullet3",
    ],
    techTags: ["Docker", "Kubernetes", "Ansible", "CI/CD", "Ceph", "OpenStack", "Grafana", "Prometheus"],
  },
];
